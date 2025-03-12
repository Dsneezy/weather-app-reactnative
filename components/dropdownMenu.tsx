import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { SearchParams } from "../shared/interfaces";
import { fetchLocationSearch } from "../utils/weatherAPI";

export default function DropdownMenu({cityName}: {cityName: string}) {
    const [cities, setCities] = useState<SearchParams[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {
        const getSearches = async () => {
            try {
                setLoading(true);
                setError(null);

                const params: SearchParams = {cityName};
                const data = await fetchLocationSearch(params);

                if (data) {
                    for () // thinking of making a for loop to go through first 3 searches and add results to cities
                }
                else {
                    setError("Failed to fetch search data");
                }
            }
        }
    });

    return (null);
}