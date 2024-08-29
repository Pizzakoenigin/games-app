import { Component, OnInit } from '@angular/core';
import { RawgService } from '../../services/rawg.service';
import { Game } from '../../interfaces/game';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [HeaderComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  game: any = [

  ]

  constructor(public rawgService: RawgService) {

  }

  ngOnInit(): void {
    this.rawgService.getGame().subscribe(data => {
      this.game = data
      if (this.game.description) {
        this.game.description = this.removeHTMLTags(this.game.description)
      }
    })
  }

  removeHTMLTags(str: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.textContent || "";
  }
}
