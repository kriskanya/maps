/* global google:true */
/* jshint unused:false, camelcase:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    initMap(36, -86, 3);
    $('#add').click(add);
    $('#show').click(show);
    $('#nsa').click(nsa);
  }

  function nsa(){
      var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};    //maximum age asks for your position every x milliseconds
      navigator.geolocation.getCurrentPosition(success, e => console.log(e), options);  //this line gives you your options; e => console.log(e) will be called if there's an error
  }

  function success(position){
    console.log(position);

    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    let name = 'kris';


    let latLng = new google.maps.LatLng(lat, lng);
    addMarker(lat,lng,name);
    map.setCenter(latLng);    //centers the map on the lat. and long. that the user calls for
    map.setZoom(15);    //zoom down on something
  }

  var map;
  function initMap(lat, lng, zoom){
    let styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};    //SATELLITE or HYBRID can also be used
    map = new google.maps.Map(document.getElementById('map'), mapOptions);


  }

  function add(){
    let place = $('#place').val().trim();
    let vacation = `<option>${place}</option>`;
    $('#vacations').append(vacation);
    $('#place').val('');  //clears it out
    $('#place').focus();
  }

  function show(){
    let vacation = $('#vacations').val();
    let geocoder = new google.maps.Geocoder();    //allows you to change something from a place into a lat. and long.

    geocoder.geocode({address: vacation}, (results, status)=>{    //anonymous function => arrow function
      let name = results[0].formatted_address;
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      addMarker(lat,lng,name);

      let latLng = new google.maps.LatLng(lat, lng);
      map.setCenter(latLng);    //centers the map on the lat. and long. that the user calls for
      map.setZoom(15);    //zoom down on something
    });
  }

  function addMarker(lat,lng,name){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, icon: './media/hammersickle.png'});    //tells the api which map to add the marker to
  }



})();
