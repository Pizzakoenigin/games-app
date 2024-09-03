import { Component, OnInit, Input, NgModule } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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
  constructor(public rawgService: RawgService, private router: Router) {

  }

  ngOnInit(): void {
    // if (this.rawgService.gameSlug == '') {
    //   this.rawgService.searchMode = false
    // }


    // if (this.rawgService.gameSlug === '') {
    //   console.log('click');

    //   this.rawgService.searchMode = false
    // }

  }

  backToMain() {
    // if (this.rawgService.developerSearchMode) {
    //   firstValueFrom(this.rawgService.getGames()).then(() => {
    //     this.rawgService.developerSearchMode = false;
    //     // this.router.navigate(['']);
    //     this.rawgService.gameSlug = '';
    //     this.rawgService.searchMode = false;
    //     this.rawgService.developer = [];
    //   });
    // } else {
    //   ;
    // }

    if(this.rawgService.game){
      this.router.navigate([''])
      this.rawgService.game = []
    }
   
    this.rawgService.gameSlug = ''; 
    this.rawgService.searchMode = false; 
    this.rawgService.developerSearchMode = false;
    this.rawgService.developer = []
    this.rawgService.games = [] 
    this.rawgService.loadGames()
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchGames();
      this.router.navigate(['']);
    }
  }

  searchGames() {
    this.rawgService.searchMode = true;
    this.rawgService.searchGameByString().subscribe(data => {
      this.rawgService.games = data.results
      this.rawgService.paginatorLength = data.count;

    })
  }

  // loadGames() {
  //   if(this.rawgService.searchMode == false && this.rawgService.developerSearchMode == false) {
  //   this.rawgService.getGames().subscribe(data => {
  //     this.rawgService.games = data.results
  //     this.rawgService.paginatorLength = data.count;
  //    })       
  //   }      
  // }
}
