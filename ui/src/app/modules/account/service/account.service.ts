import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { IAccount, IAccountQueryParams } from '../account.model';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  getAllAccounts(params?: IAccountQueryParams): Observable<IAccount[]> {

    if (params) {
      return this.http.get<any>(ApiEndpoint.ACCOUNTS, { params: params as any });
    } else {
      return this.http.get<any>(ApiEndpoint.ACCOUNTS);
    }

  }

  getAccountById(id: number): Observable<IAccount> {
    return this.http.get<any>(ApiEndpoint.ACCOUNTS + "/" + id);
  }

  createAccount(account: IAccount): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(ApiEndpoint.ACCOUNTS, account);
  }

  updateAccount(account: IAccount, id: number): Observable<IActionResponse> {
    return this.http.put<IActionResponse>(ApiEndpoint.ACCOUNTS + "/" + id, account);
  }

  deleteAccount(id: number): Observable<IActionResponse> {
    return this.http.delete<IActionResponse>(ApiEndpoint.ACCOUNTS + "/" + id);
  }


}
