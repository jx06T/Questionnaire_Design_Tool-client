
export const changeArray = (prevData, newData) => {
    const existingIndex = prevData.findIndex(item => item.id === newData.id);
    if (existingIndex !== -1) {
        return prevData.map(item =>
            item.id === newData.id
                ? newData
                : item
        );
    } else {
        return [...prevData, newData];
    }
}
