const SQL = {
    allBrand: 'SELECT DISTINCT "Site_Brand" FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5"',
    allType: 'SELECT DISTINCT "Fuel_Type" FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5"',
    priceRange: 'SELECT MAX("Price") AS max, MIN("Price") AS min FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5" WHERE "Price" < 5000'
};

const SEARCHED_DATA = "searched data";

export { SQL, SEARCHED_DATA };