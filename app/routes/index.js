const productRouter = require('./product.route')
const typeRouter = require('./type.route')
const userRouter = require('./user.route')


function route(app) {

    // route
    app.use('/api/products', productRouter)

    //route
    app.use('/api/types', typeRouter)

    // route
    app.use('/api/users', userRouter)

  
}

module.exports = route
