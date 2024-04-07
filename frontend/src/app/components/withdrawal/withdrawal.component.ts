import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AccountService],
  templateUrl: './withdrawal.component.html',
  styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent implements OnInit {

  currentBalance: number = 0;
  withdrawValue: number = 0;
  otherValue: number = 0;
  showInput: boolean = false;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getBalance().subscribe({
      next: (balanceData) => {
        this.currentBalance = balanceData;
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }


  requestWithdraw(): void {
    let valueInReal = 0;
    if (this.showInput) {
      valueInReal = this.otherValue * 100;
    } else {
      valueInReal = this.withdrawValue * 100;
    }
    if (valueInReal <= 0) {
      alert('Saldo invalido');
    } else if (valueInReal <= this.currentBalance) {
      alert('Saque solicitado: ' + (valueInReal / 100).toFixed(2));

      this.accountService.withdraw(valueInReal).subscribe({
        next: (response: any) => {
          console.log(response)
          alert('Saque realizado com sucesso.');
          this.reloadPage();
        },
        error: (error: any) => {
          console.log('erro no logiin:' + error)
          alert('Login inválido. Por favor, verifique suas credenciais.');
        }
      })
    } else {
      alert('Saldo insuficiente');
    }
  }

  selectValue(value: number) {
    this.withdrawValue = value;
    this.showInput = false;
  }

  openInput() {
    this.showInput = true;
  }


}
