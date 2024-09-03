import { Injectable } from '@angular/core';
import { RawgService } from './rawg.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public rawgService:RawgService, private router: Router) { }

  backToMain() {
    this.rawgService.gameSlug = ''; 
    this.rawgService.searchMode = false; 
    this.rawgService.developerSearchMode = false;
    this.rawgService.publisherSearchMode = false;
    this.rawgService.developer = []
    this.rawgService.publisher = []
    this.rawgService.games = []
    this.rawgService.game = [] 
    this.rawgService.loadGames()
  }

  goBack() {
    this.rawgService.game = []
    this.router.navigate([''])
  }
}
