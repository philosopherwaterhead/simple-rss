const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const token = process.argv[2];

if (!token) {
  console.log("Usage: node register.js <FCM_TOKEN>");
  process.exit(1);
}

admin.messaging().subscribeToTopic(token, "rss")
  .then(() => {
    console.log("Subscribed to rss topic!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
