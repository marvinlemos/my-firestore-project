const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const doc = db.collection('categories').doc()
doc
  .set({
    category: 'Categoria criado por código'
  })
  .then(snap => {
    console.log(snap)
  })


const doc2 = db.collection('my_collections').doc()
doc2
  .set({
    description: 'A teste'
  })
  .then(snap => {
    console.log(snap)
  })