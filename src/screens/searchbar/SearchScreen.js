import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    SafeAreaView,
    FlatList,
    Platform,
    ActivityIndicator,
    Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";

import colors from "../../constants/colors";
import * as momentActions from "../../redux/actions/momentActions";
import * as cardActions from "../../redux/actions/cardActions";
import * as documentActions from "../../redux/actions/documentActions";
import * as expenditureActions from "../../redux/actions/expenditureActions";
import * as todoActions from "../../redux/actions/todoActions";
import * as barcodeActions from "../../redux/actions/barcodeActions";
import SearchItem, { NoSearchResult } from "../../components/Search/SearchItem";

export const MOMENTS = "moments";
export const CARDS = "cards";
export const DOCUMENTS = "documents";
export const TODOS = "todos";
export const EXPENDITURES = "expenditures";
export const BARCODE_DOCUMENTS = "barcodeDocuments";

const SearchScreen = (props) => {
    const dispatch = useDispatch();
    const searchRef = useRef();

    const [searchCategory, setSearchCategory] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const searchData = useSelector((state) => {
        if (searchCategory === MOMENTS) {
            return state.moments.moments;
        } else if (searchCategory === CARDS) {
            return state.cards.cards;
        } else if (searchCategory === DOCUMENTS) {
            return state.documents.documents;
        } else if (searchCategory === TODOS) {
            return state.todos.todos;
        } else if (searchCategory === EXPENDITURES) {
            return state.expenditures.expenditures;
        } else if (searchCategory === BARCODE_DOCUMENTS) {
            return state.barcodeDocuments.barcodeDocuments;
        }
    });

    const searchOutput = useSelector((state) => {
        if (searchCategory === MOMENTS) {
            return state.moments.searchMoments;
        } else if (searchCategory === CARDS) {
            return state.cards.searchCards;
        } else if (searchCategory === DOCUMENTS) {
            return state.documents.documents;
        } else if (searchCategory === TODOS) {
            return state.todos.searchTodos;
        } else if (searchCategory === EXPENDITURES) {
            return state.expenditures.searchExpenditures;
        } else if (searchCategory === BARCODE_DOCUMENTS) {
            return state.barcodeDocuments.searchBarcodeDocuments;
        }
    });

    const { showActionSheetWithOptions } = useActionSheet();
    const onOpenActionSheet = () => {
        const options = [
            "Search in Moments",
            "Search in Cards",
            "Search in Documents",
            "Search in Todos",
            "Search in Expenditues",
            "Search in Barcode Documents",
            "Cancel",
        ];

        const cancelButtonIndex = 6;

        showActionSheetWithOptions(
            { options, cancelButtonIndex, showSeparators: true },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    setSearchCategory(MOMENTS);
                    searchRef.current.focus();
                } else if (buttonIndex === 1) {
                    setSearchCategory(CARDS);
                    searchRef.current.focus();
                } else if (buttonIndex === 2) {
                    setSearchCategory(DOCUMENTS);
                    searchRef.current.focus();
                } else if (buttonIndex === 3) {
                    setSearchCategory(TODOS);
                    searchRef.current.focus();
                } else if (buttonIndex === 4) {
                    setSearchCategory(EXPENDITURES);
                    searchRef.current.focus();
                } else if (buttonIndex === 5) {
                    setSearchCategory(BARCODE_DOCUMENTS);
                    searchRef.current.focus();
                } else if (buttonIndex === 6) {
                    setSearchCategory();
                }
            }
        );
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            setSearchCategory();
            setSearchQuery();
            onOpenActionSheet();
            setIsFetching(false);
        });
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        if (searchData && searchData.length === 0) {
            if (searchCategory === MOMENTS) {
                dispatch(momentActions.getMoments());
            } else if (searchCategory === CARDS) {
                dispatch(cardActions.getCards());
            } else if (searchCategory === DOCUMENTS) {
                dispatch(documentActions.getDocument());
            } else if (searchCategory === TODOS) {
                dispatch(todoActions.getTodos());
            } else if (searchCategory === EXPENDITURES) {
                dispatch(expenditureActions.getExpenditure());
            } else if (searchCategory === BARCODE_DOCUMENTS) {
                dispatch(barcodeActions.getBarcodeDocument());
            } else {
                setSearchCategory();
            }
        }
    }, [searchCategory]);

    const searchDispatch = async (value) => {
        if (searchCategory === MOMENTS) {
            await dispatch(momentActions.searchMoments(value));
            setIsFetching(false);
        } else if (searchCategory === CARDS) {
            dispatch(cardActions.searchCards(value));
            setIsFetching(false);
        } else if (searchCategory === DOCUMENTS) {
            dispatch(documentActions.getDocument());
            setIsFetching(false);
        } else if (searchCategory === TODOS) {
            dispatch(todoActions.searchTodos(value));
            setIsFetching(false);
        } else if (searchCategory === EXPENDITURES) {
            dispatch(expenditureActions.searchExpenditures(value));
            setIsFetching(false);
        } else if (searchCategory === BARCODE_DOCUMENTS) {
            dispatch(barcodeActions.searchBarcodeDocument(value));
            setIsFetching(false);
        } else {
            setSearchCategory();
        }
    };

    const searchHandler = (value) => {
        setSearchQuery(value);
        setIsFetching(true);
        const durationInMilliSeconds = 200;
        clearTimeout(inputTimer);
        let inputTimer = setTimeout(() => {
            searchDispatch(value);
        }, durationInMilliSeconds);
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TextInput
                    editable={searchData && searchData.length > 0}
                    ref={searchRef}
                    placeholder={
                        searchData && searchData.length > 0
                            ? "Start typing here to search..."
                            : "Nothing added yet for this category yet."
                    }
                    style={styles.textInput}
                    key={searchCategory === CARDS ? "Cards" : "Other"}
                    keyboardType={
                        searchCategory === CARDS ? "numeric" : "default"
                    }
                    value={searchQuery}
                    onChangeText={(value) => searchHandler(value)}
                    autoFocus={searchCategory === CARDS}
                />
            </View>
            {isFetching ? (
                <View style={styles.searchingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.searchingText}>Searching</Text>
                </View>
            ) : (
                <View>
                    {searchQuery && searchOutput.length === 0 ? (
                        <NoSearchResult searchQuery={searchQuery} />
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={
                                searchQuery && searchOutput.length > 0
                                    ? searchOutput
                                    : searchData
                            }
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(itemData) => (
                                <SearchItem
                                    itemData={itemData.item}
                                    searchCategory={searchCategory}
                                    navigation={props.navigation.navigate}
                                />
                            )}
                        />
                    )}
                </View>
            )}
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: Platform.OS === "android" ? 60 : 20,
    },
    textInput: { fontSize: 18, fontFamily: "open-sans-bold" },
    searchingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 30,
    },
    searchingText: {
        textAlign: "center",
        fontFamily: "open-sans-bold",
        paddingTop: 10,
        fontSize: 18,
    },
});
