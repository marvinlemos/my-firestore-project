const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const cat = '1ysjzKyovlH8hUDtiTQF'
const catRef = db.collection('categories').doc(cat)


const create = async () => {
  const docRef = db.collection('products').doc()
  await docRef
    .set({
      product: 'Nintendo Switch',
      categories: [catRef],
      price: 2999
    })
  console.log(docRef.id)
}

create()
