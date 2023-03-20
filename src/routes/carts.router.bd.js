const {Router} = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd')


const router =  Router();


router.post('/', cartsControllerBd.createCart)
router.get ("/", cartsControllerBd.getAllCart)
router.get('/:cid', cartsControllerBd.bdgetCartId)
router.delete('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.delete('/:cid', cartsControllerBd.emptyToCart);
router.put('/:cid/product/:pid', cartsControllerBd.UpdateToQuantityProduct);
router.put('/:cid', cartsControllerBd.UpdateToProductsToCart);

module.exports = router;

