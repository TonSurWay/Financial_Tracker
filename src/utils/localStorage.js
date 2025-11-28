export const getLoacalStorage = (key, defaulValue = []) => {
    try{
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaulValue;
    } catch (err) {
        console.error(`Error loading ${key} from localStorage:`, err);
        return defaulValue;
    }
};

export const setLocalStorage = (key, value) => {
    try{
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error(`Error saving ${key} to localStorage:`, err);
    }
};

export const deleteTransaction = (index) => {
    try{
        const stored = localStorage.getItem("transaction");
        if (!stored) return; // nothing to delete
        const transaction = JSON.parse(stored);
        // 2. Remove the specific item
        transaction.splice(index, 1);
        // 3. Save back the modified array
        localStorage.setItem("transaction", JSON.stringify(transaction));

    } catch (err) {
        console.log(`Cannot deleting ${index}:`, err)
    }
}