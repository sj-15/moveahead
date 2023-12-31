"use strict";

var express = require("express");

var http = require("http");

var axios = require("axios");

var path = require('path');

var bodyParser = require("body-parser"); // Import body-parser


var _require = require('./utils/dateUtils'),
    isDateToday = _require.isDateToday;

var app = express();
var port = process.env.PORT || 3000; // Use body-parser middleware to parse URL-encoded data

app.use(bodyParser.urlencoded({
  extended: false
}));
app.get("/success.js", function (req, res) {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'success.js'));
});
var leetcodetoday = false;
var codeforcestoday = false;
var githubtoday = false;
app.get("/data", function (req, res) {
  var data = {
    leetcodetoday: leetcodetoday,
    codeforcestoday: codeforcestoday,
    githubtoday: githubtoday
  };
  res.json(data);
});
app.get("/success", function (req, res) {
  // Serve the success.html file
  res.sendFile(path.join(__dirname, 'success.html'));
});
app.post("/submit", function _callee(req, res) {
  var leetcodeProfile, codeforcesProfile, githubProfile, leetcode_data, codeforces_data, github_data, keys, lastKey, leetcodeDate, codeforces_submittedat, myDate, latestDate, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, updatedAt;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Handle the submitted form data here
          leetcodeProfile = req.body.leetcode;
          codeforcesProfile = req.body.codeforces;
          githubProfile = req.body.github;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.get("https://leetcode-api-faisalshohag.vercel.app/".concat(leetcodeProfile)));

        case 6:
          leetcode_data = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(axios.get("https://codeforces.com/api/user.status?handle=".concat(codeforcesProfile, "&from=1&count=1")));

        case 9:
          codeforces_data = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/users/".concat(githubProfile, "/repos")));

        case 12:
          github_data = _context.sent;
          // Leetcode
          keys = Object.keys(leetcode_data["data"].submissionCalendar);
          lastKey = keys[keys.length - 1];
          leetcodeDate = new Date(lastKey * 1000);
          leetcodetoday = isDateToday(leetcodeDate); //codeforces

          codeforces_submittedat = codeforces_data["data"]["result"][0]["creationTimeSeconds"];
          myDate = new Date(codeforces_submittedat * 1000);
          codeforcestoday = isDateToday(myDate); //github

          latestDate = new Date(0); // Initialize with a minimum date

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 24;

          for (_iterator = github_data["data"][Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            item = _step.value;
            updatedAt = new Date(item.pushed_at);

            if (updatedAt > latestDate) {
              latestDate = updatedAt;
            }
          }

          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](24);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 32:
          _context.prev = 32;
          _context.prev = 33;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 35:
          _context.prev = 35;

          if (!_didIteratorError) {
            _context.next = 38;
            break;
          }

          throw _iteratorError;

        case 38:
          return _context.finish(35);

        case 39:
          return _context.finish(32);

        case 40:
          githubtoday = isDateToday(latestDate);
          res.redirect("/success");
          _context.next = 48;
          break;

        case 44:
          _context.prev = 44;
          _context.t1 = _context["catch"](3);
          console.log(_context.t1.message);
          res.status(500).send("An error occured while fetching data.");

        case 48:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 44], [24, 28, 32, 40], [33,, 35, 39]]);
}); // Define your GitHub username

var githubUsername = "sj-15"; // Define the date range for contributions (from and to dates)

var fromDate = "2023-09-02T00:00:00Z";
var toDate = "2023-09-02T23:59:59Z"; // GitHub API endpoint for fetching user contributions

var apiUrl = "https://api.github.com/users/".concat(githubUsername, "/events"); // Axios GET request to fetch user contributions

axios.get(apiUrl).then(function (response) {
  // Filter events by the date range
  var contributions = response.data.filter(function (event) {
    var eventDate = new Date(event.created_at);
    return eventDate >= new Date(fromDate) && eventDate <= new Date(toDate);
  }); // Calculate the total contributions

  var totalContributions = contributions.length; // Print the total contributions

  console.log("Total contributions on ".concat(fromDate, " to ").concat(toDate, ": ").concat(totalContributions));
})["catch"](function (error) {
  console.error("Error fetching GitHub data:", error);
});
var server = http.createServer(app);
server.listen(port, "0.0.0.0", function () {
  console.log("Server started running on port ".concat(port));
});