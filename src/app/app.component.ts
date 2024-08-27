import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HttpClient } from '@angular/common/http';
import { GameComponent } from './components/game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, RouterLink, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'games-app';
}
