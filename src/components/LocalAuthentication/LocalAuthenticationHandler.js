import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-community/async-storage";

import PinHandler from "./PinHandler";
import FingerPrintHandler from "./FingerPrintHandler";
import errorText from "../../constants/errorText";

const logo = require("../../../assets/logo.png");

const LocalAuthenticationHandler = (props) => {
    const [optionsAvailable, setOptionsAvailable] = useState([]);
    const [pinBased, setPinBased] = useState(false);
    const [fingerprintBased, setFingerprintBased] = useState(false);

    const sethAuth = async (type) => {
        try {
            await AsyncStorage.setItem("authType", type);
        } catch (error) {
            Alert.alert(errorText.submit.title, errorText.submit.message, [
                { text: "Okay" },
            ]);
        }
    };

    const setPinBasedAuth = async () => {
        setPinBased(true);
        setFingerprintBased(false);
        await sethAuth("pin");
    };

    const setFingerprintBasedAuth = async () => {
        setPinBased(false);
        setFingerprintBased(true);
        await sethAuth("finger");
    };

    useEffect(() => {
        (async () => {
            const result = await AsyncStorage.getItem("authType");
            if (result === "pin") {
                setPinBased(true);
            } else if (result === "finger") {
                setFingerprintBased(true);
            }
        })();
    }, []);

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

    return (
        <View>
            {!pinBased && !fingerprintBased ? (
                <View>
                    <Image source={logo} style={styles.image} />
                    <Text style={styles.headerText}>Welcome</Text>
                    <Text style={styles.bodyText}>
                        We recommend that you setup one of the below
                        authentication so that your data is secured.
                    </Text>
                    <View style={styles.optionsContainer}>
                        <Text
                            onPress={setPinBasedAuth}
                            style={styles.optionText}
                        >
                            Setup Pin
                        </Text>
                        {optionsAvailable.map(
                            (option, index) =>
                                option && (
                                    <Text
                                        key={index}
                                        onPress={setFingerprintBasedAuth}
                                        style={styles.optionText}
                                    >
                                        Use FingerPrint
                                    </Text>
                                )
                        )}
                    </View>
                </View>
            ) : pinBased ? (
                <PinHandler passwordHandler={props.passwordHandler} />
            ) : fingerprintBased ? (
                <FingerPrintHandler
                    passwordHandler={props.passwordHandler}
                    setFingerprintBased={setFingerprintBased}
                />
            ) : null}
        </View>
    );
};

export default LocalAuthenticationHandler;

const styles = StyleSheet.create({
    image: { width: "100%", height: "50%" },
    headerText: {
        padding: 20,
        paddingTop: 20,
        fontSize: 24,
        textAlign: "center",
        fontFamily: "open-sans-bold",
    },
    bodyText: {
        padding: 20,
        paddingTop: 5,
        fontSize: 20,
        textAlign: "center",
        fontFamily: "open-sans",
    },
    optionsContainer: {
        alignItems: "flex-start",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optionText: {
        textAlign: "center",
        fontSize: 24,
        color: "#47555E",
        fontFamily: "open-sans-bold",
        paddingBottom: 10,
    },
});
