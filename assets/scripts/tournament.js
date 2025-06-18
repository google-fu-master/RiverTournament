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

  // Returns true if the date is the 3rd Thursday of its month
  function isThirdThursday(date) {
    // Get the 3rd Thursday of this month
    let d = new Date(date.getFullYear(), date.getMonth(), 1);
    let thursdays = [];
    while (d.getMonth() === date.getMonth()) {
      if (d.getDay() === 4) { // Thursday
        thursdays.push(new Date(d));
      }
      d.setDate(d.getDate() + 1);
    }
    // Compare only the date part (ignore time)
    return date.getDate() === thursdays[2].getDate();
  }

  // Get the 3rd Thursday date of a given year/month
  function getThirdThursday(year, month) {
    let d = new Date(year, month, 1);
    let thursdays = [];
    while (d.getMonth() === month) {
      if (d.getDay() === 4) {
        thursdays.push(new Date(d));
      }
      d.setDate(d.getDate() + 1);
    }
    return thursdays[2];
  }

  // For Ladies Night: returns 0 if starting month (June 2025) is 9-ball, then alternates monthly
  function getLadiesNightFormatNumber(baseYear, baseMonth, baseFormat, targetYear, targetMonth) {
    // baseFormat: 0 = 9-ball, 1 = 8-ball
    let monthsSince = (targetYear - baseYear) * 12 + (targetMonth - baseMonth);
    return (baseFormat + (monthsSince % 2)) % 2;
  }

  // Find the next tournament Thursday from today (or today if today is Thursday)
  const today = new Date();

  // Find the closest Thursday >= today
  let upcomingThursday = new Date(today);
  let daysUntilThursday = (4 - today.getDay() + 7) % 7;
  if (daysUntilThursday !== 0) {
    upcomingThursday.setDate(today.getDate() + daysUntilThursday);
  }

  // Format info
  const day = upcomingThursday.getDate();
  const month = upcomingThursday.toLocaleString('default', { month: 'long' });
  const monthNum = upcomingThursday.getMonth() + 1;
  const year = upcomingThursday.getFullYear();

  const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}`;
  const mmddyyyy = `${monthNum}${day}${year}`;

  // 1. Check if this is Ladies Night (3rd Thursday)
  const ladiesNight = isThirdThursday(upcomingThursday);

  // 2. If not Ladies Night, count the number of open (non-Ladies) Thursdays since June 5, 2025 (inclusive)
  // June 5, 2025 is the base, and is a 9-ball open event
  const baseOpen = new Date(2025, 5, 5); // June 5, 2025 (months are 0-indexed)
  let openCount = 0;
  let cursor = new Date(baseOpen);

  while (
    cursor < upcomingThursday ||
    (cursor.getDate() === upcomingThursday.getDate() &&
     cursor.getMonth() === upcomingThursday.getMonth() &&
     cursor.getFullYear() === upcomingThursday.getFullYear())
  ) {
    // If not Ladies Night, count it
    if (!isThirdThursday(cursor)) {
      // Only count if before or equal to upcomingThursday
      if (
        cursor < upcomingThursday ||
        (cursor.getDate() === upcomingThursday.getDate() &&
         cursor.getMonth() === upcomingThursday.getMonth() &&
         cursor.getFullYear() === upcomingThursday.getFullYear())
      ) {
        openCount++;
      }
    }
    // Move cursor to next Thursday
    cursor.setDate(cursor.getDate() + ((7 - cursor.getDay() + 4) % 7 || 7));
  }

  // openCount includes June 5 as #1. So for June 5, openCount = 1 (odd, 9-ball), June 12 = 2 (even, 8-ball), etc.
  // We'll use (openCount % 2): odd = 9-ball, even = 8-ball

  // For Ladies Night: alternate monthly, starting with 9-ball for June 2025
  let format, formatNum, formatLabel, eventTitle, signupSlug;
  if (ladiesNight) {
    // Figure out if this month is 9-ball or 8-ball for Ladies Night
    // June 2025 (month 5) = 9-ball, July 2025 (6) = 8-ball, August 2025 = 9-ball, etc.
    const baseLadiesYear = 2025, baseLadiesMonth = 5, baseLadiesFormat = 0; // 0=9-ball
    const lnFormat = getLadiesNightFormatNumber(
      baseLadiesYear,
      baseLadiesMonth,
      baseLadiesFormat,
      upcomingThursday.getFullYear(),
      upcomingThursday.getMonth()
    );
    format = lnFormat === 0 ? "9-ball" : "8-ball";
    formatNum = lnFormat === 0 ? "9" : "8";
    formatLabel = format;
    eventTitle = `${formattedDate} Ladies Night ${formatLabel} Players`;
    signupSlug = `river-thursday-ladies-night-${formatNum}-ball-${mmddyyyy}`;
  } else {
    // openCount: 1 = June 5, 2 = June 12, etc.
    // Odd = 9-ball, Even = 8-ball
    if (openCount % 2 === 1) {
      format = "9-ball";
      formatNum = "9";
    } else {
      format = "8-ball";
      formatNum = "8";
    }
    formatLabel = format;
    eventTitle = `${formattedDate} ${formatLabel} Players`;
    signupSlug = `river-thursday-${formatNum}-ball-${mmddyyyy}`;
  }

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
    tableDiv.appendChild(iframe);
  }

  // Update nav sign up link if present
  var navSignup = document.getElementById("nav-signup-link");
  if (navSignup) {
    navSignup.setAttribute("href", overviewUrl);
  }

  // Add Ladies Night classes for styling only
  if (ladiesNight) {
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

  // --- DYNAMIC JSON-LD STRUCTURED DATA ---
  // Only inject on the Calendar page if #calendar-jsonld exists
  var calendarJsonLdDiv = document.getElementById('calendar-jsonld');
  if (calendarJsonLdDiv) {
    // Remove existing event JSON-LD if present in the calendar container
    var existingJsonLd = calendarJsonLdDiv.querySelector('script[type="application/ld+json"].tournament-event');
    if (existingJsonLd) existingJsonLd.remove();

    // Build the event JSON-LD object
    var eventJsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": ladiesNight
        ? `River Tournaments - Ladies Night Tournament (${formatLabel})`
        : `River Tournaments - ${formatLabel} Tournament`,
      "startDate": (function() {
        // Set time to 6:30pm local (America/Los_Angeles)
        var local = new Date(upcomingThursday);
        local.setHours(18, 30, 0, 0);
        // Format as ISO string with time zone offset
        var tzOffset = -local.getTimezoneOffset();
        var sign = tzOffset >= 0 ? "+" : "-";
        var pad = n => String(Math.floor(Math.abs(n))).padStart(2, "0");
        var hours = pad(tzOffset / 60);
        var minutes = pad(tzOffset % 60);
        return local.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
      })(),
      "endDate": (function() {
        var local = new Date(upcomingThursday);
        local.setHours(23, 0, 0, 0);
        var tzOffset = -local.getTimezoneOffset();
        var sign = tzOffset >= 0 ? "+" : "-";
        var pad = n => String(Math.floor(Math.abs(n))).padStart(2, "0");
        var hours = pad(tzOffset / 60);
        var minutes = pad(tzOffset % 60);
        return local.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
      })(),
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "River Tournaments Venue",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "19 NW 5th Ave",
          "addressLocality": "Portland",
          "addressRegion": "OR",
          "postalCode": "97209",
          "addressCountry": "US"
        }
      },
      "image": [
        "https://rivertournaments.com/assets/og-image.png"
      ],
      "description": ladiesNight
        ? "Ladies Night! Special event for women pool players on the third Thursday of every month. Format alternates with the main schedule."
        : `${formatLabel} pool tournament. Every other Thursday at 6:30pm.`,
      "organizer": {
        "@type": "Organization",
        "name": "River Tournaments",
        "email": "rivertournaments@gmail.com"
      }
    };

    // Insert new event JSON-LD into the page inside the marker div
    var jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.className = 'tournament-event';
    jsonLdScript.textContent = JSON.stringify(eventJsonLd, null, 2);
    calendarJsonLdDiv.appendChild(jsonLdScript);
  }
})();
