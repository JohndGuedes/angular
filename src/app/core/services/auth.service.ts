import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AuthResponse {
    UserId: string;
    UserName: string;
    UserDomain: string;
    IsAuthenticated: boolean;
    RequestDate: string;
    ResponseId: string;
    ResponseDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/api/ad/authenticate';

    constructor(private http: HttpClient) { }

    login(userId: string, password: string): Observable<boolean> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('password', password);

        return this.http.post<AuthResponse>(this.apiUrl, {}, { params }).pipe(
            map(response => response.IsAuthenticated)
        );
    }
    logout(): void {
        // Clear any stored tokens or user data here
        console.log('User logged out');
    }
}
