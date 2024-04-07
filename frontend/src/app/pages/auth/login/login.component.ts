import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      console.log('Usuário já autenticado. Redirecionando...');
      this.router.navigate(['/lottie']);
    }
  }


  loginUser(): void {
    this.userService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        // console.log(response.token)
        localStorage.setItem('currentUser', JSON.stringify({ email: this.email, token: response.token }));
        this.router.navigate(['/lottie']);
      },
      error: (error: any) => {
        this.loginError = true;
        console.log('erro no logiin:' + error)
        alert('Login inválido. Por favor, verifique suas credenciais.');
      }
    })
  }


}
