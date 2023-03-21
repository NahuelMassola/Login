const {Router} = require('express')
const viewControllers = require('../controller/views.controller')
const viewProductsController = require('../controller/viewProducts.Controller')
const viewCartsController = require('../controller/viewCarts.controller')
const router = Router();

//productos file system
router.get('/', viewControllers.views);
// productos y cart BD
router.get('/products', viewProductsController.viewsBd);
router.get('/carts/:cid', viewCartsController.viewsBd);

//Productos RealTime
router.get('/realtimeproducts/', viewControllers.RealTimeProduct);
router.delete('/realtimeproducts/:pid', viewControllers.deleteRealTimeProduct);
router.post('/realtimeproducts/', viewControllers.addRealTimeProduct);

// chat 
router.get('/chats', viewControllers.renderChats);


// LOGIN Y REGISTER
router.get('/login' , viewControllers.userLogin);
router.get('/register', viewControllers.register);


module.exports = router;