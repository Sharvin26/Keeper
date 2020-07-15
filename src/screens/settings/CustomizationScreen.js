import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import colors from "../../constants/colors";

const CustomizationScreen = () => {
    const [themeColor, setThemeColor] = useState("Dark");
    const [sortBy, setSortBy] = useState("Alphabetical");
    const options = [
        { label: "Application Theme", answer: themeColor },
        { label: "Sort By", answer: sortBy },
    ];

    const { showActionSheetWithOptions } = useActionSheet();

    const onOpenActionSheet = (index) => {
        let options = [];
        if (index === 0) {
            options = ["Dark", "Light", "Cancel"];
        } else if (index === 1) {
            options = ["Alphabetical", "Date", "Cancel"];
        }
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
            { options, cancelButtonIndex, showSeparators: true },
            (buttonIndex) => {
                if (buttonIndex === 2) {
                    return;
                } else if (index === 0) {
                    if (buttonIndex === 0) {
                        setThemeColor("Dark");
                    } else if (buttonIndex === 1) {
                        setThemeColor("Light");
                    }
                } else if (index === 1) {
                    if (buttonIndex === 0) {
                        setSortBy("Alphabetical");
                    } else if (buttonIndex === 1) {
                        setSortBy("Date");
                    }
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            {options.map((element, index) => (
                <TouchableOpacity
                    style={styles.optionsContainer}
                    key={index}
                    onPress={() => onOpenActionSheet(index)}
                >
                    <Text style={styles.optionsText}>{element.label}</Text>
                    <View style={styles.actionContainer}>
                        <Text style={styles.optionsText}>{element.answer}</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            style={styles.iconStyle}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CustomizationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#393E46",
    },
    optionsContainer: {
        padding: 20,
        borderBottomWidth: 0.4,
        borderBottomColor: colors.settingsTextColor,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optionsText: {
        color: "white",
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    iconStyle: {
        fontSize: 28,
        color: colors.settingsTextColor,
    },
});

export const screenOptions = () => {
    return {
        headerTintColor: "white",
        headerTitle: "Customize",
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
