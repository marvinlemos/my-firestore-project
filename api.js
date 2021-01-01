const categories = require('./categories')

//categories.findAll().then(res => console.log(res))

categories.create(
    { category: 'Smartphones' }
)

categories
    .paginate({ pageSize: 3, startAfter: 'Eletrônicos' })
    .then(res => console.log(res))