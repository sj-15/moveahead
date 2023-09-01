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

app.get("/success.js", (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'success.js'));
});

let leetcodetoday = false;
let codeforcestoday = false;
let githubtoday = false;

app.get("/data", (req, res) => {
  console.log("Accessing /data route");
  const data = {
    leetcodetoday,
    codeforcestoday,
    githubtoday
  };

  res.json(data);
});

app.get("/success", (req, res) => {
  // Serve the success.html file
  res.sendFile(path.join(__dirname, 'success.html'));
});



app.post("/submit", async (req, res) => {
  // Handle the submitted form data here
  const leetcodeProfile = req.body.leetcode;
  const codeforcesProfile = req.body.codeforces;
  const githubProfile = req.body.github;
  try {
    const leetcode_data = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeProfile}`);
    const codeforces_data = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforcesProfile}&from=1&count=1`);
    const github_data = await axios.get(`https://api.github.com/users/${githubProfile}/repos`);

    // Leetcode
    const keys = Object.keys(leetcode_data["data"].submissionCalendar);
    const lastKey = keys[keys.length - 1];
    var leetcodeDate = new Date(lastKey * 1000)
    leetcodetoday = isDateToday(leetcodeDate);

    

    //codeforces
    var codeforces_submittedat = codeforces_data["data"]["result"][0]["creationTimeSeconds"];
    var myDate = new Date(codeforces_submittedat * 1000);
    codeforcestoday = isDateToday(myDate);

    

    //github
    let latestDate = new Date(0); // Initialize with a minimum date
    for (const item of github_data["data"]) {
      const updatedAt = new Date(item.updated_at);
      if (updatedAt > latestDate) {
        latestDate = updatedAt;
      }
    }
    // console.log(latestDate);
    console.log(latestDate);
    githubtoday = isDateToday(latestDate);

    res.redirect(`/success`);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("An error occured while fetching data.");
  }

  // Perform any processing or database storage if needed
  
});

var server = http.createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server started running on port ${port}`);
});
