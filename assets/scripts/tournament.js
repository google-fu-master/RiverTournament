(function() {
  function getOrdinalSuffix(n) {
    if (n >= 11 && n <= 13) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const today = new Date();
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
  const isLadiesNight = weekNumber === 3;
  const format = (weekNumber % 2 === 1) ? "9-ball" : "8-ball";
  const formatNum = (format === "9-ball") ? "9" : "8";
  const formatLabel = format.replace("-", " ");

  const eventTitle = `${formattedDate} ${formatLabel} Player List`;
  const signupSlug = isLadiesNight
    ? `river-thursday-ladies-night-${formatNum}-ball-${mmddyyyy}`
    : `river-thursday-${formatNum}-ball-${mmddyyyy}`;

  const signupLink = `https://digitalpool.com/tournaments/${signupSlug}`;
  const tournamentUrl = `${signupLink}/players?navigation=false`;
  const tournamentName = `River Thursday ${isLadiesNight ? "Ladies Night " : ""}${formatLabel} ${mdyyyyDisplay}`;

  // Set the main tournament title
  var titleEl = document.getElementById("tournament-title");
  if (titleEl) {
    titleEl.textContent = eventTitle;
  }

  // Inject the styled Sign Up button
  var signupBtnHtml = `<a class="btn-signup" href="${signupLink}" target="_blank">Sign Up Now</a>`;
  var signupBtnEl = document.getElementById("signup-button");
  if (signupBtnEl) {
    signupBtnEl.innerHTML = signupBtnHtml;
  }

  // Inject the digitalpool iframe
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

  // Add Ladies Night banner class if appropriate
  if (isLadiesNight) {
    var eventBanner = document.getElementById("event-banner");
    if (eventBanner) {
      eventBanner.classList.add("ladies");
    }
  }
})();