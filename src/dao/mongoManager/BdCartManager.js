const cartsModel = require('../models/carts.model')


class BdCartsManager {
	  getCartsId = async (id) => {
      return await cartsModel.findById(id).lean().populate('products.product');
    }

    Create = async (carts)=>{
            return await cartsModel.create(carts);
    } 	

    updateToCart = async(cid,cart)=>{
      return await cartsModel.updateOne({_id:cid},cart)
    }
}
module.exports = new BdCartsManager ;
