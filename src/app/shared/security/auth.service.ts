import { Injectable } from '@angular/core';
import {FirebaseAuth, FirebaseAuthState} from 'angularfire2/index';
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {AuthInfo} from "./auth-info";
@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject(AuthService.UNKNOWN_USER);

  constructor(private auth: FirebaseAuth) { }

  signUp(email,password){
    return this.fromFirebaseAuthPromise(this.auth.createUser({email,password}));
  }


  login(email, password):Observable<FirebaseAuthState> {
    return this.fromFirebaseAuthPromise(this.auth.login({email, password}));
  }

  logout(){
    this.auth.logout();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
  }

  fromFirebaseAuthPromise(promise):Observable<any>{
    const subject=new Subject<any>();
    promise
      .then(res =>{
          const authInfo = new AuthInfo(this.auth.getAuth().uid);
          this.authInfo$.next(authInfo);
          subject.next(res);
          subject.complete();
        },
        err => {
          this.authInfo$.error(err);
          subject.error(err);
          subject.complete();
        });
    return subject.asObservable();
  }
}
