"use strict";

document.addEventListener("DOMContentLoaded", function _callee() {
  var leetcodeCheckbox, codeforcesCheckbox, githubCheckbox, response, _data, leetcodetoday, codeforcestoday, githubtoday;

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
          console.log(data);
          _data = data, leetcodetoday = _data.leetcodetoday, codeforcestoday = _data.codeforcestoday, githubtoday = _data.githubtoday;

          if (leetcodetoday) {
            leetcodeCheckbox.checked = true;
          }

          if (codeforcestoday) {
            codeforcesCheckbox.checked = true;
          }

          if (githubtoday) {
            githubCheckbox.checked = true;
          }

          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          console.error("Error fetching data:", _context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]]);
});