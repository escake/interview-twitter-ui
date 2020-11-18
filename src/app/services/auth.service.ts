import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

const ENDPOINT_BASE = '/api/auth';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const authToken = this.generateAuthToken(username, password);
    this.setAuthToken(authToken);
    this.storeUsername(username);
  }

  getAuthToken(): string {
    const authToken = localStorage.getItem("token");
    return authToken ? authToken : "";
  }

  setAuthToken(authToken: string) {
    localStorage.setItem("token", authToken);
  }

  private clearAuthToken() {
    localStorage.removeItem("token");
  }

  private clearCredentials() {
    localStorage.removeItem("username");
  }

  generateAuthToken(username: string, password: string): string {
    return btoa(username + ":" + password);
  }

  getCurrentUser(): string {
    const username = localStorage.getItem("username");
    return username ? username : null;
  }

  private storeUsername(username: string) {
    localStorage.setItem("username", username);
  }

  logout() {
    this.clearAuthToken();
    this.clearCredentials();
  }

  register(username: string, fullName: string, password: string) { //todo create dto
    return this.http.post(ENDPOINT_BASE + '/register', {username, fullName, password});
  }
}
