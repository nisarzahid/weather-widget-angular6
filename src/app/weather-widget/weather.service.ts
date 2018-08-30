import { Injectable, Inject } from '@angular/core';


//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { weather, WeatherInfo } from './weather.model';

//const APPID = '45f4dd45e0f724512ba044c5a2caf4bc';

@Injectable()
export class WeatherService {
  
  constructor(private http: HttpClient) { 
     console.log('Production='+ environment.production);
  }

  /**
* This function get the coordinates and return the current weather info using openweathermap api
* @param coords This is coordinates param which is an object containing lat and lng
* @param units pass 'imerprial' to get temprature in Fahrenheit, 'metric' to get temprature in Celcius
* @returns returns WeatherInfo object in json
*/
  getCurrentWeather(coords:any, units:string): Observable<any>{
    let url = environment.baseUrl + 'weather?appid='+ environment.appId;
    return this.http.get(url +'&lat='+ coords.latitude +'&lon='+ coords.longitude +'&appid='+ environment.appId +'&units=' + units)
    .pipe(map((response:any) => {
      response.weather[0].icon = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png"
      response.wind.speed = response.wind.speed * 3.6; // convert the wind speed from m/sec to km/hr
      response.wind.direction = this.degToCompass(response.wind.deg); //converts the wind deg to direction
      return response;
    }), catchError(err => this.handleError(err)));

 }

 /**
  * This function get the wind direction in degree and returns the irection in string e.g 180 to NE
  * This function is for internal use of this service
  * @param num - Wind direction degree
  */
 private degToCompass(num) {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

  private extractData(res: any) {
    let body = res.json();
    return body.list || { };
  }

  private handleError (error: any) {
    let errMsg: string;
      errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}