import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import WeatherDisplay from "../components/weatherDisplay";
import SearchBar from "../components/searchBar";
import DropdownMenu from "../components/dropdownMenu";


export default function FrontScreen() {
  const [cityName, setCityName] = useState<string>("San Diego");
  const [searchText, setSearchText] = useState<string>("San Diego")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <View style={styles.search_bar} >
        <SearchBar onSearch={setCityName} searchText={searchText} setSearchText={setSearchText}/> 
        {cityName.length > 0  && <DropdownMenu onClick={setCityName} searchText={searchText} setSearchText={setSearchText}/> }
      </View>
      <WeatherDisplay cityName={cityName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: "center",
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#424242",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: "white",
  },
  search_bar: {
    flexDirection: "column",
    alignItems: "center",
    //backgroundColor: "#b5a1f8",
    width: "90%",
    //paddingTop: 10,
    alignSelf: "center",
    borderRadius: 10,
    height: 50,
  },
  image: {
    width: 200,
    height: 200,
  },
  temp: {
    fontSize: 160,
    color: "white",
    paddingTop: 50,
  },
  location: {
    fontSize: 50,
    color: "white",
  },
  horizontalLine: {
    height: 7,
    backgroundColor: "white",
    width: "100%",
    marginVertical: 10,
  },
});
