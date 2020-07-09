import React from "react";
import { StyleSheet, Modal, View, Text, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { WebView } from "react-native-webview";

import * as barcodeActions from "../../redux/actions/barcodeActions";
import CustomIcons from "../UI/CustomIcons";
import colors from "../../constants/colors";

const ManageBarcode = (props) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        try {
            dispatch(
                barcodeActions.addBarcodeDocument(
                    props.barcodeData.data,
                    props.barcodeData.barcodeType,
                    new Date().toISOString()
                )
            );
            props.navigate("BarcodeScreen");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Modal
                visible={props.isVisible}
                animationType="fade"
                onRequestClose={props.closeModal}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.iconContainer}>
                        <CustomIcons
                            iconHandler={props.closeModal}
                            name="md-arrow-back"
                            color={colors.primary}
                            size={30}
                        />
                        <Text style={styles.headerText}>Scan Result</Text>
                        <CustomIcons
                            iconHandler={handleSubmit}
                            name="md-save"
                            color={colors.primary}
                            size={30}
                            styles={{ marginRight: 10 }}
                        />
                    </View>
                    <Text style={styles.labelText}>Result:</Text>
                    <Text style={styles.resultText}>
                        {props.barcodeData.data}
                    </Text>
                    {props.barcodeData.barcodeType === "url" && (
                        <View style={styles.webViewContainer}>
                            <WebView source={{ uri: props.barcodeData.data }} />
                        </View>
                    )}
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default ManageBarcode;

const styles = StyleSheet.create({
    container: { flex: 1, margin: 20 },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
        paddingTop: 4,
    },
    labelText: {
        paddingTop: 10,
        fontFamily: "open-sans-bold",
        fontSize: 20,
    },
    resultText: {
        paddingTop: 10,
        fontFamily: "open-sans",
        fontSize: 18,
    },
    webViewContainer: { flex: 1, paddingTop: 20 },
});
