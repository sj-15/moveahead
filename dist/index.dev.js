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
app.post("/submit", function _callee(req, res) {
  var leetcodeProfile, codeforcesProfile, codechefProfile, githubProfile, leetcode_data, codeforces_data, codechef_data, github_data, keys, lastKey, leetcodeDate, leetcoded, leetcodeObject, leetcodetoday, codeforces_submittedat, myDate, date, dateObject, codeforcestoday, latestDate, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, updatedAt, githubtoday;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Handle the submitted form data here
          leetcodeProfile = req.body.leetcode;
          codeforcesProfile = req.body.codeforces;
          codechefProfile = req.body.codechef;
          githubProfile = req.body.github;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(axios.get("https://leetcode-api-faisalshohag.vercel.app/".concat(leetcodeProfile)));

        case 7:
          leetcode_data = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(axios.get("https://codeforces.com/api/user.status?handle=".concat(codeforcesProfile, "&from=1&count=1")));

        case 10:
          codeforces_data = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(axios.get("https://codechef-api.vercel.app/".concat(codechefProfile)));

        case 13:
          codechef_data = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/users/".concat(githubProfile, "/repos")));

        case 16:
          github_data = _context.sent;
          // Leetcode
          keys = Object.keys(leetcode_data["data"].submissionCalendar);
          lastKey = keys[keys.length - 1];
          leetcodeDate = new Date(lastKey * 1000);
          leetcoded = leetcodeDate.toLocaleString();
          leetcodeObject = new Date(leetcoded);
          console.log(leetcodeObject);
          leetcodetoday = isDateToday(leetcodeObject); // Compare the date parts

          if (leetcodetoday) {
            console.log("The latest date is today.");
          } else {
            console.log("The latest date is not today.");
          } //codeforces


          codeforces_submittedat = codeforces_data["data"]["result"][0]["creationTimeSeconds"];
          myDate = new Date(codeforces_submittedat * 1000);
          date = myDate.toLocaleString();
          dateObject = new Date(date);
          console.log(dateObject);
          codeforcestoday = isDateToday(dateObject); // Compare the date parts

          if (codeforcestoday) {
            console.log("The latest date is today.");
          } else {
            console.log("The latest date is not today.");
          } // codechef


          console.log(codechef_data["data"]["currentRating"]); //github

          latestDate = new Date(0); // Initialize with a minimum date

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 37;

          for (_iterator = github_data["data"][Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            item = _step.value;
            updatedAt = new Date(item.updated_at);

            if (updatedAt > latestDate) {
              latestDate = updatedAt;
            }
          }

          _context.next = 45;
          break;

        case 41:
          _context.prev = 41;
          _context.t0 = _context["catch"](37);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 45:
          _context.prev = 45;
          _context.prev = 46;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 48:
          _context.prev = 48;

          if (!_didIteratorError) {
            _context.next = 51;
            break;
          }

          throw _iteratorError;

        case 51:
          return _context.finish(48);

        case 52:
          return _context.finish(45);

        case 53:
          console.log(latestDate);
          githubtoday = isDateToday(latestDate); // Compare the date parts

          if (githubtoday) {
            console.log("The latest date is today.");
          } else {
            console.log("The latest date is not today.");
          }

          _context.next = 62;
          break;

        case 58:
          _context.prev = 58;
          _context.t1 = _context["catch"](4);
          console.log(_context.t1.message);
          res.status(500).send("An error occured while fetching data.");

        case 62:
          // Perform any processing or database storage if needed
          res.send("Form data received and processed!");

        case 63:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 58], [37, 41, 45, 53], [46,, 48, 52]]);
});
var server = http.createServer(app);
server.listen(port, "0.0.0.0", function () {
  console.log("Server started running on port ".concat(port));
});