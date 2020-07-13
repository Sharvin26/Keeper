import {
    GET_BARCODE_DOCUMENT,
    ADD_BARCODE_DOCUMENT,
    DELETE_BARCODE_DOCUMENT,
    SEARCH_BARCODE_DOCUMENT,
} from "../actions/barcodeActions";

import Barcode from "../../models/Barcode";
import { searchBarcodeDocuments } from "../../helpers/customSearch";
import sortDocs from "../../helpers/customSort";

const initialState = {
    barcodeDocuments: [],
    searchBarcodeDocuments: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BARCODE_DOCUMENT:
            const docs = sortDocs(action.barcodeDocuments, "Date");
            return {
                ...state,
                barcodeDocuments: docs,
            };
        case ADD_BARCODE_DOCUMENT:
            const newBarcodeDocument = new Barcode(
                action.barcodeDocument.id,
                action.barcodeDocument.result,
                action.barcodeDocument.type,
                action.barcodeDocument.date
            );
            return {
                ...state,
                barcodeDocuments: sortDocs(
                    state.barcodeDocuments.concat(newBarcodeDocument),
                    "Date"
                ),
            };
        case DELETE_BARCODE_DOCUMENT:
            return {
                ...state,
                barcodeDocuments: state.barcodeDocuments.filter(
                    (barcodeItem) => barcodeItem.id !== action.id
                ),
            };
        case SEARCH_BARCODE_DOCUMENT:
            const filteredBarcodeDocuments = searchBarcodeDocuments(
                state.barcodeDocuments,
                action.value
            );
            return {
                ...state,
                searchBarcodeDocuments: filteredBarcodeDocuments,
            };
        default:
            return state;
    }
};
