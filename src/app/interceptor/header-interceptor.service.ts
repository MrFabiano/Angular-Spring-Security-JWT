import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{

  constructor() {}

  processaErro(error: HttpErrorResponse){
    let errorMessage = 'Error unknown';
    if(error.error instanceof ErrorEvent){
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    }else{
      if(error.status == 403){
        errorMessage = "Access Denied";
      }else{
      errorMessage = 'Code: ' + error.error.code + '\nMensagem: ' + error.error.error;
      
    }
  }

    window.alert(errorMessage)
    return throwError(errorMessage);

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(localStorage.getItem('token') !== null){
        const token = 'Bearer ' + localStorage.getItem('token');

        const tokenRequest = req.clone({
          headers: req.headers.set('Authorization', token)
        });

        return next.handle(tokenRequest).pipe(
          tap((event: HttpEvent<any>) => {
            if(event instanceof HttpResponse && (event.status === 200 || event.status === 201)){
              console.info('Operation success');
            }
          }),catchError(this.processaErro));

    }else{
      return next.handle(req).pipe(catchError(this.processaErro));
    }
  }
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
],

})

export class HttpInterceptorModule {}


