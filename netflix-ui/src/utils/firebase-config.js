import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCpojS_G_gGKrIJAHfpvF-Kpi94vtPM9vQ",
  authDomain: "netflixclone-cc84c.firebaseapp.com",
  projectId: "netflixclone-cc84c",
  storageBucket: "netflixclone-cc84c.appspot.com",
  messagingSenderId: "639723919844",
  appId: "1:639723919844:web:31514bd1f0d5f402ac8ff1",
  measurementId: "G-E3PB2L8BMT",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
