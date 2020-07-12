import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const SettingScreen = () => {
    const [authType, setAuthType] = useState();
    const [optionsAvailable, setOptionsAvailable] = useState();

    useEffect(() => {
        (async () => {
            const result = await LocalAuthentication.hasHardwareAsync();
            if (result) {
                let types = await LocalAuthentication.supportedAuthenticationTypesAsync();

                let readableTypes = types.map(
                    (type) => type === 1 && "FingerPrint"
                );
                setOptionsAvailable(readableTypes);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await AsyncStorage.getItem("authType");
            if (result === "pin") {
                setAuthType("Pin");
            } else if (result === "finger") {
                setAuthType("FingerPrint");
            }
        })();
    }, []);

    return (
        <View>
            <View style={styles.typeContainer}>
                <Text style={styles.typeText}>Application Lock type: </Text>
                <Text style={styles.authTypeText}>{authType}</Text>
            </View>
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    typeContainer: {
        padding: 20,
        flexDirection: "row",
    },
    typeText: { fontFamily: "open-sans", fontSize: 20 },
    authTypeText: { fontFamily: "open-sans-bold", fontSize: 20 },
});

export const screenOptions = () => {
    return {
        headerTitle: "Settings",
    };
};
