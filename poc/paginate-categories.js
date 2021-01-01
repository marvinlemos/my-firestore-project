const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const pageSize = 2

const categories = db
    .collection('categories')
    .orderBy('category')
    .limit(pageSize)
    .get()
categories.then(snap => {
    console.log('is empty: ', snap.empty)
    snap.forEach(cat => {
        console.log(cat.id, ' => ', cat.data())
    })
})

const categories2 = db
    .collection('categories')
    .orderBy('category')
    .limit(pageSize)
    .startAfter('Categoria criado por código')
    .get()
    
categories2.then(snap => {
    console.log('is empty: ', snap.empty)
    snap.forEach(cat => {
        console.log(cat.id, ' => ', cat.data())
    })
})