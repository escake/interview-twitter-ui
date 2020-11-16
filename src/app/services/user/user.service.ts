import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserOverviewModel } from '../../models/user-overview.model';

const ENDPOINT_BASE = '/api/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { 
  }

  userOverview(username: string) {
    return this.http.get<UserOverviewModel>(ENDPOINT_BASE + '/overview/' + username);
  }

}
