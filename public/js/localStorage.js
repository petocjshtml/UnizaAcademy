function ulozitDoLocalStorage(kluc, objekt) {
    localStorage.setItem(kluc, JSON.stringify(objekt));
}

function nacitatZLocalStorage(kluc) {
    const ulozenyObjekt = localStorage.getItem(kluc);
    return ulozenyObjekt ? JSON.parse(ulozenyObjekt) : null;
}

function vymazatZLocalStorage(kluc) {
    localStorage.removeItem(kluc);
}


