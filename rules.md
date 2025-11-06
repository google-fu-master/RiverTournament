---
layout: default
title: Tournament Rules
description: Full River Tournament house rules for player eligibility, registration, gameplay, conduct, and race formats. Updated for fairness and transparency.
bodyClass: page-rules
permalink: /rules/
---

<!-- markdownlint-disable MD033 -->

<!--this is the rule.md file-->

<!-- Sticky section navigation -->
<nav class="faq-sticky-nav" aria-label="Rules Sections">
  <ul>
    <li><a href="#player-eligibility">Eligibility</a></li>
    <li><a href="#match-format">Match Format</a></li>
    <li><a href="#equipment">Equipment</a></li>
    <li><a href="#conduct">Conduct</a></li>
    <li><a href="#bca-rules">BCA Rules</a></li>
  </ul>
</nav>

<p>
  <input type="text" id="rules-search" class="rules-search" placeholder="Search rules..." aria-label="Search rules" autocomplete="off" />
</p>

<script>
// Live search for rules page
(function() {
  var searchInput = document.getElementById('rules-search');
  if (!searchInput) return;
  var sections = Array.from(document.querySelectorAll('.rules-section'));
  var highlight = (text, term) => text.replace(new RegExp(`(${term})`, 'gi'), '<mark>$1</mark>');
  searchInput.addEventListener('input', function() {
    var val = this.value.trim().toLowerCase();
    if (!val) {
      sections.forEach(sec => {
        sec.style.display = '';
        Array.from(sec.querySelectorAll('mark')).forEach(m => {
          m.replaceWith(m.textContent);
        });
      });
      return;
    }
    sections.forEach(sec => {
      let found = false;
      // Search in section text and list items
      sec.querySelectorAll('li, h2, h3, p').forEach(el => {
        let html = el.innerHTML.replace(/<mark>(.*?)<\/mark>/g, '$1');
        if (el.textContent.toLowerCase().includes(val)) {
          el.innerHTML = highlight(html, val);
          found = true;
        } else {
          el.innerHTML = html;
        }
      });
      sec.style.display = found ? '' : 'none';
    });
  });
})();
</script>

<h1 class="visually-hidden">River Tournament Rules and House Guidelines</h1>

<p class="rules-note">
  Note: Rules are subject to change at the tournament director’s discretion to encourage fair gameplay and equal competition for lower-rated players. The spirit of the rule will take priority over the letter of the rule.
</p>

<section id="player-eligibility" class="rules-section" role="region" aria-labelledby="player-eligibility-title">
  <h2 id="player-eligibility-title">Player Eligibility & Registration</h2>
  <ul>
    <li>Players with Fargo ratings of &lt;445 in 8-ball, &lt;430 in 9-Ball are welcome at River Tournaments (10-Ball TBD).</li>
    <li>Players with a FargoRate or APA account may need to present a <strong>photo ID</strong> at registration.</li>
    <li>If you <strong>do not have a FargoRate account</strong> and/or less than 50 robustness, your <strong>Fargo and/or APA rating will be converted</strong> to a comparable FargoRate for tournament eligibility. Conversions are at the Tournament Director's discretion.</li>
    <li>If you have <strong>no APA and no FargoRate</strong>, you will be entered at the <strong>maximum eligible rating (445 for 8-ball, 430 for 9-Ball)</strong> and monitored for future eligibility.</li>
    <li>If you have <strong>multiple Fargo accounts</strong>, the <strong>highest rating will be used</strong>. Players rated &gt;430 in 9-Ball and &gt;445 in 8-Ball are not eligible — please email <a href="mailto:support@fargorate.com">support@fargorate.com</a> to merge accounts beforehand.</li>
    <li>DigitalPool syncs with the FargoRate system. Your rating will be available to the tournament director immediately upon your registration (if you have one).  If you are in the OPAL APA system, the tournament director may find your profile and convert your rank. Please bring your APA app/account and have it ready at registration if you only have an APA rating and no Fargo.</li>
    <li>All River Tournaments are <strong>reported to FargoRate</strong>. FargoRate estimates 2-3 weeks to process scores and create new player profiles; once processed, you will be able to <strong>claim your profile via the FargoRate mobile app.</strong>.</li>
    <li>All ratings and conversion assignments are subject to review and final approval by the tournament director.</li>
    <li>Your rating at registration on tournament night will decide eligibility and race lengths. DigitalPool syncs with FargoRate and pulls updated ranks in real time.</li>
    <li>Entry fees must be paid at time of registration. Your spot will not be held without payment.</li>
    <li><strong>You do not have a spot in the bracket until your entry fee is paid, your Fargo rating has been verified/assigned, and your match requirements are confirmed.</strong></li>
  <li><strong>Any confirmed player who does not show up by the time matches are being assigned may be forfeited and replaced with a bye.</li>
  </ul>
