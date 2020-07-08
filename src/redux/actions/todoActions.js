import moment from "moment";
import {
    fetchTodo,
    insertTodo,
    modifyTodo,
    removeTodo,
} from "../../database/todosDb";

export const GET_TODOS = "GET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const getTodos = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchTodo();
            const data = dbResult.rows._array.map((todo) => {
                const isCompletedConversion =
                    todo.isCompleted === 0 ? false : true;
                return {
                    ...todo,
                    isCompleted: isCompletedConversion,
                };
            });
            dispatch({
                type: GET_TODOS,
                todos: data,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const addTodo = (task, isCompleted, date) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const isCompletedConversion = isCompleted ? 1 : 0;
            const dbResult = await insertTodo(
                task,
                isCompletedConversion,
                newDate
            );
            dispatch({
                type: ADD_TODO,
                todo: {
                    id: dbResult.insertId,
                    task,
                    isCompleted,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const updateTodo = (id, task, isCompleted, date) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const isCompletedConversion = isCompleted ? 1 : 0;
            await modifyTodo(id, task, isCompletedConversion, newDate);
            dispatch({
                type: UPDATE_TODO,
                document: {
                    id,
                    task,
                    isCompleted,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteTodo = (id) => {
    return async (dispatch) => {
        try {
            await removeTodo(id);
            dispatch({
                type: DELETE_TODO,
                id,
            });
        } catch (error) {
            throw error;
        }
    };
};
