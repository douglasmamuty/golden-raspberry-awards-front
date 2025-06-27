import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MovieService {
  private readonly apiUrl = "http://localhost:3000/movies";

  constructor(private http: HttpClient) {}

  getMovies(params: {
    page?: number;
    size?: number;
    year?: number;
    winner?: boolean;
  }): Observable<any> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        httpParams = httpParams.set(key, value.toString());
    });
    const result = this.http.get(this.apiUrl, { params: httpParams });
    console.log(result);

    return result;
  }

  getProjection(projection: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?projection=${projection}`);
  }
}
