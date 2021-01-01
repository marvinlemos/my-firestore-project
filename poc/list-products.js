const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const products = db.collection('products').get()
products.then(snap => {
    console.log('is empty: ', snap.empty)
    snap.forEach(prod => {
        console.log(prod.id, ' => ', prod.data())
        const images = db.collection('products').doc(prod.id).collection('images').get()
        images.then(imageSnap => {
            imageSnap.forEach(img => {
                console.log(img.id, ' => ', img.data())
            })
        })  
    })
})