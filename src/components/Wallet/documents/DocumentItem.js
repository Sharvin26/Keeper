import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "react-native-vector-icons";
import PDFReader from "rn-pdf-reader-js";
import { WebView } from "react-native-webview";
import * as documentActions from "../../../redux/actions/documentActions";

const DocumentItem = (props) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        try {
            dispatch(documentActions.deleteDocuments(props.id));
        } catch (error) {
            console.log(error);
        }
    };
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
            <MaterialIcons
                name="delete"
                style={{
                    fontSize: 28,
                    textAlign: "center",
                }}
                onPress={() => deleteHandler()}
            />
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
