import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CentralComponent } from '../../components/central/central.component';
import { TransacoesComponent } from '../../components/transacoes/transacoes.component';
import { NavigationService } from '../../services/navigation.service';
import { WithdrawalComponent } from '../../components/withdrawal/withdrawal.component';
import { TransferComponent } from '../../components/transfer/transfer.component';
import { TicketComponent } from '../../components/ticket/ticket.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    FooterComponent,
    FormsModule,
    RouterOutlet,
    CentralComponent,
    TransacoesComponent,
    RouterModule,
    WithdrawalComponent,
    TransferComponent,
    TicketComponent
  ]
})
export class HomeComponent implements OnInit {

  user: {
    name: string,
    momento: Date,
    avatar: string
  };

  cumprimento: string;

  menuIconChecked = false;

  selectedComponent: string = 'central';



  constructor(private navigationService: NavigationService, private router: Router) {

    this.user = {
      name: 'Admin',
      momento: new Date(),
      avatar: '../../../assets/perfil.png'
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

  ngOnInit(): void {
    this.navigationService.selectedComponent$.subscribe(component => {
      this.selectedComponent = component;
    });
  }

  chooseComponent($event: any) {
    if ($event.srcElement.id === 'central') {
      this.selectedComponent = 'central';
    } else if ($event.srcElement.id === 'transacoes') {
      this.selectedComponent = 'transacoes';
    } else if ($event.srcElement.id === 'deposito') {
      this.selectedComponent = 'deposito';
    } else if ($event.srcElement.id === 'saque') {
      this.selectedComponent = 'saque';
    } else if ($event.srcElement.id === 'transfer') {
      this.selectedComponent = 'transfer';
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/land']);
 }





}





