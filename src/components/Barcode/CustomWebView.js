import React, { useState } from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import CustomIcons from "../UI/CustomIcons";
import colors from "../../constants/colors";

const CustomWebView = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Modal
            visible={props.isVisible}
            animationType="fade"
            onRequestClose={props.closeWebView}
        >
            {isLoading && (
                <ActivityIndicator style={styles.loadingScreen} size="large" />
            )}
            <View style={styles.webContainer}>
                <View style={styles.iconContainer}>
                    <CustomIcons
                        iconHandler={props.closeWebView}
                        name="md-arrow-back"
                        color={colors.primary}
                        size={30}
                    />
                </View>
                <WebView
                    source={{ uri: props.uri }}
                    onLoad={() => setIsLoading(false)}
                />
            </View>
        </Modal>
    );
};

export default CustomWebView;

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    webContainer: { flex: 1 },
    iconContainer: {
        padding: 20,
    },
});

export const screenOptions = () => {
    return {
        headerTitle: "Barcode scanner",
    };
};
