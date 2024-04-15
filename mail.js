
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

   // Get a reference to the Firebase Realtime Database
   const database = firebase.database();
   // Get a reference to the Firestore database
    const db = firebase.firestore();
  const contactFormDB = database.ref("RegisterForm");
  const messaging = firebase.messaging();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sworker.js').then(res => {
        console.log("Register Success");
        messaging.useServiceWorker(res);
    }).catch(e => {
        console.log(e);
    });
}

  // Function to handle form submission
  function submitForm(event) {
      event.preventDefault();
  
      // Get form values
      const name = getElementVal("name");
      const email = getElementVal("emailid");
      const password = getElementVal("password");
  
    var displayName = name
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Save additional user data to Firestore
        saveUserData(userCredential.user.uid, name, email, displayName);
        document.getElementById("RegisterForm").reset();
        window.location.href = "index.html";
    })
    .catch((error) => {
        // Handle errors
        console.error("Error signing up:", error);
        alert("Error signing up:", error)
        // Show error message
        // You can customize this part to display the error message to the user
    });
  
      // Reset form
    //   document.getElementById("RegisterForm").reset();
  }


// Function to save user data to Firestore
function saveUserData(userId, name, email, displayName) {
    db.collection("users").doc(userId).set({
        name: name,
        email: email,
        displayName: displayName
    })
    .then(() => {
        console.log("User data successfully stored in Firestore!");
    })
    .catch((error) => {
        console.error("Error storing user data:", error.message);
    });
}
  
  // Function to save messages to the database
  function saveMessage(name, email, password) {
      const newContactForm = contactFormDB.push();
  
      newContactForm.set({
          name: name,
          email: email,
          password: password
      });
  }
  
  // Function to get element value by ID
  function getElementVal(id) {
      return document.getElementById(id).value;
  }
  
  // Add event listener for form submission
  document.getElementById("RegisterForm").addEventListener("submit", submitForm);



