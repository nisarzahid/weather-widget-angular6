import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './weather.service';
import { WeatherWidgetComponent } from './weather-widget.component';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';

@NgModule({
    declarations: [WeatherWidgetComponent],
    imports: [ CommonModule, FormsModule, HttpClientModule ],
    exports: [WeatherWidgetComponent],
    providers: [WeatherService],
})
export class WeatherWidgetModule {}