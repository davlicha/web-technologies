var StorageService = (function () {
    function StorageService(key) {
        this.storageKey = key;
    }
    StorageService.prototype.save = function (data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
        catch (e) {
            console.error('Error saving to localStorage', e);
        }
    };
    StorageService.prototype.load = function () {
        try {
            var data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        }
        catch (e) {
            console.error('Error loading from localStorage', e);
            return [];
        }
    };
    StorageService.prototype.clear = function () {
        localStorage.removeItem(this.storageKey);
    };
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.js.map