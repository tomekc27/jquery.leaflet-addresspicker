/*
 * jQuery UI leaflet addresspicker @VERSION 1.0
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.js
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   jquery.ui.autocomplete.js
 *   leaflet.js
 */


 (function( $, undefined ) {

  $.widget( "ui.leaflet_addresspicker", {
    options: {
      address_suffix: "",
      bind_marker: true,
      draggable_marker: true,
      region_bias: null,
      update_callback: null,
      map_options: {
          min_zoom: 4,
          max_zoom: 18,
          tile: {
            url: "http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png",
            attrib: "Map data © openstreetmap contributors"
          },
          zoom: 5,
          center: new L.LatLng(46, 2),
          scroll_wheel: false
      },
      elements: {
          map: false,
          lat: false,
          lng: false,
          locality: false,
          administrative_area_level_2: false,
          administrative_area_level_1: false,
          country: false,
          zip_code: false,
          type: false
      }
    },

    marker: function() {
      return this.marker;
    },
    
    map: function() {
      return this.map;
    },

    update_position: function() {
      this._update_position(this.marker.getLatLng());
    },
    
    reload_position: function() {
      this.marker.setLatLng([this.lat.val(), this.lng.val()]);
    },
    
    selected: function() {
      return this.selectedResult;
    },
    
    _create: function() {
      this.geocoder = new google.maps.Geocoder();
      this.element.autocomplete({
        source: $.proxy(this._geocode, this),  
        focus:  $.proxy(this._focusAddress, this),
        select: $.proxy(this._select_address, this),
        messages: {
          noResults: '',
          results: function() {}
        }
      });
      
      this.lat          = $(this.options.elements.lat);
      this.lng          = $(this.options.elements.lng);
      this.locality     = $(this.options.elements.locality);
      this.administrative_area_level_2 = $(this.options.elements.administrative_area_level_2);
      this.administrative_area_level_1 = $(this.options.elements.administrative_area_level_1);
      this.country      = $(this.options.elements.country);
      this.zip_code  = $(this.options.elements.zip_code);
      this.type         = $(this.options.elements.type);

      if (this.options.elements.map) {
        this.map_element = $(this.options.elements.map);
        this._init_map();
      }
    },

     _init_map: function() {
      self = this;
      if (this.lat && this.lat.val()) {
        this.options.map_options.center = new L.LatLng(this.lat.val(), this.lng.val());
      }

      var tile = new L.TileLayer(
            this.options.map_options.tile.url, 
            {
                minZoom:      this.options.map_options.min_zoom,
                maxZoom:      this.options.map_options.max_zoom,
                attribution:  this.options.map_options.tile.attrib
            }
        );

      this.map = new L.Map(this.map_element[0], {scrollWheelZoom: this.options.map_options.scroll_wheel})
                      .setView(this.options.map_options.center, this.options.map_options.zoom)
                      .addLayer(tile);

      this.marker   = L.marker(this.options.map_options.center, 
                        {
                          draggable: this.options.draggable_marker
                        });
      if(this.options.bind_marker){
        this.marker.addTo(this.map);
      }

      this.marker.on('dragend', function(event){
        self._marker_moved();
      });

    },
    
    _update_position: function(location) {
      if (this.lat) {
        this.lat.val(location.lat);
      }
      if (this.lng) {
        this.lng.val(location.lng);
      }
    },
    
    _marker_moved: function() {
      this._update_position(this.marker.getLatLng());
    },
    
    // Autocomplete source method: fill its suggests with google geocoder results
    _geocode: function(request, response) {
        var address = request.term, self = this;
        this.geocoder.geocode({
            'address': address + this.options.address_suffix,
            'region': this.options.regionBias
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    results[i].label =  results[i].formatted_address;
                };
            } 
            response(results);
        })
    },
    
    _find_infos: function(result, type) {
      for (var i = 0; i < result.address_components.length; i++) {
        var component = result.address_components[i];
        if (component.types.indexOf(type) !=-1) {
          return component.long_name;
        }
      }
      return false;
    },
    
    _focusAddress: function(event, ui) {
      var address = ui.item;
      if (!address) {
        return;
      }
      
      if (this.marker) {
        var location = this._parse_latlng(address.geometry.location);
        var viewport = this._convert_to_bounds(address.geometry.viewport);
        this.marker.setLatLng(location);
        this.map.fitBounds(viewport);
      }
      this._update_position(location);
      
      if (this.locality) {
        this.locality.val(this._find_infos(address, 'locality'));
      }
      if (this.administrative_area_level_2) {
        this.administrative_area_level_2.val(this._find_infos(address, 'administrative_area_level_2'));
      }
      if (this.administrative_area_level_1) {
        this.administrative_area_level_1.val(this._find_infos(address, 'administrative_area_level_1'));
      }
      if (this.country) {
        this.country.val(this._find_infos(address, 'country'));
      }
      if (this.zip_code) {
        this.zip_code.val(this._find_infos(address, 'postal_code'));
      }     
      if (this.type) {
        this.type.val(address.types[0]);
      }
    },
    
    _select_address: function(event, ui) {
      this.selectedResult = ui.item;
      if (this.options.updateCallback) {
        this.options.updateCallback(this.selectedResult);
      }
    },

    _convert_to_bounds: function(object){
      if(object instanceof L.LatLngBounds){
        return object;
      }else{
        var southWest = new L.LatLng(object.Z.b, object.fa.b),
            northEast = new L.LatLng(object.Z.d, object.fa.d);
        return new L.LatLngBounds(southWest, northEast);
      }
    },

    _parse_latlng: function(object){
      return (object instanceof L.LatLng) ? object : new L.LatLng(object.jb, object.kb);
    }
  });

  $.extend( $.ui.leaflet_addresspicker, {
    version: "1.0"
  });

  // make IE think it doesn't suck
  if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){
      for(var i=0; i<this.length; i++){
        if(this[i]==obj){
          return i;
        }
      }
      return -1;
    }
  }

})( jQuery );