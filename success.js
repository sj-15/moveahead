document.addEventListener("DOMContentLoaded", async () => {
    const leetcodeCheckbox = document.getElementById("leetcode-checkbox");
    const codeforcesCheckbox = document.getElementById("codeforces-checkbox");
    const githubCheckbox = document.getElementById("github-checkbox");
  
    try {
        const response = await fetch("/data"); // Assuming you've set up a route to fetch the data
        const data = await response.json();
        
        const { leetcodetoday, codeforcestoday, githubtoday } = data;
    
        if (leetcodetoday) {
          leetcodeCheckbox.checked = true;
        }
    
        if (codeforcestoday) {
          codeforcesCheckbox.checked = true;
        }
    
        if (githubtoday) {
          githubCheckbox.checked = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  });
  