const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    //Extarct the jwt token from header

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing....Token is not found' });
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    if(!token)
        return res.status(401).json({error:'Unauthorized'});

    try{
        //jwt token verify
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to the request object
        req.user=decoded;
        next();

    }catch(err){
     console.log(err);
     res.status(401).json({error:'Invalid user'});
    }
}

//function to generate jwt token

const generateToken=(userData)=>{
    //Generate new JWT token using userData

    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'1h'})
}

module.exports={jwtAuthMiddleware,generateToken};

