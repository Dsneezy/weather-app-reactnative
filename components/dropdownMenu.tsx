import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { SearchParams, SearchResults } from "../shared/interfaces";
import { fetchLocationSearch } from "../utils/weatherAPI";

interface dropDownProps {
    searchText: string;
    setSearchText: (text: string) => void;
    onClick: (text: string) => void;
}

export default function DropdownMenu({onClick, searchText, setSearchText}: dropDownProps) {
    const [cities, setCities] = useState<SearchResults[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {
        const getSearches = async () => {
            if (!searchText.trim()) return; // Avoid unnecessary API calls

            try {
                setLoading(true);
                setError(null);

                const params: SearchParams = {searchText};
                const data = await fetchLocationSearch(params);
                console.log(data);

                if (data) {
                    const availableCities: SearchResults[] = data.slice(0,3).map((city: SearchResults) => ({
                        name: city.name,
                        region: city.region
                    })); 
                    setCities(availableCities);
                }
                else {
                    setError("");
                }
            }
            catch (error) {
                setError("Failed to find search data");
            }
            finally {
                setLoading(false);
            }
        }; 
        getSearches();
    }, [searchText]);

    const handleCityClick = (name: string) => {
        console.log("City clicked:", name);
        onClick(name); // sends input to parent component
        setSearchText(name);
    }

    return (
        <View style={{flexDirection: "column"}}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text>{error}</Text>
            ) : cities.length > 0 ? (
                cities.map((city, index) => (
                <TouchableOpacity key={index} style={styles.box} onPress={() => handleCityClick(city.name)}>
                    <Text style={styles.cityText}> 
                        {city.name}, {city.region}
                    </Text>
                </TouchableOpacity>
                ))
            ) : (
                <Text>
                    No results found
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cityText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        alignContent: "center",
    },
    box: {
        backgroundColor: "#3498db",  // Blue color
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,           // Rounded corners
        alignItems: "center",
    }
})