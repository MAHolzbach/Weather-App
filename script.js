$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition;
  }
  var tempf, main, icon, tempc, iconDisplay, city, country;

  $.getJSON('http://api.wunderground.com/api/e95fb12f6c69ae61/geolookup/conditions/q/autoip.json', function(json) {
    console.log(json);
    tempf = json.current_observation.temp_f;
    tempc = json.current_observation.temp_c;
    main = json.current_observation.weather;
    icon = json.current_observation.icon;
    city = json.location.city;
    country = json.location.country_name;
    $('.location').html(city + ', ' + country);
    $('.weather').html(tempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
    $('.weather').on('click', 'a', function(e) {
      e.preventDefault();
      var element = $(e.target);
      if(element.hasClass('scaleF')) {
        $('.weather').html(tempc + '&deg' + '<a href=# class="scale scaleC">C</a>');
      } else if (element.hasClass('scaleC')){
        $('.weather').html(tempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
      }
    });

    switch(icon) {
      case 'rain':
      case 'chancerain':
      iconDisplay = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
      break;
      case 'clear':
      case 'sunny':
      case 'mostlysunny':
      iconDisplay = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
      break;
      case 'fog':
      case 'cloudy':
      iconDisplay = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
      break;
      case 'hazy':
      case 'mostlycloudy':
      case 'partlycloudy':
      case 'partlysunny':
      iconDisplay = '<div class="cloud"></div><div class="sun"><div class="rays"></div></div>';
      break;
      case 'chancetstorms':
      case 'tstorms':
      iconDisplay = '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
      break;
      case 'chanceflurries':
      case 'chancesleet':
      case 'chancesnow':
      case 'flurries':
      case 'sleet':
      case 'snow':
      iconDisplay = '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';
      break;
    }
    $('.icon').append(iconDisplay);
  });
});
