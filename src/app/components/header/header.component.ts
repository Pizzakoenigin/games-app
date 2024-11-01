import { Component, OnInit, Input, NgModule } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(public rawgService: RawgService, private router: Router, public menuService: MenuService) {

  }

  ngOnInit(): void {

    
  }

  // backToMain() {

  //   if(this.rawgService.game){
  //     this.router.navigate([''])
  //     this.rawgService.game = []
  //   }

  //   this.menuService.backToMain()
  // }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchGames();
      this.router.navigate(['']);
    }
  }

  searchGames(): void {
    this.resetData().then(() => {
    this.rawgService.searchGameByString().subscribe(data => {
      this.rawgService.games = data.results
      this.rawgService.paginatorLength = data.count;
      this.rawgService.keyword = this.rawgService.gameSlug
      this.rawgService.paginatorPage = 0;
    })
    })
  }

  resetData(): Promise<void> {
    return new Promise((resolve, reject) => {
      next: {
        this.rawgService.resetData()
        this.rawgService.searchMode = true
      
      resolve();
      }
      error: {
        reject()
      }
      
    })
  }
}
