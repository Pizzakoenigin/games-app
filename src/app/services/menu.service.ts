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
      this.rawgService.paginatorPage = 0;
    })
  }

  resetData(): Promise<void> {
    return new Promise((resolve, reject) => {
      next: {
        this.rawgService.resetData()
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
