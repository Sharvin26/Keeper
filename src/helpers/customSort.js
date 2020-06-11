export default (documents) => {
    return documents.sort((a, b) => new Date(a.date) > new Date(b.date));
};
