import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { ContaPJ } from '../Models/ContaPJ';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5287/v1/customer';

  constructor(private httpRequest: HttpClient) { }

  register(registerData: ContaPJ | undefined): Observable<any> {
    const registerUrl = `${this.apiUrl}/registracontapj`;
    return this.httpRequest.post<any>(registerUrl, registerData).pipe(first());
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    const loginUrl = `${this.apiUrl}/login`;
    return this.httpRequest.post<any>(loginUrl, loginData).pipe(first());
  }

}


