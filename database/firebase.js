const admin = require('firebase-admin');
var serviceAccount = require("../soserreports-546a5-firebase-adminsdk-6rodw-fd7fb009a0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  const db = admin.firestore();

module.exports = db;