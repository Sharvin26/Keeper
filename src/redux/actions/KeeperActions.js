import moment from "moment";
import * as FileSystem from "expo-file-system";
import {
    fetchDocuments,
    insertDocument,
    updateDocument,
    removeDocument,
} from "../../helpers/db";

export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const EDIT_DOCUMENT = "EDIT_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";
export const SEARCH_DOCUMENTS = "SEARCH_DOCUMENTS";

export const getDocuments = () => {
    return async (dispatch) => {
        const dbResult = await fetchDocuments();
        dispatch({
            type: GET_DOCUMENTS,
            documents: dbResult.rows._array,
        });
    };
};

export const addDocument = (title, image, date, description) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const fileName = image.split("/").pop();
            const newPath = FileSystem.documentDirectory + fileName;
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });
            const dbResult = await insertDocument(
                title,
                newPath,
                newDate,
                description
            );
            dispatch({
                type: ADD_DOCUMENT,
                document: {
                    id: dbResult.insertId,
                    title,
                    image: newPath,
                    date: newDate,
                    description,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const editDocument = (
    id,
    title,
    image,
    date,
    description,
    isImageChanged
) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            let newPath = image;
            if (isImageChanged) {
                const fileName = image.split("/").pop();
                newPath = FileSystem.documentDirectory + fileName;
                await FileSystem.moveAsync({
                    from: image,
                    to: newPath,
                });
            }
            await updateDocument(id, title, newPath, newDate, description);
            dispatch({
                type: EDIT_DOCUMENT,
                document: {
                    id,
                    title,
                    image: newPath,
                    date: newDate,
                    description,
                },
            });
        } catch (error) {
            throw keeper;
        }
    };
};

export const deleteDocument = (id, image) => {
    return async (dispatch) => {
        try {
            await FileSystem.deleteAsync(image);
            await removeDocument(id);
            dispatch({
                type: DELETE_DOCUMENT,
                id,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const searchDocuments = (value) => {
    return {
        type: SEARCH_DOCUMENTS,
        value,
    };
};
