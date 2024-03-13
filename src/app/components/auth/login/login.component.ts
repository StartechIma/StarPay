import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
  })
export class LoginComponent {
  loginForm = new FormGroup({
    cpf: new FormControl('', Validators.required),    
    password: new FormControl('', Validators.required)
  });

  loginError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Verificar se há um usuário autenticado ao carregar a página
    const currentUser = this.userService.getCurrentUser();

    if (currentUser) {
      console.log('Usuário já autenticado. Redirecionando...');
      
    }
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const cpfControl = this.loginForm.get('cpf');
      const passwordControl = this.loginForm.get('password');

      if (cpfControl && passwordControl) {
        const cpf = cpfControl.value ? cpfControl.value.trim() : '';
        const password = passwordControl.value ? passwordControl.value.trim() : '';

        if (cpf && password) {
          // Se o CPF e a senha forem preenchidos, tente autenticar
          if (this.validateUser(cpf) && this.validatePassword(password)) {
            this.router.navigate(['/home']);
          } else {
            console.log("Erro: Usuário ou senha inválidos.");
            this.loginError = true;
          }
        }
      } else {
        console.log("Erro: Campos do formulário não acessíveis.");
        this.loginError = true;
      }
    } else {
      console.log("Erro: Campos obrigatórios não preenchidos.");
      this.loginError = true;
    }
  }

  validateUser(cpf: string): boolean {
    // Lógica para validar o CPF (pode ser implementada conforme necessário)
    return true; // Por enquanto, sempre retornando true
  }

  validatePassword(password: string): boolean {
    // Lógica para validar a senha (pode ser implementada conforme necessário)
    return true; // Por enquanto, sempre retornando true
  }
}