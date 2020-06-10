import { GET_DOCUMENTS, ADD_DOCUMENT } from "../actions/KeeperActions";
import Keeper from "../../models/Keeper";

const initialState = {
    documents: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCUMENTS:
            const docs = action.documents.sort((a, b) => {
                return new Date(a.date) > new Date(b.date);
            });
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
                documents: state.documents.concat(newDocument),
            };
        default:
            return state;
    }
};
