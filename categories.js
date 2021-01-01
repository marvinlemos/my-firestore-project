const { doc } = require('./firestore')
const db = require('./firestore')

const findAll = async () => {
    const categoriesDB = await db.collection('categories').get()
    if (categoriesDB.empty) {
        return []
    }

    const categories = []
    categoriesDB.forEach(category => {
        categories.push({
            ...category.data(),
            id: category.id
        })
    })
    return categories
}


const remove = async (id) => {
    const doc = db.collection('categories').doc(id)
    await doc.delete()
}

const create = async (data) => {
    const doc = db.collection('categories').doc()
    await doc.set(data)
}

const update = async (id, data) => {
    const doc = db.collection('categories').doc(id)
    await doc.update(data)
}

const paginate = async ({ pageSize = 10, startAfter = '' }) => {
    const categoriesDB = await db
        .collection('categories')
        .orderBy('category')
        .limit(pageSize + 1)
        .startAfter(startAfter)
        .get()

    if (categoriesDB.empty) {
        return {
            data: [],
            total: 0,
            hasNext: false
        }
    }
    const categories = []
    let total = 0
    categoriesDB.forEach(cat => {
        if (total < pageSize) {
            categories.push({
                ...cat.data(),
                id: cat.id
            })
        }
        total++
    })

    return {
        data: categories,
        total: categories.length,
        hasNext: total > pageSize,
        startAfter: total > pageSize ? categories[categories.length-1].category : ''
    }
}

module.exports = {
    findAll,
    remove,
    create,
    update,
    paginate
}