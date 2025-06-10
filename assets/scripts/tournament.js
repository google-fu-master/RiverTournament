(function() {
  // --- CONFIGURABLE FLYER-STYLE FORMATTING ---
  function getOrdinalSuffix(n) {
    if (n >= 11 && n <= 13) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  function getThirdThursday(year, month) {
    // month is 0-indexed
    let date = new Date(year, month, 1);
    let count = 0;
    while (date.getMonth() === month) {
      if (date.getDay() === 4) { // Thursday
        count++;
        if (count === 3) return new Date(date);
      }
      date.setDate(date.getDate() + 1);
    }
  }

  const today = new Date();

  // Find the upcoming Thursday from today
  const isAfterThursday = today.getDay() > 4 || (today.getDay() === 5 && today.getHours() === 0);
  let upcomingThursday = new Date(today);

  if (isAfterThursday) {
    const daysUntilNextThursday = (11 - today.getDay()) % 7;
    upcomingThursday.setDate(today.getDate() + daysUntilNextThursday);
  } else {
    const daysUntilThisThursday = (4 - today.getDay() + 7) % 7;
    upcomingThursday.setDate(today.getDate() + daysUntilThisThursday);
  }

  const day = upcomingThursday.getDate();
  const month = upcomingThursday.toLocaleString('default', { month: 'long' });
  const monthNum = upcomingThursday.getMonth() + 1;
  const year = upcomingThursday.getFullYear();

  const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}`;
  const mmddyyyy = `${monthNum}${day}${year}`;
  const mdyyyyDisplay = `${monthNum}/${day}/${year}`;

  const weekNumber = Math.floor((upcomingThursday.getDate() - 1) / 7) + 1;

  // LADIES NIGHT WINDOW: from the Friday before 3rd Thursday through 3rd Thursday (inclusive)
  const thirdThursday = getThirdThursday(upcomingThursday.getFullYear(), upcomingThursday.getMonth());
  const ladiesWindowStart = new Date(thirdThursday);
  ladiesWindowStart.setDate(thirdThursday.getDate() - 6); // at most previous Friday

  // Ensure ladiesWindowStart is Friday (may already be Friday)
  while (ladiesWindowStart.getDay() !== 5) {
    ladiesWindowStart.setDate(ladiesWindowStart.getDate() + 1);
    if (ladiesWindowStart > thirdThursday) break; // safety
  }

  // If today is between ladiesWindowStart and thirdThursday (inclusive), it's Ladies Night week!
  const isLadiesWeek = today >= ladiesWindowStart && today <= thirdThursday;

  // Determine flyer-inspired format (alternates weekly)
  const format = (weekNumber % 2 === 1) ? "9-ball" : "8-ball";
  const formatNum = (format === "9-ball") ? "9" : "8";
  const formatLabel = format.replace("-", " ");

  // --- Flyer details for the event info section ---
  const eventTitle = `${formattedDate} ${formatLabel} Player List`;
  const signupSlug = isLadiesWeek
    ? `river-thursday-ladies-night-${formatNum}-ball-${mmddyyyy}`
    : `river-thursday-${formatNum}-ball-${mmddyyyy}`;

  const signupLink = `https://digitalpool.com/tournaments/${signupSlug}`;
  const tournamentUrl = `${signupLink}/players?navigation=false`;
  const tournamentName = `River Thursday ${isLadiesWeek ? "Ladies Night " : ""}${formatLabel} ${mdyyyyDisplay}`;

  // Set the main tournament title
  var titleEl = document.getElementById("tournament-title");
  if (titleEl) {
    titleEl.textContent = eventTitle;
  }

  // Flyer-style event info section (for #event-info, inside .event-banner)
  var eventInfo = document.getElementById("event-info");
  if (eventInfo) {
    eventInfo.innerHTML = `
      <div class="flyer-detail">
        <span>Every Thursday</span>
        <span class="flyer-bullet">&bull;</span>
        <span>6:30PM Registration</span>
        <span class="flyer-bullet">&bull;</span>
        <span>7PM Start</span>
      </div>
      <div class="flyer-detail flyer-green">8-Ball / 9-Ball Alternates Weekly</div>
      <div class="flyer-detail flyer-pink">Ladies Night — 3rd Thursday</div>
      <div class="flyer-section flyer-gold" style="margin-top:1rem;">
        $15 Cash Entry <span class="flyer-bullet">&bull;</span>
        16-Player Cap <span class="flyer-bullet">&bull;</span>
        Walk-ins Welcome <span class="flyer-bullet">&bull;</span>
        Sign-up Recommended
      </div>
      <div class="flyer-detail" style="margin-top:1rem;">
        <span class="flyer-caps">FARGORATE CAPS: 445 in 8, 430 in 9*</span>
      </div>
      <div class="flyer-detail" style="margin-top:0.5rem;">
        Spots are limited, Sign up now!
      </div>
    `;
  }

  // Inject the styled Sign Up button
  var signupBtnHtml = `<a class="btn-signup" href="${signupLink}" target="_blank">Sign Up Now</a>`;
  var signupBtnEl = document.getElementById("signup-button");
  if (signupBtnEl) {
    signupBtnEl.innerHTML = signupBtnHtml;
  }

  // Inject the digitalpool iframe (if brackets container exists)
  var bracketsContainer = document.getElementById("brackets-container");
  if (bracketsContainer) {
    var iframe = document.createElement('iframe');
    iframe.src = tournamentUrl;
    iframe.style.border = 'none';
    iframe.width = '100%';
    iframe.height = '600';
    bracketsContainer.appendChild(iframe);
  }

  // Update nav sign up link if present
  var navSignup = document.getElementById("nav-signup-link");
  if (navSignup) {
    navSignup.setAttribute("href", signupLink);
  }

  // Add Ladies Night banner class and body class for full-theme styling
  if (isLadiesWeek) {
    document.body.classList.add("ladies");
    var eventBanner = document.getElementById("event-banner");
    if (eventBanner) {
      eventBanner.classList.add("ladies");
    }
    if (titleEl) {
      titleEl.classList.add("ladies");
    }
  }
})();