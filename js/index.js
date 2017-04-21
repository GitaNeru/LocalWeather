$(function(){
    
  var C = false;
  var apiData;
  
  backgroundImg = [
    'http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg',
    'https://c1.staticflickr.com/8/7393/11375147803_0f453d8676_b.jpg',
    'https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg',
    'http://cdn.hercampus.com/s3fs-public/2016/01/17/snow1.jpg',
    'https://www.howitworksdaily.com/wp-content/uploads/2014/08/fog-06.jpg',
    'https://static.pexels.com/photos/3590/nature-sky-sunny-clouds.jpg',
    'https://www.asc-florida.com/public/assets/img/skyCoudy.jpg',
  ]
  
  
  function displayTemp (F,C){
    if(C) return Math.round((F-32)*(5/9)) +'&deg; C';
    return Math.round(F) + '&deg; F';
  }
  
  function render (data, C){
    
    var currentWeather = data.weather[0].description;
    var currentTemp = displayTemp(data.main.temp,C);
    var icon =  data.weather[0].icon;
    var windSpeed=data.wind.speed;
    var windDir = convertWindDirection(data.wind.deg);
    
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#WindSpeed').html(windDir+" "+windSpeed+" knots");
    var apiIcon = 'http://openweathermap.org/img/w/' + icon + '.png';
    $('#currentTemp').prepend('<img src=' + apiIcon + '>');
  }
  function convertWindDirection(dir) {
    var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var eightPoint = Math.floor(dir / 45);
    return rose[eightPoint];
  }
  $.getJSON('https://freegeoip.net/json/').done(function(location){
    $('#country').html(location.city+", "+location.country_name)
         // console.log(location);        
      $.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=2fadfd12ff01b47670c787e1ba2d59bc', function(data){
        
        console.log(data);
      apiData=data;
      console.log(apiData);  
      render(apiData,C);
      
      $('#toggle').click(function(){
        C = !C
        render(data,C);
        event.preventDefault();//stop 'jumping' when click toggle
      })
      
      var id = data.weather[0].id,
          bgIndex,
          backgroundId =[299,499,599,699,799,800];
      
      backgroundId.push(id); 
      bgIndex = backgroundId.sort().indexOf(id);
     //  console.log(backgroundId);
      
     $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
      
    })    
   }) 
})