import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  user: {
    name: string,
    saldoTotal: number,
    momento: Date,
    transacoes: {
      id: number,
      tipo: string,
      data: Date,
      detalhes: string[],
      valor: number
    }[],
    avatar: string,
    cartao: {
      numero: string,
      titular: string,
      validade: string,
      cvv: string,
      tipo: string
    }
  };

  cumprimento: string;

  constructor() {
    this.user = {
      name: 'Admin',
      saldoTotal: 854500,
      momento: new Date(),
      transacoes: [
        {
          id: 1,
          tipo: 'entrada',
          data: new Date(),
          detalhes: ['Conta corrente', 'Reembolso'],
          valor: 500.00
        },
        {
          id: 2,
          tipo: 'saída',
          data: new Date(),
          detalhes: ['Conta corrente', 'Saque ATM'],
          valor: -200.00
        },
        {
          id: 3,
          tipo: 'saída',
          data: new Date(),
          detalhes: ['Lorem Ipsum', 'Compra Online'],
          valor: -300.00
        },
        {
          id: 4,
          tipo: 'saída',
          data: new Date(),
          detalhes: ['Cartão de Crédito','Compra online'],
          valor: -300.00
        },
        {
          id: 5,
          tipo: 'entrada',
          data: new Date(),
          detalhes: ['Conta Corrente','Salário'],
          valor: 3700.00
        },
        {
          id: 5,
          tipo: 'entrada',
          data: new Date(),
          detalhes: ['Conta Corrente','Salário'],
          valor: 3700.00
        }
      ],
      avatar: '../../../assets/perfil.png',
      cartao: {
        numero: '1234 5678 9012 3456',
        titular: 'Admin',
        validade: '12/2000',
        cvv: '689',
        tipo: 'Mastercard'
      }
    };

    const horaAtual = this.user.momento.getHours();
    if (horaAtual >= 5 && horaAtual < 12) {
      this.cumprimento = 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
      this.cumprimento = 'Boa tarde';
    } else {
      this.cumprimento = 'Boa noite';
    }

  }


}