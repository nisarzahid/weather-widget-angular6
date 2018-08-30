export class WeatherInfo{
    name:string;
    weather:weather[];
    main:{ temp:string};
    wind:{};
}

export class weather{
        description:string;
        icon:string;
        id:number;
        main:string;
}