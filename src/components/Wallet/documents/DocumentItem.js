import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PDFReader from "rn-pdf-reader-js";

const DocumentItem = (props) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0}>
            <PDFReader
                style={styles.imageContainer}
                source={{
                    uri: props.pdfUri,
                }}
                webviewProps={{
                    scrollEnabled: false,
                }}
            />
            <Text style={styles.text}>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default DocumentItem;

const styles = StyleSheet.create({
    container: {
        width: "45%",
        height: 230,
        margin: 10,
        borderRadius: 10,
    },
    imageContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        borderRadius: 10,
        overflow: "hidden",
    },
    text: {
        fontFamily: "open-sans-bold",
        textAlign: "center",
        fontSize: 18,
        color: "black",
        padding: 5,
    },
});
