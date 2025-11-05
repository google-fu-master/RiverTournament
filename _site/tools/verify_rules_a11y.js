const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const axeCore = require('axe-core');

(async function(){
  const filePath = path.resolve(__dirname, '../_site/rules/index.html');
  if (!fs.existsSync(filePath)) {
    console.error('ERROR: _site rules index.html not found at', filePath);
    process.exit(2);
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable', url: 'http://localhost' });
  const { window } = dom;
  const { document } = window;

  // Inject axe into the jsdom window
  window.eval(axeCore.source);

  // Wait for load and a short settle
  await new Promise(resolve => {
    function done(){
      setTimeout(resolve, 250);
    }
    if (document.readyState === 'complete') done();
    else window.addEventListener('load', done);
    // fallback
    setTimeout(done, 1000);
  });

  const out = { detailsCount: 0, details: [] };
  const details = Array.from(document.querySelectorAll('details.rules-collapsible'));
  out.detailsCount = details.length;

  details.forEach((d, idx) => {
    const summary = d.querySelector('summary');
    const body = d.querySelector('.rules-body');
    const before = {
      idx,
      hasSummary: !!summary,
      hasBody: !!body,
      bodyId: body ? body.id || null : null,
      openBefore: d.hasAttribute('open'),
      ariaBefore: summary ? summary.getAttribute('aria-expanded') : null
    };

    // Simulate keyboard Enter keydown on summary to toggle
    if (summary) {
      summary.focus();
      const ev = new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      summary.dispatchEvent(ev);
    }

    const after = {
      openAfter: d.hasAttribute('open'),
      ariaAfter: summary ? summary.getAttribute('aria-expanded') : null
    };

    out.details.push(Object.assign({}, before, after));
  });

  // Run axe in the jsdom window
  const results = await window.axe.run(document);

  // Print summary
  console.log('\n=== Verification Summary ===');
  console.log('Details count:', out.detailsCount);
  out.details.forEach(d => {
    console.log(`\nDetail[${d.idx}] hasSummary=${d.hasSummary} hasBody=${d.hasBody} bodyId=${d.bodyId}`);
    console.log(`  openBefore=${d.openBefore} ariaBefore=${d.ariaBefore}`);
    console.log(`  openAfter=${d.openAfter} ariaAfter=${d.ariaAfter}`);
  });

  console.log('\n=== axe results summary ===');
  console.log('Violations:', results.violations.length);
  results.violations.forEach(v => {
    console.log(`- ${v.id}: ${v.description} (impact: ${v.impact})`);
    v.nodes.slice(0,2).forEach(n => {
      console.log(`  -> target: ${n.target.join(' | ')}`);
    });
  });

  // Exit non-zero if high-severity violations found
  const high = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
  if (high.length > 0) {
    console.error('\nAccessibility: serious/critical violations detected. See output above.');
    process.exit(3);
  }

  console.log('\nAccessibility check passed (no critical/serious violations).');
  process.exit(0);
})();
