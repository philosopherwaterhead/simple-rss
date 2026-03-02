const admin = require("firebase-admin");
const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();

// Firebase初期化
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const messaging = admin.messaging();

// 🔴 ここをあなたのRSSに変更してください
const RSS_URL = "https://example.com/rss";

const STATE_FILE = "last.json";

(async () => {
  try {
    const feed = await parser.parseURL(RSS_URL);
    const latest = feed.items[0];

    if (!latest) {
      console.log("No items found in RSS");
      return;
    }

    let lastLink = null;

    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE));
      lastLink = data.link;
    }

    if (latest.link !== lastLink) {
      console.log("New article found:", latest.title);

      await messaging.send({
        topic: "rss",
        notification: {
          title: latest.title,
          body: "新着記事があります",
        },
      });

      fs.writeFileSync(
        STATE_FILE,
        JSON.stringify({ link: latest.link })
      );

      console.log("Notification sent!");
    } else {
      console.log("No new article");
    }

  } catch (err) {
    console.error("Error:", err);
  }
})();
