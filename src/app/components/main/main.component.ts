import { Component } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GameComponent, GamesListComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
