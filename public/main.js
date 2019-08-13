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

firebase.auth().onAuthStateChanged(function(user) {
  console.log(user)
  if (user) {
    // User is signed in.
    mostrarDatos()
  } else {
    // No user is signed in.
    window.location.href = '/'
  }
});

async function getFacts(){
  try {
    const snapshots = await firebase.firestore().collection('facts').get()
    const facts = snapshots.docs.map((snapshot) => snapshot.data())
    return facts
  } catch (error) {
    console.log(error)
    return []
  }
}

async function mostrarDatos(){
  try {
    const facts = await getFacts()
    const html = facts.map((fact) => {
      return `<li>${fact.text}</li>`
    })
    .join('')
    const $ul = document.getElementById('list')
    $ul.innerHTML = html
  } catch (error) {
    console.log(error)
  }
}
console.log('llamando al js main')