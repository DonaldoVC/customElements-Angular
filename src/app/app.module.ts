import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

import { BasicComponent } from './views/basic/basic.component';

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    BasicComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    BasicComponent
  ]
})
export class AppModule {

  constructor(private injector: Injector) {
    const basic = createCustomElement(BasicComponent, { injector });
    customElements.define('app-basic', basic);
  }

  ngDoBootstrap() {}
}
