const getPathSegment = () => {
    const path = window.location.pathname;
    const dirPath = path.substring(0, path.lastIndexOf('/'));
    return dirPath;
}

const cacheData = (key, value) => {
    if (value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    } else {
        const result = sessionStorage.getItem(key);
        return JSON.parse(result);
    }
}

const convert2indices = (selected, data) => {
    return selected.map(item => data.indexOf(item));
}

const getUrlParams = () => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const result = {};
    urlParams.forEach((value, key) => {
        result[key] = value;
    });
    
    return result;
}

export { getPathSegment, cacheData, convert2indices, getUrlParams }