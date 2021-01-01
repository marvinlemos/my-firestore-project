const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const cat = '1ysjzKyovlH8hUDtiTQF'
const catRef = db.collection('categories').doc(cat)

const doc = db.collection('products').doc()
doc
  .set({
    product: 'Something',
    categories: [catRef],
    price: 3.10
  })
  .then(snap => {
    console.log(snap)
  })
