import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import ManageBarcode from "../../components/Barcode/ManageBarcode";

const BarcodeScanner = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [manageBarcodeModal, setManageBarcodeModal] = useState(false);
    const [barcodeData, setBarcodeData] = useState({
        data: "",
        type: "",
        barcodeType: "",
    });
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const checkIfUrl = (text) => {
        const pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                "(\\#[-a-z\\d_]*)?$",
            "i"
        );

        return !!pattern.test(text);
    };

    const handleBarCodeScanned = ({ data, type }) => {
        setScanned(true);
        setManageBarcodeModal(true);
        const barcodeType = checkIfUrl(data) ? "url" : "text";
        setBarcodeData({ data, type, barcodeType });
    };

    const closeBarcodeManageModal = () => {
        setScanned(false);
        setManageBarcodeModal(false);
        setBarcodeData({ data: "", type: "", barcodeType: "" });
    };

    return (
        <View style={styles.barcodeScanner}>
            <ManageBarcode
                isVisible={manageBarcodeModal}
                closeModal={closeBarcodeManageModal}
                navigate={props.navigation.navigate}
                barcodeData={barcodeData}
            />
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </View>
    );
};

export default BarcodeScanner;

const styles = StyleSheet.create({
    barcodeScanner: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
});

export const screenOptions = () => {
    return {
        headerTitle: "Scan Barcode",
    };
};
