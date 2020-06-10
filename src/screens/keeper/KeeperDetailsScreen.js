import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colors from "../../constants/colors";

const KeeperDetailsScreen = (props) => {
    const keeperId = props.route.params.keeperId;
    const keeper = useSelector((state) =>
        state.Keeps.documents.find((keep) => keep.id === keeperId)
    );
    return (
        <ScrollView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{keeper.title}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: keeper.image }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.description}>{keeper.description}</Text>
            </View>
        </ScrollView>
    );
};

export default KeeperDetailsScreen;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    textContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
    },
    imageContainer: {
        marginTop: 30,
        width: "100%",
        height: 200,
        borderColor: colors.primary,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    description: {
        fontSize: 16,
        fontFamily: "open-sans",
    },
});

export const screenOptions = () => {
    return {
        headerTitle: "Keeper",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add"
                    iconName={
                        Platform.OS === "android"
                            ? "md-color-wand"
                            : "ios-color-wand"
                    }
                    onPress={() => {}}
                />
                <Item
                    title="Add"
                    iconName={
                        Platform.OS === "android"
                            ? "md-remove-circle"
                            : "ios-remove-circle"
                    }
                    onPress={() => {}}
                />
            </HeaderButtons>
        ),
    };
};
