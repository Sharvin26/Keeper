import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome5";
import ActionButton from "react-native-action-button";

import { useDispatch, useSelector } from "react-redux";

import * as expenditureActions from "../../redux/actions/expenditureActions";
import ExpenseCard from "../../components/Wallet/ExpenseCard";
import Divider from "../../components/UI/Divider";
import ManageExpense from "../../components/Wallet/ManageExpense";
import ExpenseItem from "../../components/Wallet/ExpenseItem";

const ExpenditureScreen = () => {
    const dispatch = useDispatch();
    const [expenditureId, setExpenditureId] = useState();
    const [error, setError] = useState();
    const [addModal, setAddModal] = useState(false);
    const [modalType, setModalType] = useState();

    const expenditures = useSelector(
        (state) => state.expenditures.expenditures
    );

    let givenList = expenditures.filter((e) => e.type === "GIVE_MONEY");

    let totalGivenAmount = 0.0;
    for (let i = 0; i < givenList.length; i++) {
        totalGivenAmount += givenList[i].amount;
    }

    let borrowList = expenditures.filter((e) => e.type === "BORROW_MONEY");
    let totalBorrowAmount = 0.0;
    for (let i = 0; i < borrowList.length; i++) {
        totalBorrowAmount += borrowList[i].amount;
    }

    const loadExpenditure = useCallback(async () => {
        try {
            await dispatch(expenditureActions.getExpenditure());
        } catch (error) {
            setError("Something went wrong!!");
        }
    }, []);

    useEffect(() => {
        if (expenditures.length === 0) {
            loadExpenditure();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View>
                    <ManageExpense
                        modalType={modalType}
                        addModal={addModal}
                        expenditureId={expenditureId}
                        data={expenditures.find(
                            (expense) => expense.id === expenditureId
                        )}
                        closeModal={() => {
                            setExpenditureId();
                            setAddModal(false);
                        }}
                    />
                    <ExpenseCard
                        labelOne="Given"
                        labelTwo="Borrowed"
                        amountOne={totalGivenAmount}
                        amountTwo={totalBorrowAmount}
                    />
                    <Divider />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: "35%" }}
                    style={styles.list}
                    data={expenditures}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(itemData) => (
                        <ExpenseItem
                            id={itemData.item.id}
                            name={itemData.item.name}
                            amount={itemData.item.amount}
                            type={itemData.item.type}
                            date={itemData.item.date}
                            isCompleted={itemData.item.isCompleted}
                            onPress={() => {
                                setModalType(
                                    itemData.item.type === "GIVE_MONEY"
                                        ? "GiveMoney"
                                        : "BorrowMoney"
                                );
                                setExpenditureId(itemData.item.id);
                                setAddModal(true);
                            }}
                        />
                    )}
                />
            </View>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item
                    buttonColor="#FF6347"
                    title="Borrow Money"
                    onPress={() => {
                        setModalType("BorrowMoney");
                        setAddModal(true);
                    }}
                >
                    <FontAwesome
                        name="money-bill-wave-alt"
                        style={styles.actionButtonIcon}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#00FF7F"
                    title="Give Money"
                    onPress={() => {
                        setModalType("GiveMoney");
                        setAddModal(true);
                    }}
                >
                    <FontAwesome
                        name="money-bill-wave-alt"
                        style={styles.actionButtonIcon}
                    />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};

export default ExpenditureScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3f3f3" },
    cardContainer: { margin: 20 },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: "white",
    },
    list: { flexGrow: 1 },
});
