import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { map } from 'rxjs/operators'
import { IRole } from '../security.model';

@Injectable()
export class RoleService {

    constructor(
        private http: HttpClient,
    ) { }

    getAllRoles(): Observable<IRole[]> {
        return this.http.get<any>(ApiEndpoint.ROLES).pipe(
            map(data => {
                return data.data
            })
        );
    }

    getRoleById(id : number): Observable<IRole> {
        return this.http.get<any>(ApiEndpoint.ROLES+"/"+id).pipe(
            map(data => {
                return data.data
            })
        );
    }

    createRole(role: IRole): Observable<IActionResponse> {
        return this.http.post<IActionResponse>(ApiEndpoint.ROLES, role);
    }

    updateRole(role: IRole, id: number): Observable<IActionResponse> {
        return this.http.put<IActionResponse>(ApiEndpoint.ROLES + "/" + id, role);
    }

    deleteRole(id: number): Observable<IActionResponse> {
        return this.http.delete<IActionResponse>(ApiEndpoint.ROLES + "/" + id);
    }

}
