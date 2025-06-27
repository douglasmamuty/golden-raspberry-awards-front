import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MovieService } from "../../core/services/movie.service";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockYears = { years: [2000, 2010] };
  const mockStudios = { studios: ["Warner", "Universal"] };
  const mockIntervals = { min: {}, max: {} };
  const mockWinners = [{ title: "Test Movie", year: 2020 }];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj("MovieService", [
      "getProjection",
      "getMovies",
    ]);

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: MovieService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(
      MovieService
    ) as jasmine.SpyObj<MovieService>;

    movieServiceSpy.getProjection
      .withArgs("years-with-multiple-winners")
      .and.returnValue(of(mockYears));
    movieServiceSpy.getProjection
      .withArgs("studios-with-win-count")
      .and.returnValue(of(mockStudios));
    movieServiceSpy.getProjection
      .withArgs("max-min-win-interval-for-producers")
      .and.returnValue(of(mockIntervals));
    component.winnersByYear = [];
    fixture.detectChanges();
  });

  it("should create", () => {
    component.winnersByYear = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should load dashboard projections on init", () => {
    expect(component.yearsWithMultipleWinners).toEqual(mockYears.years);
    expect(component.topStudios).toEqual(mockStudios.studios);
    expect(component.intervals).toEqual(mockIntervals);
    expect(movieServiceSpy.getProjection).toHaveBeenCalledTimes(3);
  });

  it("should not fetch winners if year is empty", () => {
    component.filterYear = undefined;
    component.getWinnersByYear();
    expect(movieServiceSpy.getMovies).not.toHaveBeenCalled();
  });

  it("should fetch winners when year is provided", () => {
    movieServiceSpy.getMovies.and.returnValue(of(mockWinners));
    component.filterYear = 2020;
    component.getWinnersByYear();
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith({
      year: 2020,
      winner: true,
    });
    expect(component.winnersByYear).toEqual(mockWinners);
    expect(component.hasFiltered).toBeTrue();
  });
});
