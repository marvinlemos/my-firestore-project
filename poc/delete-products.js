const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = 'bvN7s5BGS1Bgj1d98cxA'
const product = db.collection('products').doc(productId)

db
    .collection('products')
    .doc(productId)
    .collection('images')
    .get()
    .then(snapImg => {
        const deletePromises = []
        snapImg.forEach(img => {
            deletePromises.push(img.ref.delete())
        })
        return Promise.all(deletePromises)
    })
    .then(() => {
        return product.delete()
    })
    .then(() => {
        console.log('everything was deleted')
    })

