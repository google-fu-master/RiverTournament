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

  // Determine alternating formats
  // 9-ball: every other week, starting 6/5/2025
  // 8-ball: every other week, starting 6/12/2025
  // Ladies Night: every 3rd Thursday, whatever format falls that week

  // Find number of weeks since 6/5/2025
  const baseDate9 = new Date(2025, 5, 5); // months are 0-based!
  const baseDate8 = new Date(2025, 5, 12);

  function weeksBetween(start, end) {
    const diff = end.getTime() - start.getTime();
    return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
  }

  const weeksSince9 = weeksBetween(baseDate9, upcomingThursday);
  const weeksSince8 = weeksBetween(baseDate8, upcomingThursday);

  let format;
  if (upcomingThursday >= baseDate9 && weeksSince9 % 2 === 0) {
    format = "9-ball";
  } else if (upcomingThursday >= baseDate8 && weeksSince8 % 2 === 0) {
    format = "8-ball";
  } else {
    // fallback (shouldn't occur during event season)
    format = "9-ball";
  }

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
      "name": isLadiesWeek
        ? `River Tournaments - Ladies Night Tournament (${formatLabel})`
        : `River Tournaments - ${formatLabel} Tournament`,
      "startDate": (function() {
        // Set time to 6:30pm local (America/Los_Angeles)
        var local = new Date(upcomingThursday);
        local.setHours(18, 30, 0, 0);
        // Format as ISO string with time zone offset
        // Get timezone offset in minutes and convert to ±HH:MM
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
      "description": isLadiesWeek
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
