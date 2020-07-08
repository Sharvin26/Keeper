import React from "react";
import { Button, View } from "react-native";
import PropTypes from "prop-types";
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

CustomButton.prototype = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};
