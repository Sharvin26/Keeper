import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as todoActions from "../../redux/actions/todoActions";
import TodoItem from "../../components/Wallet/todos/TodoItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colors from "../../constants/colors";
import ManageTodo from "../../components/Wallet/todos/ManageTodo";
import ErrorScreen from "../../components/UI/ErrorScreen";

const initialLayout = { width: Dimensions.get("window").width };

const renderTabBar = (props) => (
    <TabBar
        {...props}
        renderLabel={({ route }) => (
            <Text style={styles.renderContainer}>{route.title}</Text>
        )}
        indicatorStyle={{ backgroundColor: "black" }}
        style={{ backgroundColor: colors.activeColor }}
    />
);

const CustomFlatList = (props) => (
    <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={props.todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
            <TodoItem
                id={itemData.item.id}
                task={itemData.item.task}
                isCompleted={itemData.item.isCompleted}
                onPress={() => {
                    props.setTodoId(itemData.item.id);
                    props.setIsModalOpen(true);
                }}
            />
        )}
    />
);

const TodosScreen = (props) => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoId, setTodoId] = useState();
    const [routes] = useState([
        { key: "pending", title: "Pending Tasks" },
        { key: "completed", title: "Completed Tasks" },
    ]);
    const [index, setIndex] = React.useState(0);
    const [error, setError] = useState();

    const PendingTab = () => {
        const pendingTodo = todos.filter((todo) => todo.isCompleted === false);
        return (
            <CustomFlatList
                todos={pendingTodo}
                setTodoId={setTodoId}
                setIsModalOpen={setIsModalOpen}
            />
        );
    };

    const CompletedTab = () => {
        const completedTodo = todos.filter((todo) => todo.isCompleted === true);
        return (
            <CustomFlatList
                todos={completedTodo}
                setTodoId={setTodoId}
                setIsModalOpen={setIsModalOpen}
            />
        );
    };

    const renderScene = SceneMap({
        pending: PendingTab,
        completed: CompletedTab,
    });

    const fetchTodos = useCallback(async () => {
        try {
            await dispatch(todoActions.getTodos());
        } catch (error) {
            setError(error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (todos.length === 0) {
            fetchTodos();
        }
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Add"
                        iconName={
                            Platform.OS === "android"
                                ? "md-add-circle"
                                : "ios-add-circle"
                        }
                        onPress={() => setIsModalOpen(true)}
                    />
                </HeaderButtons>
            ),
        });
    }, []);

    const closeModal = () => {
        setTodoId();
        setIsModalOpen(false);
    };

    if (error) {
        return <ErrorScreen />;
    }

    return (
        <View style={styles.mainContainer}>
            <ManageTodo
                closeModal={() => closeModal()}
                isModalOpen={isModalOpen}
                todoId={todoId}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

export default TodosScreen;

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    renderContainer: {
        color: "black",
        margin: 8,
        fontSize: 18,
        fontFamily: "open-sans-bold",
    },
});

export const screenOptions = () => {
    return {
        headerTitle: "Todos",
    };
};
