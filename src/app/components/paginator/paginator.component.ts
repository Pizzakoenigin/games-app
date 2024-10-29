import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { RawgService } from '../../services/rawg.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginator, CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(public rawgService: RawgService) { }
  // pageEvent!: PageEvent;

  ngOnInit(): void {

  }


  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.rawgService.paginatorLength = e.length;
    this.rawgService.paginatorPageSize = e.pageSize;
    this.rawgService.paginatorPage = e.pageIndex + 1;
    // console.log(this.rawgService.paginatorPage);

    this.loadGames()
  }

  loadGames() {
    if (this.rawgService.searchMode == false && this.rawgService.developerSearchMode == false && this.rawgService.publisherSearchMode == false) {
      this.rawgService.getGames().subscribe(data => {
        this.rawgService.games = data.results;
        this.rawgService.paginatorLength = data.count;
      });
    }

    if (this.rawgService.searchMode == true) {
      this.searchGames()
    }

    if (this.rawgService.developerSearchMode == true) {
      this.rawgService.goToDevelopers()
    }

    if (this.rawgService.publisherSearchMode == true) {
      this.rawgService.goToPublishers()
    }
  }

  searchGames() {
    this.rawgService.searchGameByString().subscribe(data => {
      this.rawgService.games = data.results
      this.rawgService.paginatorLength = data.count;

    })
  }
}
