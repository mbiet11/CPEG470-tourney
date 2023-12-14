import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtXiQZ0k_vaOf9XsjHV1j5mxWTYCEqdBQ",
      authDomain: "cpeg-tourney.firebaseapp.com",
      databaseURL: "https://cpeg-tourney-default-rtdb.firebaseio.com",
      projectId: "cpeg-tourney",
      storageBucket: "cpeg-tourney.appspot.com",
      messagingSenderId: "667653887683",
      appId: "1:667653887683:web:9a2d8f75406c75ba2e3476",
      measurementId: "G-EX91Z10JKF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const tournamentsList = document.getElementById('tournamentsList');

const tournamentsRef = ref(database, 'tournaments');

onValue(tournamentsRef, (snapshot) => {
    tournamentsList.innerHTML = ''; // Clear previous entries

    snapshot.forEach((childSnapshot) => {
        const tournament = childSnapshot.val();

        // Display tournament details
        const tournamentItem = document.createElement('li');
        tournamentItem.textContent = `Tournament Name: ${tournament.name}, Created By: ${tournament.createdBy}`;
        tournamentsList.appendChild(tournamentItem);
    });
});
