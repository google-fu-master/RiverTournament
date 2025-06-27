---
layout: default
title: Tournament Rules
description: Full River Tournament house rules for player eligibility, registration, gameplay, conduct, and race formats. Updated for fairness and transparency.
bodyClass: page-rules
permalink: /rules/
---

<!--this is the rule.md file-->

<!-- Sticky section navigation -->
<nav class="faq-sticky-nav" aria-label="Rules Sections">
  <ul>
    <li><a href="#player-eligibility">Eligibility</a></li>
    <li><a href="#match-format">Match Format</a></li>
    <li><a href="#equipment">Equipment</a></li>
    <li><a href="#conduct">Conduct</a></li>
    <li><a href="#bca-modified-rules">BCA Rules</a></li>
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
    <li>Players with Fargo ratings of <445 in 8-ball, <430 in 9-Ball are welcome at River Tournaments (10-Ball TBD).</li>
    <li>Players with a FargoRate or APA account may need to present a <strong>photo ID</strong> at registration.</li>
	<li>If you <strong>do not have a FargoRate account</strong> and/or less than 50 robustness, your <strong>Fargo and/or APA rating will be converted</strong> to a comparable FargoRate for tournament eligibility.</li>
	<li>If you have <strong>no APA and no FargoRate</strong>, you will be entered at the <strong>maximum eligible rating (445 for 8-ball, 430 for 9-Ball)</strong> and monitored for future eligibility.</li>
	<li>If you have <strong>multiple Fargo accounts</strong>, the <strong>highest rating will be used</strong>. Players rated >430 in 9-Ball and >445 in 8-Ball are not eligible — please email <a href="mailto:support@fargorate.com">support@fargorate.com</a> merge accounts beforehand .</li>
	<li>DigitalPool syncs with the FargoRate system. Your rating will be available to the tournament director immediately upon your registration (if you have one).  If you are in the OPAL APA system, the tournament director will find your profile and convert your rank. Please bring your APA app/account and have it ready at registration if you only have an APA rating and no Fargo.</li>
	<li>All River Tournaments are <strong>reported to FargoRate</strong>. Once processed, you will be able to <strong>claim your official profile</strong>.</li>
    <li>All ratings and conversion assignments are subject to review and final approval by the tournament director.</li>
    <li>Your rating at registration on tournament night will decide eligibility and race lengths. DigitalPool syncs with FargoRate and pulls updated ranks in real time.</li>
    <li>Entry fees must be paid at time of registration. Your spot will not be held without payment.</li>
    <li><strong>You do not have a spot in the bracket until your entry fee is paid, your Fargo rating has been verified/assigned, and your match requirements are confirmed.</strong></li>
    <li><strong>Any confirmed player who does not show up by the time matches are being assigned may be forfeited and replaced with a <a href="#match-format">Bye</a>.</strong></li>
  </ul>
</section>

