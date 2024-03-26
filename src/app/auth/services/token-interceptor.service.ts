
import {
  HttpInterceptorFn
} from '@angular/common/http';

import { AuthToken } from '../token/token';

export const
TokenInterceptorService : HttpInterceptorFn = (request
  , next)=> {

 const cloneRequest = request.clone({
   setHeaders:{
     Authorization: `Bearer ${AuthToken}`
   }
 })
return next(cloneRequest);
}
