import { TokenDecode } from "../utilities/TokenUtility.js";

export default (req,res,next)=>{

    let token= req.headers['token'];
    let decodedToken=TokenDecode(token);
   
    if(decodedToken==null){
        res.json({status: "fail", "Message": " Unauthorized " });
    }else{
        req.headers.email=decodedToken.email;
        req.headers.user_id=decodedToken.user_id;
        console.log(req.headers.user_id)
        next();
    }

}