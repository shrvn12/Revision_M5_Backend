const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminauthenticator = (req, res, next) => {
    const data = req.body;
    // if(!data.email || !data.password){
    //     return res.send({msg:'please provide email and password'});
    // }
    if(!req.headers.authorization){
        return res.send({msg:'you are not logged in'});
    }
    const token = req.headers.authorization;
    jwt.verify(token, process.env.key,async (err, decoded) => {
        if(err){
            return res.send({msg:'you are not authorized'});
        }
        let users = await fetch('https://reqres.in/api/users');
        users = await users.json();
        const user = users.data.filter(elem => elem.email == decoded.email)[0];
        if(user){
            next();
        }
        else{
            res.send({msg:'you are not authorized'});
        }
    });
    
}

module.exports = {
    adminauthenticator
}