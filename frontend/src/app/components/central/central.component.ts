import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-central',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, CentralComponent, FooterComponent],
  providers: [AccountService, UserService],
  templateUrl: './central.component.html',
  styleUrl: './central.component.scss'
})

export class CentralComponent implements OnInit {

  balance: number = 2;

  user: {
    name: string,
    saldoTotal: number,
    momento: Date,
    transacoes: {
      id: number,
      tipo: string,
      data: Date,
      detalhes: string,
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

  isRotated = false;
  toggleRotation(): void {
    this.isRotated = !this.isRotated;
  }

  constructor(private accountService: AccountService, private userService: UserService) {

    this.user = {
      name: 'Admin',
      saldoTotal: 854500,
      momento: new Date(),
      transacoes: [
        {
          id: 1,
          tipo: 'entrada',
          data: new Date(),
          detalhes: 'Reembolso',
          valor: 500.00
        },
        {
          id: 2,
          tipo: 'saída',
          data: new Date(),
          detalhes: 'Saque ATM',
          valor: -200.00
        },
        {
          id: 3,
          tipo: 'saída',
          data: new Date(),
          detalhes: 'Compra Online',
          valor: -300.00
        },
        {
          id: 4,
          tipo: 'saída',
          data: new Date(),
          detalhes: 'Compra online',
          valor: -300.00
        },
        {
          id: 5,
          tipo: 'entrada',
          data: new Date(),
          detalhes: 'Salário',
          valor: 3700.00
        },
        {
          id: 6,
          tipo: 'entrada',
          data: new Date(),
          detalhes: 'Reembolso 2',
          valor: 500.00
        },
        {
          id: 7,
          tipo: 'saída',
          data: new Date(),
          detalhes: 'Saque ATM 2',
          valor: -200.00
        },
        {
          id: 8,
          tipo: 'saída',
          data: new Date(),
          detalhes: 'Compra Online 2',
          valor: -300.00
        },
        {
          id: 9,
          tipo: 'saída',
          data: new Date(),
          detalhes: 'Compra online 2',
          valor: -300.00
        },
        {
          id: 10,
          tipo: 'entrada',
          data: new Date(),
          detalhes: 'Salário 2',
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
    }

  }

  ngOnInit(): void {
    this.accountService.getBalance().subscribe({
      next: (balanceData) => {
        // console.log(balanceData);
        this.balance = balanceData;
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      },
    });


    this.userService.getUser().subscribe({
      next: (userData) => {
        // console.log(userData);
        this.user.name = userData.name;
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      },
    });
  }




}

