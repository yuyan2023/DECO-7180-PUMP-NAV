import { SQL } from "./constant.js";

const FUEL_DATA_API_SQL = "https://www.data.qld.gov.au/api/3/action/datastore_search_sql"


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
    return await fetchData({ sql: SQL.allBrand })
}

const fetchAllType = async () => {
    return await fetchData({ sql: SQL.allType })
}

const fetchPriceRange = async () => {
    return await fetchData({ sql: SQL.priceRange })
}

export { fetchAllBrand, fetchAllType, fetchPriceRange };