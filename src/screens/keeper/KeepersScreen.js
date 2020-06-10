import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Platform,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as KeeperActions from "../../redux/actions/KeeperActions";
import KeeperItem from "../../components/Keeper/KeeperItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colors from "../../constants/colors";

const KeepersScreen = (props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const keepers = useSelector((state) => state.Keeps.documents);

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

    if (isFetching) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
            </View>
        );
    }

    const selectHandler = (id) => {
        props.navigation.navigate("KeeperDetail", {
            keeperId: id,
        });
    };

    return (
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
                    onPress={() => navData.navigation.navigate("ManageKeeper")}
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
