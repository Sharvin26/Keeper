import Document from "../../models/Document";
import sortDocs from "../../helpers/customSort";

import { GET_PDF, ADD_PDF } from "../actions/documentActions";

const initialState = {
    documents: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PDF:
            const docs = sortDocs(action.documents, "Date");
            return {
                ...state,
                documents: docs,
            };
        case ADD_PDF:
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
        default:
            return state;
    }
};
