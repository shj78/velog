const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const parser = new Parser();
const username = "deepsea"; // Velog 아이디
const feedUrl = `https://v2.velog.io/rss/@${username}`;

async function fetchAndSave() {
  const feed = await parser.parseURL(feedUrl);
  console.log(`📥 Fetched ${feed.items.length} posts`);

  feed.items.forEach((item) => {
    const title = item.title.replace(/[\/\\?%*:|"<>]/g, "-");
    const filePath = path.join("posts", `${title}.md`);
    const content = `# ${item.title}\n\n${item.contentSnippet}\n\n[Read more](${item.link})`;

    fs.writeFileSync(filePath, content);
    console.log(`📝 Saved: ${filePath}`);
  });

  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const commitMessage = `📝 Auto-update blog post: ${date}`;

  try {
    console.log("📁 Git add...");
    execSync("git add .", { stdio: "inherit" });

    console.log("📝 Git commit...");
    execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

    console.log("📤 Git push...");
    execSync(
      `git push https://${process.env.GH_PAT}@github.com/shj78/velog.git`,
      { stdio: "inherit" }
    );

    console.log("✅ Blog post synced to GitHub!");
  } catch (err) {
    console.error("❌ Git sync failed:", err.message);
  }
}

fetchAndSave();
