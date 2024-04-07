import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:5287/v1/transactions';

  constructor(private httpRequest: HttpClient, private router: Router) { }
 

  getAll(): Observable<any> {
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
    const url = `${this.apiUrl}/getall`;
    return this.httpRequest.get<any>(url, { headers })
      .pipe(
        map(customer => customer),
        catchError(() => throwError(() => new Error('Ops! Algo deu errado. Tente novamente mais tarde.')))
      );

  }

}
