import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WeatherResults} from './models/weather.model';
import {WeatherService} from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-scraper';
  weatherResults$ = new Subject<WeatherResults>();
  cityOne$: Observable<WeatherResults>;
  cityTwo$: Observable<WeatherResults>;
  loadingResults: boolean;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.cityOne$ = this.weatherService.getWeatherData('France', 'Paris');
    this.cityTwo$ = this.weatherService.getWeatherData('USA', 'Los Angeles');
  }

  getWeather({country, city}: { city: string; country: string; }): void {
    this.loadingResults = true;
    this.weatherService.getWeatherData(country, city)
      .subscribe((data) => {
        this.loadingResults = false;
        this.weatherResults$.next(data);
      });
  }
}
