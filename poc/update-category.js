const admin = require("firebase-admin");

const serviceAccount = require("../acesso-bd-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const categoryId = '9vyrJ3xhq7kMXV3tc7mK'
const doc = db.collection('categories').doc(categoryId)
doc
  .update({ //o .set troca o documento inteiro.
    category: 'Teste de Update'
  })
  .then(snap => {
    console.log(snap)
  })

/*
doc
  .set({ //o .set troca o documento inteiro.
    category: 'Categoria criado por código'
  })
  .then(snap => {
    console.log(snap)
  })
*/
