const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAfAXybvA6UudURsN05uUdKJODKJ-bmsEk",
  authDomain: "crownshop-d0a80.firebaseapp.com",
  projectId: "crownshop-d0a80",
  storageBucket: "crownshop-d0a80.appspot.com",
  messagingSenderId: "48748251738",
  appId: "1:48748251738:web:a7d308f3eacd1eadc8e663",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

module.exports = db;
