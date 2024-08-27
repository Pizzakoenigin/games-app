import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'games-app';
}
