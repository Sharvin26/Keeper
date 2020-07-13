import moment from "moment";
import * as FileSystem from "expo-file-system";
import {
    fetchDocument,
    insertDocument,
    removeDocument,
} from "../../database/documentsDb";

export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";
export const SEARCH_DOCUMENTS = "SEARCH_DOCUMENTS";

export const getDocument = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchDocument();
            dispatch({
                type: GET_DOCUMENTS,
                documents: dbResult.rows._array,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const addDocument = (label, uri, date) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const fileName = uri.split("/").pop();
            const newPath = FileSystem.documentDirectory + fileName;
            await FileSystem.moveAsync({
                from: uri,
                to: newPath,
            });
            const dbResult = await insertDocument(label, newPath, newDate);
            dispatch({
                type: ADD_DOCUMENT,
                document: {
                    id: dbResult.insertId,
                    label,
                    pdfUri: newPath,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteDocument = (id) => {
    return async (dispatch) => {
        try {
            await removeDocument(id);
            dispatch({
                type: DELETE_DOCUMENT,
                id,
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
};

export const searchDocuments = (value) => {
    return async (dispatch) =>
        dispatch({
            type: SEARCH_DOCUMENTS,
            value,
        });
};
