(function () {
  // ===== CONFIG =====
  const API_KEY = "AIzaSyBLNdT-6xsYi3_lzSdEVMM3WSYT-X8PVy8";
  const CALENDAR_ID = "198eded4195a8995d1a1486ed6a92657a0c76bc9aaf1291c74a4763d1c791f7f@group.calendar.google.com";
  const TOURNAMENT_DAY = 4; // Thursday (0=Sun,...,4=Thu)
  const LADIES_NIGHT_KEYWORD = /ladies night/i;

  // ===== HELPERS =====
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
  function extractFormatFromTitle(title) {
    if (/8[-\s]?ball/i.test(title)) return { format: "8-ball", formatNum: "8" };
    if (/9[-\s]?ball/i.test(title)) return { format: "9-ball", formatNum: "9" };
    if (/10[-\s]?ball/i.test(title)) return { format: "10-ball", formatNum: "10" };
    return { format: "9-ball", formatNum: "9" }; // Default fallback
  }

  // ===== MAIN LOGIC =====
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
  function setTheme(isLadiesNight) {
    document.body.classList.remove("ladies");
    if (isLadiesNight) document.body.classList.add("ladies");
  }
  function updateTournamentDisplay(event, tournamentDate) {
    const eventTitle = (event && event.summary) || `${formatLongDate(tournamentDate)} Tournament`;
    const titleEl = document.getElementById("tournament-title");
    if (titleEl) titleEl.textContent = eventTitle;

    // Format slug based on event title contents
    const { format, formatNum } = extractFormatFromTitle(eventTitle);
    let signupSlug = "unknown";
    if (LADIES_NIGHT_KEYWORD.test(eventTitle)) {
      signupSlug = `river-thursday-ladies-night-${formatNum}-ball-${tournamentDate.getMonth() + 1}${tournamentDate.getDate()}${tournamentDate.getFullYear()}`;
    } else {
      signupSlug = `river-thursday-${formatNum}-ball-${tournamentDate.getMonth() + 1}${tournamentDate.getDate()}${tournamentDate.getFullYear()}`;
    }
    const overviewUrl = `https://digitalpool.com/tournaments/${signupSlug}/overview?navigation=false`;
    const tournamentUrl = `https://digitalpool.com/tournaments/${signupSlug}/players?navigation=false`;

    // Update signup button
    const signupBtnHtml = `<a class="btn-signup" href="${overviewUrl}" target="_blank">Sign Up Now</a>`;
    const signupBtnEl = document.getElementById("signup-button");
    if (signupBtnEl) signupBtnEl.innerHTML = signupBtnHtml;

    // Inject DigitalPool table
    const tableDiv = document.getElementById("digitalpool-table");
    if (tableDiv) {
      let existingIframe = tableDiv.querySelector("iframe#digitalpool-embed");
      if (existingIframe) existingIframe.remove();
      const iframe = document.createElement("iframe");
      iframe.id = "digitalpool-embed";
      iframe.src = tournamentUrl;
      tableDiv.appendChild(iframe);
    }

    // Update nav sign up link if present
    const navSignup = document.getElementById("nav-signup-link");
    if (navSignup) navSignup.setAttribute("href", overviewUrl);
  }

  // ===== INIT =====
  (async function () {
    try {
      const events = await fetchUpcomingEvents();
      const upcomingThursday = getUpcomingThursday();
      const thursdayEvent = getEventForUpcomingThursday(events, upcomingThursday);

      // Detect Ladies Night and theming
      let isLadiesNight = false;
      if (
        thursdayEvent &&
        LADIES_NIGHT_KEYWORD.test(thursdayEvent.summary || "")
      ) {
        if (isLadiesNightThemeActive(upcomingThursday)) isLadiesNight = true;
      }
      setTheme(isLadiesNight);

      // Display tournament info for index page
      updateTournamentDisplay(thursdayEvent, upcomingThursday);
    } catch (e) {
      // fallback logic
      const titleEl = document.getElementById("tournament-title");
      if (titleEl) {
        titleEl.textContent = "This Coming Thursday's Tournament";
      }
    }
  })();
})();