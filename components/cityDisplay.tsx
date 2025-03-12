import React from "react";
import {View, Text, StyleSheet } from "react-native";

export default function CityDisplay({cityName}: { cityName: string }) {
    return (
        <View>
            <Text style={styles.city}>{cityName}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    city: {
        fontSize: 50,
        color: "white",
        textAlign: "center",
    },
});