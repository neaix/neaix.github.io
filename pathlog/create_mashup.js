function HowMany(apiKey, authUrl, apiUrl) {
  this.foursquare = new Foursquare(apiKey, authUrl, apiUrl);
  HowMany.prototype.run();
}

/**
 * Fetch users's history, and then render in callbkac.
 */
HowMany.prototype.run = function() {
  Foursquare.prototype.venueHistory(HowMany.prototype.onHistory);
}

/**
 * Given response from venuehistory, build a map from venue ID to history item.
 * @private
 */
HowMany.prototype.onHistory = function(history) {
  var restaurants_html = [];
  var airports_html = [];
  var coffee_html = [];
  var resident_html = [];
  var multiplex_html = [];
  var mall_html =[];
  var restaurants_counts = 0;
  var airports_counts = 0;
  var coffee_counts = 0;
  var resident_counts = 0;
  var multiplex_counts = 0;
  var mall_counts = 0;
  for (var i = 0; i < history.length; i++) {
    var entry = history[i]['venue'];
    if (entry.categories.length != 0){
    if (entry.menu == undefined )
    {
      //deal with non food places here
      if (entry.categories[0].name == 'Airport')
      {
        airports_counts++;
        airports_html.push(entry.name + '<br/>');
      }
      else if (entry.categories[0].name == 'Mall')
      {
        mall_counts++;
        mall_html.push(entry.name, ', ', entry.location.address, ', ', entry.location.city, '<br/>');
      }
      else if (entry.categories[0].name == 'Multiplex')
      {
        multiplex_counts++;
        multiplex_html.push(entry.name, ', ', entry.location.address, ', ', entry.location.city, '<br/>');
      }
      else if (entry.categories[0].name.indexOf('Residential') > -1)
      {
        resident_counts++;
        resident_html.push(entry.name, ', ', entry.location.address, ', ', entry.location.city, '<br/>');
      }
      else if (entry.categories[0].name.indexOf('Coffee') > -1) {
        coffee_counts++;
        coffee_html.push(entry.location.address, ', ', entry.location.city, '<br/>');
      }  
      else 
      {
        //Ignore others for now
      }
    }
    else {
      //deal with food places here  
       if (entry.categories[0].name.indexOf('Coffee') > -1) {
        coffee_counts++;
        coffee_html.push(entry.location.address, ', ', entry.location.city, '<br/>');
       }
      else if (entry.categories[0].name.indexOf('Restaurant') > -1 || entry.categories[0].name.indexOf('Burrito')) {
        restaurants_counts++; 
        restaurants_html.push(entry.name, ', ', entry.location.address, ', ', entry.location.city, '<br/>');
      }     
    }
    }
  }
    $('#coffee_html').html(coffee_html.join(''));
    $('#coffee_counts').html(coffee_counts + '');

    $('#mall_html').html(mall_html.join(''));
    $('#mall_counts').html(mall_counts + '');

    $('#airports_html').html(airports_html.join(''));
    $('#airports_counts').html(airports_counts + '');

    $('#resident_html').html(resident_html.join(''));
    $('#resident_counts').html(resident_counts + '');

    $('#multiplex_html').html(multiplex_html.join(''));
    $('#multiplex_counts').html(multiplex_counts + '');

    $('#restaurants_html').html(restaurants_html.join(''));
    $('#restaurants_counts').html(restaurants_counts + '');

}
$(function() {
  new HowMany('NDP5V3HX44XRYA51JQWLMV500PXCCB4ZJ23DZJPNYDYMP5TU', 'https://foursquare.com/', 'https://api.foursquare.com/').run();
});
