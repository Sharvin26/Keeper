import Todo from "../../models/Todo";
import {
    GET_TODOS,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    SEARCH_TODOS,
} from "../actions/todoActions";
import { searchTodos } from "../../helpers/customSearch";
import sort from "../../helpers/customSort";

const initialState = {
    todos: [],
    searchTodos: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: sort(action.todos, "Date"),
            };
        case ADD_TODO:
            const newTodo = new Todo(
                action.todo.id,
                action.todo.task,
                action.todo.isCompleted,
                action.todo.date
            );
            return {
                ...state,
                todos: sort(state.todos.concat(newTodo), "Date"),
            };
        case UPDATE_TODO:
            const updatedTodo = new Todo(
                action.document.id,
                action.document.task,
                action.document.isCompleted,
                action.document.date
            );
            const allTodo = [...state.todos];
            const todoIndex = state.todos.findIndex(
                (todo) => todo.id === action.document.id
            );
            allTodo[todoIndex] = updatedTodo;
            return {
                ...state,
                todos: sort(allTodo, "Date"),
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id),
            };
        case SEARCH_TODOS:
            const filteredTodos = searchTodos(state.todos, action.value);
            return {
                ...state,
                searchTodos: filteredTodos,
            };
        default:
            return state;
    }
};
