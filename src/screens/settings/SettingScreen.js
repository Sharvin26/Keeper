import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    View,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as WebBrowser from "expo-web-browser";

import colors from "../../constants/colors";
import CustomIcons from "../../components/UI/CustomIcons";

const optionsArray = [
    "Customisation",
    "Security",
    "Privacy",
    "Contact",
    "Help",
];
const keeperIcon = require("../../../assets/logo.png");
const textColor = colors.settingsTextColor;

const SettingScreen = (props) => {
    const _handleContactClick = async () => {
        await MailComposer.composeAsync({
            recipients: ["xyz@mail.com"],
        });
    };

    const _handlePrivacyClick = async () => {
        await WebBrowser.openBrowserAsync("https://www.google.com");
    };

    const handleClick = (element) => {
        if (element === "Customisation") {
            props.navigation.navigate("Customize");
        } else if (element === "Security") {
            props.navigation.navigate("Security");
        } else if (element === "Help") {
            props.navigation.navigate("Help");
        } else if (element === "Contact") {
            _handleContactClick();
        } else if (element == "Privacy") {
            _handlePrivacyClick();
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <Image source={keeperIcon} style={styles.imageContainer} />
            {optionsArray.map((element, index) => (
                <TouchableOpacity
                    style={styles.container}
                    key={index}
                    activeOpacity={0.4}
                    onPress={() => handleClick(element)}
                >
                    <Text style={styles.label}>{element}</Text>
                    <CustomIcons
                        name="ios-arrow-forward"
                        color={textColor}
                        size={30}
                    />
                </TouchableOpacity>
            ))}
            <View style={styles.versionContainer}>
                <Text style={styles.versionInfo}>Version: 0.01</Text>
                <Text style={styles.developerInfo}>
                    Developed by Mhaswadkar Softwares Pvt LTD
                </Text>
            </View>
        </ScrollView>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    scrollContainer: { flex: 1, backgroundColor: "#393E46" },
    imageContainer: { width: "100%", height: 220 },
    container: {
        borderBottomWidth: 0.4,
        borderBottomColor: textColor,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: { fontSize: 20, fontFamily: "open-sans", color: textColor },
    versionContainer: { alignItems: "center", paddingTop: 20 },
    versionInfo: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
        color: textColor,
        paddingBottom: 10,
    },
    developerInfo: {
        fontFamily: "open-sans",
        fontSize: 14,
        color: textColor,
        paddingBottom: 10,
    },
    iconStyle: {
        fontSize: 28,
        color: "white",
        paddingRight: 20,
    },
});

export const screenOptions = () => {
    return {
        headerTintColor: textColor,
        headerTitle: "Settings",
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
