import React, { useEffect, useState } from "react";
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
    Modal,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import * as momentActions from "../../redux/actions/momentActions";
import MomentItem from "./MomentItem";
import colors from "../../constants/colors";

const SearchMoment = (props) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const searchOutput = useSelector((state) => state.moments.searchMoments);
    const searchResultEmpty = useSelector((state) =>
        state.moments.searchResult ? state.moments.searchResult : null
    );

    const changeHandler = (text) => {
        setSearchQuery(text);
        setIsFetching(true);
        const duration = 200;
        clearTimeout(inputTimer);
        let inputTimer = setTimeout(() => {
            searchData(text);
        }, duration);
    };

    const searchData = async (text) => {
        await dispatch(momentActions.searchMoments(text));
        setIsFetching(false);
    };

    return (
        <Modal
            visible={props.isSearchEnabled}
            animationType="slide"
            onRequestClose={props.closeSearchModal}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="md-arrow-back"
                        size={28}
                        color="black"
                        onPress={props.closeSearchModal}
                        style={{
                            ...styles.icon,
                            paddingTop: Platform.OS === "ios" ? 2 : 0,
                        }}
                    />
                    <TextInput
                        style={styles.text}
                        autoFocus={true}
                        placeholder="Search...."
                        keyboardType="web-search"
                        value={searchQuery}
                        onChangeText={changeHandler}
                    />
                </View>
                {isFetching ? (
                    <View style={styles.searchingContainer}>
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />
                        <Text style={styles.searchingText}>Searching</Text>
                    </View>
                ) : searchResultEmpty === "empty" ? (
                    <View style={styles.noResultContainer}>
                        <Text style={styles.noResultText}>
                            No Result found for {searchQuery}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.searchResultContainer}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={
                                searchOutput.length > 0
                                    ? searchOutput
                                    : props.data
                            }
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(itemData) => (
                                <MomentItem
                                    image={itemData.item.image}
                                    title={itemData.item.title}
                                    date={itemData.item.date}
                                    onSelect={props.selectHandler.bind(
                                        this,
                                        itemData.item.id
                                    )}
                                />
                            )}
                        />
                    </View>
                )}
            </SafeAreaView>
        </Modal>
    );
};

export default SearchMoment;

const styles = StyleSheet.create({
    searchingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    searchingText: {
        textAlign: "center",
        fontFamily: "open-sans-bold",
        paddingTop: 10,
        fontSize: 18,
    },
    noResultContainer: { flex: 1, marginTop: 20 },
    noResultText: {
        textAlign: "center",
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    container: {
        flex: 1,
        margin: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: "10%",
        paddingRight: 10,
    },
    text: {
        width: "90%",
        fontSize: 18,
        paddingLeft: 10,
        fontFamily: "open-sans-bold",
        color: colors.activeColor,
    },
    searchResultContainer: {
        paddingTop: 20,
    },
});
