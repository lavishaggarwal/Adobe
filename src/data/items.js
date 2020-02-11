var apiData;
const items = () => {
    fetch("https://api.myjson.com/bins/qzuzi")
        .then(res => res.json())
        .then(
            (result) => {
                apiData = result;
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                apiData = [];
            }
        )
};


export default apiData;