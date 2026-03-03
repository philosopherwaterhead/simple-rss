const Parser = require("rss-parser");
const fs = require("fs-extra");

const parser = new Parser();

// feeds.json を読み込む
let feeds = [];
try {
  feeds = fs.readJSONSync("feeds.json");
} catch (err) {
  console.error("feeds.json の読み込みに失敗:", err);
  process.exit(1);
}

(async () => {
  const output = {};

  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed.url);

      // 最新30件をJSON化
      output[feed.name] = parsed.items.slice(0, 30).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate
      }));

      console.log(`取得成功: ${feed.name} (${parsed.items.length}件)`);

    } catch (err) {
      console.error(`RSS取得失敗: ${feed.name} (${feed.url})`, err);
      output[feed.name] = []; // 失敗時は空配列
    }
  }

  // latest.json に書き込み
  fs.writeJSONSync("latest.json", output, { spaces: 2 });
  console.log("latest.json を更新しました");
})();
