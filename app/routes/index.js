// const siteRouter = require('./site')
const productRouter = require('./product.route')
const typeRouter = require('./type.route')
// const userRouter = require('./user')


function route(app) {

    // route
    app.use('/api/products', productRouter)

    //route
    app.use('/api/types', typeRouter)

    // route
    // app.use('/users', userRouter)

    // route
    // app.use('/', siteRouter)

  
}

module.exports = route
