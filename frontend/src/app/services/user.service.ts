import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, map, throwError } from 'rxjs';
import { ContaPJ } from '../Models/ContaPJ';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5287/v1/customer';
  private accUrl = 'http://localhost:5287/v1/account/customer';

  constructor(private httpRequest: HttpClient, private router: Router) { }

  register(registerData: ContaPJ | undefined): Observable<any> {
    const registerUrl = `${this.apiUrl}/registracontapj`;
    return this.httpRequest.post<any>(registerUrl, registerData).pipe(first());
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    const loginUrl = `${this.apiUrl}/login`;
    return this.httpRequest.post<any>(loginUrl, loginData).pipe(first());
  }


  getUser(): Observable<any> {
    const currentUserString = localStorage.getItem('currentUser');
    let currentUser;

    if (currentUserString) {
      currentUser = JSON.parse(currentUserString);
    } else {
      alert('Nenhum usuário logado.');
      this.router.navigate(['/login']);
    }
    console.log("Usuário localstorage = " + JSON.stringify(currentUser));
    const token = currentUser.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpRequest.get<any>(this.accUrl, { headers })
      .pipe(
        map(customer => customer),
        catchError(() => throwError(() => new Error('Ops! Algo deu errado. Tente novamente mais tarde.')))
      );

  }



}


