import { Component, OnInit, Input, NgModule } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(public rawgService: RawgService) {

  }

  ngOnInit(): void {
    
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchGames()
    }
  }
  searchGames() {
    this.rawgService.searchGameByString().subscribe(response => {
      this.rawgService.games = response.results
      
    })
  }
}
