const userModel = require('../dao/models/user.model')
const BdProductManager = require('../dao/mongoManager/BdProductManager')
const BdSessionManager = require('../dao/mongoManager/BdSessionManager')




const sessionLogin = async (req ,res) => {
    try {
        const { email , password} = req.body
        const user = await BdSessionManager.getsession(email , password )
        if (!user){
            res.status(400).send(`Email o password incorrectas, Sino tienes una cuenta registrate Registrate`)
        } 
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") { 
            req.session.firstname = user.firstName.toUpperCase();
            const products = await BdProductManager.getProduct();
                res.render("viewProduct", {
                    products: products
                })
        } 
    } catch (error) {
        res.status(500).json({
            message: "Error",
            playload: error.message
        })
    }
}

const register = async (req, res) =>{
    try {
        const {firstName , lastName ,email , password} = req.body
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        const userAdmin = {
            firstName,
            lastName,
            email,
            password,
            rol: "administrador"
        }
        const user = await BdSessionManager.createSession(userAdmin)
        return res.render("login", {
            user,
        })
    } 
        const user = {
            firstName,
            lastName,
            email,
            password,
            rol: "users"
        }
        const users = await BdSessionManager.createSession(user)
        return res.render("login", {
        })

    } catch (error) {
        return res.status(500).json({
            message:"Error",
            playload: error.message
        })
    }
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
      if (!err) return res.redirect("/login");
      return res.send({ message: `logout Error`, body: err });
    });
  }; 

module.exports = {sessionLogin , register , logout}


