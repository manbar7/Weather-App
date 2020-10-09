import {Component, Input, OnInit} from '@angular/core';
import {WeatherResults} from '../../models/weather.model';

@Component({
  selector: 'app-weather-results',
  templateUrl: './weather-results.component.html',
  styleUrls: ['./weather-results.component.scss']
})
export class WeatherResultsComponent implements OnInit {
  @Input() weatherResults: WeatherResults;

  constructor() { }

  ngOnInit(): void {
  }

}
