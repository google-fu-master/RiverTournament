(function () {
  const API_KEY = "AIzaSyBLNdT-6xsYi3_lzSdEVMM3WSYT-X8PVy8";
  const CALENDAR_ID = "198eded4195a8995d1a1486ed6a92657a0c76bc9aaf1291c74a4763d1c791f7f@group.calendar.google.com";
  const TOURNAMENT_DAY = 4; // Thursday (0=Sun,...,4=Thu)

  function getOrdinalSuffix(n) {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }
  function formatLongDate(d) {
    const month = d.toLocaleString("default", { month: "long" });
    const day = d.getDate();
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  }
  function getUpcomingThursday(baseDate = new Date()) {
    const d = new Date(baseDate);
    const daysUntilThu = (TOURNAMENT_DAY - d.getDay() + 7) % 7;
    if (daysUntilThu !== 0) d.setDate(d.getDate() + daysUntilThu);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  function extractFormatFromTitle(title) {
    if (/8[-\s]?ball/i.test(title)) return { format: "8-Ball", formatNum: "8" };
    if (/9[-\s]?ball/i.test(title)) return { format: "9-Ball", formatNum: "9" };
    if (/10[-\s]?ball/i.test(title)) return { format: "10-Ball", formatNum: "10" };
    return { format: "9-Ball", formatNum: "9" }; // Default fallback
  }
  function getPreviousFriday(date) {
    const d = new Date(date);
    const daysSinceFri = (d.getDay() - 5 + 7) % 7;
    d.setDate(d.getDate() - daysSinceFri);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  function isLadiesNightThemeActive(ladiesNightDate) {
    const now = new Date();
    const start = getPreviousFriday(ladiesNightDate);
    const end = new Date(ladiesNightDate);
    end.setHours(23, 59, 59, 999);
    return now >= start && now <= end;
  }
  async function fetchUpcomingEvents() {
    const timeMin = new Date();
    timeMin.setHours(0, 0, 0, 0);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${timeMin.toISOString()}&maxResults=10`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Unable to load tournament events.");
    const data = await res.json();
    return data.items || [];
  }
  function getEventForUpcomingThursday(events, upcomingThursday) {
    for (let ev of events) {
      const evDate = new Date(ev.start.dateTime || ev.start.date);
      if (
        evDate.getFullYear() === upcomingThursday.getFullYear() &&
        evDate.getMonth() === upcomingThursday.getMonth() &&
        evDate.getDate() === upcomingThursday.getDate()
      ) {
        return ev;
      }
    }
    return null;
  }

  (async function () {
    try {
      const events = await fetchUpcomingEvents();
      const upcomingThursday = getUpcomingThursday();
      const thursdayEvent = getEventForUpcomingThursday(events, upcomingThursday);

      // Extract format from the event's title (default to 9-Ball)
      let format = "9-Ball";
      let formatNum = "9";
      if (thursdayEvent && thursdayEvent.summary) {
        const fmtObj = extractFormatFromTitle(thursdayEvent.summary);
        format = fmtObj.format;
        formatNum = fmtObj.formatNum;
      }
      // Detect Ladies Night by event title
      const isLadiesNight = !!(thursdayEvent && /ladies night/i.test(thursdayEvent.summary || ""));
      // Theming for Ladies Night: previous Friday @ midnight through 11:59pm Thursday
      if (isLadiesNight && isLadiesNightThemeActive(upcomingThursday)) {
        document.body.classList.add("ladies");
        var eventBanner = document.getElementById("event-banner");
        if (eventBanner) eventBanner.classList.add("ladies");
        var titleEl = document.getElementById("tournament-title");
        if (titleEl) titleEl.classList.add("ladies");
        var signupBtnEl = document.getElementById("signup-button");
        if (signupBtnEl) signupBtnEl.classList.add("ladies");
        var navSignup = document.getElementById("nav-signup-link");
        if (navSignup) navSignup.classList.add("ladies");
      } else {
        document.body.classList.remove("ladies");
      }

      // Set the tournament title
      const displayTitle = `${formatLongDate(upcomingThursday)} ${format}`;
      const titleEl = document.getElementById("tournament-title");
      if (titleEl) titleEl.textContent = displayTitle;

      // Compose DigitalPool slug
      let signupSlug = isLadiesNight
        ? `river-thursday-ladies-night-${formatNum}-ball-${upcomingThursday.getMonth() + 1}${upcomingThursday.getDate()}${upcomingThursday.getFullYear()}`
        : `river-thursday-${formatNum}-ball-${upcomingThursday.getMonth() + 1}${upcomingThursday.getDate()}${upcomingThursday.getFullYear()}`;
      const overviewUrl = `https://digitalpool.com/tournaments/${signupSlug}/overview?navigation=false`;
      const tournamentUrl = `https://digitalpool.com/tournaments/${signupSlug}/players?navigation=false`;

      // Set up the Sign Up button
      const signupBtnHtml = `<a class="btn-signup" href="${overviewUrl}" target="_blank">Sign Up Now</a>`;
      const signupBtnEl = document.getElementById("signup-button");
      if (signupBtnEl) signupBtnEl.innerHTML = signupBtnHtml;

      // Inject the DigitalPool table above the note paragraph
      const tableDiv = document.getElementById('digitalpool-table');
      if (tableDiv) {
        const existingIframe = tableDiv.querySelector('iframe#digitalpool-embed');
        if (existingIframe) existingIframe.remove();
        const iframe = document.createElement('iframe');
        iframe.id = 'digitalpool-embed';
        iframe.src = tournamentUrl;
        tableDiv.appendChild(iframe);
      }

      // Update nav sign up link if present
      const navSignup = document.getElementById("nav-signup-link");
      if (navSignup) navSignup.setAttribute("href", overviewUrl);

      // --- DYNAMIC JSON-LD STRUCTURED DATA ---
      // Only inject on the Calendar page if #calendar-jsonld exists
      const calendarJsonLdDiv = document.getElementById('calendar-jsonld');
      if (calendarJsonLdDiv) {
        // Remove existing event JSON-LD if present in the calendar container
        const existingJsonLd = calendarJsonLdDiv.querySelector('script[type="application/ld+json"].tournament-event');
        if (existingJsonLd) existingJsonLd.remove();

        // Build the event JSON-LD object
        const eventJsonLd = {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": isLadiesNight
            ? `River Tournaments - Ladies Night Tournament (${format})`
            : `River Tournaments - ${format} Tournament`,
          "startDate": (function () {
            // Set time to 6:30pm local (America/Los_Angeles)
            const local = new Date(upcomingThursday);
            local.setHours(18, 30, 0, 0);
            // Format as ISO string with time zone offset
            const tzOffset = -local.getTimezoneOffset();
            const sign = tzOffset >= 0 ? "+" : "-";
            const pad = n => String(Math.floor(Math.abs(n))).padStart(2, "0");
            const hours = pad(tzOffset / 60);
            const minutes = pad(tzOffset % 60);
            return local.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
          })(),
          "endDate": (function () {
            const local = new Date(upcomingThursday);
            local.setHours(23, 0, 0, 0);
            const tzOffset = -local.getTimezoneOffset();
            const sign = tzOffset >= 0 ? "+" : "-";
            const pad = n => String(Math.floor(Math.abs(n))).padStart(2, "0");
            const hours = pad(tzOffset / 60);
            const minutes = pad(tzOffset % 60);
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
          "description": isLadiesNight
            ? "Ladies Night! Special event for women pool players on the third Thursday of every month. Format alternates with the main schedule."
            : `${format} pool tournament. Every other Thursday at 6:30pm.`,
          "organizer": {
            "@type": "Organization",
            "name": "River Tournaments",
            "email": "rivertournaments@gmail.com"
          }
        };

        // Insert new event JSON-LD into the page inside the marker div
        const jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        jsonLdScript.className = 'tournament-event';
        jsonLdScript.textContent = JSON.stringify(eventJsonLd, null, 2);
        calendarJsonLdDiv.appendChild(jsonLdScript);
      }

    } catch (e) {
      // fallback
      const titleEl = document.getElementById("tournament-title");
      if (titleEl) {
        titleEl.textContent = "This Coming Thursday's Tournament";
      }
    }
  })();
})();