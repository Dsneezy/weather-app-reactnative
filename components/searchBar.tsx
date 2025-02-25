import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ onSearch }: {onSearch: (text: string) => void}) {
    const [searchText, setSearchText] = useState<string>("");

    const handleInputChange = (text: string) => {
        setSearchText(text); // update state to input string when input changes
        onSearch(text); // sends input to parent component
        console.log("You typed:", text)
    };

    return (
        <View style={styles.search_bar}>
            <TextInput style={styles.input} placeholder="Enter City Name" 
            value={searchText} onChangeText={setSearchText} // local editing
            onSubmitEditing={() => onSearch(searchText)} // search only on enter
            returnKeyType="search" // changes keyboard to show search button
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search_bar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "gray",
        width: "90%",
        marginVertical: 10,
        alignSelf: "center",
        borderRadius: 5,
        height: 50,
        paddingLeft: 3,
      },
    input: {
        height: 40,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    }
});