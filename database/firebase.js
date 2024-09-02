const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
var serviceAccount = require("../soserreports-546a5-firebase-adminsdk-6rodw-fd7fb009a0.json");

initializeApp({
    credential: cert(serviceAccount)
  });
  
  const db = getFirestore();

module.exports = db;