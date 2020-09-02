import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser: any = localStorage.getItem('CurrentUser');

        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    'Authorization': currentUser
                }
            });
        }

        return next.handle(request);
    }
}

