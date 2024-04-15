
const firebaseConfig = {
    apiKey: "AIzaSyDwDIRX0Xzfnnq0wyjUX2EcsDBupoUA2n8",
    authDomain: "progressive-web-app-e6466.firebaseapp.com",
    databaseURL: "https://progressive-web-app-e6466-default-rtdb.firebaseio.com",
    projectId: "progressive-web-app-e6466",
    storageBucket: "progressive-web-app-e6466.appspot.com",
    messagingSenderId: "953962351852",
    appId: "1:953962351852:web:ea139c90661b6bcffb69c9",
    measurementId: "G-EY8MC668EC"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Check authentication status
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in, retrieve user ID
        const userId = user.uid;
        console.log('userId:', userId);
        displayFlightDetails(userId); // Call function to display flight details
    } else {
        // User is not signed in, redirect to login page
        window.location.href = "login.html";
    }
});

// Function to fetch and display flight details
function displayFlightDetails(userId) {
    console.log('Fetching flight details for user ID:', userId);
    const flightDetailsContainer = document.getElementById('flightDetails');
    
    // Query flights collection based on userId
    db.collection("flights").where("userId", "==", userId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const flightData = doc.data();
                console.log('Flight details:', flightData); // Log flight details
                // Create HTML elements to display flight details
                const flightElement = document.createElement('div');
                flightElement.innerHTML = `
                    <p><strong>From:</strong> ${flightData.from}</p>
                    <p><strong>To:</strong> ${flightData.to}</p>
                    <p><strong>Departure Date:</strong> ${flightData.departureDate}</p>
                    <p><strong>Return Date:</strong> ${flightData.returnDate}</p>
                    <p><strong>Travellers:</strong> ${flightData.travellers}</p>
                    <hr>
                `;
                flightDetailsContainer.appendChild(flightElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching flight details:", error);
        });
}

function displayUpcomingFlights(userId) {
    console.log('Fetching upcoming flight details for user ID:', userId);
    const flightDetailsContainer = document.getElementById('UpcomingflightDetails'); // Changed ID
    const today = new Date(); // Get today's date
    
    // Query flights collection based on userId and departure date greater than today
    db.collection("flights").where("userId", "==", userId)
        .where("departureDate", ">", today)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const flightData = doc.data();
                console.log('Flight details:', flightData); // Log flight details
                // Create HTML elements to display flight details
                const flightElement = document.createElement('div');
                flightElement.classList.add('card'); // Add card class
                flightElement.innerHTML = `
                    <p><strong>From:</strong> ${flightData.from}</p>
                    <p><strong>To:</strong> ${flightData.to}</p>
                    <p><strong>Departure Date:</strong> ${flightData.departureDate}</p>
                    <p><strong>Return Date:</strong> ${flightData.returnDate}</p>
                    <p><strong>Travellers:</strong> ${flightData.travellers}</p>
                    <hr>
                `;
                flightDetailsContainer.appendChild(flightElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching upcoming flight details:", error);
        });
}