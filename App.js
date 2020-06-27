import React, { useState } from "react";
import { Provider } from "react-redux";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import store from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { init } from "./src/helpers/db";
import { initExpenditure } from "./src/helpers/expenditureDb";

import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["componentWillReceiveProps"]);
const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("componentWillReceiveProps") <= -1) {
        _console.warn(message);
    }
};

//To Handle the errors;
init()
    .then(() => {})
    .catch((error) => {
        console.log(error);
    });

initExpenditure()
    .then(() => {})
    .catch((error) => {});

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
};

const App = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    if (!isFontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setIsFontLoaded(true);
                }}
            />
        );
    }

    return (
        <Provider store={store}>
            <ActionSheetProvider>
                <AppNavigator />
            </ActionSheetProvider>
        </Provider>
    );
};

export default App;
