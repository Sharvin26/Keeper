import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import AppNavigator from "./src/navigation/AppNavigator";

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

    return <AppNavigator />;
};

export default App;
