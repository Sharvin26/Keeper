import Expenditure from "../../models/Expenditure";
import sortDocs from "../../helpers/customSort";
import {
    FETCH_EXPENDITURE,
    ADD_EXPENDITURE,
    UPDATE_EXPENDITURE,
    DELETE_EXPENDITURE,
} from "../actions/expenditureActions";

const initialState = {
    expenditures: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXPENDITURE:
            const docs = sortDocs(action.expenditures, "Date");
            return {
                ...state,
                expenditures: docs,
            };
        case ADD_EXPENDITURE:
            const newExpenditure = new Expenditure(
                action.expenditureDocument.id,
                action.expenditureDocument.name,
                action.expenditureDocument.amount,
                action.expenditureDocument.type,
                action.expenditureDocument.date,
                action.expenditureDocument.isCompleted
            );
            return {
                ...state,
                expenditures: sortDocs(
                    state.expenditures.concat(newExpenditure),
                    "Date"
                ),
            };
        case UPDATE_EXPENDITURE:
            const updatedExpenditure = new Expenditure(
                action.expenditureDocument.id,
                action.expenditureDocument.name,
                action.expenditureDocument.amount,
                action.expenditureDocument.type,
                action.expenditureDocument.date,
                action.expenditureDocument.isCompleted
            );
            const allExpenditures = [...state.expenditures];
            const expenditureIndex = state.expenditures.findIndex(
                (expense) => expense.id === action.expenditureDocument.id
            );
            allExpenditures[expenditureIndex] = updatedExpenditure;
            return {
                ...state,
                expenditures: sortDocs(allExpenditures, "Date"),
            };
        case DELETE_EXPENDITURE:
            return {
                ...state,
                expenditures: state.expenditures.filter(
                    (expenseItem) => expenseItem.id !== action.id
                ),
            };
        default:
            return state;
    }
};
