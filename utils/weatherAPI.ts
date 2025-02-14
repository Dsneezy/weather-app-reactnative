import axios from "axios";
import { apiKey } from "../constants";

// make sure that you put this file in .gitignore so people can not steal your api key
interface ForecastParams {
    cityName: string;
    days: number;
}

interface LocationsParams {
    cityName: string;
}

const forecastEndpoint = (params : ForecastParams): string => {
    return `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
};
const locationsEndpoint = (params: LocationsParams): string => {
    return `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`
};

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

export const fetchLocations = (params: LocationsParams) => {
    return apiCall(locationsEndpoint(params));
}