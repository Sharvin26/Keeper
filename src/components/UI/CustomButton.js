import React from "react";
import { Button, View } from "react-native";
import colors from "../../constants/colors";

const CustomButton = (props) => {
    return (
        <View style={props.style}>
            <Button
                title={props.title}
                color={colors.primary}
                onPress={props.onPress}
            />
        </View>
    );
};

export default CustomButton;
