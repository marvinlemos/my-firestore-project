const categories = require('./categories')
const products = require('./products')

/*
categories.findAll().then(res => console.log(res))


categories.create(
    { category: 'Smartphones' }
)
*/

/*
categories
    .paginate({ pageSize: 3, startAfter: 'Eletrônicos' })
    .then(res => console.log(res))
*/

const createProduct = async () => {
    const product = await products.create({
        product: 'iPhone 17',
        price: 14000,
        categories: ['OrXtS0z0kxmr75z2xQkv', 'QMBczzC6EiZYsXzcCqRg']
    })

    console.log(product)

    products.addImage(product.id, {
        description:  'anything2',
        url: 'https://some.url.com'
    })
}


createProduct()

//products.remove('66agUDjel7jKJj3hsZIL')

products
    .paginate({ pageSize: 1 })
    .then(res => console.log(res))

