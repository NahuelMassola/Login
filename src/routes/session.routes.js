const {Router} = require('express');
const sessionController = require('../controller/session.Controller')

const router = Router();

router.post('/login' , sessionController.sessionLogin);
router.post('/register', sessionController.register);
router.get("/logout", sessionController.logout);



module.exports = router;