import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AccountService],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent {
  currentBalance: number = 0;
  showInput: boolean = false;
  email: string = '';
  beneficiario: string = 'Alguem da Silva';
  documento: string = '4753-5675-67';

  constructor(private accountService: AccountService) { }

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

  openInput() {
    this.showInput = true;
  }
  reloadPage() {
    window.location.reload();
  }
}
