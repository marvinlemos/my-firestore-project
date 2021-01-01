const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = '66agUDjel7jKJj3hsZIL'
const imageRef = db
    .collection('products')
    .doc(productId)
    .collection('images')
    .doc()

imageRef
    .set({
        description: 'My Image',
        url: 'my_image_url'
    })
    .then(snap => {
        console.log(snap)
    })