export interface ForecastParams {
    cityName: string;
    days: number;
}

export interface CurrentParams {
    cityName: string;
}

export interface SearchParams {
    searchText: string;
}

export interface SearchResults {
    name: string;
    region: string;
}

export interface ForecastDay {
    temp: number;
    image: string;
}