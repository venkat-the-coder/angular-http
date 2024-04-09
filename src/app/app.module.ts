import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { BookTrackerErrorHandlerService } from './core/book-tracker-error-handler.service';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ContentTypeInterceptor } from './core/Interceptors/content-interceptor';
import { LogResponseInterceptor } from './core/Interceptors/logresponse-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    DashboardComponent,
    EditBookComponent,
    EditReaderComponent,
    AddReaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    { provide: HTTP_INTERCEPTORS , useClass:ContentTypeInterceptor , multi:true},
    { provide: HTTP_INTERCEPTORS , useClass:LogResponseInterceptor , multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
