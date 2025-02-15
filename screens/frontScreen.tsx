import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { ForecastParams, LocationsParams } from "../shared/interfaces";
import { fetchLocations, fetchWeatherForecast } from "../utils/weatherAPI";


/*
const [locations, setLocations] = useState<any[]>([]);
const [loading, setLoading] = useState(false);

const searchLocations = async () => {
  setLoading(true);
  const data = await fetchLocations({ cityName });
  if (data) {
    setLocations(data);
  }
  setLoading(false);
};
*/

export default function FrontScreen() {
  const [cityName, setCityName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        const params: ForecastParams = {cityName: "San Diego", days: 3};
        const data = await fetchWeatherForecast(params);

        if (data) {
          setCityName(data.location.name);
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
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <View style={styles.search_bar} >
        <TextInput style={styles.text_entry} placeholder="Search for Location"></TextInput>
      </View>
      <View style={styles.location}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.separator}>{error}</Text>
        ) : cityName && temperature !== null ? (
          <Text>City: {cityName} Temperature: {temperature}°</Text>
        ) : (
          <Text>No data available</Text>
        )}
      </View>
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
  search_bar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
    height: 50,
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
    fontSize: 40,
  },
});