</section>

<section id="match-format" class="rules-section" role="region" aria-labelledby="match-format-title">
  <h2 id="match-format-title">Match Format & Races</h2>
  <ul>
    <li class="numbered-1">Race lengths vary by format, the number of players, and Fargo gaps. The tournament director may adjust races based on attendance; the items below are general guidelines.</li>
    <li><strong>8-Ball</strong>
      <ul>
        <li>8–12 players: race to 2 on the winners side, 1 on the losers side.</li>
        <li>13–16 players: race to 1 on both winners and losers sides.</li>
      </ul>
    </li>
    <li><strong>9-Ball</strong>
      <ul>
        <li>8–12 players: race to 3 on the winners side, 2 on the losers side.</li>
        <li>13–16 players: race to 2 on the winners side, 1 on the losers side.</li>
        <li>All formats/tournaments: 100+ FargoRate gap on the front — the higher-rated player must win 1 extra game. (See <a href="/faq/#faq-ratings">How do player ratings work?</a>)</li>
      </ul>
    </li>
  <li>We follow <a href="#bca-rules">BCA rules</a>.</li>
  </ul>
</section>

<section id="equipment" class="rules-section" role="region" aria-labelledby="equipment-title">
  <h2 id="equipment-title">Equipment & Gameplay</h2>
  <ul>
    <li class="numbered-1">Racks are Fargo Reported.</li>
    <li>Players lag or flip a coin for the first break, then alternate breaks. If there’s no agreement, lagging is the default.</li>
    <li>Magic Racks are fine if both players agree; otherwise, triangle by default.</li>
    <li>Timeouts are not allowed. If you’re unsure about a rule, refer to this page, or ask your opponent or another player not currently in a match. Bring all disagreements to the tournament director immediately.</li>
    <li>If you need a shot watched, ask anyone not currently playing in a match. If no one is available, ask the tournament director.</li>
  </ul>
</section>

<section id="conduct" class="rules-section" role="region" aria-labelledby="conduct-title">
  <h2 id="conduct-title">Conduct & House Rules</h2>
  <ul>
    <li class="numbered-1">The tournament director reserves the right to refuse entry to any player, or to immediately remove any player from an ongoing tournament, for any reason. This includes, but is not limited to:
      <ul type="a">
        <li>Unsportsmanlike behavior of any kind at River or ANY other tournament, league, or pool event in the Oregon community (APA, BCA, APL, etc.).</li>
        <li>Signs of substance impairment.</li>
        <li>Ineligible Fargo rating.</li>
        <li>Suspected or proven manipulation of Fargo ratings (sandbagging).</li>
        <li>Repeated intentional distraction of opponents (sharking).</li>
        <li>Verbal abuse or threats.</li>
        <li>Repeated failure to follow tournament rules or etiquette.</li>
        <li>Any behavior that jeopardizes the integrity of the River tournament or compromises River as a safe, fun, and inclusive space for low-level players.</li>
      </ul>
    </li>
    <li>No drinks on or near pool tables. Spills or damage will result in permanent disqualification from the River tournament, and possible fees and/or ban from the establishment itself (as River management sees fit).</li>
    <li>House contributions to the pot are never guaranteed.</li>
    <li>Entry fees are cash only and are subject to change.</li>
    <li><strong>The tournament director has the final say on all tournament matters.</strong></li>
    <li><strong>Remember to tip your bartenders, staff, and tournament directors - they work hard for you!</strong></li>
  </ul>
</section>

<section id="bca-rules" class="rules-section" role="region" aria-labelledby="bca-rules-title">
  <h2 id="bca-rules-title">BCA Rules</h2>

