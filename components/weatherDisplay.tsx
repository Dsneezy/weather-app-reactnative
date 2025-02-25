import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { ForecastParams, LocationsParams } from "../shared/interfaces";
import { fetchLocations, fetchWeatherForecast } from "../utils/weatherAPI";

export default function WeatherDisplay({ cityName }: { cityName: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
  
    useEffect(() => {
      const getWeather = async () => {
        try {
          setLoading(true);
          setError(null);


          const params: ForecastParams = {cityName, days: 3};
          const data = await fetchWeatherForecast(params);
  
          if (data) {
            setTemperature(data.current.temp_f);
          } else {
            setError("Failed to featch weather data");
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
          <Text>{error}</Text>
        ) : cityName && temperature !== null ? (
          <Text>City: {cityName} Temperature: {temperature}°</Text>
        ) : (
          <Text>No data available</Text>
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
  });
  