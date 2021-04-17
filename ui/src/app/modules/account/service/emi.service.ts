import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../../shared/model/shared.model';
import { IEmi } from '../account.model';

@Injectable()
export class EmiService {

  constructor(
    private http: HttpClient
  ) { }

  getEmiList(accountNo: string): Observable<IEmi[]> {
    return this.http.get<IEmi[]>(ApiEndpoint.EMI_S + "/" + accountNo);
  }

}
