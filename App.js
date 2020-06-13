import React, { useState } from "react";
import { Provider } from "react-redux";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import store from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { init } from "./src/helpers/db";

//To Handle the errors;
init()
    .then(() => {})
    .catch(() => {});

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
