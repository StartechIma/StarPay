export interface CustomerRequest {
  name: string;
  email: string;
  phone: string;
  clientType: string;
  loginPassword: string;
}

export interface AddressRequest {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LegalEntityRequest {
  cnpj: string;
  fantasyName: string;
  stateRegistration: string;
  annualBillingInCents: number | null;
  taxation: string;
}

export interface AccountRequest {
  accountType: number;
  keyPix: string;
  passwordTransaction: string;
  confirmPasswordTransaction: string;
}

export interface ContaPJ {
  customerRequest: CustomerRequest;
  addressRequest: AddressRequest;
  legalEntityRequest: LegalEntityRequest;
  accountRequest: AccountRequest;
}
