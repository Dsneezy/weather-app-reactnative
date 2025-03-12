import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { ForecastParams, CurrentParams, ForecastDay } from "../shared/interfaces";
import { fetchWeatherCurrent, fetchWeatherForecast } from "../utils/weatherAPI";

export default function WeatherDisplay({ cityName }: { cityName: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [weatherImage, setWeatherImage] = useState<string>("../assets/images/CloudsSun.png");
    const [weatherQuality, setWeatherQuality] = useState<string>("Partly Cloudy");
    const [forecasts, setForecasts] = useState<ForecastDay[]>([]);
  
    useEffect(() => {
      const getWeather = async () => {
        try {
          setLoading(true);
          setError(null);


          const params: ForecastParams = {cityName, days: 6};
          //const params: CurrentParams = {cityName};
          const data = await fetchWeatherForecast(params);
  
          if (data && data.forecast.forecastday) {
            setTemperature(data.current.temp_f);
            setWeatherImage(data.current.condition.icon) // this value will be a string that has the image of the weather
            setWeatherQuality(data.current.condition.text) // holds weather quality as a string

            const forecastData: ForecastDay[] = data.forecast.forecastday.slice(1,3).map((day: { day: { avgtemp_f: number; condition: { icon: string } }}) => ({
              temp: day.day.avgtemp_f, // slice takes each of the next two days, map turns data into temp and image
              image: `https:${day.day.condition.icon}`
            }));
            setForecasts(forecastData); // sets array of forecasted data into forecasts array

          } else {
            setError("Failed to fetch weather data");
          } 
        }
        catch (err) {
          setError("An error occured while fetching data");
        }
        finally {
          setLoading(false);
        }
      };
      getWeather();
    }, [cityName]); // fetch data when cityName is changed
  
  
    return (
      <View style={styles.location}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.location_text}>{error}</Text>
        ) : cityName && temperature !== null ? (
          <View style={{alignItems: "center"}}>
            <Image source={{ uri: `https:${weatherImage}` }} style = {styles.image} />

            <Text style={styles.location_text}>
              {cityName}:  {temperature}°
            </Text>
            <Text style = {styles.location_text}>
              {weatherQuality}
            </Text>

            <View style={{flexDirection: "row", paddingTop: 70}}>
              {forecasts.map(({temp, image}, index) => (
                <View key={index} style={{paddingHorizontal: 50, alignItems: "center"}}>
                  <Image source ={{ uri: image }} style={{height:50,width:50}} />
                  <Text style={styles.location_text}>{temp}°</Text>
                  <Text style={styles.location_text}>in {index + 1} {index === 0 ? "day" : "days"}</Text>
                </View>
              ))}
            </View>
          </View> 
        ) : (
          <Text style={styles.location_text}>No data available</Text>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      justifyContent: "center",
    },
    text_entry: {
      fontSize: 16,
      color: "#333",
      alignContent: "center",
    },
    separator: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      paddingTop: 80,
      fontSize: 80,
    },
    location: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20, 
    },
    location_text: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      alignContent: "center",
    },
    image: {
      width: 200,
      height: 200,
    },
  });
  