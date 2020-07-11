import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const FingerPrintHandler = (props) => {
    const fingerprintCancelHandler = () => {
        props.passwordHandler(false);
        props.setFingerprintBased(false);
    };

    useEffect(() => {
        (async () => {
            let isAvailable = await LocalAuthentication.isEnrolledAsync();
            if (isAvailable) {
                const options = {
                    promptMessage: "Welcome to the Keeper App",
                };
                let result = await LocalAuthentication.authenticateAsync(
                    options
                );
                if (result.success) {
                    props.passwordHandler(true);
                }
            } else {
                Alert.alert(
                    "Fingerprint not found",
                    "No finger print found please setup and visit again",
                    [
                        {
                            text: "Okay",
                            style: "cancel",
                            onPress: () => fingerprintCancelHandler(),
                        },
                    ]
                );
            }
        })();
    }, []);

    return <View></View>;
};

export default FingerPrintHandler;

const styles = StyleSheet.create({});
