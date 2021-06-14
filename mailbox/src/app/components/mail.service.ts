import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';

export type Mail = {
    author : string,
    text : string,
    id : number,
    date: Date
}

@Injectable({providedIn: 'root'}) 

export class MailService {
    constructor (private http: HttpClient) {}

    getAll(): Observable<Mail[]> {
        return this.http.get('https://mailbox-175bf-default-rtdb.europe-west1.firebasedatabase.app/mails.json')
            .pipe(map((response: {[key: string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        date: new Date(),
                        author: response[key].Author,
                        text: response[key].Text
                    }))
                
            }))
    }
}