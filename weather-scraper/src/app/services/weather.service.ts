import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherResults} from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  API_URL = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getWeatherData(country: string, city: string): Observable<WeatherResults> {
    return this.http.get<WeatherResults>(`${this.API_URL}/get-city-data/${country}/${city}`);
  }

}
