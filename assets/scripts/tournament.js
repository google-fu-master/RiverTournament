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
  const monthNum = upcomingThursday.getMonth() + 1;
  const year = upcomingThursday.getFullYear();

  const mmddyyyy = `${monthNum}${day}${year}`;
  const weekNumber = Math.floor((upcomingThursday.getDate() - 1) / 7) + 1;
  const isLadiesNight = weekNumber === 3;
  const formatNum = (weekNumber % 2 === 1) ? "9" : "8";
  const slug = isLadiesNight
    ? `river-thursday-ladies-night-${formatNum}-ball-${mmddyyyy}`
    : `river-thursday-${formatNum}-ball-${mmddyyyy}`;

  const signupLink = `https://digitalpool.com/tournaments/${slug}`;

  const navSignup = document.getElementById("nav-signup-link");
  if (navSignup) {
    navSignup.setAttribute("href", signupLink);
  }
})();
