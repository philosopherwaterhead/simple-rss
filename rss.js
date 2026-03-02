const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

(async () => {
  try {
    await admin.messaging().send({
      topic: "rss",
      notification: {
        title: "テスト通知",
        body: "RSS通知システムは正常です",
      },
    });

    console.log("Test notification sent!");
  } catch (err) {
    console.error(err);
  }
})();
