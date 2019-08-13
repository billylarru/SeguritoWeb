// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASIvojyDsp1yJBRd1FVKnM5YBgxfk8LIY",
  authDomain: "segurito-df82e.firebaseapp.com",
  databaseURL: "https://segurito-df82e.firebaseio.com",
  projectId: "segurito-df82e",
  storageBucket: "segurito-df82e.appspot.com",
  messagingSenderId: "180846925633",
  appId: "1:180846925633:web:5e834afcb229cfe2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const $btnLogin = document.getElementById('btnLogin')
$btnLogin.addEventListener('click', login)

function login(e){
  e.preventDefault()
  console.log('boton presionado')
  const email = document.getElementById('txtEmail').value
  const password = document.getElementById('txtPassword').value
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    // ...
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    window.location.href = 'main'
  } else {
    // No user is signed in.
  }
});

