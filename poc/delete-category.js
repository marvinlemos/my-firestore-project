const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

categoryid = '1ysjzKyovlH8hUDtiTQF'
const doc = db.collection('categories').doc(categoryid)
doc
  .delete()
  .then(snap => {
    console.log(snap)
  })