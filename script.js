$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition;
  }

  const iconPicker = (icon) => {
    const rainy = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
    const sunny = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
    const overcast = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
    const partlySunny = '<div class="cloud"></div><div class="sun"><div class="rays"></div></div>';
    const stormy = '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
    const snowy = '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';

    const iconObj = {
      'rain': rainy,
      'chancerain': rainy,
      'clear': sunny,
      'sunny': sunny,
      'mostlysunny': sunny,
      'fog': overcast,
      'cloudly': overcast,
      'hazy': partlySunny,
      'mostlycloudy': partlySunny,
      'partlycloudy': partlySunny,
      'partlysunny': partlySunny,
      'chancetstorms': stormy,
      'tstorms': stormy,
      'chanceflurries': snowy,
      'chancesleet': snowy,
      'chancesnow': snowy,
      'flurries': snowy,
      'sleet': snowy,
      'snow': snowy
    }
    $('.icon').append(iconObj[icon]);
    alert(iconObj[icon]);
  }

  const currentConditions = () => {
    let icon;
    $.getJSON('http://api.wunderground.com/api/e95fb12f6c69ae61/geolookup/conditions/q/autoip.json', function(json) {
      console.log(json);
      tempf = json.current_observation.temp_f;
      tempc = json.current_observation.temp_c;
      icon = json.current_observation.icon;
      city = json.location.city;
      country = json.location.country_name;
      $('.location').html(city + ', ' + country);
      $('.weather').html(tempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
      $('.weather').on('click', 'a', function(e) {
        e.preventDefault();
        let element = $(e.target);
        if(element.hasClass('scaleF')) {
          $('.weather').html(tempc + '&deg' + '<a href=# class="scale scaleC">C</a>');
        } else if (element.hasClass('scaleC')){
          $('.weather').html(tempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
        }
      });
      iconPicker(icon);
    });
  };

  const threeDay = () => {

    $.getJSON('http://api.wunderground.com/api/e95fb12f6c69ae61/geolookup/forecast/q/autoip.json', function(json) {
      console.log(json);
      oneDayTempf = json.forecast.simpleforecast.forecastday[1].high.fahrenheit;
      oneDaytempc = json.forecast.simpleforecast.forecastday[1].high.celsius;
      oneDayicon = json.forecast.simpleforecast.forecastday[1].icon;
      twoDayTempf = json.forecast.simpleforecast.forecastday[2].high.fahrenheit;
      twoDaytempc = json.forecast.simpleforecast.forecastday[2].high.celsius;
      twoDayicon = json.forecast.simpleforecast.forecastday[2].icon;
      threeDayTempf = json.forecast.simpleforecast.forecastday[3].high.fahrenheit;
      threeDaytempc = json.forecast.simpleforecast.forecastday[3].high.celsius;
      threeDayicon = json.forecast.simpleforecast.forecastday[3].icon;
      city = json.location.city;
      country = json.location.country_name;
      $('.forecast1').html(oneDayTempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
      $('.forecast2').html(twoDayTempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
      $('.forecast3').html(threeDayTempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
      $('.forecast').on('click', 'a', function(e) {
        e.preventDefault();
        let element = $(e.target);
        if(element.hasClass('scaleF')) {
          $('.forecast1').html(oneDaytempc + '&deg' + '<a href=# class="scale scaleC">C</a>');
          $('.forecast2').html(twoDaytempc + '&deg' + '<a href=# class="scale scaleC">C</a>');
          $('.forecast3').html(threeDaytempc + '&deg' + '<a href=# class="scale scaleC">C</a>');
        } else if (element.hasClass('scaleC')){
          $('.forecast1').html(oneDayTempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
          $('.forecast2').html(twoDayTempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
          $('.forecast3').html(threeDayTempf + '&deg' + '<a href=# class="scale scaleF">F</a>');
        }
      });
    });
  };

  currentConditions();
  threeDay();
});
  // switch(icon) {
  //   case 'rain':
  //   case 'chancerain':
  //   iconDisplay = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
  //   break;
  //   case 'clear':
  //   case 'sunny':
  //   case 'mostlysunny':
  //   iconDisplay = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
  //   break;
  //   case 'fog':
  //   case 'cloudy':
  //   iconDisplay = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
  //   break;
  //   case 'hazy':
  //   case 'mostlycloudy':
  //   case 'partlycloudy':
  //   case 'partlysunny':
  //   iconDisplay = '<div class="cloud"></div><div class="sun"><div class="rays"></div></div>';
  //   break;
  //   case 'chancetstorms':
  //   case 'tstorms':
  //   iconDisplay = '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
  //   break;
  //   case 'chanceflurries':
  //   case 'chancesleet':
  //   case 'chancesnow':
  //   case 'flurries':
  //   case 'sleet':
  //   case 'snow':
  //   iconDisplay = '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';
  //   break;
  // }
  // $('.icon').append(iconDisplay);
