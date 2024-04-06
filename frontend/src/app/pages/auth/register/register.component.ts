import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { ContaPJ } from '../../../Models/ContaPJ';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {
  currentModal: number = 1;
  currentModalIndex: number = 0;

  states: string[] = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
    'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
    'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina',
    'São Paulo', 'Sergipe', 'Tocantins'
  ];


  fantasyName: string = '';
  cnpj: string = '';
  stateRegistration: string = '';
  annualBillingInCents: number | null = null;
  taxation: string = '';

  name: string = '';
  email: string = '';
  phone: string = '';
  clientType: string = "PJ";
  loginPassword: string = '';

  addressStreet: string = '';
  addressNumber: string = '';
  addressComplement: string = '';
  addressNeighborhood: string = '';

  street: string = '';
  city: string = '';
  zipCode: string = '';
  country: string = '';
  state: string = '';
  createdAt = this.formatDate(new Date());
  updatedAt = this.formatDate(new Date());
  deletedAt: string | null = null;

  accountType: number = 0;
  keyPix: string = '';
  passwordTransaction: string = '';
  confirmPasswordTransaction: string = '';

  novaConta: ContaPJ | null = null;
  loginError: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  register(): void {
    this.novaConta = {
      "customerRequest": {
        "name": this.name,
        "email": this.email,
        "phone": this.phone,
        "clientType": this.clientType,
        "loginPassword": this.loginPassword
      },
      "addressRequest": {
        "street": this.street = `Rua:${this.addressStreet}, Nº${this.addressNumber}, Bairro:${this.addressNeighborhood}. Complemento:${this.addressComplement}`,
        "city": this.city,
        "state": this.state,
        "zipCode": this.zipCode,
        "country": this.country,
        "createdAt": this.createdAt,
        "updatedAt": this.updatedAt,
        "deletedAt": this.deletedAt
      },
      "legalEntityRequest": {
        "cnpj": this.cnpj,
        "fantasyName": this.fantasyName,
        "stateRegistration": this.stateRegistration,
        "annualBillingInCents": this.annualBillingInCents,
        "taxation": this.taxation
      },
      "accountRequest": {
        "accountType": this.accountType,
        "keyPix": this.keyPix,
        "passwordTransaction": this.passwordTransaction,
        "confirmPasswordTransaction": this.confirmPasswordTransaction
      }
    }
    this.userService.register(this.novaConta).subscribe({
      next: (response: any) => {
        console.log(response)
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this.loginError = true;
        console.log('erro no logiin:' + error)
        alert('Cadastro inválido. Por favor, verifique seus dados.');
      }
    })
  }

  nextModal() {
    this.currentModal++;
    this.currentModalIndex++;
  }

  goBack() {
    if (this.currentModal > 1) {
      this.currentModal--;
      this.currentModalIndex--;
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

}


