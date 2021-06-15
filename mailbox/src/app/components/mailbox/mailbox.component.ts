import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { defer, from, Observable, of, Subscription, timer } from 'rxjs';
import { Mail, MailService } from '../mail.service';
import { interval } from 'rxjs';
import { bufferCount, concatAll, concatMap, delay, map } from 'rxjs/operators';
@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
  providers: [MailService]
})
export class MailboxComponent implements OnInit, OnDestroy {

  mails: Mail[] = []
  mailsSub!: Subscription; 
  newMail!: Mail[];
  s2 = defer(() => of(new Date()));

  constructor( private mailService: MailService) { }
  
  ngOnInit(): void {
    this.mailsSub = this.mailService.getAll()
    .pipe(
      concatAll(),
      bufferCount(1),
      concatMap((arr, i) =>
        timer(i > 0 ? 4000 : 0).pipe(
          map(() => arr)
        )
      )
    )
    .subscribe(arr => this.mails = [...this.mails, ...arr])
  }

  getCurrentDate(el: any) : Date {
    return el.date = new Date()
  }
   
  removeMail(index: number): void {
    delete this.mails[index]
  }

  ngOnDestroy() {
    if (this.mailsSub) {
      this.mailsSub.unsubscribe()
    }
  }

}
