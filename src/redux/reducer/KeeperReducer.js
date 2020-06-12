import {
    GET_DOCUMENTS,
    ADD_DOCUMENT,
    EDIT_DOCUMENT,
    DELETE_DOCUMENT,
    SEARCH_DOCUMENTS,
} from "../actions/KeeperActions";
import Keeper from "../../models/Keeper";
import customSort from "../../helpers/customSort";
var _ = require("lodash");

const initialState = {
    documents: [],
    searchDocs: [],
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
        case SEARCH_DOCUMENTS:
            const filtered = _.filter(state.documents, (doc) =>
                _.toLower(doc.title).includes(_.toLower(action.value))
            );
            let searchResult = "available";
            if (filtered.length === 0) {
                searchResult = "empty";
            }
            return {
                ...state,
                searchDocs: filtered,
                searchResult,
            };
        default:
            return state;
    }
};
