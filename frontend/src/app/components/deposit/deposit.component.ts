import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AccountService],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss'
})
export class DepositComponent {
  value: number = 0;
  constructor(private accountService: AccountService) { }

  depositar(): void {
    const valueInReal = this.value * 100;
    this.accountService.deposit(valueInReal).subscribe({
      next: (response: any) => {
        console.log(response)
        alert('Depósito realizado com sucesso, verifique seu saldo.');
      },
      error: (error: any) => {
        console.log('erro no logiin:' + error)
        alert('Login inválido. Por favor, verifique suas credenciais.');
      }
    })
  }


}

