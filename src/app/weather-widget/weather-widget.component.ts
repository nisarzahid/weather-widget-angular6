import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherInfo } from './weather.model';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  title:string='Title of widget';
  temperature ='metric';
  wind='on';
  coords:any;
  weatherInfo:WeatherInfo = {name:'', main:{ temp:''}, wind:{}, weather:[{icon:'', description:'', id:0, main:''}]};

  constructor(private weatherService:WeatherService) { }
  // For temperature in Fahrenheit use units=imperial
  // For temperature in Celsius use units=metric
  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.coords = {};
        this.coords.latitude = position.coords.latitude;
        this.coords.longitude = position.coords.longitude;

        this.getCurrentWeather(this.coords, this.temperature);
      });
    }   
  }

  /**
   * Get the current weather
   * @param coords - user coordinates 
   * @param temperature - temperature units (metric/imperail)
   */
  getCurrentWeather(coords:any, temperature:string){
    if(coords){
      this.weatherService.getCurrentWeather(coords,temperature).subscribe((results:WeatherInfo) =>{
        this.weatherInfo = results;
       });
    }
  }

  /* Title input is changed*/
  onTitleKeyUp(event){
    this.title = event.target.value; 
  }

  /* Temprature radio button change*/
  onTemperatureChange(value:any){
    this.getCurrentWeather(this.coords, this.temperature);
  }

}
