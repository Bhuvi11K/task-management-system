import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:1102/api';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getManagers(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    return this.http.get<any>(`${this.apiUrl}/getManagers`, { headers });
  }

  getJuniorDevelopers(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    return this.http.get<any>(`${this.apiUrl}/getDevelopers`, { headers });
  }

  createTeam(managerId: number, developerId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { managerId, developerId };
    return this.http.post<any>(`${this.apiUrl}/insertteams`, body, { headers });
  }

  getTeams(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    return this.http.get<any>(`${this.apiUrl}/getTeams`, { headers });
  }

  getDevelopersForManager(managerId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { managerId };
    console.log('Request body:', body);
    return this.http.post<any>(`${this.apiUrl}/getMappedDevelopers`, body, {
      headers,
    });
  }

  deleteTeam(managerId: number, developerIds: number[]): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({ Authorization: token });
    const body = { managerId, developerIds };

    return this.http.request<any>('delete', `${this.apiUrl}/deleteTeam`, {
      headers,
      body,
    });
  }

  getUnmappedDevelopers(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({ Authorization: token });
    return this.http
      .get<any>(`${this.apiUrl}/getUnmappedDevelopers`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching unmapped developers:', error);
          return throwError('Error fetching unmapped developers');
        })
      );
  }

  deleteDeveloperFromTeam(developerId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({ Authorization: token });
    const body = { developerId };

    return this.http.request<any>('delete', `${this.apiUrl}/deleteDeveloper`, {
      headers,
      body,
    });
  }

  createTask(
    developerId: number,
    task: string,
    managerId: number
  ): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { developerId, task, managerId };
    return this.http.post<any>(`${this.apiUrl}/insertTask`, body, { headers });
  }

  updateTask(
    taskId: number,
    developerId: number,
    task: string
  ): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { taskId: taskId, developer_id: developerId, task };
    console.log('Request Payload:', body);
    return this.http.put<any>(`${this.apiUrl}/updateTask`, body, { headers });
  }

  deleteTask(taskId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({ Authorization: token });
    const body = { taskId };

    return this.http.request<any>('delete', `${this.apiUrl}/deleteTask`, {
      headers,
      body,
    });
  }

  getAssignedTasks(developerId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { developerId };
    return this.http.post<any>(`${this.apiUrl}/getTasks`, body, { headers });
  }

  insertTaskDuration(
    developerId: number,
    taskId: number,
    duration: string
  ): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { developerId, taskId, duration };
    return this.http.post<any>(`${this.apiUrl}/insertDuration`, body, {
      headers,
    });
  }

  getTaskDuration(developerId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { developerId };
    return this.http.post<any>(`${this.apiUrl}/getTaskDuration`, body, {
      headers,
    });
  }

  updateProfile(userId: number, userName: string): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders({ Authorization: token });
    const body = { userId, userName };
    console.log('Request Payload:', body);
    return this.http.put<any>(`${this.apiUrl}/updateUserProfile`, body, {
      headers,
    });
  }

  deleteUser(userId: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({ Authorization: token });
    const body = { userId };

    return this.http.request<any>('delete', `${this.apiUrl}/deleteUser`, {
      headers,
      body,
    });
  }
}
