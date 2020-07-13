import {
    GET_DOCUMENTS,
    ADD_DOCUMENT,
    DELETE_DOCUMENT,
    SEARCH_DOCUMENTS,
} from "../actions/documentActions";

import Document from "../../models/Document";
import { searchDocuments } from "../../helpers/customSearch";
import sortDocs from "../../helpers/customSort";

const initialState = {
    documents: [],
    searchDocuments: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCUMENTS:
            const docs = sortDocs(action.documents, "Date");
            return {
                ...state,
                documents: docs,
            };
        case ADD_DOCUMENT:
            const newDoc = new Document(
                action.document.id,
                action.document.label,
                action.document.pdfUri,
                action.document.date
            );
            return {
                ...state,
                documents: sortDocs(state.documents.concat(newDoc), "Date"),
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                documents: state.documents.filter(
                    (documentItem) => documentItem.id !== action.id
                ),
            };
        case SEARCH_DOCUMENTS:
            const filteredDocuments = searchDocuments(
                state.documents,
                action.value
            );
            return {
                ...state,
                searchDocuments: filteredDocuments,
            };
        default:
            return state;
    }
};
