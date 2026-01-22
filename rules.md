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
    <li><a href="#player-eligibility">Player Eligibility</a></li>
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
  Note: Rules are subject to change at the tournament director’s discretion to encourage fair gameplay and equal competition for lower-rated players. The spirit of the rule will take priority over the letter of the rule. If you have any questions, comments or concerns, the TD's proverbial door is always open!
</p>

<section id="player-eligibility" class="rules-section" role="region" aria-labelledby="player-eligibility-title">
  <h2 id="player-eligibility-title">Player Eligibility & Registration</h2>

- Players with Fargo ratings of <445 in 8-ball, <430 in 9-Ball are welcome at River Tournaments. For Ladies Night tournaments, the caps are <475 for both formats (10-Ball TBD).
- Players with a FargoRate or APA account may need to present a **photo ID** at registration.
- If a player **does not have a FargoRate account** and/or less than 50 robustness, and has played a minimum of 12 APA matches within the last 2 years, they can *request* a conversion review. **Conversions are at the Tournament Director's discretion.**
- If a player has a FargoRate profile with more than 50 robustness, they are not eligible for a conversion review and River Tournaments will use their existing Fargo for tournament eligibility/entry.
- If a player has a FargoRate profile with less than 50 robustness, but they have not played 12+ APA matches within the last two years, they are not eligible for a conversion review.
- If the player has a FargoRate profile with less than 50 robustness, and a Fargo no more than 100 points higher than the cap, the player can request to be entered at the FargoRate cap for that tournament. Requests will be considered at the discretion of the TD.
- **A note on conversions:** River Tournaments are primarily geared toward players that are new to Fargo reported events. As such, it is expected that many players will be "unestablished" (less than 200 robustness). Conversions are intended to help bridge the gap between unestablished players and "default/starter" Fargo ratings that have been assigned and not earned.

  Conversions are meant to more accurately rate new players who, for example, may have been assigned a starter rating of 500+ at their first Fargo reported event. 50 robustness is the cap for requesting a conversion because we believe this is a reasonable number of games to "even out" the Fargo of an *unestablished* player in this position enough that it can be considered the source of truth of their ability and eligibility for River Tournament.

  Additionally, a conversion request requires 12 APA matches played within the last 2 years. This indicates the bare minimum of 4 matches per APA session; the requirement to be eligible for APA playoffs, regionals, etc. This provides enough recent player data to build a realistic conversion of their ability into a comparable Fargo rating for initial tournament use. Without the minimum quality and quantity of player data, the conversion is impractical and impossible, respectively.

  If the TD accepts a conversion review request, the player's APA profile and FargoRate Profile (if available) are run through an AI engine specifically designed for realistic rating conversions to standardize the process for all players and remove any ambiguity or bias from the TD. The player's APA data can include but is not limited to: lifetime stats for all available formats including matches played/won, Defensive shot average, Championship lowest attainable rank, Break-and-Runs, 8-on-the-Break, 9-on-the-snap, Mini Slams, Rackless, Shutouts, Session stats, Active/Consecutive Years Played etc. The player's FargoRate data can include but is not limited to: current rank, robustness, public matches/stats, etc. You are welcome to request the data used and the conversion analysis report of your conversion review.

  The conversion is done by analyzing the player's available profiles/stats in comparison with the Billiard University Rating Comparison chart (found at https://billiarduniversity.org/testing/ratings/).

  **Conversions DO NOT alter a player's Fargo rating.** Conversions cannot be used to manipulate a player's rate up or down.  If a Fargo rate is manually assigned to a player within a tournament bracket, it is taken into account by FargoRate's algorithm along with other factors such as handicaps (e.g. +1 game for 100 point Fargo differences), race lengths, per-rack wins/losses, etc. and used to adjust an existing player's rate or create the rate of a new player profile when FargoRate process the tournament scores from DigitalPool.

