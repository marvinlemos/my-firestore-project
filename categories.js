const { doc } = require('./firestore')
const db = require('./firestore')

const COLLECTION = 'categories'

const getCollection = () => {
    return db.collection(COLLECTION)
}

const findAll = async () => {
    const categoriesDB = await getCollection().get()
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
    const doc = getCollection().doc(id)
    await doc.delete()
}

const create = async (data) => {
    const doc = getCollection().doc()
    await doc.set(data)
}

const update = async (id, data) => {
    const doc = getCollection().doc(id)
    await doc.update(data)
}

const paginate = async ({ pageSize = 10, startAfter = '' }) => {
    const categoriesDB = await getCollection()
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
        startAfter: total > pageSize ? categories[categories.length - 1].category : ''
    }
}

module.exports = {
    findAll,
    remove,
    create,
    update,
    paginate
}