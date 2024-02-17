import { Injectable } from '@angular/core';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageUser = 'userData';

  constructor() { }

  // Método para registrar um novo usuário
  registerUser(user: User): void {
    // Adicione uma verificação para evitar adicionar usuários com campos obrigatórios vazios
    if (user && user.fullName && user.cpf && user.phone && user.address && user.password) {
      const existingUsers = this.getUsers();
      existingUsers.push(user);
      this.saveUsers(existingUsers);
    } else {
      alert('Tentativa de registrar usuário inválido. Campos obrigatórios ausentes.');
    }
  }

  // Método para obter todos os usuários armazenados
  getUsers(): User[] {
    const userData = localStorage.getItem(this.localStorageUser);
    return userData ? JSON.parse(userData) : [];
  }

  // Método para salvar os usuários no localStorage
  saveUsers(users: User[]): void {
    localStorage.setItem(this.localStorageUser, JSON.stringify(users));
  }
}
