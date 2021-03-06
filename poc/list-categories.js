const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const categories = db.collection('categories').get()
categories.then(snap => {
    console.log('is empty: ', snap.empty)
    snap.forEach(cat => {
        console.log(cat.id, ' => ', cat.data())
    })
})