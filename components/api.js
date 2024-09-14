const FUEL_DATA_API = "https://www.data.qld.gov.au/api/3/action/datastore_search"
const FUEL_DATA_API_SQL = "https://www.data.qld.gov.au/api/3/action/datastore_search_sql"

const SQL = {
    allBrand: 'SELECT DISTINCT "Site_Brand" FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5"',
};

// const Sql = 'SELECT DISTINCT "Site_Brand" FROM "28ab00ec-00dd-4edf-b272-0543df4dcbe5'

// const defaultData = {
//     resource_id: '28ab00ec-00dd-4edf-b272-0543df4dcbe5', // the resource id
// };

const fetchData = async data => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: FUEL_DATA_API_SQL,
            data,
            type: "get",
            success: (data) => {
                resolve(data.result.records)
            },
            error: (jqXHR, textStatus, errorThrown) => reject(errorThrown)
        });
    });
}

const fetchAllBrand = async () => {
    return await fetchData({ sql: allBrand })
}

export { fetchAllBrand };