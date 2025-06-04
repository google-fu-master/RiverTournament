---
layout: default
title: Tournament Rules
permalink: /rules/
---

<!--this is the rule.md file-->

<input type="text" id="search" placeholder="Search rules...">

<section id="player-eligibility">
  <h2>Player Eligibility & Registration</h2>
  <ul class="pool-ball-list">
    <li class="numbered-1">Players with Fargo ratings of 445 and below are welcome in our 8, 9, and 10-ball tournaments.</li>
    <li>You’ll need to show a Fargo account and a photo ID at registration.</li>
    <li>First-timers can create a Fargo account using the mobile app (links coming soon in the FAQ).</li>
    <li>If you have more than one Fargo account, we’ll use the highest rating. If it’s over 445, you won’t be eligible—please get your accounts merged ahead of time.</li>
    <li>A screenshot of your Fargo rating can be uploaded in the Sign Up sheet, but your rating will be confirmed live in the Fargo app at registration.</li>
    <li>Entry fees must be paid at time of registration.</li>
    <li>If a player has an APA rating but no Fargo rating, their Fargo rating for the tournament will be determined using a conversion formula.</li>
    <li>If a player has no APA rating and no Fargo rating, they will be entered into the tournament at the highest eligible rating (445) and their Fargo account and performance will be monitored for eligibility if they return to future tournaments.</li>
    <li>All ratings and conversion assignments are subject to review and final approval by the tournament director.</li>
    <li><strong>Your rating at registration on tournament night will decide eligibility and race lengths.</strong></li>
    <li><strong>You do not have a spot in the bracket until your fee is paid, your Fargo rating has been verified, and your match requirements are confirmed.</strong></li>
  </ul>
</section>

<section id="match-format">
  <h2>Match Format & Races</h2>
  <ul class="pool-ball-list">
    <li class="numbered-1">8–12 players: race to 3 wins.</li>
    <li>13–16 players: race to 2 wins.</li>
    <li>If there’s a 75+ Fargo gap, the higher-rated player has to win 1 extra game.</li>
    <li>We follow <a href="#bca-modified-rules">modified BCA rules</a>; adjustments may be made at the tournament director’s discretion to encourage fair gameplay at any time.</li>
  </ul>
</section>

<section id="equipment">
  <h2>Equipment & Gameplay</h2>
  <ul class="pool-ball-list">
    <li class="numbered-1">Racks are Fargo Reported.</li>
    <li>Players lag or flip a coin for the first break, then alternate breaks. If there’s no agreement, lagging is the default.</li>
    <li>Magic Racks are fine if both players agree; otherwise, triangle by default.</li>
    <li>Jump shots are not allowed at River, and performing jump shots may result in being banned from future River Tournaments.</li>
    <li>No timeouts. If you’re unsure about a rule, ask the tournament director.</li>
    <li>If you need a shot watched, ask the tournament director.</li>
  </ul>
</section>

<section id="conduct">
  <h2>Conduct & House Rules</h2>
  <ul class="pool-ball-list">
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
    <li>No drinks on or near pool tables. Spills or damage will result in permanent disqualification from the River tournament (not the bar itself).</li>
    <li>House contributions to the pot aren’t guaranteed.</li>
    <li>Entry fees are cash only and may change.</li>
    <li><strong>The tournament director has the final say on all tournament matters.</strong></li>
    <li><strong>Remember to tip your bartenders!</strong></li>
  </ul>
</section>

<section id="bca-modified-rules">
  <h2>BCA Modified Rules</h2>

  <!-- (Rules unchanged for brevity) -->
</section>

<!-- Floating Back to Top button -->
<a href="#top" class="back-to-top" aria-label="Back to Top">
  <img src="{{ '/assets/images/appbuttons/backtotop.png' | relative_url }}" alt="Back to Top">
</a>

<style>
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: block;
  }
  .back-to-top img {
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
  }
  mark {
    background-color: yellow;
    color: black;
  }
</style>

<script>
  // Smooth scrolling
  document.documentElement.style.scrollBehavior = "smooth";

  const searchBox = document.getElementById('search');
  searchBox.addEventListener('input', function() {
    const term = searchBox.value.toLowerCase().trim();
    document.querySelectorAll('section').forEach(section => {
      // Remove previous highlights
      section.innerHTML = section.innerHTML.replace(/<mark>(.*?)<\/mark>/g, '$1');

      // Check if section text includes term
      const text = section.textContent.toLowerCase();
      if (term && text.includes(term)) {
        section.style.display = 'block';

        // Highlight matches
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        section.innerHTML = section.innerHTML.replace(regex, '<mark>$1</mark>');
      } else if (!term) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });

  // Back to Top click behavior
  document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
</script>
