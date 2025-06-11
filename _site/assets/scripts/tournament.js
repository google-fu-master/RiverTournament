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

  function getThirdThursday(year, month) {
    let date = new Date(year, month, 1);
    let count = 0;
    while (date.getMonth() === month) {
      if (date.getDay() === 4) {
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
  ladiesWindowStart.setDate(thirdThursday.getDate() - 6);

  // Ensure ladiesWindowStart is Friday (may already be Friday)
  while (ladiesWindowStart.getDay() !== 5) {
    ladiesWindowStart.setDate(ladiesWindowStart.getDate() + 1);
    if (ladiesWindowStart > thirdThursday) break;
  }

  const isLadiesWeek = today >= ladiesWindowStart && today <= thirdThursday;

  const format = (weekNumber % 2 === 1) ? "9-ball" : "8-ball";
  const formatNum = (format === "9-ball") ? "9" : "8";
  const formatLabel = format.replace("-", " ");

  const eventTitle = `${formattedDate} ${formatLabel} Player List`;
  const signupSlug = isLadiesWeek
    ? `river-thursday-ladies-night-${formatNum}-ball-${mmddyyyy}`
    : `river-thursday-${formatNum}-ball-${mmddyyyy}`;

  const signupLink = `https://digitalpool.com/tournaments/${signupSlug}`;
  const tournamentUrl = `${signupLink}/players?navigation=false`;
  const overviewUrl = `${signupLink}/overview?navigation=false`;

  // Set main tournament title
  var titleEl = document.getElementById("tournament-title");
  if (titleEl) {
    titleEl.textContent = eventTitle;
  }

  // Set up the Sign Up button
  var signupBtnHtml = `<a class="btn-signup" href="${overviewUrl}" target="_blank">Sign Up Now</a>`;
  var signupBtnEl = document.getElementById("signup-button");
  if (signupBtnEl) {
    signupBtnEl.innerHTML = signupBtnHtml;
  }

  // Inject the DigitalPool table above the note paragraph
  var tableDiv = document.getElementById('digitalpool-table');
  if (tableDiv) {
    var existingIframe = tableDiv.querySelector('iframe#digitalpool-embed');
    if (existingIframe) existingIframe.remove();

    var iframe = document.createElement('iframe');
    iframe.id = 'digitalpool-embed';
    iframe.src = tournamentUrl;
    iframe.style.width = '100%';
    iframe.style.minHeight = '600px';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.background = '#0D1B2A';
    iframe.style.borderRadius = '8px';
    iframe.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
    tableDiv.appendChild(iframe);
  }

  // Update nav sign up link if present
  var navSignup = document.getElementById("nav-signup-link");
  if (navSignup) {
    navSignup.setAttribute("href", overviewUrl);
  }

  // Add Ladies Night classes for styling only
  if (isLadiesWeek) {
    document.body.classList.add("ladies");
    var eventBanner = document.getElementById("event-banner");
    if (eventBanner) {
      eventBanner.classList.add("ladies");
    }
    if (titleEl) {
      titleEl.classList.add("ladies");
    }
    if (signupBtnEl) {
      signupBtnEl.classList.add("ladies");
    }
    if (navSignup) {
      navSignup.classList.add("ladies");
    }
  }
})();