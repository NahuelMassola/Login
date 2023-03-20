const productModel = require('../models/products.model')

class BdProductManager {
  addProduct = async (product) => {
    return await productModel.create(product);
  
}
  getProduct = async (page = 1, limit = 10 , sort = '', query ={}) => {
      return  await productModel.paginate(query, { page, limit, sort:{price:sort}});
  }

  getProductId = async (id) => {
   return await productModel.findById(id);
  }

  UpdateProduct = async (id, product) => {
     return await productModel.updateOne({_id:id}, product);
     
  }

  DeleteProductId = async (id) => {
     return await productModel.deleteOne({_id:id});

  }

}

module.exports = new BdProductManager
