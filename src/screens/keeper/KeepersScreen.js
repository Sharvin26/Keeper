import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

const KeepersScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>All the Keepers will be present here</Text>
        </View>
    );
};

export default KeepersScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export const screenOptions = (navData) => {
    return {
        headerTitle: "Keeper",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add"
                    iconName={
                        Platform.OS === "android"
                            ? "md-add-circle"
                            : "ios-add-circle"
                    }
                    onPress={() => navData.navigation.navigate("AddKeeper")}
                />
                <Item
                    title="Search"
                    iconName={
                        Platform.OS === "android" ? "md-search" : "ios-search"
                    }
                    onPress={() => navData.navigation.navigate("SearchKeeper")}
                />
            </HeaderButtons>
        ),
    };
};
