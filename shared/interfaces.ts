export interface ForecastParams {
    cityName: string;
    days: number;
}

export interface CurrentParams {
    cityName: string;
}

export interface SearchParams {
    cityName: string;
    region: string;
}

export interface ForecastDay {
    temp: number;
    image: string;
}