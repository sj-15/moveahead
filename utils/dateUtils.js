// dateUtils.js
function isDateToday(latestDate) {
    const currentDate = new Date();
  
    const latestYear = latestDate.getFullYear();
    const latestMonth = latestDate.getMonth();
    const latestDay = latestDate.getDate();
  
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
  
    return (
      latestYear === currentYear &&
      latestMonth === currentMonth &&
      latestDay === currentDay
    );
  }
  
  module.exports = { isDateToday };
  