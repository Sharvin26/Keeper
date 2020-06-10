import moment from "moment";
import * as FileSystem from "expo-file-system";
import { fetchDocuments, insertDocument } from "../../helpers/db";

export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const ADD_DOCUMENT = "ADD_DOCUMENT";

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
                    newDate,
                    description,
                },
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
};
