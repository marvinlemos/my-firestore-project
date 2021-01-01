const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const cat = '1ysjzKyovlH8hUDtiTQF'
const catRef = db.collection('categories').doc(cat)

const productId = 'bvN7s5BGS1Bgj1d98cxA'
const doc = db.collection('products').doc(productId)
doc
  .update({
    product: 'Something',
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    price: 3.10
  })
  .then(snap => {
    console.log(snap)
  })
