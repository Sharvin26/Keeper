import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import MomentsScreen, {
    screenOptions as MomentsScreenOptions,
} from "../../screens/moment/MomentsScreen";
import MomentDetailsScreen, {
    screenOptions as MomentDetailsScreenOption,
} from "../../screens/moment/MomentDetailsScreen";
import MomentImageScreen, {
    screenOptions as MomentImageScreenOption,
} from "../../screens/moment/MomentImageScreen";

const MomentStackNavigator = createStackNavigator();

const MomentStack = () => {
    return (
        <MomentStackNavigator.Navigator screenOptions={defaultOptions}>
            <MomentStackNavigator.Screen
                name="Moments"
                component={MomentsScreen}
                options={MomentsScreenOptions}
            />
            <MomentStackNavigator.Screen
                name="MomentDetails"
                component={MomentDetailsScreen}
                options={MomentDetailsScreenOption}
            />
            <MomentStackNavigator.Screen
                name="MomentImage"
                component={MomentImageScreen}
                options={MomentImageScreenOption}
            />
        </MomentStackNavigator.Navigator>
    );
};

export default MomentStack;