<section id="match-format" class="rules-section" role="region" aria-labelledby="match-format-title">
  <h2 id="match-format-title">Match Format & Races</h2>
  <ul>
    <li class="numbered-1">Race lengths vary by format, the number of players, and Fargo gaps:</li>
    <li><strong>8 & 9 Ball:</strong>
      <ul>
        <li>8–12 players: race to 2 on the winners side, 1 on the losers side.</li>
        <li>13-16 players: race to 1, both sides.</li>
        <li>All Brackets, All Sides: 100+ FargoRate gap, the higher-rated player must win 1 extra game. (For more information see [How do player ratings work?](/faq/#how-do-player-ratings-work))</li>
      </ul>
    </li>
    <li>We follow <a href="#bca-modified-rules">modified BCA rules</a>; adjustments may be made at the tournament director’s discretion <em>at any time</em> to encourage fair gameplay.</li>
    <li><strong>Definition: A Bye means an automatic advancement to the next round for a player without an opponent that round.</strong></li>
  </ul>
</section>

<section id="equipment" class="rules-section" role="region" aria-labelledby="equipment-title">
  <h2 id="equipment-title">Equipment & Gameplay</h2>
  <ul>
    <li class="numbered-1">Racks are Fargo Reported.</li>
    <li>Players lag or flip a coin for the first break, then alternate breaks. If there’s no agreement, lagging is the default.</li>
    <li>Magic Racks are fine if both players agree; otherwise, triangle by default.</li>
    <li>Jump shots are not allowed at River, and performing jump shots may result in being banned from future River Tournaments.</li>
    <li>Timeouts are not allowed. If you’re unsure about a rule, refer to this page, or ask your opponent or another player not currently in a match. Bring all disagreements to the tournament director immediately.</li>
    <li>If you need a shot watched, ask anyone not currently playing in a match. If no one is available, ask the tournament director.</li>
  </ul>
</section>

<section id="conduct" class="rules-section" role="region" aria-labelledby="conduct-title">
  <h2 id="conduct-title">Conduct & House Rules</h2>
  <ul>
    <li class="numbered-1">The tournament director reserves the right to refuse entry to any player, or to immediately remove any player from an ongoing tournament, for any reason. This includes, but is not limited to:
      <ul type="a">
        <li>Unsportsmanlike behavior of any kind at River or other pool tournaments in the Oregon community (APA, BCA, APL, etc.).</li>
        <li>Signs of substance impairment.</li>
        <li>Ineligible Fargo rating.</li>
        <li>Suspected or proven manipulation of Fargo ratings (sandbagging).</li>
        <li>Repeated intentional distraction of opponents (sharking).</li>
        <li>Verbal abuse or threats.</li>
        <li>Repeated failure to follow tournament rules or etiquette.</li>
        <li>Any behavior that jeopardizes the integrity of the River tournament or compromises River as a safe, fun, and inclusive space for low-level players.</li>
      </ul>
    </li>
    <li>No drinks on or near pool tables. Spills or damage will result in permanent disqualification from the River tournament, and possibly from the establishment itself (as River management sees fit).</li>
    <li>House contributions to the pot aren’t guaranteed.</li>
    <li>Entry fees are cash only and may change.</li>
    <li><strong>The tournament director has the final say on all tournament matters.</strong></li>
    <li><strong>Remember to tip your bartenders, staff, and tournament directors - they work hard for you!</strong></li>
  </ul>
</section>

<section id="bca-modified-rules" class="rules-section" role="region" aria-labelledby="bca-modified-rules-title">
  <h2 id="bca-modified-rules-title">BCA Modified Rules</h2>

<label for="formatSelect"><strong>Select Format:</strong></label>
<select id="formatSelect">
<option value="eightBallRules">8-Ball</option>
<option value="nineBallRules">9-Ball</option>
<option value="tenBallRules">10-Ball</option>
</select>

  <div id="eightBallRules" class="format-rules">
    <h3>8-Ball</h3>
    <ul>
      <li>Players lag or flip a coin for the first break. If there’s no agreement, lagging is the default. Breaks alternate after that.</li>
      <li>Racks: Players can use Magic Racks or Triangles, but it must be agreed upon by both players and used for the entire match. If players don’t agree, Triangle is the default.</li>
      <li>Fouls cannot occur before the rack is struck.</li>
      <li>8 on the break: If you make the 8-ball on the break, it’s an automatic win for that rack.</li>
      <li>Scratch on the break: Incoming player must shoot from behind the head string (“kitchen”).</li>
      <li>Open table after break until a called shot legally pockets a ball.</li>
      <li>Groups (solids or stripes) assigned by first legal shot after the break. If both are made on the break, table remains open.</li>
      <li>8-ball pocket must be marked (or called verbally if agreed upon before the match). Making the 8-ball without marking/calling a pocket, or making it in a different pocket than marked/called is a loss for that rack. </li>
      <li>8-ball scratch is loss of game.</li>
      <li>Other fouls: Ball-in-hand for the opponent anywhere on the table.</li>
      <li>You must hit your ball first and at least one ball (any group) or the cue ball must hit a rail. Otherwise it’s a foul.</li>
      <li>Timeouts: None allowed.</li>
	  <li>Races:</li>
	  <li>8–12 players: race to 3 on the winners side, 2 on the losers side</li>
      <li>13–16 players: race to 2 on the winners side, 1 on the losers side</li>
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
	  <li>Races:</li>
	  <li>8–12 players: race to 3 on the winners side, 2 on the losers side</li>
      <li>13–16 players: race to 2 on the winners side, 1 on the losers side</li>
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
        "text": "We follow modified BCA rules. Magic Racks are allowed if both players agree. Jump shots and timeouts are not allowed."
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
