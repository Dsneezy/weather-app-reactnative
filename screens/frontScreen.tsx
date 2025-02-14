import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { fetchWeatherForecast } from "../utils/weatherAPI";
import { fetchLocations } from "../utils/weatherAPI";

/*
const [cityName, setCityName] = useState("");
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <View style={styles.search_bar} >
        <TextInput style={styles.text_entry} placeholder="Search Location"> Search Location </TextInput>
      </View>
      <View>
        <Text style={styles.separator}> 70° </Text>
      </View>
      <View>
        <Text style={styles.location}> San Diego </Text>
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
