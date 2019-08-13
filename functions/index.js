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
  response.render('index', {})
})

app.get('/main', (request, response) => {
  // response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  // getFacts().then((facts) => {
  //   response.render('main', { facts })
  //   return undefined
  // })
  // .catch((error) => {
  //   response.send('error')
  // })
  response.render('main')
})


app.get('/facts', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    getFacts().then((facts) => {
    response.json(facts)
    return undefined
  })
  .catch((error) => {
    response.send('error')
  })
})

app.get('/test', (request, response) => {
  response.render('test')
})


exports.app = functions.https.onRequest(app);
