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

import * as KeeperActions from "../../redux/actions/KeeperActions";
import KeeperItem from "../../components/Keeper/KeeperItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colors from "../../constants/colors";
import ErrorScreen from "../../components/UI/ErrorScreen";
import SearchKeeper from "../../components/Keeper/SearchKeeper";
import ManageKeeper from "../../components/Keeper/ManageKeeper";

const KeepersScreen = (props) => {
    const [isManageEnabled, setIsManageEnabled] = useState(false);
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const keepers = useSelector((state) => state.Keeps.documents);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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

    const loadDocuments = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(KeeperActions.getDocuments());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch]);

    const fetchData = useCallback(async () => {
        setIsFetching(true);
        try {
            await dispatch(KeeperActions.getDocuments());
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            setError(error);
        }
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener(
            "focus",
            loadDocuments
        );
        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const selectHandler = (id) => {
        if (isSearchEnabled) setIsSearchEnabled(false);
        props.navigation.navigate("KeeperDetail", {
            keeperId: id,
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

    if (keepers.length === 0) {
        return (
            <View style={styles.screen}>
                <ManageKeeper
                    isManageEnabled={isManageEnabled}
                    closeManageModal={closeManageModal}
                    navigate={props.navigation.navigate}
                />
                <SearchKeeper
                    data={keepers}
                    isSearchEnabled={isSearchEnabled}
                    closeSearchModal={closeSearchModal}
                    selectHandler={selectHandler}
                />
                <Text style={styles.emptyScreenText}>
                    Seems you haven't added any document yet.
                </Text>
                <Text style={styles.hintScreenText}>
                    Hint: Add document by clicking on (+) plus icon
                </Text>
            </View>
        );
    }

    return (
        <View>
            <ManageKeeper
                isManageEnabled={isManageEnabled}
                closeManageModal={closeManageModal}
                navigate={props.navigation.navigate}
            />
            <SearchKeeper
                data={keepers}
                isSearchEnabled={isSearchEnabled}
                closeSearchModal={closeSearchModal}
                selectHandler={selectHandler}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={loadDocuments}
                refreshing={isRefreshing}
                data={keepers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => (
                    <KeeperItem
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

export default KeepersScreen;

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

export const screenOptions = (navData) => {
    return {
        headerTitle: "Keeper",
    };
};
