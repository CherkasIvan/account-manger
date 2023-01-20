function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

/** Get string date for checking with date from database **/
export default function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}
