import React, { useState } from "react";
import { Provider } from "react-redux";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import store from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";

import { initMoments } from "./src/database/momentsDb";
import { initExpenditures } from "./src/database/expendituresDb";
import { initTodos } from "./src/database/todosDb";
import { initDocuments } from "./src/database/documentsDb";
import { initBarcodeDocuments } from "./src/database/barcodeDb";
import { initCards } from "./src/database/cardDb";

import { YellowBox } from "react-native";
import _ from "lodash";
import ErrorScreen from "./src/components/UI/ErrorScreen";
import LocalAuthenticationHandler from "./src/components/LocalAuthentication/LocalAuthenticationHandler";

YellowBox.ignoreWarnings(["componentWillReceiveProps"]);
const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("componentWillReceiveProps") <= -1) {
        _console.warn(message);
    }
};

const initDatabase = () => {
    initMoments()
        .then(() => {})
        .catch((error) => {
            throw error;
        });

    initExpenditures()
        .then(() => {})
        .catch((error) => {
            throw error;
        });

    initTodos()
        .then(() => {})
        .catch((error) => {
            throw error;
        });

    initDocuments()
        .then(() => {})
        .catch((error) => {
            throw error;
        });

    initBarcodeDocuments()
        .then(() => {})
        .catch((error) => {
            throw error;
        });

    initCards()
        .then(() => {})
        .catch((error) => {
            throw error;
        });
};

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
};

const App = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState();

    try {
        initDatabase();
    } catch (error) {
        return <ErrorScreen />;
    }

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

    const passwordHandler = (password) => {
        if (password) {
            setIsPasswordValid(true);
        }
    };

    return (
        <Provider store={store}>
            <ActionSheetProvider>
                {isPasswordValid ? (
                    <AppNavigator />
                ) : (
                    <LocalAuthenticationHandler
                        passwordHandler={passwordHandler}
                    />
                )}
            </ActionSheetProvider>
        </Provider>
    );
};

export default App;
