const {Router} = require('express');


const router = Router();


router.get('/welcome' , async (req ,res) => {
    const { name } = req.query
    const counter = req.session?.counter

    if(!counter) {
        req.session.counter = 1
        req.session.user = name;
    req.session.admin = true;
        return res.send (`te damos la bienvenida ${name}`)
    }

    req.session.user = name;
    req.session.admin = true;
    req.session.counter++
    return res.send(`has ingresado ${name} exitosamente ${counter} veces`);
});


module.exports = router;