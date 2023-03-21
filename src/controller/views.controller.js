const ProductManager = require("../dao/fsManager/ProductManager");
const Product = new ProductManager('./assets/product.json');
const { emitDeleteProduct } = require("../utils/soket.io");
const { emitaddRealtime } = require("../utils/soket.io");


//views Home
const views = async (req, res) => {
    let products = await Product.getProducts();
    res.render("home",{
    products
} );       
}

//views RealTimeProducts

const RealTimeProduct = async (req, res) =>{
    res.render('realTimeProducts')
}

const renderChats =(req, res)=>{
  res.render('chats')
}

const userLogin = (req , res) =>{
  res.render('login')
}

const register = (req ,res) =>{
  res.render('register')
}


const deleteRealTimeProduct = async (req, res) =>{
  const id = +req.params.pid 
  const Delete = await Product.deleteProduct (id);
  if (Delete.erro){
    res.json(Delete);
  }else{
    emitDeleteProduct(id)
    res.json(Delete);
  }
}

const addRealTimeProduct = async (req, res)=>{
    const body = req.body;
    const add = await Product.addProduct(body);
    if (add.erro){
      res.json(add)
    }else{
      emitaddRealtime(add)  
      res.json(add);
    }
}






module.exports ={
    views,
    RealTimeProduct,
    deleteRealTimeProduct,
    addRealTimeProduct,
    renderChats,
    userLogin,
    register
}
