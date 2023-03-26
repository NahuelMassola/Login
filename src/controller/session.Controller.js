const userModel = require('../dao/models/user.model')
const BdProductManager = require('../dao/mongoManager/BdProductManager')
const BdSessionManager = require('../dao/mongoManager/BdSessionManager')
const { isValidPassword, createHashValue } = require('../utils/encrypt')


const sessionLogin = async (req ,res) => {
    try {
        const { email , password} = req.body
        const user = await BdSessionManager.getsession(email)
        if (!user){
            res.status(401).json({message: "Email o contraseña incorrcto, sino tiene usuario por favor registrese"})
        } 
        const isValidComparePsw = await isValidPassword(password , user.password);
        if(!isValidComparePsw) {
            return res.json({menssage: "Password incorrecta"})
        }

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") { 
            const products = await BdProductManager.getProduct();
                res.render("viewProduct", {
                    products: products,
                    lastName: req.session?.users?.last_name || user.lastName.toUpperCase(),
                    firstName: req.session?.users?.firstName || user.firstName.toUpperCase(),
                    rol: "Administrador"
                })
        } else { const products = await BdProductManager.getProduct();
            res.render("viewProduct", {
                products: products,
                lastName: req.session?.users?.last_name || user.lastName.toUpperCase(),
                firstName: req.session?.users?.firstName || user.firstName.toUpperCase(),
                rol: "Usuario"
            })}
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
        const pswHashed = await createHashValue(password); 

        const user = {
            firstName,
            lastName,
            email,
            password: pswHashed,
            rol: "users"
        }
        const users = await BdSessionManager.createSession(user)
        req.session.user = { firstName ,lastName , email , rol}
        return res.json(users)
        
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



/* if (email === "adminCoder@coder.com" && password === "adminCod3r123") { 
    req.session.firstName = user.firstName.toUpperCase();
    req.session.lastName = user.lastName.toUpperCase();
    const products = await BdProductManager.getProduct();
        res.render("viewProduct", {
            products: products
        })
} else { const products = await BdProductManager.getProduct();
    req.session.firstName = user.firstName.toUpperCase();
    req.session.lastName = user.lastName.toUpperCase();
    res.render("viewProduct", {
        products: products
    })} */

