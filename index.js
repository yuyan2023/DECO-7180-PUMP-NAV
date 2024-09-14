import './components/modal.js';
import { fetchAllBrand } from './components/api.js';

const setupModal = () => {
    const $modal = $('#filter-popup');
    const $btn = $('#open-filter-btn');


    $btn.click(function () {
        $modal.show();
    });
}

const generateFilters = async () => {
    const data = await fetchAllBrand();
    console.log(data)

}

$(document).ready(() => {
    setupModal();
    generateFilters();
});