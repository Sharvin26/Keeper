import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as keeperActions from "../../redux/actions/KeeperActions";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colors from "../../constants/colors";

const KeeperDetailsScreen = (props) => {
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);
    const keeperId = props.route.params.keeperId;

    const keeper = useSelector((state) =>
        state.Keeps.documents.find((keep) => keep.id === keeperId)
    );

    const deleteDoc = async () => {
        try {
            setIsFetching(true);
            await dispatch(keeperActions.deleteDocumen(keeper.id));
            props.navigation.goBack();
        } catch (error) {
            setIsFetching(false);
            Alert.alert(
                "Something went wrong",
                "There might be some issue. Please try again after sometime",
                [{ text: "Okay" }]
            );
        }
    };

    const deleteHandler = () => {
        return Alert.alert(
            "Are you sure?",
            "The item cannot be restored after deleting. Select yes to confirm or no to cancel",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes",
                    onPress: () => deleteDoc(),
                    style: "destructive",
                },
            ]
        );
    };

    const editHandler = () => {
        props.navigation.navigate("ManageKeeper", {
            id: keeper.id,
        });
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Edit"
                        iconName={
                            Platform.OS === "android"
                                ? "md-color-wand"
                                : "ios-color-wand"
                        }
                        onPress={editHandler}
                    />
                    <Item
                        title="Delete"
                        iconName={
                            Platform.OS === "android"
                                ? "md-remove-circle"
                                : "ios-remove-circle"
                        }
                        onPress={deleteHandler}
                    />
                </HeaderButtons>
            ),
        });
    }, [deleteHandler]);

    if (isFetching) {
        return (
            <View style={styles.loadingScreen}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

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
    loadingScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
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
    };
};
