export const removeToken = () => {
    localStorage.removeItem('books');
}
export const getToken = () => {
    const storedBooks = localStorage.getItem('books');
    // const booksArray = JSON.parse(storedBooks);
    return storedBooks;
}
export const resOk = (status) => {
    if (status < 230 && status > 199) {
        return true
    } else {
        return false
    }
}

