const { emailValidate , passwordValidate } = require('../utils/validate');

const RegisterInitialCheck = (req,res,next) => {
    const {email, password, confirmPassword } = req.body;
    if(
        typeof email === 'string' &&
        typeof password === 'string' &&
        typeof confirmPassword === 'string' &&
        confirmPassword === password &&
        email.length > 0 &&
        password.length > 8 &&
        emailValidate(email) &&
        passwordValidate(password)
    ){
        next();
    }else{
        res.status(401).send("Initial Checks Failed");
    }

}

module.exports = RegisterInitialCheck;
