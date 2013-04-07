function before_load_callback(object){
    console.info("callback called:", "before_load_callback");
    console.log("datas available:", object);
    console.log("============================");
}

function after_load_callback(object){
    console.info("callback called:", "after_load_callback");
    console.log("datas available:", object);
    console.log("============================");
}

function before_update_callback(object){
    console.info("callback called:", "before_update_callback");
    console.log("datas available:", object);
    console.log("============================");
}

function after_update_callback(object){
    console.info("callback called:", "after_update_callback");
    console.log("datas available:", object);
    console.log("============================");
}

function before_move_callback(object){
    console.info("callback called:", "before_move_callback");
    console.log("datas available:", object);
    console.log("============================");
}

function after_move_callback(object){
    console.info("callback called:", "after_move_callback");
    console.log("datas available:", object);
    console.log("============================");
}

function on_focus_address_callback(object){
    console.info("callback called:", "on_focus_address_callback");
    console.log("datas available:", object);
    console.log("============================");
}

function on_select_address_callback(object){
    console.info("callback called:", "on_select_address_callback");
    console.log("datas available:", object);
    console.log("============================");
}

$(document).ready(function(){

    $("section").css("min-height", $(window).height());

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
            postal_code: ".postal_code",
            street_address: ".street_address",
            type: ".type"
        },
        callbacks: {
            before_load: before_load_callback,
            after_load: after_load_callback,
            before_update: before_update_callback,
            after_update: after_update_callback,
            before_move: before_move_callback,
            after_move: after_move_callback,
            on_focus_address: on_focus_address_callback,
            on_select_address: on_select_address_callback
        }
    });

});