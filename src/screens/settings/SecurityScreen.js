import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialIcons } from "react-native-vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as LocalAuthentication from "expo-local-authentication";

import errorText from "../../constants/errorText";
import colors from "../../constants/colors";
import PinHandler from "../../components/LocalAuthentication/PinHandler";

const SecurityScreen = (props) => {
    const [lockAvailable, setLockAvailable] = useState();
    const [lockType, setLockType] = useState(false);

    const [openPasswordBox, setOpenPasswordBox] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState();

    const sethAuth = async (type) => {
        try {
            await AsyncStorage.setItem("authType", type);
        } catch (error) {
            Alert.alert(errorText.submit.title, errorText.submit.message, [
                { text: "Okay" },
            ]);
        }
    };

    const passwordHandler = async (password) => {
        if (password) {
            setIsPasswordValid(true);
            setOpenPasswordBox(false);
            await sethAuth("pin");
        }
    };

    const fingerprintHandler = async () => {
        let isAvailable = await LocalAuthentication.isEnrolledAsync();
        if (isAvailable) {
            const options = {
                promptMessage: "Welcome to the Keeper App",
            };
            let result = await LocalAuthentication.authenticateAsync(options);
            if (result.success) {
                setIsPasswordValid(true);
                await sethAuth("finger");
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
    };

    useEffect(() => {
        (async () => {
            try {
                const hasAuthenticationType = await LocalAuthentication.hasHardwareAsync();
                if (hasAuthenticationType) {
                    const results = await LocalAuthentication.supportedAuthenticationTypesAsync();
                    results.map((result) => {
                        if (result === 1) {
                            setLockAvailable(["Pin", "Fingerprint", "Cancel"]);
                        } else if (result === 2) {
                            setLockAvailable(["Pin", "Cancel"]);
                        }
                    });
                } else {
                    setLockAvailable(["Pin", "Cancel"]);
                }
            } catch (error) {
                Alert.alert(errorText.submit.title, errorText.submit.message, [
                    {
                        text: "Okay",
                        style: "cancel",
                        onPress: () => props.navigation.goBack(),
                    },
                ]);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("authType");
                jsonValue != null ? setLockType(jsonValue) : setLockType();
            } catch (error) {
                Alert.alert(errorText.submit.title, errorText.submit.message, [
                    {
                        text: "Okay",
                        style: "cancel",
                        onPress: () => props.navigation.goBack(),
                    },
                ]);
            }
        })();
    }, [isPasswordValid]);

    const options = [
        {
            optionLabel: "Screen lock",
            answer: lockType === "finger" ? "Fingerprint" : "Pin",
        },
    ];

    const { showActionSheetWithOptions } = useActionSheet();

    const onOpenActionSheet = () => {
        const options = lockAvailable;
        const cancelButtonIndex = options.length - 1;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                showSeparators: true,
            },
            (buttonIndex) => {
                if (buttonIndex === cancelButtonIndex) {
                    return;
                } else if (buttonIndex === 0) {
                    setIsPasswordValid(false);
                    setOpenPasswordBox(true);
                } else if (buttonIndex === 1) {
                    setIsPasswordValid(false);
                    fingerprintHandler();
                }
            }
        );
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: openPasswordBox ? "white" : "#393E46",
            }}
        >
            {!openPasswordBox && (
                <View>
                    {options.map((element, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionContainer}
                            onPress={() =>
                                index === 0 ? onOpenActionSheet() : null
                            }
                        >
                            <Text style={styles.optionText}>
                                {element.optionLabel}
                            </Text>
                            <View style={styles.iconTextContainer}>
                                <Text style={styles.optionText}>
                                    {element.answer}
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    style={styles.iconStyle}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <View>
                {openPasswordBox && (
                    <PinHandler passwordHandler={passwordHandler} />
                )}
            </View>
        </View>
    );
};

export default SecurityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    optionContainer: {
        borderBottomColor: colors.settingsTextColor,
        borderBottomWidth: 0.4,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optionText: {
        color: colors.settingsTextColor,
        fontSize: 20,
    },
    iconTextContainer: { flexDirection: "row" },
    iconStyle: {
        fontSize: 28,
        color: colors.settingsTextColor,
    },
});

export const screenOptions = () => {
    return {
        headerTintColor: "white",
        headerTitle: "Security",
        headerTitleStyle: {
            fontSize: 28,
            fontFamily: "open-sans-bold",
        },
        headerStyle: {
            backgroundColor: "#393E46",
            elevation: 0,
            shadowColor: "transparent",
        },
    };
};
