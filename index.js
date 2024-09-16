import './components/modal.js';
import { fetchAllBrand, fetchAllType } from './components/api.js';

const setupModal = () => {
    const $modal = $('#filter-popup');
    const $btn = $('#open-filter-btn');


    $btn.click(function () {
        $modal.show();
    });
}

const generateFilters = async () => {
    const allBrand = await fetchAllBrand();
    console.log(allBrand)
    const allTypes = await fetchAllType();
    console.log(allTypes)
    generateTypes(allTypes)
}

const generateTypes = data => {
    const $container = $("#form-petrol-type");
    data.forEach(type => {
        $container.append(`<input type="checkbox" name="type" checked value="${type.Fuel_Type}">`)
        $container.append(`<label for="type-diesel" class="filter-button">${type.Fuel_Type}</label>`)
    });
}

$(document).ready(() => {
    setupModal();
    generateFilters();
});