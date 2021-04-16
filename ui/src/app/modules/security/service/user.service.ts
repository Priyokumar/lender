import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { IUser } from '../security.model';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getAllUsers(): Observable<IUser[]> {
        return this.http.get<any>(ApiEndpoint.USERS).pipe(
            map(data => { return data.data })
        );
    }

    getUserById(id: number): Observable<IUser> {
        return this.http.get<any>(ApiEndpoint.USERS + "/" + id).pipe(
            map(data => { return data.data })
        );
    }

    createUser(user: IUser): Observable<IActionResponse> {
        return this.http.post<IActionResponse>(ApiEndpoint.USERS, user);
    }

    updateUser(user: IUser, id: number): Observable<IActionResponse> {
        return this.http.put<IActionResponse>(ApiEndpoint.USERS + "/" + id, user);
    }

    deleteUser(id: number): Observable<IActionResponse> {
        return this.http.delete<IActionResponse>(ApiEndpoint.USERS + "/" + id);
    }

}
