import { Injectable, ViewChild } from '@angular/core';
import { RawgService } from './rawg.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  @ViewChild('MainPaginator') MainPaginator: MatPaginator | undefined;
  constructor(public rawgService: RawgService, private router: Router) { }

  backToMain(): void {
    this.resetData().then(() => {
      this.rawgService.loadGames()
    }).then(() => {
      this.router.navigate([''])
      this.rawgService.detailMode = false 
    })
  }

  resetData(): Promise<void> {
    return new Promise((resolve, reject) => {
      next: {
        this.rawgService.gameSlug = '';
        this.rawgService.searchMode = false;
        this.rawgService.developerSearchMode = false;
        this.rawgService.publisherSearchMode = false;
        this.rawgService.developer = []
        this.rawgService.publisher = []
        this.rawgService.games = []
        this.rawgService.game = []
        this.rawgService.paginatorPage = 1;
        this.rawgService.paginatorPageSize = 20
        this.rawgService.keyword = ''
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
    this.rawgService.detailMode = false 
    this.router.navigate([''])
  }
}
