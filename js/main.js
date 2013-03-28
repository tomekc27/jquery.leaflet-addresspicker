$(document).ready(function(){
    $(".address").leaflet_addresspicker({
        region_bias: "fr",
        elements: {
            map: ".map",
            lat: ".lat",
            lng: ".lng",
            locality: ".locality",
            administrative_area_level_1: ".administrative_area_level_1",
            administrative_area_level_2: ".administrative_area_level_2",
            country: ".country",
            zip_code: ".zip_code",
            type: ".type"
        }
    });
});