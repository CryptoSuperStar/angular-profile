import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private newUserSubject = new Subject<User>();
  private newKeywordSubject = new Subject<string>();
  private newEditSubject = new Subject<boolean>();
  newUser$ = this.newUserSubject.asObservable();
  keyword$ = this.newKeywordSubject.asObservable();
  isEdit$ = this.newEditSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  users: User[] = [];

  addNewUser(user: User) {
    this.newUserSubject.next(user);
  }

  updateKeyword(keyword: string) {
    this.newKeywordSubject.next(keyword);
  }

  updateUserData(user: User) {
    console.log(user,"user =========")
   this.users.forEach((data, index) => {
    if(data.id == user.id) {
      this.users[index].firstName = user.firstName;
      this.users[index].lastName = user.lastName;
      this.users[index].email = user.email;
      this.users[index].street = user.street;
      this.users[index].city = user.city;
      this.users[index].zipcode = user.zipcode;
      this.users[index].country = user.country;
    }
   })
 }
  isEditStatus(editStatus: boolean) {
    this.newEditSubject.next(editStatus);
  }

  getUsersList(): Observable<User[]> {
    if(this.users.length)
      return of(this.users)
    else
      return Observable.create((observer: any) => {
        this.http.get<any>('assets/users.json').subscribe(
          (response) => {
            this.users = response;
            observer.next(response);
            observer.complete();
          },
          (error) => {
            observer.error(error);
            observer.complete();
          }
        );
      });
  }

  getUserById(id: number): Observable<User | undefined> {
    if (id && this.users.length) {
      const user = this.users.find(user => user.id === id);
      return of(user);
    }
    return of(undefined);
  }
}
