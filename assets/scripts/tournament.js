(function () {
  function getOrdinalSuffix(n) {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Returns true if the date is the 3rd Thursday of its month
  function isThirdThursday(date) {
    let d = new Date(date.getFullYear(), date.getMonth(), 1);
    let thursdays = [];
    while (d.getMonth() === date.getMonth()) {
      if (d.getDay() === 4) {
        // Thursday
        thursdays.push(new Date(d));
      }
      d.setDate(d.getDate() + 1);
    }
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
  function getLadiesNightFormatNumber(
    baseYear,
    baseMonth,
    baseFormat,
    targetYear,
    targetMonth,
  ) {
    let monthsSince = (targetYear - baseYear) * 12 + (targetMonth - baseMonth);
    return (baseFormat + (monthsSince % 2)) % 2;
  }

  // Find the next tournament Thursday from today (or today if today is Thursday)
  const today = new Date();

  let upcomingThursday = new Date(today);
  let daysUntilThursday = (4 - today.getDay() + 7) % 7;
  if (daysUntilThursday !== 0) {
    upcomingThursday.setDate(today.getDate() + daysUntilThursday);
  }

  // Format info
  const day = upcomingThursday.getDate();
  const month = upcomingThursday.toLocaleString("default", { month: "long" });
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
    if (!isThirdThursday(cursor)) {
      if (
        cursor < upcomingThursday ||
        (cursor.getDate() === upcomingThursday.getDate() &&
          cursor.getMonth() === upcomingThursday.getMonth() &&
          cursor.getFullYear() === upcomingThursday.getFullYear())
      ) {
        openCount++;
      }
    }
    cursor.setDate(cursor.getDate() + ((7 - cursor.getDay() + 4) % 7 || 7));
  }

  // openCount includes June 5 as #1. So for June 5, openCount = 1 (odd, 9-ball), June 12 = 2 (even, 8-ball), etc.
  // We'll use (openCount % 2): odd = 9-ball, even = 8-ball

  // For Ladies Night: alternate monthly, starting with 9-ball for June 2025
  let format, formatNum, formatLabel, eventTitle, signupSlug;
  if (ladiesNight) {
    const baseLadiesYear = 2025,
      baseLadiesMonth = 5,
      baseLadiesFormat = 0; // 0=9-ball
    const lnFormat = getLadiesNightFormatNumber(
      baseLadiesYear,
      baseLadiesMonth,
      baseLadiesFormat,
      upcomingThursday.getFullYear(),
      upcomingThursday.getMonth(),
    );
    format = lnFormat === 0 ? "9-ball" : "8-ball";
    formatNum = lnFormat === 0 ? "9" : "8";
    formatLabel = format;
    eventTitle = `${formattedDate} Ladies Night ${formatLabel} Players`;
    signupSlug = `river-thursday-ladies-night-${formatNum}-ball-${mmddyyyy}`;
  } else {
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

  // Try to load DigitalPool content via fetch instead of iframe
  var tableDiv = document.getElementById("digitalpool-table");
  if (tableDiv) {
    while (tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild);
    
    // Show loading state
    tableDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: #778da9;">Loading tournament data...</div>';
    
    // Try to fetch content directly, fallback to link if blocked
    async function loadDigitalPoolContent() {
      try {
        const response = await fetch(tournamentUrl, {
          mode: 'cors',
          credentials: 'omit'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const html = await response.text();
        
        // Parse the HTML and try to extract the player list content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Look for common player list selectors
        const playerContent = doc.querySelector('.players-container, .tournament-players, .player-list, main, .content');
        
        if (playerContent) {
          // Create a container div with DigitalPool styling
          const contentDiv = document.createElement('div');
          contentDiv.className = 'digitalpool-content';
          contentDiv.style.width = '100%';
          contentDiv.style.height = '600px';
          contentDiv.style.overflow = 'auto';
          contentDiv.style.border = '1px solid #333';
          contentDiv.style.background = '#fff';
          contentDiv.innerHTML = playerContent.innerHTML;
          
          tableDiv.innerHTML = '';
          tableDiv.appendChild(contentDiv);
          console.log('Successfully loaded DigitalPool content via fetch');
        } else {
          throw new Error('Could not find player content in response');
        }
        
      } catch (error) {
        console.log('Fetch failed:', error.message, '- showing fallback link');
        showFallbackLink();
      }
    }

    function showFallbackLink() {
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'digitalpool-fallback';
      fallbackDiv.style.textAlign = 'center';
      fallbackDiv.style.padding = '40px 20px';
      fallbackDiv.style.background = '#0d1b2a';
      fallbackDiv.style.border = '2px solid #415a77';
      fallbackDiv.style.borderRadius = '8px';
      fallbackDiv.style.margin = '20px 0';
      
      fallbackDiv.innerHTML = `
        <h3 style="color: #e0e1dd; margin-bottom: 15px;">View Current Tournament Players</h3>
        <p style="color: #778da9; margin-bottom: 20px;">Click below to view the live player list and tournament bracket</p>
        <a href="${tournamentUrl}" target="_blank" rel="noopener" 
           style="display: inline-block; background: #1b263b; color: #e0e1dd; padding: 12px 24px; 
                  text-decoration: none; border-radius: 5px; border: 2px solid #415a77; 
                  transition: all 0.3s ease;"
           onmouseover="this.style.background='#415a77'; this.style.transform='translateY(-2px)';"
           onmouseout="this.style.background='#1b263b'; this.style.transform='translateY(0)';">
          View Players & Bracket
        </a>
      `;
      
      tableDiv.innerHTML = '';
      tableDiv.appendChild(fallbackDiv);
    }
    
    // Attempt to load content via fetch
    loadDigitalPoolContent();
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
  var calendarJsonLdDiv = document.getElementById("calendar-jsonld");
  if (calendarJsonLdDiv) {
    var existingJsonLd = calendarJsonLdDiv.querySelector(
      'script[type="application/ld+json"].tournament-event',
    );
    if (existingJsonLd) existingJsonLd.remove();

    var eventJsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: ladiesNight
        ? `River Tournaments - Ladies Night Tournament (${formatLabel})`
        : `River Tournaments - ${formatLabel} Tournament`,
      startDate: (function () {
        var local = new Date(upcomingThursday);
        local.setHours(18, 30, 0, 0);
        var tzOffset = -local.getTimezoneOffset();
        var sign = tzOffset >= 0 ? "+" : "-";
        var pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
        var hours = pad(tzOffset / 60);
        var minutes = pad(tzOffset % 60);
        return local.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
      })(),
      endDate: (function () {
        var local = new Date(upcomingThursday);
        local.setHours(23, 0, 0, 0);
        var tzOffset = -local.getTimezoneOffset();
        var sign = tzOffset >= 0 ? "+" : "-";
        var pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
        var hours = pad(tzOffset / 60);
        var minutes = pad(tzOffset % 60);
        return local.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
      })(),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "River Tournaments Venue",
        address: {
          "@type": "PostalAddress",
          streetAddress: "19 NW 5th Ave",
          addressLocality: "Portland",
          addressRegion: "OR",
          postalCode: "97209",
          addressCountry: "US",
        },
      },
      image: ["https://rivertournaments.com/assets/og-image.png"],
      description: ladiesNight
        ? "Ladies Night! Special event for women pool players on the third Thursday of every month. Format alternates with the main schedule."
        : `${formatLabel} pool tournament. Every other Thursday at 6:30pm.`,
      organizer: {
        "@type": "Organization",
        name: "River Tournaments",
        email: "rivertournaments@gmail.com",
      },
    };

    var jsonLdScript = document.createElement("script");
    jsonLdScript.type = "application/ld+json";
    jsonLdScript.className = "tournament-event";
    jsonLdScript.textContent = JSON.stringify(eventJsonLd, null, 2);
    calendarJsonLdDiv.appendChild(jsonLdScript);
  }

  // --- NEW: Desktop/mobile event card grid & minimal info ---
  // This part is for the Calendar.html page ONLY
  if (document.getElementById("upcoming-tournament-cards")) {
    function getMaxResults() {
      return window.innerWidth < 900 ? 2 : 4;
    }

    function formatDate(start) {
      const date = new Date(start.dateTime || start.date);
      const options = { weekday: "short", month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }

    function createTournamentCard(event, mobile) {
      const dateStr = formatDate(event.start);
      const summary = event.summary || "Tournament";
      const eventLink = event.htmlLink
        ? `<a class="tournament-card-link" href="${event.htmlLink}" target="_blank" rel="noopener" title="View in Google Calendar">Add to Calendar</a>`
        : "";
      if (mobile) {
        // Mobile: date, format, Add to Calendar only
        return `
          <div class="tournament-card mobile">
            <div class="tournament-card-date flyer-gold">${dateStr}</div>
            <div class="tournament-card-title flyer-caps">${summary}</div>
            ${eventLink}
          </div>
        `;
      } else {
        // Desktop: full card
        const description = event.description || "";
        const truncated =
          description.length > 80
            ? description.substring(0, 80) + "..."
            : description;
        const hasMore = description.length > 80;
        return `
          <div class="tournament-card desktop">
            <div class="tournament-card-date flyer-gold">${dateStr}</div>
            <div class="tournament-card-title flyer-caps">${summary}</div>
            <div class="tournament-card-desc flyer-detail">
              ${
                hasMore
                  ? `
                <span class="tournament-card-short">${truncated} <button class="tournament-card-toggle">Details</button></span>
                <span class="tournament-card-full" style="display:none;">${description} <button class="tournament-card-toggle">Less</button></span>
              `
                  : description
              }
            </div>
            ${eventLink}
          </div>
        `;
      }
    }

    function renderCards(data) {
      const container = document.getElementById("upcoming-tournament-cards");
      const mobile = window.innerWidth < 900;
      container.innerHTML = "";
      if (!data.items || data.items.length === 0) {
        container.innerHTML =
          '<div class="tournament-card no-events">No upcoming tournaments found.</div>';
        return;
      }
      data.items.forEach((event) => {
        container.innerHTML += createTournamentCard(event, mobile);
      });
      if (!mobile) {
        container.classList.add("tournament-cards-grid");
      } else {
        container.classList.remove("tournament-cards-grid");
      }

      // Add toggle logic for details (desktop only)
      if (!mobile) {
        Array.from(container.querySelectorAll(".tournament-card")).forEach(
          (card) => {
            card.addEventListener("click", function (e) {
              if (e.target.classList.contains("tournament-card-toggle")) {
                e.preventDefault();
                const shortDesc = card.querySelector(".tournament-card-short");
                const fullDesc = card.querySelector(".tournament-card-full");
                if (shortDesc && fullDesc) {
                  if (shortDesc.style.display !== "none") {
                    shortDesc.style.display = "none";
                    fullDesc.style.display = "";
                  } else {
                    shortDesc.style.display = "";
                    fullDesc.style.display = "none";
                  }
                }
              }
            });
          },
        );
      }
    }

    function fetchAndRenderEvents() {
      const API_KEY = "AIzaSyBLNdT-6xsYi3_lzSdEVMM3WSYT-X8PVy8";
      const calendarId =
        "198eded4195a8995d1a1486ed6a92657a0c76bc9aaf1291c74a4763d1c791f7f@group.calendar.google.com";
      const maxResults = getMaxResults();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&maxResults=${maxResults}`;
      document.getElementById("upcoming-tournament-cards").innerHTML =
        '<div class="tournament-card loading">Loading tournaments...</div>';
      fetch(url)
        .then((res) => res.json())
        .then(renderCards)
        .catch(() => {
          document.getElementById("upcoming-tournament-cards").innerHTML =
            '<div class="tournament-card error">Unable to load tournaments.</div>';
        });
    }

    window.addEventListener("resize", fetchAndRenderEvents);
    window.addEventListener("DOMContentLoaded", fetchAndRenderEvents);
  }
})();
