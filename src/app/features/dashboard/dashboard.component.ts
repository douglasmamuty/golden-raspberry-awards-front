import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../core/services/movie.service";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatGridListModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: any[] = [];
  winnersByYear: any[] = [];
  topStudios: any[] = [];
  intervals: any;
  filterYear?: number;
  hasFiltered = false;
  isLoading: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.movieService
      .getProjection("years-with-multiple-winners")
      .subscribe((data) => (this.yearsWithMultipleWinners = data.years));

    this.movieService
      .getProjection("studios-with-win-count")
      .subscribe((data) => (this.topStudios = data.studios));

    this.movieService
      .getProjection("max-min-win-interval-for-producers")
      .subscribe((data) => (this.intervals = data));
    this.isLoading = false;
  }

  getWinnersByYear(): void {
    if (!this.filterYear) {
      return;
    }

    this.movieService
      .getMovies({
        year: this.filterYear,
        winner: true,
      })
      .subscribe((data) => {
        this.winnersByYear = data;
        this.hasFiltered = true;
      });
  }
}