<label for="formatSelect"><strong>Select Format:</strong></label>
<select id="formatSelect">
<option value="eightBallRules">8-Ball</option>
<option value="nineBallRules">9-Ball</option>
<option value="tenBallRules">10-Ball</option>
</select>

  <div id="eightBallRules" class="format-rules">
    <h3>8-Ball</h3>
    <ul>
      <li>Lag or Flip, then alternate: Players may lag or flip a coin for the first break. If there’s no agreement, lagging is the default. Players alternate breaking; rack your own.</li>
      <li>Racking: Balls are racked with the 8-ball in the center of the triangle, a stripe in one back corner, and a solid in the other. Players may use a Magic Rack or Triangle if both agree; if not, the Triangle is the default. The rack must be tight and positioned with the apex ball on the foot spot.</li>
  <li>Legal Break: The cue ball starts behind the head string (2nd diamond, aka the kitchen). A legal break requires that at least four object balls hit a cushion or a ball is pocketed. If this requirement isn’t met, it’s an illegal break, and the incoming player may accept the table, re-rack and break, or have the original breaker re-break.</li>
  <li>Fouls Before the Rack is Struck: No fouls can be called until the cue ball contacts the rack on the break. (Tournament director may still address etiquette or sportsmanship issues at any time.)</li>
      <li>8 on the break: If the 8-ball is pocketed <strong>and no foul occurs</strong>, the breaker may spot the 8-ball and continue shooting OR re-rack and break again. If the 8-ball is pocketed <strong>and a foul occurs</strong>, the incoming player may spot the 8-ball and take ball in hand behind the headstring or re-rack and break again.</li>
      <li>Scratch on the break: If the cue ball is scratched or jumped on a legal break, it’s a foul. The incoming player gets ball in hand behind the head string (2nd diamond, aka the kitchen).</li>
      <li>Open Table: On all shots (except the break), the cue ball must first contact a ball of your group, and then either an object ball or the cue ball must contact a rail. Failure to do so is a foul, your opponent gets ball in hand.</li>
      <li>Call Pocket: You must call the ball and intended pocket for each shot (except on the break):
        <ul type="a">
          <li>You do not need to call details like banks, kisses, or caroms, unless the shot is not obvious.</li>
          <li>If it’s clear what ball and pocket you’re aiming for, no verbal call is required — it’s understood.</li>
          <li>If there’s any doubt, you must verbally call or point to make your intended ball and pocket clear.</li>
          <li>Any obvious pocketed ball counts as legal; but if a called ball goes into an unintended pocket, the turn ends and the opponent takes over (no foul unless the cue ball is scratched).</li>
        </ul>
      </li>
      <li>Legal Shot: On all shots (except the break), the cue ball must first contact a ball of your group, and then either an object ball or the cue ball must contact a cushion. Failure to do so is a foul, your opponent gets ball in hand.</li>
      <li>Groups (solids or stripes) assigned by first legal shot after the break. If both are made on the break, table remains open.</li>
      <li>8-Ball Shot: You must clearly call the pocket for the 8-ball. The 8-ball may not be the first ball contacted except on a legal combination. Pocketing the 8-ball in an uncalled pocket, or scratching while pocketing it, results in loss of game.</li>
      <li>Timeouts are not allowed during tournament play. Please direct rule questions to the tournament director.</li>
      <li>General Fouls: All fouls result in ball in hand anywhere on the table (except after the break, when it’s behind the head string aka in the kitchen). Fouls include (but are not limited to):
        <ul type="a">
          <li>Failure to contact your object ball first</li>
          <li>Failure to drive any ball to a rail after the cue ball contacts the object ball.</li>
          <li>Scratch or cue ball off the table</li>
          <li>Jumping any ball off the table (except 8-ball, which is a loss of game).</li>
        </ul>
      </li>
      <li>Races (general guidelines):
        <ul type="a">
          <li>8–12 players: race to 2 on the winners side, 1 on the losers side.</li>
          <li>13–16 players: race to 1 on both winners and losers sides.</li>
          <li>All tournaments: 100+ FargoRate gap on the front — the higher-rated player must win 1 extra game.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div id="nineBallRules" class="format-rules" style="display:none;">
    <h3>9-Ball</h3>
    <ul>
      <li>Players lag or flip a coin for the first break. If there’s no agreement, lagging is the default. Breaks alternate after that.</li>
      <li>Racks: Players can use Magic Racks or Triangles, but it must be agreed upon by both players and used for the entire match. If players don’t agree, Triangle is the default.</li>
      <li>Fouls cannot occur before the rack is struck.</li>
      <li>Three-point break rule: At least three object balls must be either pocketed or touch the rail on the break.</li>
      <li>Push Option: If the breaker didn't make anything, the opponent can either take the current table layout and shoot, or pass it back to the player who broke to let them shoot instead.</li>
      <li>9 on the snap: If the 9-ball is pocketed on the break, it’s an automatic win for that rack, except if it goes into the two foot-string pockets (the corner pockets closest to the rack). Then it’s spotted and play continues. The breaker continues shooting unless there was a foul.</li>
      <li>Scratch on the break: Ball-in-hand for the incoming player anywhere on the table.</li>
      <li>Table scratch and other fouls: Ball-in-hand for the opponent anywhere on the table.</li>
      <li>You must hit the lowest ball on the table first and any ball (including the cue ball) must hit a rail after. Otherwise it’s a foul.</li>
      <li>Timeouts: None allowed.</li>
      <li>Races:
        <ul>
          <li>8–12 players: race to 3 on the winners side, 2 on the losers side.</li>
          <li>13–16 players: race to 2 on the winners side, 1 on the losers side.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div id="tenBallRules" class="format-rules" style="display:none;">
    <h3>10-Ball</h3>
    <ul>
      <li>Players lag or flip a coin for the first break. If there’s no agreement, lagging is the default. Breaks alternate after that.</li>
      <li>Racks: Players can use Magic Racks or Triangles, but it must be agreed upon by both players and used for the entire match. If players don’t agree, Triangle is the default.</li>
      <li>Fouls cannot occur before the rack is struck.</li>
      <li>Three-point break rule: At least three object balls must be either pocketed or touch the head string line on the break.</li>
      <li>Push Option: If the breaker didn't make anything, the opponent can either take the current table layout and shoot, or pass it back to the player who broke to let them shoot instead.</li>
      <li>10-ball on the break: If the 10-ball is pocketed on the break, it is spotted and play continues. It is still the breaker's turn unless a foul has occurred.</li>
      <li>Scratch on the break: Ball-in-hand for the incoming player anywhere on the table.</li>
      <li>Rotation game: You must hit the lowest numbered ball first.</li>
      <li>Call every shot. If the called ball goes in another pocket, it’s not a foul but the turn ends.</li>
      <li>Other fouls: Ball-in-hand for the opponent anywhere on the table.</li>
      <li>You must hit the lowest numbered ball on the table first and any ball (including the cue ball) must hit a rail after. Otherwise it’s a foul.</li>
      <li>Timeouts: None allowed.</li>
    </ul>
  </div>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is eligible to play in River Tournaments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Players with Fargo ratings of <445 in 8-ball, <430 in 9-Ball are eligible. Players without a FargoRate or APA account may be assigned a comparable rating."
      }
    },
    {
      "@type": "Question",
      "name": "How are race lengths determined?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Race lengths vary by format, number of players, and Fargo gaps. See the Match Format & Races section for details."
      }
    },
    {
      "@type": "Question",
      "name": "What equipment and rules are used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We follow BCA rules. Magic Racks are allowed if both players agree. Jump shots and timeouts are not allowed."
      }
    },
    {
      "@type": "Question",
      "name": "What conduct is expected at River Tournaments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unsportsmanlike behavior, substance impairment, and rule violations may result in removal. The tournament director has final say on all matters."
      }
    },
    {
      "@type": "Question",
      "name": "How do I select the rules for 8-Ball, 9-Ball, or 10-Ball?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the format selector on this page to view the specific rules for each game type."
      }
    }
  ]
}
</script>

<script>
  document.getElementById('formatSelect').addEventListener('change', function () {
    const selected = this.value;
    document.querySelectorAll('.format-rules').forEach(function (div) {
      div.style.display = 'none';
    });
    document.getElementById(selected).style.display = 'block';
  });
</script>
