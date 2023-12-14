import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById('createForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const tournamentName = document.getElementById('tournamentName').value;

    const user = auth.currentUser;
    if (!user) {
        alert('Please log in to create a tournament.');
        return;
    }

    const tournamentsRef = ref(database, 'tournaments');
    let isUnique = true;

    onValue(tournamentsRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const tournament = childSnapshot.val();
            if (tournament.name === tournamentName) {
                isUnique = false;
            }
        });

        if (isUnique) {
            const newTournamentRef = push(tournamentsRef);
            const tournamentId = newTournamentRef.key;

            set(newTournamentRef, {
                id: tournamentId,
                name: tournamentName,
                createdBy: user.uid,
            });

            alert('Tournament created successfully!');
            window.location.href = `tournament.html?id=${tournamentId}`;
        } else {
            alert('Tournament name must be unique.');
        }
    });
});
