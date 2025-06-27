import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { MovieService } from "./movie.service";

describe("MovieService", () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se todas as requisições foram feitas
  });

  it("should fetch movies with correct params", () => {
    const mockParams = { year: 2020, winner: true, page: 1, size: 10 };
    service.getMovies(mockParams).subscribe();

    const req = httpMock.expectOne(
      (request) =>
        request.url === "http://localhost:3000/movies" &&
        request.params.get("year") === "2020" &&
        request.params.get("winner") === "true" &&
        request.params.get("page") === "1" &&
        request.params.get("size") === "10"
    );

    expect(req.request.method).toBe("GET");
    req.flush([]); // Retorno simulado
  });

  it("should fetch projection data with correct query param", () => {
    const projection = "max-min-win-interval-for-producers";

    service.getProjection(projection).subscribe();

    const req = httpMock.expectOne(
      `http://localhost:3000/movies?projection=${projection}`
    );
    expect(req.request.method).toBe("GET");
    req.flush({}); // Retorno simulado
  });
});