- If you have **no APA and no FargoRate**, you will be entered at the **maximum eligible rating (445 for 8-ball, 430 for 9-Ball in Coed tournaments; 475 for both formats in Ladies Night tournaments)** and monitored for future eligibility.
- If you have **multiple Fargo accounts**, the **highest rating will be used**. Players rated above >430 in 9-Ball and >445 in 8-Ball are not eligible for Coed tournaments; players rated >475 in either format are not eligible for Ladies Night tournaments — please email [support@fargorate.com](mailto:support@fargorate.com) to merge accounts beforehand.
- DigitalPool syncs with the FargoRate system. Your rating will be available to the tournament director immediately upon your registration (if you have one). If you are in the OPAL APA system, the tournament director may find your profile and convert your rank. Please bring your APA app/account and have it ready at registration if you only have an APA rating and no Fargo.
- All River Tournaments are **reported to FargoRate**. FargoRate estimates 2-3 weeks to process scores and create new player profiles; once processed, you will be able to **claim your profile via the FargoRate mobile app.**.
- All ratings and conversion assignments are subject to review and final approval by the tournament director.
- Your rating at registration on tournament night will decide eligibility and race lengths. DigitalPool syncs with FargoRate and pulls updated ranks in real time.
- **Entry fees must be paid at time of registration. Your spot will not be held without payment.**
- **You do not have a spot in the bracket until your entry fee is paid, your Fargo rating has been verified/assigned, and your match requirements are confirmed.**
- **Any confirmed player who does not show up by the time matches are being assigned may be forfeited and replaced with a Bye.**

</section>

<section id="match-format" class="rules-section" role="region" aria-labelledby="match-format-title">
  <h2 id="match-format-title">Match Format & Races</h2>
  <ul>
    <li>Race lengths vary by format, the number of players, and Fargo gaps. The tournament director may adjust races based on attendance; the items below are general guidelines.</li>
    <li><strong>8-Ball</strong>
      <ul>
        <li>8–12 players: race to 2 on the front, 2 on the back.</li>
        <li>13–16 players: race to 2 on the front, 1 back.</li>
      </ul>
    </li>
    <li><strong>9-Ball</strong>
      <ul>
        <li>8–12 players: race to 3 on the front, 2 on the back.</li>
        <li>13–16 players: race to 2 on both the front and back.</li>
        <li>All formats/tournaments: 100+ FargoRate gap on the front only — the higher-rated player must win 1 extra game. (See <a href="/faq/#faq-ratings">How do player ratings work?</a>)</li>
      </ul>
    </li>
    <li>We follow <a href="#bca-rules">BCA rules</a>.</li>
    <li><strong>Definition: A Bye means an automatic advancement to the next round for a player without an opponent that round.</strong></li>
  </ul>
</section>

<section id="equipment" class="rules-section" role="region" aria-labelledby="equipment-title">
  <h2 id="equipment-title">Equipment & Gameplay</h2>
  <ul>
    <li>Racks are Fargo Reported.</li>
    <li>Lag or Flip, then alternate: Players may lag or flip a coin for the first break. If there's no agreement, lagging is the default. Players alternate breaking; rack your own.</li>
    <li>Racking: Players may use a Magic Rack or Triangle if both agree; if not, the Triangle is the default. The rack must be tight and positioned with the apex ball on the foot spot.</li>
    <li>Timeouts: Timeouts are not allowed during tournament play. Please direct rule questions to the tournament director.</li>
    <li>If you need a shot witnessed, ask anyone not currently playing in a match. If no one is available, ask the tournament director.</li>
  </ul>
</section>

