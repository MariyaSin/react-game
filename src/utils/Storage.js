export default class Storage {
    static SetData(header, data) {
        return localStorage.setItem(header, JSON.stringify(data));
    }

    static GetData(header) {
        return JSON.parse(localStorage.getItem(header));
    }
}