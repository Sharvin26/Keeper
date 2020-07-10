import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Platform,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

import * as momentActions from "../../redux/actions/momentActions";
import MomentItem from "../../components/Moment/MomentItem";
import SearchMoment from "../../components/Moment/SearchMoment";
import ManageMoment from "../../components/Moment/ManageMoment";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colors from "../../constants/colors";
import ErrorScreen from "../../components/UI/ErrorScreen";

const MomentsScreen = (props) => {
    const [isManageEnabled, setIsManageEnabled] = useState(false);
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const moments = useSelector((state) => state.moments.moments);
    const { showActionSheetWithOptions } = useActionSheet();

    const onOpenActionSheet = () => {
        const options = ["By Date", "By Title", "Cancel"];
        const icon = (name) => <Ionicons key={name} name={name} size={24} />;
        const fontIcon = (name) => (
            <FontAwesome key={name} name={name} size={24} />
        );
        const icons = [
            icon("md-time"),
            fontIcon("sort-alpha-asc"),
            icon("md-remove-circle"),
        ];

        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                showSeparators: true,
                icons: icons,
            },
            (buttonIndex) => {
                if (buttonIndex === 2) {
                    return;
                }
                let sortType;
                if (buttonIndex === 0) {
                    sortType = "Date";
                } else if (buttonIndex === 1) {
                    sortType = "Title";
                }

                dispatch(momentActions.sortMoments(sortType));
            }
        );
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Sort"
                        iconName={
                            Platform.OS === "android" ? "md-build" : "ios-build"
                        }
                        onPress={() => onOpenActionSheet()}
                    />
                    <Item
                        title="Add"
                        iconName={
                            Platform.OS === "android"
                                ? "md-add-circle-outline"
                                : "ios-add-circle-outline"
                        }
                        onPress={() => setIsManageEnabled(true)}
                    />
                    <Item
                        title="Search"
                        iconName={
                            Platform.OS === "android"
                                ? "md-search"
                                : "ios-search"
                        }
                        onPress={() => setIsSearchEnabled(true)}
                    />
                </HeaderButtons>
            ),
        });
    }, [setIsManageEnabled, setIsSearchEnabled]);

    const loadMoments = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(momentActions.getMoments());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch]);

    const fetchData = useCallback(async () => {
        setIsFetching(true);
        try {
            await dispatch(momentActions.getMoments());
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            setError(error);
        }
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", loadMoments);
        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const selectHandler = (id) => {
        if (isSearchEnabled) setIsSearchEnabled(false);
        props.navigation.navigate("MomentDetails", {
            momentId: id,
        });
    };

    const closeSearchModal = () => {
        setIsSearchEnabled(false);
    };

    const closeManageModal = () => {
        setIsManageEnabled(false);
    };

    if (isFetching) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return <ErrorScreen />;
    }

    if (moments.length === 0) {
        return (
            <View style={styles.screen}>
                <ManageMoment
                    isManageEnabled={isManageEnabled}
                    closeManageModal={closeManageModal}
                    navigate={props.navigation.navigate}
                />
                <SearchMoment
                    data={moments}
                    isSearchEnabled={isSearchEnabled}
                    closeSearchModal={closeSearchModal}
                    selectHandler={selectHandler}
                />
                <Text style={styles.emptyScreenText}>
                    Seems you haven't added any document yet.
                </Text>
                <Text style={styles.hintScreenText}>
                    Hint: Add a Moment by clicking on (+) plus icon
                </Text>
            </View>
        );
    }

    return (
        <View>
            <ManageMoment
                isManageEnabled={isManageEnabled}
                closeManageModal={closeManageModal}
                navigate={props.navigation.navigate}
            />
            <SearchMoment
                data={moments}
                isSearchEnabled={isSearchEnabled}
                closeSearchModal={closeSearchModal}
                selectHandler={selectHandler}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={loadMoments}
                refreshing={isRefreshing}
                data={moments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => (
                    <MomentItem
                        image={itemData.item.image}
                        title={itemData.item.title}
                        date={itemData.item.date}
                        onSelect={selectHandler.bind(this, itemData.item.id)}
                    />
                )}
            />
        </View>
    );
};

export default MomentsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyScreenText: {
        fontSize: 14,
        fontFamily: "open-sans-bold",
        textAlign: "center",
        paddingHorizontal: 10,
    },
    hintScreenText: {
        fontSize: 14,
        fontFamily: "open-sans-bold",
        textAlign: "center",
        paddingTop: 10,
        paddingHorizontal: 10,
        color: colors.activeColor,
    },
});

export const screenOptions = () => {
    return {
        headerTitle: "Moments",
    };
};
