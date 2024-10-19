import { SQL } from "./constant.js";

// Base URL for fetching data using SQL queries
const FUEL_DATA_API_SQL = "https://www.data.qld.gov.au/api/3/action/datastore_search_sql"

// Fetch data from the API using the provided SQL query
const fetchData = async data => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: FUEL_DATA_API_SQL,
            data,
            type: "get",
            success: (data) => {
                resolve(data.result.records);
            },
            error: (jqXHR, textStatus, errorThrown) => reject(errorThrown)
        });
    });
}

// Fetch all distinct brands from the data
const fetchAllBrand = async () => {
    return await fetchData({ sql: SQL.allBrand });
}

// Fetch all distinct fuel types from the data
const fetchAllType = async () => {
    return await fetchData({ sql: SQL.allType });
}

// Fetch the price range from the data
const fetchPriceRange = async () => {
    return await fetchData({ sql: SQL.priceRange });
}

export { fetchAllBrand, fetchAllType, fetchPriceRange };
