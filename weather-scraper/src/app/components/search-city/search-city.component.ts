import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Observable, Subject} from 'rxjs';
import {WeatherResults} from '../../models/weather.model';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent implements OnInit {
  searchValue = '';
  @Output() searchWeather = new EventEmitter<{ city: string; country: string; }>();
  @Input() loadingResults: boolean;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {

  }

  searchWeatherData(): void {
    const city = this.searchValue.split(',')[0].trim();
    const country = this.searchValue.split(',')[1].trim();
    this.searchWeather.emit({city, country});
  }
}
