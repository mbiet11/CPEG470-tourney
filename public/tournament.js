import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

const urlParams = new URLSearchParams(window.location.search);
const tournamentId = urlParams.get('id');

const tournamentRef = ref(database, `tournaments/${tournamentId}`);

onValue(tournamentRef, (snapshot) => {
    const tournament = snapshot.val();
    if (tournament) {
        document.getElementById('tournamentName').textContent = `Tournament Name: ${tournament.name}`;

        document.getElementById('registerBtn').addEventListener('click', () => {
            const user = auth.currentUser;
            if (user) {
                // Capture user registration for the tournament
                const registrationsRef = ref(database, `registrations/${tournamentId}`);
                push(registrationsRef).set({
                    userId: user.uid,
                    email: user.email,
                });

                alert(`User ${user.email} registered for the tournament!`);
            } else {
                alert('Please log in to register for the tournament.');
            }
        });
    } else {
        alert('Tournament not found.');
        window.location.href = 'tournament.html';
    }
});
