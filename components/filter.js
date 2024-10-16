import './modal.js';
import { fetchAllBrand, fetchAllType, fetchPriceRange } from './api.js';
import { getPathSegment, cacheData, convert2indices } from './utils.js';
import { SQL } from './constant.js';

const setupModal = () => {
    const $modal = $('#filter-popup');
    const $btn = $('#open-filter-btn');

    $btn.click(function () {
        $modal.show();
    });
}

const getAllBrandData = async () => {
    let result = [];
    const cachedData = cacheData(SQL.allBrand);
    if (cachedData) {
        result = cachedData;
    } else {
        const data = await fetchAllBrand();
        result = data.map(i => i.Site_Brand).filter(i => i !== "Unknown");
        cacheData(SQL.allBrand, result);
    }
    return result;
}

const getAllTypeData = async () => {
    let result = [];
    const cachedData = cacheData(SQL.allType);
    if (cachedData) {
        result = cachedData;
    } else {
        const data = await fetchAllType();
        result = data.map(i => i.Fuel_Type).filter(i => i !== "Unknown");
        cacheData(SQL.allType, result);
    }
    return result;
}

// generate options for each filter from backend data
const generateFilters = async () => {
    const priceRange = await fetchPriceRange();
    const allBrand = await getAllBrandData();
    const allTypes = await getAllTypeData();

    setupPriceRangeInput(priceRange);
    setupDistanceRangeInput();
    generateBrands(allBrand);
    generateTypes(allTypes);
}

const setupPriceRangeInput = priceRange => {
    const { max, min } = priceRange[0]
    $('input[name="min-price"]').val(min);
    const $input = $('#price-range');
    $input.next().text(`AUD $${min} - AUD $${max}`);
    $input.attr({ min, max, value: max }).bind('input', () => {
        const value = $input.val();
        $input.next().text(`AUD $${min} - AUD $${value}`);
    })
}
const setupDistanceRangeInput = () => {
    const $input = $('#distance-range');
    $input.bind('input', () => {
        const value = $input.val();
        $input.next().text(`0km - ${value}km`);
    })
}

const generateBrands = data => {
    const $all = $("#brand-all");
    $all.click(() => {
        if ($all.is(':checked')) {
            $('input[name="brand"]').prop('checked', true);
        } else {
            $('input[name="brand"]').prop('checked', false);
        }
    })

    const clickHandler = () => {
        if ($('input[name="brand"]:checked').length == 8) {
            $all.prop('checked', true);
        } else {
            $all.prop('checked', false);
        }
    }
    const $container = $("#form-petrol-brand");
    data.splice(0, 8).forEach(brand => {
        const $span = $(`<span><input type="checkbox" name="brand" checked value="${brand}"></span>`);
        $span.click(clickHandler);
        $span.append(`<label for="${brand}" class="filter-button">${brand}</label>`);
        $container.append($span);
    });
}

const generateTypes = data => {
    const $all = $("#type-all");
    $all.click(() => {
        if ($all.is(':checked')) {
            $('input[name="type"]').prop('checked', true);
        } else {
            $('input[name="type"]').prop('checked', false);
        }
    })

    const clickHandler = () => {
        if ($('input[name="type"]:checked').length == data.length) {
            $all.prop('checked', true);
        } else {
            $all.prop('checked', false);
        }
    }

    const $container = $("#form-petrol-type");
    data.forEach(type => {
        const $span = $(`<span><input type="checkbox" name="type" checked value="${type}"></span>`);
        $span.click(clickHandler);
        $span.append(`<label for="${type}" class="filter-button">${type}</label>`);
        $container.append($span);
    });
}

const bindSearch = () => {
    $("#search-btn, #modal-search-btn").click(async e => {
        e.preventDefault();
        e.stopPropagation();

        const allBrandData = await getAllBrandData();
        const allTypeData = await getAllTypeData();
        const checkedBrand = $('input[name="brand"]:checked').map((index, item) => item.value).get();
        const checkedType = $('input[name="type"]:checked').map((index, item) => item.value).get();

        const q = $('#search-input').val();

        const minPrice = $('input[name="min-price"]').val();
        const maxPrice = $('#price-range').val();
        const brand = $('#brand-all').prop('checked') ? -1 : convert2indices(checkedBrand, allBrandData);
        const type = $('#type-all').prop('checked') ? -1 : convert2indices(checkedType, allTypeData);
        const maxDistance = $('#distance-range').val();

        const params = new URLSearchParams({
            q,
            brand,
            type,
            price: `${minPrice}-${maxPrice}`,
            distance: `0-${maxDistance}`
        });

        const targetUrl = '/pages/result/result.html?' + params.toString();
        window.location.assign(getPathSegment() + targetUrl);
    })
}

const bindReset = () => {
    $("#reset-btn").click(() => {
        const $price = $('#price-range');
        $price.val($price.attr("max"));
        $price.trigger('input');

        const $distance = $('#distance-range');
        $distance.val($distance.attr("max"));
        $distance.trigger('input');

        const $brand = $('#brand-all');
        $brand.prop('checked', false);
        $brand.trigger('click');

        const $type = $('#type-all');
        $type.prop('checked', false);
        $type.trigger('click');
    });
}

$(document).ready(() => {
    setupModal();
    generateFilters();
    bindSearch();
    bindReset();
});