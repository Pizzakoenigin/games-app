import { Injectable } from '@angular/core';
import { RawgService } from './rawg.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public rawgService: RawgService, private router: Router) { }

  backToMain(): void {
    this.resetData().then(() => {
      this.rawgService.loadGames()
    })

    
  }

  resetData(): Promise<void> {
    return new Promise((resolve, reject) => {
      next: {
        if (this.rawgService.game) {
        this.router.navigate([''])
        this.rawgService.game = []
      }
      this.rawgService.gameSlug = '';
      this.rawgService.searchMode = false;
      this.rawgService.developerSearchMode = false;
      this.rawgService.publisherSearchMode = false;
      this.rawgService.developer = []
      this.rawgService.publisher = []
      this.rawgService.games = []
      this.rawgService.game = []
      this.rawgService.paginatorPage = 1;
      resolve();
      }
      error: {
        reject()
      }
      
    })
  }

  goBack() {
    //   if(this.rawgService.game){
    //     this.router.navigate([''])
    //     this.rawgService.game = []
    //   }
    this.rawgService.game = []
    this.router.navigate([''])
  }
}
