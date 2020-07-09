import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as barcodeActions from "../../redux/actions/barcodeActions";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import BarcodeItems from "../../components/Barcode/BarcodeItems";

const BarcodesScreen = (props) => {
    const dispatch = useDispatch();
    const barcodeDocuments = useSelector(
        (state) => state.barcodeDocuments.barcodeDocuments
    );

    const fetchBarcodeDocuments = useCallback(async () => {
        try {
            await dispatch(barcodeActions.getBarcodeDocument());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (barcodeDocuments.length === 0) {
            fetchBarcodeDocuments();
        }
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Barcode Scan"
                        iconName="md-barcode"
                        onPress={() => props.navigation.navigate("ScanBarcode")}
                    />
                </HeaderButtons>
            ),
        });
    }, []);

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={barcodeDocuments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
                <BarcodeItems
                    id={itemData.item.id}
                    result={itemData.item.result}
                    type={itemData.item.type}
                />
            )}
        />
    );
};

export default BarcodesScreen;

export const screenOptions = () => {
    return {
        headerTitle: "Barcode scanner",
    };
};
