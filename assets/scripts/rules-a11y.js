(function(){
  // Ensure summaries have aria-expanded and aria-controls, and update on toggle
  function ensureAria(){
    document.querySelectorAll('details.rules-collapsible').forEach((d, idx) => {
      const summary = d.querySelector('summary');
      if (!summary) return;

      // add id to body container for aria-controls
      let body = d.querySelector('.rules-body');
      if (!body) {
        body = document.createElement('div');
        // move children into body
        while (summary.nextSibling) body.appendChild(summary.nextSibling);
        d.appendChild(body);
      }
      if (!body.id) body.id = 'rules-body-' + (idx + 1);

      // set aria attributes on summary
      summary.setAttribute('role', 'button');
      summary.setAttribute('aria-controls', body.id);
      summary.setAttribute('aria-expanded', d.hasAttribute('open') ? 'true' : 'false');

      // keep aria-expanded in sync when details toggles
      d.addEventListener('toggle', function(){
        const expanded = d.hasAttribute('open');
        summary.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });

      // ensure Enter/Space also toggles (some browsers handle this, but ensure consistency)
      summary.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          d.open = !d.open;
          const expanded = d.hasAttribute('open');
          summary.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
      });
    });
  }

  window.addEventListener('load', ensureAria);
  window.addEventListener('resize', function(){ setTimeout(ensureAria, 120); });
})();
