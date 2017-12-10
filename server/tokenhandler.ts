import * as jwt from 'jsonwebtoken';

export class TokenHandler {

  private token: string;
  private secret_token: string;
  req: any;

  constructor( req ){
    // get request object
    this.req = req;
    // extract token key
    this.token = req.headers.authorization;
    // get secret token
    this.secret_token = process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : null;
  }

  public checkToken = () => {

    if(this.token && this.secret_token){

      // Decode the token - synchronous
      try {
          const decoded =  jwt.verify(this.token, this.secret_token);
          if(decoded.user.role === 'admin'){
            return true;
          }else{
            console.log('user should have admin permissions');
            return false;
          }


      } catch(err) {
        console.log( 'error at token handler');
        console.log(err);
      }

    }else{
       console.log('no token or wrong secret');
       return false;
    }
  }

}

export default TokenHandler;
