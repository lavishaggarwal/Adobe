export const filterByName = (arr, nameFilter) => {
    if (nameFilter.nameFilter != undefined) {
        if (arr !== undefined && arr.length > 0) {
            const retVal = arr.filter(item => {
                return item.name.toLowerCase().indexOf(nameFilter.nameFilter.toLowerCase()) >= 0;
            });

            return retVal;
        }
    }
    else {
        return arr;
    }
};