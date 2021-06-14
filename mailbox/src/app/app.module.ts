import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MailboxComponent } from './components/mailbox/mailbox.component';
import { MailComponent } from './components/mail/mail.component';



@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
