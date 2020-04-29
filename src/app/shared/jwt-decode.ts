import * as jwt_decode from 'jwt-decode';

export function jwtDeocde( token ) {
    return jwt_decode(token); 
}