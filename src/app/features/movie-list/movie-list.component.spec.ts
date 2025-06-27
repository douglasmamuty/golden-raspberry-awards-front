import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { MovieListComponent } from "./movie-list.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MovieService } from "../../core/services/movie.service";
import { of } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { RouterTestingModule } from "@angular/router/testing";

describe("MovieListComponent", () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockResponse = {
    content: [{ id: 1, title: "Test", year: 2020, winner: false }],
    totalElements: 1,
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj("MovieService", ["getMovies"]);

    await TestBed.configureTestingModule({
      imports: [
        MovieListComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: MovieService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(
      MovieService
    ) as jasmine.SpyObj<MovieService>;

    movieServiceSpy.getMovies.and.returnValue(of(mockResponse));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load movies on init", () => {
    expect(movieServiceSpy.getMovies).toHaveBeenCalled();
    expect(component.dataSource.length).toBe(1);
    expect(component.total).toBe(1);
  });

  it("should filter by year using debounce", fakeAsync(() => {
    component.onYearChange("2020");
    tick(1000); // espera debounce
    expect(movieServiceSpy.getMovies).toHaveBeenCalledTimes(2); // 1 from ngOnInit + 1 from debounce
  }));

  it("should handle page change", () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 5, length: 0 };
    component.onPageChange(pageEvent);
    expect(component.page).toBe(1);
    expect(component.size).toBe(5);
    expect(movieServiceSpy.getMovies).toHaveBeenCalledTimes(2); // init + page change
  });
});
