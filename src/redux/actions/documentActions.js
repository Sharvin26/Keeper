import moment from "moment";
import * as FileSystem from "expo-file-system";
import { fetchDocument, insertDocument } from "../../helpers/documentDb";

export const GET_PDF = "GET_PDF";
export const ADD_PDF = "ADD_PDF";

export const getDocument = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchDocument();
            dispatch({
                type: GET_PDF,
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
                type: ADD_PDF,
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
