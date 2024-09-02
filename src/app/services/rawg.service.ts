import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  API_KEY = '78d2b43889d3494786af988d6e92a584';
  apiUrl = `https://api.rawg.io/api/games`
  public gameID: number = 0;
  paginatorPageSize: number = 20
  paginatorPage: number = 1
  paginatorLength: number = 100
  gameSlug: string = '';
  games: Game[] = [];
  searchMode: boolean = false



  constructor(private http: HttpClient) { }



  getGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.API_KEY}&page_size=${this.paginatorPageSize}&page=${this.paginatorPage}`)
  }

  getGame(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.gameID}?key=${this.API_KEY}`)
  }

  searchGameByString(): Observable<any> {
    this.games = []
    return this.http.get(`${this.apiUrl}?search=${this.gameSlug}&key=${this.API_KEY}&page_size=${this.paginatorPageSize}&page=${this.paginatorPage}`)
  }


}
