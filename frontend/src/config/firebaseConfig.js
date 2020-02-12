import firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCvVM8QWicNyhNCSJCjvv-O463bG2s_Xwg",
  authDomain: "openhack-403f7.firebaseapp.com",
  databaseURL: "https://openhack-403f7.firebaseio.com",
  projectId: "openhack-403f7",
  storageBucket: "openhack-403f7.appspot.com",
  messagingSenderId: "706489530077"
};
const fire = firebase.initializeApp(config);

export default fire;
