export default class Storage {
    static SetData(header, data) {
        return localStorage.setItem(header, JSON.stringify(data));
    }

    static GetData(header) {
        return JSON.parse(localStorage.getItem(header));
    }

    static AddData(header, data) {
        let storageData = this.GetData(header);
        if (storageData !== null) {
            storageData.push(data)
            return this.SetData(header, storageData); 
        }
        storageData = [];
        storageData.push(data)
        return this.SetData(header, storageData);
    }
}