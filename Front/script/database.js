let db;
let favorites = [];

const databaseReady = new Promise((resolve, reject) => {
    const request = indexedDB.open("CollegeNews", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        if (!db.objectStoreNames.contains("favorites")) {
            db.createObjectStore("favorites", {
                keyPath: "id"
            });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;

        const transaction = db.transaction("favorites", "readonly");
        const store = transaction.objectStore("favorites");
        const getRequest = store.getAll();

        getRequest.onsuccess = function () {
            favorites = getRequest.result;
            resolve();
        };

        getRequest.onerror = function () {
            reject(getRequest.error);
        };
    };

    request.onerror = function () {
        reject(request.error);
    };
});

function getFavorites() {
    return favorites;
}

function saveFavorites(data) {
    favorites = data;

    const transaction = db.transaction("favorites", "readwrite");
    const store = transaction.objectStore("favorites");

    store.clear();

    data.forEach(item => {
        store.put(item);
    });
}