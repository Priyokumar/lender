import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { IUser } from '../security.model';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
    ) { }

    getAllRoles(): Observable<IUser[]> {
        return this.http.get<IUser[]>(ApiEndpoint.USERS);
    }

    createRole(role: IUser): Observable<IActionResponse> {
        return this.http.post<IActionResponse>(ApiEndpoint.USERS, role);
    }

    updateRole(role: IUser, id: number): Observable<IActionResponse> {
        return this.http.put<IActionResponse>(ApiEndpoint.USERS + "/" + id, role);
    }

    deleteRole(id: number): Observable<IActionResponse> {
        return this.http.delete<IActionResponse>(ApiEndpoint.USERS + "/" + id);
    }

}
