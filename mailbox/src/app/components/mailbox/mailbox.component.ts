import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mail, MailService } from '../mail.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
  providers: [MailService]
})
export class MailboxComponent implements OnInit, OnDestroy {

  mails!: Mail[]
  mailsSub!: Subscription; 
  mail!: Mail;

  constructor( private mailService: MailService) { }

  ngOnInit(): void {
    this.mailsSub = this.mailService.getAll().subscribe(mails => {
      this.mails = mails
    })
  }

  getMail(): void {
    for (let i = 0; i < this.mails?.length; i++) {
      this.mail = this.mails[i]
      i++
    }
  }

  ngOnDestroy() {
    if (this.mailsSub) {
      this.mailsSub.unsubscribe()
    }
  }

}
