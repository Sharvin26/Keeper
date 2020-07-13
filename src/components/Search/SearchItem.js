import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
    MaterialIcons,
    MaterialCommunityIcons,
} from "react-native-vector-icons";

import {
    MOMENTS,
    CARDS,
    DOCUMENTS,
    TODOS,
    EXPENDITURES,
    BARCODE_DOCUMENTS,
} from "../../screens/searchbar/SearchScreen";
import MomentItem from "../Moment/MomentItem";
import colors from "../../constants/colors";
import SearchResultModal from "./SearchResultModal";

const MomentSearch = (props) => {
    const { image, title, date, id } = props.itemData;
    const selectHandler = (id) => {
        props.navigation("MomentDetails", {
            momentId: id,
        });
    };
    return (
        <MomentItem
            image={image}
            title={title}
            date={date}
            onSelect={() => selectHandler(id)}
        />
    );
};

const CardSearch = (props) => {
    const { cardName, cardNumber } = props.itemData;
    return (
        <View style={styles.mainContainer}>
            <View style={cardStyles.container}>
                <Text style={cardStyles.nameText}>{cardName}</Text>
                <Text style={cardStyles.numberText}>{cardNumber}</Text>
            </View>
        </View>
    );
};

const TodoSearch = (props) => {
    const { task, isCompleted } = props.itemData;
    return (
        <View style={styles.mainContainer}>
            <View style={todoStyles.container}>
                <View style={todoStyles.iconTextContainer}>
                    <MaterialCommunityIcons
                        name="bell"
                        style={todoStyles.iconStyle}
                    />
                    <Text style={todoStyles.textContainer}>{task}</Text>
                </View>
                <MaterialIcons
                    name={isCompleted ? "check-box" : "check-box-outline-blank"}
                    style={todoStyles.iconStyle}
                />
            </View>
        </View>
    );
};

const ExpenditureSearch = (props) => {
    const { name, amount, date, type, isCompleted } = props.itemData;
    return (
        <View style={styles.mainContainer}>
            <View style={expenditureStyles.container}>
                <View style={expenditureStyles.leftContainer}>
                    <Text style={expenditureStyles.nameText}>{name}</Text>
                    <Text style={expenditureStyles.amountText}>
                        Rs {amount}
                    </Text>
                    <Text style={expenditureStyles.dateText}>{date}</Text>
                </View>
                <View style={expenditureStyles.rightContainer}>
                    <Text
                        style={{
                            ...expenditureStyles.typeText,
                            backgroundColor:
                                type === "BORROW_MONEY" ? "#FF6347" : "#228B22",
                        }}
                    >
                        {type === "BORROW_MONEY" ? "Borrowed" : "Given"}
                    </Text>
                    <MaterialIcons
                        name={
                            isCompleted
                                ? "check-box"
                                : "check-box-outline-blank"
                        }
                        style={expenditureStyles.iconStyle}
                    />
                </View>
            </View>
        </View>
    );
};

const BarcodeDocumentSearch = (props) => {
    const { result, type } = props.itemData;
    return (
        <View style={styles.mainContainer}>
            <View style={barcodeStyles.container}>
                <MaterialIcons
                    name={type === "url" ? "open-in-new" : "insert-drive-file"}
                    style={barcodeStyles.iconStyle}
                />
                <Text style={barcodeStyles.resultText}>{result}</Text>
            </View>
        </View>
    );
};

const DocumentSearch = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={documentStyles.container}>
                <Text style={documentStyles.labelText}>
                    {props.itemData.label}
                </Text>
            </View>
        </View>
    );
};

const SearchItem = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const { searchCategory, itemData } = props;

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <View>
            {searchCategory === MOMENTS ? (
                <MomentSearch
                    itemData={itemData}
                    navigation={props.navigation}
                />
            ) : searchCategory === CARDS ? (
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <CardSearch itemData={itemData} />
                </TouchableOpacity>
            ) : searchCategory === TODOS ? (
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <TodoSearch itemData={itemData} />
                </TouchableOpacity>
            ) : searchCategory === EXPENDITURES ? (
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <ExpenditureSearch itemData={itemData} />
                </TouchableOpacity>
            ) : searchCategory === BARCODE_DOCUMENTS ? (
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <BarcodeDocumentSearch itemData={itemData} />
                </TouchableOpacity>
            ) : searchCategory === DOCUMENTS ? (
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <DocumentSearch itemData={itemData} />
                </TouchableOpacity>
            ) : null}
            <SearchResultModal
                itemData={itemData}
                openModal={openModal}
                closeModal={closeModal}
                searchCategory={searchCategory}
            />
        </View>
    );
};

export default SearchItem;

export const NoSearchResult = (props) => {
    return (
        <View style={emptyStyles.container}>
            <Text style={emptyStyles.text}>
                No Result found for {props.searchQuery}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { borderBottomWidth: 1, borderBottomColor: "black" },
});

const documentStyles = StyleSheet.create({
    container: { padding: 20 },
    labelText: { fontFamily: "open-sans", fontSize: 18 },
});

const emptyStyles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    text: { fontSize: 18, fontFamily: "open-sans-bold" },
});

const cardStyles = StyleSheet.create({
    container: {
        margin: 10,
        marginStart: 20,
    },
    nameText: {
        fontSize: 20,
        fontFamily: "open-sans",
        padding: 10,
    },
    numberText: {
        fontSize: 16,
        fontFamily: "open-sans",
        paddingStart: 10,
        paddingBottom: 10,
        color: colors.activeColor,
    },
});

const todoStyles = StyleSheet.create({
    container: {
        margin: 10,
        marginStart: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconTextContainer: { flexDirection: "row", alignItems: "center" },
    textContainer: {
        padding: 10,
        fontSize: 20,
        fontFamily: "open-sans",
    },
    iconStyle: {
        fontSize: 28,
        margin: 5,
    },
});

const expenditureStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    leftContainer: { paddingStart: 20 },
    nameText: {
        paddingBottom: 5,
        fontFamily: "open-sans-bold",
        fontSize: 20,
    },
    amountText: {
        paddingBottom: 5,
        fontFamily: "open-sans",
        fontSize: 16,
    },
    dateText: {
        paddingBottom: 10,
        fontFamily: "open-sans-bold",
        fontSize: 14,
        color: colors.activeColor,
    },
    rightContainer: {
        paddingEnd: 10,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    typeText: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
        flexWrap: "wrap",
        padding: 10,
        color: "white",
    },
    iconStyle: {
        fontSize: 28,
        margin: 5,
    },
});

const barcodeStyles = StyleSheet.create({
    container: {
        marginStart: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 10,
    },
    iconStyle: {
        fontSize: 28,
        paddingEnd: 10,
    },
    resultText: { fontFamily: "open-sans-bold", fontSize: 14 },
});
