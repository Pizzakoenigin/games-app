import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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
  game: any = [ ];
  detailMode: boolean = false
  searchMode: boolean = false;
  developerSearchMode: boolean = false;
  publisherSearchMode: boolean = false;
  developer: any = []
  publisher: any = []

  constructor(private http: HttpClient, private router: Router) { }

  getGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.API_KEY}&page_size=${this.paginatorPageSize}&page=${this.paginatorPage}`)
  }

  loadGames() {
    if(this.searchMode == false && this.developerSearchMode == false && this.publisherSearchMode == false) {
    this.getGames().subscribe(data => {
      this.games = data.results
      this.paginatorLength = data.count;
     })       
    }      
  }

  getGame(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.gameID}?key=${this.API_KEY}`)
  }

  searchGameByString(): Observable<any> {
    this.games = []
    return this.http.get(`${this.apiUrl}?search=${this.gameSlug}&key=${this.API_KEY}&page_size=${this.paginatorPageSize}&page=${this.paginatorPage}`)
  }

  getGamesByDeveloper(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.API_KEY}&developers=${this.developer.id}&page_size=${this.paginatorPageSize}&page=${this.paginatorPage}`)
   }

   getGamesByPublisher(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.API_KEY}&publishers=${this.publisher.id}&page_size=${this.paginatorPageSize}&page=${this.paginatorPage}`)
   }

  goToDevelopers(): void {
    firstValueFrom(this.getGamesByDeveloper())
      .then(data => {
        this.games = data.results;
        this.paginatorLength = data.count;
      })
      .finally(() => {
        this.router.navigate(['']);
      });
  }

  goToPublishers(): void {
    firstValueFrom(this.getGamesByPublisher())
      .then(data => {
        this.games = data.results;
        this.paginatorLength = data.count;
      })
      .finally(() => {
        this.router.navigate(['']);
      });
  }
}
