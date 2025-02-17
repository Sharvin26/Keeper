import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import colors from "../../constants/colors";

const MomentItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
            <Image style={styles.image} source={{ uri: props.image }} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.description}>{props.date}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MomentItem;

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#ccc",
        borderColor: colors.primary,
        borderWidth: 1,
    },
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        color: "black",
        fontSize: 18,
        marginBottom: 5,
    },
    description: {
        color: "#666",
        fontSize: 16,
    },
});

MomentItem.prototype = {
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
