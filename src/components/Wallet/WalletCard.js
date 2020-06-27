import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

const WalletCard = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.cardContainer}>
            <ImageBackground
                source={props.source}
                style={styles.imageContainer}
            >
                <Text style={styles.text}>{props.label}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default WalletCard;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginHorizontal: 5,
        height: 190,
        borderColor: "#a39e9e",
        borderWidth: 1,
        justifyContent: "center",
    },
    imageContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    text: {
        fontFamily: "open-sans-bold",
        textAlign: "center",
        fontSize: 18,
        color: "white",
        paddingBottom: 5,
    },
});
