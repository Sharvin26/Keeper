import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import BarcodesScreen, {
    screenOptions as barcodeScreenOptions,
} from "../../screens/barcode/BarcodesScreen";
import BarcodeScanner, {
    screenOptions as barcodeScannerOptions,
} from "../../screens/barcode/BarcodeScanner";

const BarcodeStackNavigator = createStackNavigator();

const BarcodeStack = () => {
    return (
        <BarcodeStackNavigator.Navigator screenOptions={defaultOptions}>
            <BarcodeStackNavigator.Screen
                name="BarcodeScreen"
                component={BarcodesScreen}
                options={barcodeScreenOptions}
            />
            <BarcodeStackNavigator.Screen
                name="ScanBarcode"
                component={BarcodeScanner}
                options={barcodeScannerOptions}
            />
        </BarcodeStackNavigator.Navigator>
    );
};

export default BarcodeStack;
