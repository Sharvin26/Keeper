var _ = require("lodash");

export const searchMoments = (moments, searchQuery) => {
    const filteredMoments = _.filter(moments, (moment) =>
        _.toLower(moment.title).includes(_.toLower(searchQuery))
    );
    return filteredMoments;
};

export const searchCards = (cards, searchQuery) => {
    const filteredCards = _.filter(cards, (card) =>
        _.toLower(card.cardNumber).includes(_.toLower(searchQuery))
    );
    return filteredCards;
};

export const searchTodos = (todos, searchQuery) => {
    const filteredTodos = _.filter(todos, (todo) =>
        _.toLower(todo.task).includes(_.toLower(searchQuery))
    );
    return filteredTodos;
};

export const searchExpenditures = (expenditures, searchQuery) => {
    const filteredExpenditures = _.filter(expenditures, (expenditure) =>
        _.toLower(expenditure.name).includes(_.toLower(searchQuery))
    );
    return filteredExpenditures;
};

export const searchBarcodeDocuments = (barcodeDocuments, searchQuery) => {
    const filteredBarcodeDocuments = _.filter(
        barcodeDocuments,
        (barcodeDocument) =>
            _.toLower(barcodeDocument.result).includes(_.toLower(searchQuery))
    );
    return filteredBarcodeDocuments;
};
