export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};