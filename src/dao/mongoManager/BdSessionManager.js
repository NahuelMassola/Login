const userModel = require('../models/user.model');

class BdSessionManager {
    
    getsession = async (email , password) =>{
        return await userModel.findOne({email  });
    }

    createSession = async (user ) => {
        const { firstName , lastName , email , password , rol} = user
        return await userModel.create({firstName ,lastName ,email , password ,rol})
    }
}


module.exports = new BdSessionManager