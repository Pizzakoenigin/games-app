import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private API_KEY = '78d2b43889d3494786af988d6e92a584';
  private apiUrl = `https://api.rawg.io/api/games`
  public gameID: number = 0

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.API_KEY}`)
  }

  getGame(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.gameID}?key=${this.API_KEY}`)

  }
}
