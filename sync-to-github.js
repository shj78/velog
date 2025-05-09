const { execSync } = require("child_process");

const now = new Date();
const date = now.toISOString().split("T")[0];
const commitMessage = `📝 Auto-update blog post: ${date}`;

try {
  console.log("📁 Git add...");
  execSync("git add .", { stdio: "inherit" });

  console.log("📝 Git commit...");
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

  console.log("📤 Git push...");
  execSync("git push https://${process.env.GH_PAT}@github.com/shj78/velog.git", { stdio: "inherit" });

  console.log("✅ Blog post synced to GitHub!");
} catch (err) {
  console.error("❌ Git sync failed:", err.message);
}
