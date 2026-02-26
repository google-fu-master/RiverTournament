(function () {
  // Helper functions
  function getOrdinalSuffix(n) {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  // Parse event title to extract format and cap info
  function parseEventTitle(title) {
    // Expected formats:
    // "9-Ball | 430 Fargo Cap" → { formatNum: "9", format: "9-Ball", cap: "430", isLadiesNight: false }
    // "8-Ball Ladies Night | 475 Fargo Cap" → { formatNum: "8", format: "8-Ball", cap: "475", isLadiesNight: true }
    
    const isLadiesNight = title.toLowerCase().includes('ladies night');
    let match;
    
    if (isLadiesNight) {
      match = title.match(/(\d+)-Ball\s+Ladies\s+Night\s*\|\s*(\d+)\s*Fargo\s*Cap/i);
    } else {
      match = title.match(/(\d+)-Ball\s*\|\s*(\d+)\s*Fargo\s*Cap/i);
    }
    
    if (match) {
      const formatNum = match[1];
      const cap = match[2];
      return {
        formatNum,
        format: `${formatNum}-Ball`,
        cap,
        isLadiesNight
      };
    }
    return null;
  }

  // Get tournament event for a specific Thursday
  async function getTournamentForDate(targetDate) {
    const API_KEY = "AIzaSyBLNdT-6xsYi3_lzSdEVMM3WSYT-X8PVy8";
    const calendarId = "198eded4195a8995d1a1486ed6a92657a0c76bc9aaf1291c74a4763d1c791f7f@group.calendar.google.com";
    
    // Set time range (start of day to end of day for target Thursday)
    const timeMin = new Date(targetDate);
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date(targetDate);
    timeMax.setHours(23, 59, 59, 999);
    
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}&timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        // Find the tournament event (should be at 6:30pm) or any event if no 6:30pm event
        const tournamentEvent = data.items.find(event => {
          const startTime = new Date(event.start.dateTime || event.start.date);
          return startTime.getHours() === 18 && startTime.getMinutes() === 30;
        }) || data.items[0]; // Fallback to first event
        
        return {
          title: tournamentEvent.summary,
          date: new Date(tournamentEvent.start.dateTime || tournamentEvent.start.date),
          description: tournamentEvent.description || ""
        };
      }
    } catch (error) {
      console.error('Error fetching calendar event:', error);
    }
    
    return null;
  }

  function getTargetThursdayFromPacificNow() {
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const targetThursday = new Date(pacificTime);
    const currentDay = pacificTime.getDay();

    if (currentDay === 5) targetThursday.setDate(pacificTime.getDate() + 6);
    else if (currentDay === 6) targetThursday.setDate(pacificTime.getDate() + 5);
    else if (currentDay === 0) targetThursday.setDate(pacificTime.getDate() + 4);
    else if (currentDay === 1) targetThursday.setDate(pacificTime.getDate() + 3);
    else if (currentDay === 2) targetThursday.setDate(pacificTime.getDate() + 2);
    else if (currentDay === 3) targetThursday.setDate(pacificTime.getDate() + 1);

    return targetThursday;
  }

  // Get next Thursday's tournament from Google Calendar, with holiday handling
  async function getNextTournament() {
    const targetThursday = getTargetThursdayFromPacificNow();
    
    // Get the event for target Thursday
    const thisWeekEvent = await getTournamentForDate(targetThursday);
    
    if (!thisWeekEvent) {
      return null;
    }
    
    // Trigger holiday logic only when title starts with "NO TOURNAMENT"
    const isNoTournament = thisWeekEvent.title.toUpperCase().startsWith('NO TOURNAMENT');
    
    if (isNoTournament) {
      // Get the following Thursday's event
      const followingThursday = new Date(targetThursday);
      followingThursday.setDate(targetThursday.getDate() + 7);
      const nextWeekEvent = await getTournamentForDate(followingThursday);
      
      return {
        noTournamentEvent: thisWeekEvent,
        actualTournament: nextWeekEvent,
        isHolidayWeek: true
      };
    } else {
      return {
        actualTournament: thisWeekEvent,
        isHolidayWeek: false
      };
    }
  }

  // Format date string
  function formatEventDate(date) {
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  }

  // Generate DigitalPool URL
  function generateSignupUrl(formatNum, date, isLadiesNight) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const mmddyyyy = `${month}${day}${year}`;
    
    if (isLadiesNight) {
      return `https://digitalpool.com/tournaments/river-thursday-ladies-night-${formatNum.toLowerCase()}-ball-${mmddyyyy}`;
    } else {
      return `https://digitalpool.com/tournaments/river-thursday-${formatNum.toLowerCase()}-ball-${mmddyyyy}`;
    }
  }

  // Show error when Google Calendar is inaccessible
  function showCalendarError() {
    console.error('Google Calendar API failed - no tournament data available');
    
    // Calculate target Thursday in Pacific time window
    const upcomingThursday = getTargetThursdayFromPacificNow();
    
    // Format the date
    const month = upcomingThursday.toLocaleString("default", { month: "long" }).toUpperCase();
    const day = upcomingThursday.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    
    const errorTitle = `${month} ${day}${ordinalSuffix} THURSDAY TOURNAMENT | Check <a href="/calendar/" style="color: inherit; text-decoration: underline;">Calendar</a> page for Format and Fargo Cap`;
    
    // Update page elements with error message
    const titleEl = document.getElementById("tournament-title");
    if (titleEl) {
      titleEl.innerHTML = errorTitle;
    }
    
    const signupBtnEl = document.getElementById("signup-button");
    if (signupBtnEl) {
      signupBtnEl.innerHTML = `
        <div style="text-align: center; padding: 1rem; background: rgba(255, 107, 107, 0.1); border: 1px solid #ff6b6b; border-radius: 8px; color: #ff6b6b;">
          Sign-up temporarily unavailable - Check Calendar page for details
        </div>
      `;
    }
    
    // Remove nav signup link
    const navSignup = document.getElementById("nav-signup-link");
    if (navSignup) {
      navSignup.removeAttribute("href");
      navSignup.style.pointerEvents = "none";
      navSignup.style.opacity = "0.5";
    }
  }

  // Main function to update tournament info
  async function updateTournamentInfo() {
    const tournamentData = await getNextTournament();
    
    if (!tournamentData) {
      console.warn('No tournament event found in Google Calendar');
      // Show error instead of fallback calculation
      showCalendarError();
      return;
    }
    
    // Handle holiday weeks with "No Tournament" events
    if (tournamentData.isHolidayWeek) {
      const noTournamentEvent = tournamentData.noTournamentEvent;
      const actualEvent = tournamentData.actualTournament;
      
      if (!actualEvent) {
        console.warn('No tournament found for week after holiday');
        showCalendarError();
        return;
      }
      
      const parsedInfo = parseEventTitle(actualEvent.title);
      if (!parsedInfo) {
        console.warn('Could not parse tournament format from next week event title:', actualEvent.title);
        showCalendarError();
        return;
      }
      
      const noTournamentDate = formatEventDate(noTournamentEvent.date);
      const tournamentDate = formatEventDate(actualEvent.date);
      
      // Create holiday message and tournament title using calendar event title verbatim
      const holidayText = `${noTournamentDate} ${noTournamentEvent.title}`;
      const tournamentText = `${tournamentDate} ${actualEvent.title}`;
      
      const signupUrl = generateSignupUrl(parsedInfo.formatNum, actualEvent.date, parsedInfo.isLadiesNight);
      
      // Update page elements with holiday display
      const titleEl = document.getElementById("tournament-title");
      if (titleEl) {
        // Create the two-line display
        titleEl.innerHTML = `
          <div style="margin-bottom: 0.5rem; color: #ff6b6b; font-weight: bold;">${holidayText}</div>
          <div>${tournamentText}</div>
        `;
      }
      
      const signupBtnEl = document.getElementById("signup-button");
      if (signupBtnEl) {
        signupBtnEl.innerHTML = `<a class="btn-signup" href="${signupUrl}" target="_blank">Sign Up Now</a>`;
      }
      
      // Update nav signup link
      const navSignup = document.getElementById("nav-signup-link");
      if (navSignup) {
        navSignup.setAttribute("href", signupUrl);
      }
      
      // Add Ladies Night styling if applicable
      if (parsedInfo.isLadiesNight) {
        document.body.classList.add("ladies");
        const eventBanner = document.getElementById("event-banner");
        if (eventBanner) {
          eventBanner.classList.add("ladies");
        }
        if (titleEl) {
          titleEl.classList.add("ladies");
        }
        const signupBtn = signupBtnEl?.querySelector('.btn-signup');
        if (signupBtn) {
          signupBtn.classList.add("ladies");
        }
        if (navSignup) {
          navSignup.classList.add("ladies");
        }
      }
      
      // Update DigitalPool embed
      updateDigitalPoolEmbed(signupUrl, actualEvent.date, parsedInfo);
      
      // Update JSON-LD structured data for the actual tournament
      updateStructuredData(actualEvent, parsedInfo, tournamentDate);
      
    } else {
      // Normal week - no holiday
      const event = tournamentData.actualTournament;
      const parsedInfo = parseEventTitle(event.title);
      
      if (!parsedInfo) {
        console.warn('Could not parse tournament format from event title:', event.title);
        // Show error instead of fallback calculation
        showCalendarError();
        return;
      }
      
      const formattedDate = formatEventDate(event.date);
      
      // Use calendar event title verbatim after the date
      const titleText = `${formattedDate} ${event.title}`;
      
      const signupUrl = generateSignupUrl(parsedInfo.formatNum, event.date, parsedInfo.isLadiesNight);
      
      // Update page elements
      const titleEl = document.getElementById("tournament-title");
      if (titleEl) {
        titleEl.textContent = titleText;
      }
      
      const signupBtnEl = document.getElementById("signup-button");
      if (signupBtnEl) {
        signupBtnEl.innerHTML = `<a class="btn-signup" href="${signupUrl}" target="_blank">Sign Up Now</a>`;
      }
      
      // Update nav signup link
      const navSignup = document.getElementById("nav-signup-link");
      if (navSignup) {
        navSignup.setAttribute("href", signupUrl);
      }
      
      // Add Ladies Night styling if applicable
      if (parsedInfo.isLadiesNight) {
        document.body.classList.add("ladies");
        const eventBanner = document.getElementById("event-banner");
        if (eventBanner) {
          eventBanner.classList.add("ladies");
        }
        if (titleEl) {
          titleEl.classList.add("ladies");
        }
        const signupBtn = signupBtnEl?.querySelector('.btn-signup');
        if (signupBtn) {
          signupBtn.classList.add("ladies");
        }
        if (navSignup) {
          navSignup.classList.add("ladies");
        }
      }
      
      // Update DigitalPool embed
      updateDigitalPoolEmbed(signupUrl, event.date, parsedInfo);
      
      // Update JSON-LD structured data
      updateStructuredData(event, parsedInfo, formattedDate);
    }
  }

  // Update DigitalPool embed (keeping the existing temporary notice for now)
  function updateDigitalPoolEmbed(signupUrl, date, parsedInfo) {
    const tableDiv = document.getElementById("digitalpool-table");
    if (!tableDiv) return;
    
    while (tableDiv.firstChild) {
      tableDiv.removeChild(tableDiv.firstChild);
    }
    
    // Temporary notice while DigitalPool embed is unavailable
    const noticeDiv = document.createElement("div");
    noticeDiv.className = "digitalpool-notice";
    noticeDiv.style.cssText = `
      background: rgba(0, 32, 48, 0.4);
      border: 1px solid var(--neon-cyan);
      border-radius: 8px;
      padding: 2rem;
      margin: 1.5rem 0;
      text-align: center;
      color: var(--off-white);
      font-size: 1.1rem;
      line-height: 1.5;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;
    noticeDiv.innerHTML = `
      <div style="margin-bottom: 1rem; font-size: 1.2rem; color: var(--neon-cyan);">
        📋 Player List Temporarily Unavailable
      </div>
      <p style="margin: 0; max-width: 500px;">
        The DigitalPool embedded player list feature is currently experiencing technical issues. 
        Please use the <strong>Sign Up Now</strong> button above to visit the tournament page 
        and view this week's player list in real time.
      </p>
      <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
        We'll restore the embedded list once DigitalPool resolves the issue.
      </p>
    `;
    
    tableDiv.appendChild(noticeDiv);
  }

  // Update JSON-LD structured data
  function updateStructuredData(event, parsedInfo, formattedDate) {
    const calendarJsonLdDiv = document.getElementById("calendar-jsonld");
    if (!calendarJsonLdDiv) return;
    
    const existingJsonLd = calendarJsonLdDiv.querySelector(
      'script[type="application/ld+json"].tournament-event'
    );
    if (existingJsonLd) existingJsonLd.remove();
    
    const eventJsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: parsedInfo.isLadiesNight 
        ? `River Tournaments - Ladies Night Tournament (${parsedInfo.format})`
        : `River Tournaments - ${parsedInfo.format} Tournament`,
      startDate: (function () {
        const local = new Date(event.date);
        local.setHours(18, 30, 0, 0);
        const tzOffset = -local.getTimezoneOffset();
        const sign = tzOffset >= 0 ? "+" : "-";
        const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
        const hours = pad(tzOffset / 60);
        const minutes = pad(tzOffset % 60);
        return local.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
      })(),
      endDate: (function () {
        const local = new Date(event.date);
        local.setHours(23, 0, 0, 0);
        const tzOffset = -local.getTimezoneOffset();
        const sign = tzOffset >= 0 ? "+" : "-";
        const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
        const hours = pad(tzOffset / 60);
        const minutes = pad(tzOffset % 60);
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
      description: parsedInfo.isLadiesNight
        ? `Ladies Night! Special event for women pool players. ${parsedInfo.format} pool tournament. Fargo rating cap: ${parsedInfo.cap} and under.`
        : `${parsedInfo.format} pool tournament. Fargo rating cap: ${parsedInfo.cap} and under.`,
      organizer: {
        "@type": "Organization",
        name: "River Tournaments",
        email: "rivertournaments@gmail.com",
      },
    };
    
    const jsonLdScript = document.createElement("script");
    jsonLdScript.type = "application/ld+json";
    jsonLdScript.className = "tournament-event";
    jsonLdScript.textContent = JSON.stringify(eventJsonLd, null, 2);
    calendarJsonLdDiv.appendChild(jsonLdScript);
  }

  // Keep existing calendar card functionality for Calendar.html page
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

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', updateTournamentInfo);
})();
