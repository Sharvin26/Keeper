import {
    GET_DOCUMENTS,
    ADD_DOCUMENT,
    EDIT_DOCUMENT,
    DELETE_DOCUMENT,
} from "../actions/KeeperActions";
import Keeper from "../../models/Keeper";
import customSort from "../../helpers/customSort";

const initialState = {
    documents: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCUMENTS:
            const docs = customSort(action.documents);
            return {
                ...state,
                documents: docs,
            };
        case ADD_DOCUMENT:
            const newDocument = new Keeper(
                action.document.id,
                action.document.title,
                action.document.image,
                action.document.date,
                action.document.description
            );
            return {
                ...state,
                documents: customSort(state.documents.concat(newDocument)),
            };
        case EDIT_DOCUMENT:
            const updatedDocument = new Keeper(
                action.document.id,
                action.document.title,
                action.document.image,
                action.document.date,
                action.document.description
            );
            const allDocuments = [...state.documents];
            const docIndex = state.documents.findIndex(
                (doc) => doc.id === action.document.id
            );
            allDocuments[docIndex] = updatedDocument;
            return {
                ...state,
                documents: customSort(allDocuments),
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                documents: state.documents.filter(
                    (doc) => doc.id !== action.id
                ),
            };
        default:
            return state;
    }
};
