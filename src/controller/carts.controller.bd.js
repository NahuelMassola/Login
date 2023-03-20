const BdProductManager = require("../dao/mongoManager/BdProductManager");
const BdCartManager = require("../dao/mongoManager/BdCartManager");
const {mapProductCart,CalculateQuantityTotal, CalculateCartTotal } = require ('../utils/calculosCarts')
const cartsModel = require('../dao/models/carts.model')


const createCart = async (req,res)=>{
  try {
    const {products = []} = req.body
    let {productCartList, productsNotFound} = await mapProductCart(products)
    const cart = {
      priceTotal: CalculateCartTotal(productCartList),
      quantityTotal: CalculateQuantityTotal(productCartList),
      products:productCartList,
    }
    await BdCartManager.Create(cart)
    return res.json({
      msg:"Carrito Creado",
      playload: {cart, productsNotFound},
    })

  } catch (error) {
    return res.status(500).json({
      msg:"Error",
      playload: error.message,
    })     
  }
  
}

const getAllCart = async (req , res) => {
  let getAll = await cartsModel.find({})
  return res.status(200).json(getAll)
}



const bdgetCartId = async (req, res) => {
  try {
        const {cid} = req.params
        const cart = await BdCartManager.getCartsId(cid);
      if(cart){
        return res.json({
          msg:"Carrito Encontrado",
          playload: cart,
        })

      }
      
    } catch (error) {
      return res.status(500).json({
        msg:"error",
        playload:error.message,
       })
    }
    

}

const  emptyToCart = async(req, res)=>{
  try {
    const {cid} = req.params;        
    const Cart = await BdCartManager.getCartsId(cid);

     Cart.products = [];
     Cart.quantityTotal = 0
    Cart.priceTotal = 0
    await BdCartManager.updateToCart(cid,Cart)
    return res.json({
       msg:"Carrito Vacio",
     })
  
  } catch (error) {
    return res.status(500).json({
      msg:"error",
      playload:error.message,
     })
  }

}

const deleteProductToCart = async (req, res)=>{
   try {
     const { cid, pid } = req.params;        
     const Cart = await BdCartManager.getCartsId(cid);
     if(!Cart){
        return res.status(400).json({
          msg:"Carrito no encontrado",
          ok:false,
        }) 
     }
    
     const product = await BdProductManager.getProductId(pid);
     if(!product){
      return res.status(400).json({
        msg:"Producto no encontrado en Base de Dato",
        ok:false,
      }) 
      }
     
      
     const findProductTocart = Cart.products.some(({product})=> product._id == pid) 
    
     if(!findProductTocart){
         return res.status(400).json({
         msg:"Producto no existe en el carrito",
         ok:false,
       })  
      }
        Cart.products = Cart.products.filter(({product})=> product._id != pid)
        Cart.quantityTotal = CalculateQuantityTotal(productCartList)
        Cart.priceTotal = CalculateCartTotal(Cart.products)
         await BdCartManager.updateToCart(cid,Cart)
          return res.status(201).json({
            msg:"Producto Eliminado",
            Cart: Cart
          })  
       
   } catch (error) {
        return res.status(500).json({
         msg:"error",
         playload:error.message,
        })
   }
}  


const UpdateToQuantityProduct = async(req,res)=> {
try {
  const { cid, pid,} = req.params;
  const {quantity = 0} = req.body;
  
  const Cart = await BdCartManager.getCartsId (cid);
    if (!Cart){
     return res.status(400).json({
       msg:"Carrito no encontrado",
       ok:false,
      })  
  }
  const product = await BdProductManager.getProductId(pid);
  if (!product){
    return res.status(400).json({
      msg:"Producto no encontrado en base de Datos",
      ok:false,
     })  
 }
   const findProductTocart = Cart.products.findIndex(({product})=> product._id == pid)
  
  if (findProductTocart === -1){
    return res.status(400).json({
      msg:"Producto no encontrado en el Carrito",
      ok:false,
     })  
    }
    Cart.products[findProductTocart].quantity += quantity 
    Cart.priceTotal = CalculateCartTotal(Cart.products)
    await BdCartManager.updateToCart(cid,Cart)
    return res.status(201).json({
    msg:"Cantidad Actualizada",
    Cart: Cart
  })  
  
  
} catch (error) {
  return res.status(500).json({
    msg:"error",
    playload:error.message,
   })
}

}


const UpdateToProductsToCart = async(req, res)=>{

  try {
    const {cid} = req.params
    const Cart = await BdCartManager.getCartsId(cid);
    if (!Cart){
      return res.status(400).json({
      msg:"Carrito Inexistente",
      ok:false,
    })  
  }
  const {products = []} = req.body
  let {productCartList, productsNotFound} = await mapProductCart(products)
 
  const upateCart = {
    priceTotal: CalculateCartTotal(productCartList),
    quantityTotal:CalculateQuantityTotal(productCartList),
    products:productCartList,
  }
  await BdCartManager.updateToCart(cid, upateCart )

  return res.json({
    msg: "Carrito Actualizado",
    payload: { productCartList, productsNotFound },
    carts: Cart
  })

  } catch (error) {
    return res.status(500).json({
			msg: 'Error',
			payload: error.message,
		})
  }
}
module.exports = {
    createCart, 
    bdgetCartId,
    deleteProductToCart,
    emptyToCart, 
    UpdateToQuantityProduct,
    UpdateToProductsToCart,
    getAllCart
}

