import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../core/services/movie.service";
import { PageEvent } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { debounceTime, Subject } from "rxjs";

@Component({
  selector: "app-movie-list",
  imports: [
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"],
})
export class MovieListComponent implements OnInit {
  dataSource: any[] = [];
  total = 0;
  page = 0;
  size = 10;
  isLoading = false;

  filterYear?: number;
  filterWinner?: boolean;

  private yearChanged = new Subject<number>();

  columnsToDisplay = ["id", "year", "title", "winner"];

  constructor(private movieService: MovieService) {
    this.yearChanged.pipe(debounceTime(1000)).subscribe((year) => {
      if (year) this.loadMovies();
    });
  }

  onYearChange(year: string) {
    const parsed = parseInt(year, 10);

    if (!year || isNaN(parsed)) {
      this.filterYear = undefined;
      this.loadMovies();
      return;
    }

    if (!isNaN(parsed)) {
      this.yearChanged.next(parsed);
    }
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.movieService
      .getMovies({
        page: this.page,
        size: this.size,
        year: this.filterYear,
        winner: this.filterWinner,
      })
      .subscribe((data) => {
        this.dataSource = data.content;
        this.total = data.totalElements;
        this.isLoading = false;
      });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadMovies();
  }
}
