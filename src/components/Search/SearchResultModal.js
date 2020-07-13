import React from "react";
import { StyleSheet, Text, View, Modal, SafeAreaView } from "react-native";
import {
    CARDS,
    TODOS,
    EXPENDITURES,
    BARCODE_DOCUMENTS,
} from "../../screens/searchbar/SearchScreen";
import ManageTodo from "../Wallet/todos/ManageTodo";
import CardItemView from "../Wallet/cards/CardItemView";
import CustomWebView from "../Barcode/CustomWebView";
import ManageExpense from "../Wallet/expenditures/ManageExpense";

const CardItemViewModal = (props) => (
    <CardItemView
        id={props.itemData.id}
        cardName={props.itemData.cardName}
        cardNumber={props.itemData.cardNumber}
        cardExpiry={props.itemData.cardExpiry}
        cardCvv={props.itemData.cardCvv}
        isViewCardEnable={props.openModal}
        closeViewCardEnable={props.closeModal}
    />
);

const BarcodeItemViewModal = (props) => (
    <CustomWebView
        uri={props.itemData.result}
        isVisible={props.openModal}
        closeWebView={props.closeModal}
    />
);

const TodoItemViewModal = (props) => (
    <ManageTodo
        closeModal={props.closeModal}
        isModalOpen={props.openModal}
        todoId={props.itemData.id}
    />
);

const ExpenditureItemViewModal = (props) => (
    <ManageExpense
        modalType={props.itemData.type}
        addModal={props.openModal}
        expenditureId={props.itemData.id}
        data={props.itemData}
        closeModal={props.closeModal}
    />
);

const SearchResultModal = (props) => {
    return (
        <View>
            {props.searchCategory === CARDS ? (
                <CardItemViewModal {...props} />
            ) : props.searchCategory === BARCODE_DOCUMENTS ? (
                <BarcodeItemViewModal {...props} />
            ) : props.searchCategory === TODOS ? (
                <TodoItemViewModal {...props} />
            ) : props.searchCategory === EXPENDITURES ? (
                <ExpenditureItemViewModal {...props} />
            ) : null}
        </View>
    );
};

export default SearchResultModal;

const styles = StyleSheet.create({});

const todoStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(100,100,100, 0.5)",
    },
    mainContainer: {
        width: "100%",
        height: "32%",
        backgroundColor: "white",
        paddingHorizontal: 10,
    },
});

const expenditureStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(100,100,100, 0.5)",
    },
    mainContainer: {
        width: "100%",
        height: "32%",
        backgroundColor: "white",
        paddingHorizontal: 10,
    },
});
