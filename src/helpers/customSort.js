export default (documents, type) => {
    if (type === "Date") {
        return documents.sort(function (a, b) {
            return b.date > a.date;
        });
    } else if (type === "Title") {
        return documents.sort(function (a, b) {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
    }
};
