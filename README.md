jQuery Leaflet Addresspicker
============================


Presentation
------------


>Le projet jQuery Leaflet addresspicker est inspiré de [jQuery addresspicker](https://github.com/sgruhier/jquery-addresspicker) qui fait globalement la même chose, mais pour google maps.
>
>Je travaillais sur un projet leaflet et voulais avoir quelque chose comme jQuery addresspicker, donc j'ai eu l'idée de faire leaflet addresspicker.
>
>Si vous voulez contribuer, faites un fork du projet et envoyez une pull request :).


###### English

>The project jQuery Leaflet addresspicker was inspired by jQuery addresspicker which is nearly the same plugin for google maps.
>
>I was working on leaflet and wanted to have something like jQuery addresspicker, so i did leaflet addresspicker.
>
>If you want to contribute, please fork the project and do a pull request :).


Demonstration
-------------

[jQuery Leaflet Addresspicker Demo & Full doc](http://aurox.github.com/jquery.leaflet-addresspicker)


Implementation
--------------

```html
<input class="search" type="text" />
<input class="city" placeholder="The city name" disabled />
<div class="map"></div>
```

```js
$(document).ready(function(){

    function do_something(){
        // do some stuff
    }

    function do_something_else(){
        // do some stuff
    }

    $(".search").leaflet_addresspicker({
        region_bias: "fr",
        map_options: {
            center: new L.LatLng(47, 3),
            scroll_wheel: true
        },
        elements: {
            map: ".map",
            locality: ".city"
        },
        callbacks: {
            after_load: do_something,
            after_update: do_something_else
        }
    });
});
```
