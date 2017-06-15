const jwt = require('jsonwebtoken');

module.exports= {
  verifyUser: (req, res, next)=>{
    jwt.verify(req.headers.token, 'rahasia', (err, decoded)=>{
      if(decoded){
        console.log(`decode data is: --------`, decoded);
        req.decoded = decoded;
        next();
      } else {
        res.send({
          error: err,
          msg: 'You are not login, please login first!!'
        });
      }
    })
  }
}
