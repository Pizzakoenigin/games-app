import { Component, OnInit, ViewChild } from '@angular/core';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { RawgService } from '../../services/rawg.service';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

constructor(public rawgService: RawgService) {}
  // pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.rawgService.paginatorLength = e.length;
    this.rawgService.paginatorPageSize = e.pageSize;
    this.rawgService.paginatorPage = e.pageIndex + 1;
    this.loadGames()
  }

  loadGames() {
    this.rawgService.getGames().subscribe(data => {
      this.rawgService.games = data.results;
      this.rawgService.paginatorLength = data.count; // Assuming the API returns total count

      
    });
  }

}
