import { Component, OnInit, Input, NgModule } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

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
export class HeaderComponent implements OnInit{
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
}
