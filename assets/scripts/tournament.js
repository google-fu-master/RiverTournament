(function() {
  // Helper: Find the next Thursday (including today if Thursday)
  function getUpcomingThursday(date) {
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var dayOfWeek = d.getDay();
    var daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    if (daysUntilThursday === 0) daysUntilThursday = 7; // always move forward
    d.setDate(d.getDate() + daysUntilThursday);
    return d;
  }

  // Helper: Find previous Friday before a given Thursday
  function getPreviousFriday(thursdayDate) {
    var d = new Date(thursdayDate);
    d.setDate(d.getDate() - ((d.getDay() + 2) % 7));
    return d;
  }

  // Helper: Get the 3rd Thursday of a given month/year
  function getThirdThursday(year, month) {
    var d = new Date(year, month, 1);
    var thursdayCount = 0;
    while (d.getMonth() === month) {
      if (d.getDay() === 4) { // Thursday
        thursdayCount++;
        if (thursdayCount === 3) return new Date(d);
      }
      d.setDate(d.getDate() + 1);
    }
    return null;
  }

  // Today's date at midnight
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Find this week's Thursday
  var thursday = getUpcomingThursday(today);

  // The window opens at 12:00am Friday before that Thursday
  var fridayBefore = getPreviousFriday(thursday);

  var windowStart = new Date(fridayBefore.getFullYear(), fridayBefore.getMonth(), fridayBefore.getDate(), 0, 0, 0);
  var windowEnd = new Date(thursday.getFullYear(), thursday.getMonth(), thursday.getDate(), 23, 59, 59);

  var useThisThursday = (now >= windowStart && now <= windowEnd);
  if (!useThisThursday) {
    thursday.setDate(thursday.getDate() + 7);
  }

  // Is this Thursday the 3rd Thursday?
  var isLadiesNight = false;
  var thirdThursday = getThirdThursday(thursday.getFullYear(), thursday.getMonth());
  if (
    thursday.getFullYear() === thirdThursday.getFullYear() &&
    thursday.getMonth() === thirdThursday.getMonth() &&
    thursday.getDate() === thirdThursday.getDate()
  ) {
    isLadiesNight = true;
  }

  // Alternates weekly, starting with 9-ball on Jan 4, 2024
  var reference = new Date(2024, 0, 4); // Jan 4, 2024 (Thursday, 9-ball)
  var weeksElapsed = Math.round((thursday - reference) / (7 * 24 * 60 * 60 * 1000));
  var formatNum = (weeksElapsed % 2 === 0) ? "9" : "8";
  var formatLabel = (formatNum === "9") ? "9-ball" : "8-ball";

  // Get mdyyyy string for this Thursday
  var mdyyyy = (thursday.getMonth() + 1) + "" + thursday.getDate() + "" + thursday.getFullYear();

  var baseUrl = "https://digitalpool.com/tournaments/";
  var slug = isLadiesNight ?
    "river-thursday-ladies-night-" + formatNum + "-ball-" + mdyyyy :
    "river-thursday-" + formatNum + "-ball-" + mdyyyy;
  var overviewUrl = baseUrl + slug + "/overview";
  var playersUrl = baseUrl + slug + "/players?navigation=false";

  // Update main tournament title
  var titleEl = document.getElementById("tournament-title");
  if (titleEl) {
    var month = thursday.toLocaleString('default', { month: 'long' });
    var day = thursday.getDate();
    var year = thursday.getFullYear();
    titleEl.textContent =
      month + " " + day + ", " + year + " " +
      (isLadiesNight ? "Ladies Night " : "") +
      formatLabel + " Player List";
    if (isLadiesNight) titleEl.classList.add("ladies");
  }

  // Update the signup button in main body
  var signupBtnEl = document.getElementById("signup-button");
  if (signupBtnEl) {
    signupBtnEl.innerHTML =
      `<a class="btn-signup" href="${overviewUrl}" target="_blank">Sign Up Now</a>`;
    if (isLadiesNight) signupBtnEl.classList.add("ladies");
  }

  // Update nav bar signup link if present
  var navSignup = document.getElementById("nav-signup-link");
  if (navSignup) {
    navSignup.setAttribute("href", overviewUrl);
    if (isLadiesNight) navSignup.classList.add("ladies");
  }

  // Add Ladies Night class to body for styling
  if (isLadiesNight) {
    document.body.classList.add("ladies");
  }

  // Embed DigitalPool player list
  var mainEl = document.querySelector('main');
  if (mainEl) {
    var existingIframe = mainEl.querySelector('iframe#digitalpool-embed');
    if (existingIframe) existingIframe.remove();

    var iframe = document.createElement('iframe');
    iframe.id = 'digitalpool-embed';
    iframe.src = playersUrl;
    iframe.style.border = 'none';
    iframe.width = "100%";
    iframe.height = "600";
    iframe.style.display = 'block';
    iframe.style.background = '#0D1B2A';

    mainEl.appendChild(iframe);
  }
})();