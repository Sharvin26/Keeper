import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, Dimensions, Text } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome5";
import ActionButton from "react-native-action-button";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import * as expenditureActions from "../../redux/actions/expenditureActions";
import ExpenseCard from "../../components/Wallet/expenditures/ExpenseCard";
import ManageExpense from "../../components/Wallet/expenditures/ManageExpense";
import ExpenseItem from "../../components/Wallet/expenditures/ExpenseItem";

const initialLayout = { width: Dimensions.get("window").width };

const renderTabBar = (props) => (
    <TabBar
        {...props}
        renderLabel={({ route }) => (
            <Text
                style={{
                    color: "white",
                    margin: 8,
                    fontSize: 15,
                    fontFamily: "open-sans-bold",
                }}
            >
                {route.title}
            </Text>
        )}
        indicatorStyle={{ backgroundColor: "white" }}
        style={{ backgroundColor: "#e74c3c" }}
    />
);

const CustomFlatList = (props) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: "15%",
            }}
            style={styles.list}
            data={props.expenditures}
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
                        props.setModalType(
                            itemData.item.type === "GIVE_MONEY"
                                ? "GiveMoney"
                                : "BorrowMoney"
                        );
                        props.setExpenditureId(itemData.item.id);
                        props.setAddModal(true);
                    }}
                />
            )}
        />
    );
};

const ExpenditureScreen = () => {
    const dispatch = useDispatch();
    const [expenditureId, setExpenditureId] = useState();
    const [error, setError] = useState();
    const [addModal, setAddModal] = useState(false);
    const [modalType, setModalType] = useState();

    const [routes] = useState([
        { key: "pending", title: "Pending" },
        { key: "completed", title: "Completed" },
    ]);
    const [index, setIndex] = React.useState(0);

    const expenditures = useSelector(
        (state) => state.expenditures.expenditures
    );

    let givenList;
    if (index === 0) {
        givenList = expenditures.filter(
            (e) => e.type === "GIVE_MONEY" && e.isCompleted === false
        );
    } else if (index === 1) {
        givenList = expenditures.filter(
            (e) => e.type === "GIVE_MONEY" && e.isCompleted === true
        );
    }

    let totalGivenAmount = 0.0;
    for (let i = 0; i < givenList.length; i++) {
        totalGivenAmount += givenList[i].amount;
    }

    let borrowList;
    if (index === 0) {
        borrowList = expenditures.filter(
            (e) => e.type === "BORROW_MONEY" && e.isCompleted === false
        );
    } else if (index === 1) {
        borrowList = expenditures.filter(
            (e) => e.type === "BORROW_MONEY" && e.isCompleted === true
        );
    }

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

    const PendingTab = () => {
        const pendingExpenditures = expenditures.filter(
            (expense) => expense.isCompleted === false
        );
        return (
            <CustomFlatList
                expenditures={pendingExpenditures}
                setModalType={setModalType}
                setExpenditureId={setExpenditureId}
                setAddModal={setAddModal}
            />
        );
    };

    const CompletedTab = () => {
        const completedExpenditure = expenditures.filter(
            (expense) => expense.isCompleted === true
        );
        return (
            <CustomFlatList
                expenditures={completedExpenditure}
                setModalType={setModalType}
                setExpenditureId={setExpenditureId}
                setAddModal={setAddModal}
            />
        );
    };

    const renderScene = SceneMap({
        pending: PendingTab,
        completed: CompletedTab,
    });

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Something went wrong!! Please try again</Text>
            </View>
        );
    }
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
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
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
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
