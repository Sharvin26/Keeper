import {
    GET_DOCUMENTS,
    ADD_DOCUMENT,
    EDIT_DOCUMENT,
    DELETE_DOCUMENT,
    SEARCH_DOCUMENTS,
    SORT_DOCUMENTS,
} from "../actions/KeeperActions";
import Keeper from "../../models/Keeper";
import sortDocs from "../../helpers/customSort";
var _ = require("lodash");

const initialState = {
    documents: [],
    searchDocs: [],
    sortType: "Date",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCUMENTS:
            const docs = sortDocs(action.documents, state.sortType);
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
                documents: sortDocs(
                    state.documents.concat(newDocument),
                    state.sortType
                ),
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
                documents: sortDocs(allDocuments, state.sortType),
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
        case SORT_DOCUMENTS:
            const allDocs = [...state.documents];
            let sortedDocs = sortDocs(allDocs, action.sortType);
            state.sortType = action.sortType;
            return {
                ...state,
                documents: sortedDocs,
            };
        default:
            return state;
    }
};
