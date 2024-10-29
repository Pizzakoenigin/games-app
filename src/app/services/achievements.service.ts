import { Injectable } from '@angular/core';
import { RawgService } from './rawg.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './environment.service';

//TODO ACHIEVEMENT PAGINATOR

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  paginatorPageSize: number = 20
  paginatorPage: number = 1
  paginatorLength: number = 100

  constructor(public rawgService: RawgService, private http: HttpClient, private environmentService: EnvironmentService) { }


  getAchievements(): Observable<any>{
    return this.http.get(`${this.rawgService.apiUrl}/${this.rawgService.gameID}/achievements?key=${this.environmentService.API_KEY}&page_size=${this.paginatorPageSize}&page=${1 + this.paginatorPage}`)
  }
}

