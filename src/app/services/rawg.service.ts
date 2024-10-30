import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PageEvent, MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})

export class RawgService {
  apiUrl = `https://api.rawg.io/api/games`
  public gameID: number = 0;
  paginatorPageSize: number = 20
  paginatorPage: number = 0
  paginatorLength: number = 100
  gameSlug: string = '';
  games: Game[] = [];
  game: any = [];
  detailMode: boolean = false
  searchMode: boolean = false;
  developerSearchMode: boolean = false;
  publisherSearchMode: boolean = false;
  platformSearchMode: boolean = false;
  genreSearchMode: boolean = false;
  developer: any = []
  publisher: any = []
  platform: any = [
  ]
  genre: any = []
  keyword: string = ''

  constructor(private http: HttpClient, private router: Router, private environmentService: EnvironmentService) { }

  getGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.environmentService.API_KEY}&page_size=${this.paginatorPageSize}&page=${1 + this.paginatorPage}`)
  }

  getGame(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.gameID}?key=${this.environmentService.API_KEY}`)
  }

  getGamesByDeveloper(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.environmentService.API_KEY}&developers=${this.developer.id}&page_size=${this.paginatorPageSize}&page=${1 + this.paginatorPage}`)
  }

  getGamesByPublisher(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.environmentService.API_KEY}&publishers=${this.publisher.id}&page_size=${this.paginatorPageSize}&page=${1 + this.paginatorPage}`)
  }

  getGamesByPlatform(): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.environmentService.API_KEY}&platforms=${this.platform.platform.id}&page_size=${this.paginatorPageSize}&page=${1 + this.paginatorPage}`)
  }

  getGamesByGenre(): Observable<any> {
    console.log(this.genre.name);
    
    return this.http.get(`${this.apiUrl}?key=${this.environmentService.API_KEY}&genres=${this.genre.id}&page_size=${this.paginatorPageSize}&page=${1 + this.paginatorPage}`)

  }

  searchGameByString(): Observable<any> {
    this.games = []
    return this.http.get(`${this.apiUrl}?search=${this.gameSlug}&key=${this.environmentService.API_KEY}&page_size=${this.paginatorPageSize}&page=${1 + this.paginatorPage}`)
  }


  loadGames() {
    if (this.searchMode == false && this.developerSearchMode == false && this.publisherSearchMode == false && this.platformSearchMode == false && this.genreSearchMode == false) {
      this.getGames().subscribe(data => {
        this.games = data.results
        this.paginatorLength = data.count;
      })
    }

    if (this.searchMode == true) {
      this.searchGames()
    }

    if (this.developerSearchMode == true) {
      this.goToDevelopers()
    }

    if (this.publisherSearchMode == true) {
      this.goToPublishers()
    }

    if (this.platformSearchMode == true) {
      this.goToPlatform()
    }

    if (this.genreSearchMode == true) {
      this.goToGenre()
    }
  }





  searchGames() {
    this.searchGameByString().subscribe(data => {
      this.games = data.results
      this.paginatorLength = data.count;

    })
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

  goToPlatform(): void {
    firstValueFrom(this.getGamesByPlatform())
    .then(data => {
      this.games = data.results;
      this.paginatorLength = data.count;
    })
    .finally(() => {
      this.router.navigate(['']);
    });
  }

  goToGenre(): void {
    firstValueFrom(this.getGamesByGenre())
    .then(data => {
      this.games = data.results;
      this.paginatorLength = data.count;
    })
    .finally(() => {
      this.router.navigate(['']);
    });
  }

  resetData() {
    this.searchMode = false;
    this.developerSearchMode = false;
    this.publisherSearchMode = false;
    this.platformSearchMode = false
    this.genreSearchMode = false;
    this.developer = []
    this.publisher = []
    this.platform = []
    this.genre = []
    this.games = []
    this.game = []
    this.paginatorPage = 0;
    this.keyword = ''
    // this.gameSlug = ''
  }
}
