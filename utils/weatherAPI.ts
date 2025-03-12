import axios from "axios";
import { apiKey } from "../constants";
import { ForecastParams, CurrentParams, SearchParams } from "../shared/interfaces";


const forecastEndpoint = (params : ForecastParams): string => {
    return `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
};
const currentEndpoint = (params: CurrentParams): string => {
    return `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params.cityName}`
};
const searchEndpoint = (params: SearchParams): string => {
    return `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`
}

const apiCall = async (endpoint: string) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try{
        const response = await axios.request(options);
        return response.data;
    }
    catch(err) {
        console.log('error: ', err);
        return null;
    }
}

export const fetchWeatherForecast = (params: ForecastParams) => {
    return apiCall(forecastEndpoint(params));
}

export const fetchWeatherCurrent = (params: CurrentParams) => {
    return apiCall(currentEndpoint(params));
}

export const fetchLocationSearch = (params: SearchParams) => {
    return apiCall(searchEndpoint(params));
}