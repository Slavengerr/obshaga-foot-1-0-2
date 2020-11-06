import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyAMrzszr04kLK63a9I5_yuagnjkUVy1pHk",
  authDomain: "obshaga-foot.firebaseapp.com",
  databaseURL: "https://obshaga-foot.firebaseio.com",
  projectId: "obshaga-foot",
  storageBucket: "obshaga-foot.appspot.com",
  messagingSenderId: "513143337367",
  appId: "1:513143337367:web:75606e7fa5caf6619d54d2",
  measurementId: "G-3928410C5T"
};

firebase.initializeApp(firebaseConfig);

export let database = firebase.database();
export let auth = firebase.auth();


