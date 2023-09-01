"use strict";

document.addEventListener("DOMContentLoaded", function _callee() {
  var leetcodeCheckbox, codeforcesCheckbox, githubCheckbox, response, data, leetcodetoday, codeforcestoday, githubtoday;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          leetcodeCheckbox = document.getElementById("leetcode-checkbox");
          codeforcesCheckbox = document.getElementById("codeforces-checkbox");
          githubCheckbox = document.getElementById("github-checkbox");
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch("/data"));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          leetcodetoday = data.leetcodetoday, codeforcestoday = data.codeforcestoday, githubtoday = data.githubtoday;

          if (leetcodetoday) {
            leetcodeCheckbox.checked = true;
          }

          if (codeforcestoday) {
            codeforcesCheckbox.checked = true;
          }

          if (githubtoday) {
            githubCheckbox.checked = true;
          }

          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](3);
          console.error("Error fetching data:", _context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 16]]);
});