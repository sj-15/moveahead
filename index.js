const express = require("express");
const http = require("http");
const axios = require("axios");
const path = require('path');
const bodyParser = require("body-parser"); // Import body-parser
const { isDateToday } = require('./utils/dateUtils');

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/submit", async (req, res) => {
  // Handle the submitted form data here
  const leetcodeProfile = req.body.leetcode;
  const codeforcesProfile = req.body.codeforces;
  const codechefProfile = req.body.codechef;
  const githubProfile = req.body.github;
  try {
    const leetcode_data = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeProfile}`);
    const codeforces_data = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforcesProfile}&from=1&count=1`);
    const codechef_data = await axios.get(`https://codechef-api.vercel.app/${codechefProfile}`);
    const github_data = await axios.get(`https://api.github.com/users/${githubProfile}/repos`);

    // Leetcode
    const keys = Object.keys(leetcode_data["data"].submissionCalendar);
    const lastKey = keys[keys.length - 1];
    var leetcodeDate = new Date(lastKey * 1000)
    var leetcoded = leetcodeDate.toLocaleString();
    const leetcodeObject = new Date(leetcoded);
    console.log(leetcodeObject);
    const leetcodetoday = isDateToday(leetcodeObject);

    // Compare the date parts
    if (
      leetcodetoday
    ) {
      console.log("The latest date is today.");
    } else {
      console.log("The latest date is not today.");
    }

    //codeforces
    var codeforces_submittedat = codeforces_data["data"]["result"][0]["creationTimeSeconds"];
    var myDate = new Date(codeforces_submittedat * 1000);
    var date = myDate.toLocaleString();
    const dateObject = new Date(date);
    console.log(dateObject);
    const codeforcestoday = isDateToday(dateObject);

    // Compare the date parts
    if (
      codeforcestoday
    ) {
      console.log("The latest date is today.");
    } else {
      console.log("The latest date is not today.");
    }

    // codechef
    console.log(codechef_data["data"]["currentRating"]);

    //github
    let latestDate = new Date(0); // Initialize with a minimum date
    for (const item of github_data["data"]) {
      const updatedAt = new Date(item.updated_at);
      if (updatedAt > latestDate) {
        latestDate = updatedAt;
      }
    }
    console.log(latestDate);
    const githubtoday = isDateToday(latestDate);

    // Compare the date parts
    if (
      githubtoday
    ) {
      console.log("The latest date is today.");
    } else {
      console.log("The latest date is not today.");
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).send("An error occured while fetching data.");
  }

  // Perform any processing or database storage if needed
  res.send("Form data received and processed!");
});

var server = http.createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server started running on port ${port}`);
});
