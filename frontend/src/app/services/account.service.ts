import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accUrl = 'http://localhost:5287/v1/account';

  constructor(private httpRequest: HttpClient, private router: Router) { }

  getAccount(): Observable<any> {
    const currentUserString = localStorage.getItem('currentUser');
    let currentUser;

    if (currentUserString) {
      currentUser = JSON.parse(currentUserString);
    } else {
      alert('Nenhum usuário logado.');
      this.router.navigate(['/login']);
    }
    const token = currentUser.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.accUrl}/account`;
    return this.httpRequest.get<any>(url, { headers })
      .pipe(
        map(customer => customer),
        catchError(() => throwError(() => new Error('Ops! Algo deu errado. Tente novamente mais tarde.')))
      );

  }


  getBalance(): Observable<any> {
    const currentUserString = localStorage.getItem('currentUser');
    let currentUser;

    if (currentUserString) {
      currentUser = JSON.parse(currentUserString);
    } else {
      alert('Nenhum usuário logado.');
      this.router.navigate(['/login']);
    }
    const token = currentUser.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.accUrl}/balance`;
    return this.httpRequest.get<any>(url, { headers })
      .pipe(
        map(customer => customer),
        catchError(() => throwError(() => new Error('Ops! Algo deu errado. Tente novamente mais tarde.')))
      );
  }


  deposit(value: number): Observable<any> {
    const currentUserString = localStorage.getItem('currentUser');
    let currentUser;
    if (currentUserString) {
      currentUser = JSON.parse(currentUserString);
    } else {
      alert('Nenhum usuário logado.');
      this.router.navigate(['/login']);
      return throwError(() => new Error('Nenhum usuário logado.'));
    }
    const token = currentUser.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const url = `${this.accUrl}/deposit`;
    return this.httpRequest.post<any>(url, value, { headers })
      .pipe(
        tap(customer => console.log('Response:', customer)),
        catchError(error => {
          console.error('Deposit error:', error);
          return throwError(() => new Error('Ops! Algo deu errado no depósito. Tente novamente mais tarde.'));
        })
      );
  }

  withdraw(value: number): Observable<any> {
    const currentUserString = localStorage.getItem('currentUser');
    let currentUser;
    if (currentUserString) {
      currentUser = JSON.parse(currentUserString);
    } else {
      alert('Nenhum usuário logado.');
      this.router.navigate(['/login']);
      return throwError(() => new Error('Nenhum usuário logado.'));
    }
    const token = currentUser.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const url = `${this.accUrl}/withdraw`;
    return this.httpRequest.post<any>(url, value, { headers })
      .pipe(
        tap(customer => console.log('Response:', customer)),
        catchError(error => {
          console.error('Saque error:', error);
          return throwError(() => new Error('Ops! Algo deu errado no saque. Tente novamente mais tarde.'));
        })
      );
  }


}
