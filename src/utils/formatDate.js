const shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const formatDate = (date) => {
    return  String(date.getHours()).padStart(2, 0) + ":" +
            String(date.getMinutes()).padStart(2, 0) + " " +
            String(date.getDate()).padStart(2, 0) + "-" +
            String(shortMonth[date.getMonth()]) + "-" +
            String(date.getFullYear());
}