import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  // sharedData: string;

  private subject = new Subject<any>();

  setData(message: string) {
    // just an example:
    this.subject.next({ text: message });
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private httpClient: HttpClient) { }

  getEmployeeList(): Observable<any> {
    return this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/users`).pipe(
      catchError((err) => {

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

}
