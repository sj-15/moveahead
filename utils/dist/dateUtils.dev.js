"use strict";

// dateUtils.js
function isDateToday(latestDate) {
  var currentDate = new Date();
  var latestYear = latestDate.getFullYear();
  var latestMonth = latestDate.getMonth();
  var latestDay = latestDate.getDate();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();
  var currentDay = currentDate.getDate();
  return latestYear === currentYear && latestMonth === currentMonth && latestDay === currentDay;
}

module.exports = {
  isDateToday: isDateToday
};