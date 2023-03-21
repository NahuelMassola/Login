const BdSessionManager = require('../dao/mongoManager/BdSessionManager')

const sessionLogin = async (req ,res) => {
    try {
        const { email , password} = req.body
        const user = await BdSessionManager.getsession(email , password)
        if (!user){
            res.status(400).send(`Email o password incorrectas, Sino tienes una cuenta registrate Registrate`)
        } else {
            req.session.firstname = user.firstName.toUpperCase();
            res.send(user)
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
        return res.json({
            message:"ingresaste como Administrador",
            user: {
                firstName,
                lastName
            }
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
        return res.json({
            message:"ingresaste como Usuario",
            user: {
                firstName,
                lastName
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Error",
            playload: error.message
        })
    }
}

module.exports = {sessionLogin , register}