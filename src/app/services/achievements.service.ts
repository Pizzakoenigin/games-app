import { Injectable } from '@angular/core';
import { RawgService } from './rawg.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  constructor(public rawgService: RawgService, private http: HttpClient) { }


  getAchievements(): Observable<any>{
    return this.http.get(`${this.rawgService.apiUrl}/${this.rawgService.gameID}/achievements?key=${this.rawgService.API_KEY}`)
  }
}
