const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express')
const engines = require('consolidate')
const app = express()

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
)


async function getFacts(){
  const snapshots = await firebaseApp.firestore().collection('facts').get()
  const facts = snapshots.docs.map((snapshot) => snapshot.data())
  return facts
}

app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')


app.get('/', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  getFacts().then((facts) => {
    response.render('index', { facts })
    return undefined
  })
  .catch((error) => {
    response.send('error')
  })
})


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
