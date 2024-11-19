const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Function to serve Firebase configuration securely
exports.getFirebaseConfig = functions.https.onRequest((req, res) => {
  const config = {
    apiKey: functions.config().myapp.api_key,               // Use Firebase Config Variables
    authDomain: functions.config().myapp.auth_domain,
    projectId: functions.config().myapp.project_id,
    storageBucket: functions.config().myapp.storage_bucket,
    messagingSenderId: functions.config().myapp.messaging_sender_id,
    appId: functions.config().myapp.app_id,
  };

  // Send the config as a JSON response
  res.json(config);
});
