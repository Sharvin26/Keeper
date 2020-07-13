import moment from "moment";
import {
    fetchBarcodeDocument,
    insertBarcodeDocument,
    removeBarcodeDocument,
} from "../../database/barcodeDb";

export const GET_BARCODE_DOCUMENT = "GET_BARCODE_DOCUMENT";
export const ADD_BARCODE_DOCUMENT = "ADD_BARCODE_DOCUMENT";
export const DELETE_BARCODE_DOCUMENT = "DELETE_BARCODE_DOCUMENT";
export const SEARCH_BARCODE_DOCUMENT = "SEARCH_BARCODE_DOCUMENT";

export const getBarcodeDocument = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchBarcodeDocument();
            dispatch({
                type: GET_BARCODE_DOCUMENT,
                barcodeDocuments: dbResult.rows._array,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const addBarcodeDocument = (result, type, date) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const dbResult = await insertBarcodeDocument(result, type, newDate);
            dispatch({
                type: ADD_BARCODE_DOCUMENT,
                barcodeDocument: {
                    id: dbResult.insertId,
                    result,
                    type,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteBarcodeDocument = (id) => {
    return async (dispatch) => {
        try {
            await removeBarcodeDocument(id);
            dispatch({
                type: DELETE_BARCODE_DOCUMENT,
                id,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const searchBarcodeDocument = (value) => {
    return async (dispatch) =>
        dispatch({ type: SEARCH_BARCODE_DOCUMENT, value });
};