<section id="conduct" class="rules-section" role="region" aria-labelledby="conduct-title">
  <h2 id="conduct-title">Conduct & House Rules</h2>
  <ul>
    <li>1. The tournament director reserves the right to refuse entry to any player, or to immediately remove any player from an ongoing tournament, for any reason. This includes, but is not limited to:
      <ul>
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
      <li>Lag or Flip, then alternate: Players may lag or flip a coin for the first break. If there's no agreement, lagging is the default. Players alternate breaking; rack your own.</li>
      <li>Racking: Balls are racked with the 8-ball in the center of the triangle, a stripe in one back corner, and a solid in the other. Players may use a Magic Rack or Triangle if both agree; if not, the Triangle is the default. The rack must be tight and positioned with the apex ball on the foot spot.</li>
      <li>Legal Break: The cue ball starts behind the head string (2nd diamond, aka the kitchen). A legal break requires that at least four object balls hit a cushion or a ball is pocketed. If this requirement isn't met, it's an illegal break, and the incoming player may accept the table, re-rack and break, or have the original breaker re-break.</li>
      <li>Fouls Before the Rack is Struck: No fouls can be called until the cue ball contacts the rack on the break. (Tournament director may still address etiquette or sportsmanship issues at any time.)</li>
      <li>8 on the break: If the 8-ball is pocketed and no foul occurs, the breaker may spot the 8-ball and continue shooting OR re-rack and break again. If the 8-ball is pocketed and a foul occurs, the incoming player may spot the 8-ball and take ball in hand behind the headstring or re-rack and break again.</li>
      <li>Scratch on the break: If the cue ball is scratched or jumped on a legal break, it's a foul. The incoming player gets ball in hand behind the head string (2nd diamond, aka the kitchen).</li>
      <li>Open Table: On all shots (except the break), the cue ball must first contact a ball of your group, and then either an object ball or the cue ball must contact a rail. Failure to do so is a foul, your opponent gets ball in hand.</li>
      <li>Call Pocket: You must call the ball and intended pocket for each shot (except on the break):
        <ul>
          <li>You do not need to call details like banks, kisses, or caroms, unless the shot is not obvious.</li>
          <li>If it's clear what ball and pocket you're aiming for, no verbal call is required — it's understood.</li>
          <li>If there's any doubt, you must verbally call or point to make your intended ball and pocket clear.</li>
          <li>Any obvious pocketed ball counts as legal; but if a called ball goes into an unintended pocket, the turn ends and the opponent takes over (no foul unless the cue ball is scratched).</li>
        </ul>
      </li>
      <li>Legal Shot: On all shots (except the break), the cue ball must first contact a ball of your group, and then either an object ball or the cue ball must contact a cushion. Failure to do so is a foul; your opponent gets ball in hand.</li>
      <li>Groups: Groups (solids or stripes) are assigned by the first legal shot after the break. If both are made on the break, the table remains open.</li>
      <li>8-Ball Shot: You must clearly call the pocket for the 8-ball. The 8-ball may not be the first ball contacted except on a legal combination. Pocketing the 8-ball in an uncalled pocket, or scratching while pocketing it, results in loss of game.</li>
      <li>Timeouts: Timeouts are not allowed during tournament play. Please direct rule questions to the tournament director.</li>
      <li>General Fouls: All fouls result in ball in hand anywhere on the table (except after the break, when it's behind the head string aka in the kitchen). Fouls include (but are not limited to):
        <ul>
          <li>Failure to contact your object ball first</li>
          <li>Failure to drive any ball to a rail after the cue ball contacts the object ball</li>
          <li>Scratch or cue ball off the table</li>
          <li>Jumping any ball off the table (except 8-ball, which is a loss of game)</li>
        </ul>
      </li>
      <li>Race Guidelines:
        <ul>
          <li>8–12 players: race to 2 on the front, 2 on the back</li>
          <li>13–16 players: race to 1, both sides</li>
          <li>All Tournaments: 100+ Fargo gap, higher player must win +1 game on the front only.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div id="nineBallRules" class="format-rules" style="display:none;">
    <h3>9-Ball</h3>
    <ul>
      <li>Lag or Flip, then alternate: Players may lag or flip a coin for the first break. If there's no agreement, lagging is the default. Players alternate breaking; rack your own.</li>
      <li>Racking: Balls are racked in a diamond shape with the 1-ball at the apex on the foot spot and the 9-ball in the center. All other balls are placed randomly. Players may use a Magic Rack or Triangle if both agree; if not, the Triangle is the default. The rack must be tight.</li>
      <li>Legal Break: The cue ball starts behind the head string (the kitchen). On the break, the cue ball must contact the 1-ball first and either pocket a ball or cause at least four object balls to contact a cushion, or it's a foul. Jumped object balls are not returned to the table.</li>
      <li>9 on the Break: If the 9-ball is pocketed on a legal break, the game is won. If the 9-ball is pocketed on a foul break, it is spotted and the incoming player has ball in hand anywhere on the table.</li>
      <li>Scratch on the Break: If the cue ball is scratched or jumped on the break, it's a foul. The incoming player gets ball in hand anywhere on the table.</li>
      <li>Push-Out Option: If there was no foul on the break, the player taking the first shot after the break may call a push-out. You must declare "push" before the shot, and your opponent must acknowledge. Key points:
        <ul>
          <li>The cue ball does not need to contact the lowest ball or any cushion.</li>
          <li>Any object balls (except the 9-ball) pocketed on a push remain down.</li>
          <li>After the push, the opponent may either shoot from the new position or pass the shot back.</li>
          <li>If a foul occurs on the shot after the push, the opponent receives ball in hand.</li>
        </ul>
      </li>
      <li>Continuing Play: After the break (and any push-out), play continues by always contacting the lowest-numbered ball first. If you pocket any ball legally, you continue shooting. If you foul or fail to pocket a ball legally, your inning ends. The game is won when the 9-ball is legally pocketed on any legal shot.</li>
      <li>Timeouts: Timeouts are not allowed during tournament play. Please direct rule questions to the tournament director.</li>
      <li>Race Guidelines:
        <ul>
          <li>8–12 players: race to 3 on the front, 2 on the back</li>
          <li>13–16 players: race to 2 on both the front and the back</li>
        </ul>
      </li>
    </ul>
  </div>

  <div id="tenBallRules" class="format-rules" style="display:none;">
    <h3>10-Ball</h3>
    <ul>
      <li>Lag or Flip, then alternate: Players may lag or flip a coin for the first break. If there's no agreement, lagging is the default. Players alternate breaking; rack your own.</li>
      <li>Racking: Balls are racked in a triangle with the 1-ball at the apex on the foot spot and the 10-ball in the center. All other balls are placed randomly. Players may use a Magic Rack or Triangle if both agree; if not, the Triangle is the default. The rack must be tight.</li>
      <li>Legal Break: The cue ball starts behind the head string (the kitchen). On the break, the cue ball must contact the 1-ball first and either pocket a ball or cause at least four object balls to contact a cushion, or it's a foul. Jumped object balls (other than the 10-ball) are not returned to the table; if the 10-ball is jumped, it is spotted.</li>
      <li>10 on the Break: If the 10-ball is pocketed on a legal break, it is spotted and play continues. If the 10-ball is pocketed on a foul break, it is also spotted and the incoming player has ball in hand anywhere on the table.</li>
      <li>Scratch on the Break: If the cue ball is scratched or jumped on the break, it's a foul. The incoming player gets ball in hand anywhere on the table.</li>
      <li>Push-Out Option: If there was no foul on the break, the player taking the first shot after the break may call a push-out. You must declare "push" before the shot, and your opponent must acknowledge. Key points:
        <ul>
          <li>The cue ball does not need to contact the lowest-numbered ball or a cushion.</li>
          <li>Any balls (except the 10-ball) pocketed during a push stay down; the 10-ball is spotted.</li>
          <li>After the push, the opponent may shoot from the new position or pass the shot back.</li>
          <li>If a foul occurs on the push, the opponent receives ball in hand.</li>
        </ul>
      </li>
      <li>Continuing Play: After the break (and any push-out), play continues by always contacting the lowest-numbered ball first. You must call every shot. If the called ball is legally pocketed, your inning continues. Balls pocketed incidentally stay down (except the 10-ball, which is spotted if not legally pocketed). The game is won when the 10-ball is legally pocketed on a called shot.</li>
      <li>Illegally Pocketed Balls: A ball is illegally pocketed if it is made in a pocket other than the one called, or if no called ball is made on the shot. The 10-ball is spotted, and all other illegally pocketed balls remain down.</li>
      <li>Opponent's Option: If you illegally pocket a ball, your opponent may:
        <ul>
          <li>Accept the table as it lies, or</li>
          <li>Require you to shoot again from that position.</li>
        </ul>
      </li>
      <li>Three-Foul Rule: A player loses the game after committing three consecutive fouls in the same game.</li>
      <li>Stalemate Rule: If neither player makes progress after three consecutive innings each, the game is replayed with the original breaker breaking again.</li>
      <li>Timeouts: Timeouts are not allowed during tournament play. Please direct rule questions to the tournament director.</li>
    </ul>
  </div>

</section>

<script>
  document.getElementById('formatSelect').addEventListener('change', function () {
    const selected = this.value;
    document.querySelectorAll('.format-rules').forEach(function (div) {
      div.style.display = 'none';
    });
    document.getElementById(selected).style.display = 'block';
  });
</script>
