const db = require('./firestore')
const admin = require("firebase-admin");

const COLLECTION = 'products'

const getCollection = () => {
    return db.collection(COLLECTION)
}

const findAll = async () => {
    const productsDB = await getCollection().get()
    if (productsDB.empty) {
        return []
    }

    const products = []
    productsDB.forEach(product => {
        products.push({
            ...product.data(),
            id: product.id
        })
    })

    productsWithImages = []
    for await (product of products) {
        const imgs = []
        const imgsDB = await getCollection()
            .doc(product.id)
            .collection("images")
            .get()

        imgsDB.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })
        productsWithImages.push({
            ...product,
            imgs
        })
    }
    return productsWithImages
}


const remove = async (id) => {
    const product = db.collection('products').doc(id)

    const imgs = await getCollection()
        .doc(id)
        .collection('images')
        .get()

    const deletePromises = []
    imgs.forEach(img => {
        deletePromises.push(img.ref.delete())
    })
    await Promise.all(deletePromises)

    await product.delete()
}


//Taking off the categories variable from 'data' 
const create = async ({ categories, ...data }) => {
    const doc = getCollection().doc()
    const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat))
    await doc.set({
        ...data,
        categories: categoriesRefs
    })
    return {
        ...data,
        id: doc.id
    }
}

const update = async (id, { categories, ...data }) => {

    const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat))

    const doc = db.collection('products').doc(id)
    await doc
        .update({
            ...data,
            categories: admin.firestore.FieldValue.arrayUnion(...categoriesRefs),
        })
}

const paginate = async ({ pageSize = 10, startAfter = '' }) => {
    const productsDB = await
        getCollection()
            .orderBy('product')
            .limit(pageSize + 1)
            .startAfter(startAfter)
            .get()

    if (productsDB.empty) {
        return {
            data: [],
            total: 0,
            hasNext: false
        }
    }
    const products = []
    let total = 0
    productsDB.forEach(prod => {
        if (total < pageSize) {
            products.push({
                ...prod.data(),
                id: prod.id
            })
        }
        total++
    })

    productsWithImages = []
    for await (product of products) {
        const imgs = []
        const imgsDB = await getCollection()
            .doc(product.id)
            .collection("images")
            .get()

        imgsDB.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })
        productsWithImages.push({
            ...product,
            imgs
        })
    }

    return {
        data: productsWithImages,
        total: productsWithImages.length,
        hasNext: total > pageSize,
        startAfter: total > pageSize ? productsWithImages[productsWithImages.length - 1].product : ''
    }
}

const addImage = async (id, data) => {
    const imageRef = getCollection()
        .doc(id)
        .collection('images')
        .doc()

    await imageRef.set(data)
}

module.exports = {
    findAll,
    remove,
    create,
    update,
    paginate,
    addImage
}