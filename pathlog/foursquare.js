// Copyright 2011 Foursquare Labs Inc. All Rights Reserved.

// Requires BBQ, but doesn't need to
// Needs POST support via CORS

function Foursquare(apiKey, authUrl, apiUrl) {
  this.apiUrl = apiUrl;
  if ($.bbq.getState('access_token')) {
    // If there is a token in the state, consume it
    this.token = $.bbq.getState('access_token');
    $.bbq.pushState({}, 2)
  } else if ($.bbq.getState('error')) {
  } else {
    this.doAuthRedirect(authUrl, apiKey);
  }
}

Foursquare.prototype.doAuthRedirect = function(authUrl, apiKey) {
  var redirect = window.location.href.replace(window.location.hash, '');
  var url = authUrl + 'oauth2/authenticate?response_type=token&client_id=' + apiKey +
      '&redirect_uri=' + encodeURIComponent(redirect) +
      '&state=' + encodeURIComponent($.bbq.getState('req') || 'users/self');
  //no need to authorize as venuehistory does not need auth
  //window.location.href = url;
};

Foursquare.prototype.makeRequest = function(query, callback) {
  var query = query + ((query.indexOf('?') > -1) ? '&' : '?') + 'oauth_token=' + this.token + '&callback=?';
  //$.getJSON(this.apiUrl + 'v2/' + query, {}, callback);
  //hack added as venueHistory does not need authentication
  $.getJSON('https://api.foursquare.com/v2/users/self/venuehistory?oauth_token=UKSTRDTKV0IZ4CXIXMDBMRV0LRCMZ5SY0SEHKVNNNVRWIJN5&callback=?',{}, callback);
};

Foursquare.prototype.trendingVenues = function(lat, lng, callback) {
  this.makeRequest('venues/trending?ll=' + lat + ',' + lng,
                   function(response) { callback(response['response']['venues']) });
}

Foursquare.prototype.searchVenues = function(lat, lng, callback) {
    this.makeRequest('venues/search?ll=' + lat + ',' + lng,
                     function(response) { callback(response['response']['groups']) });
};

Foursquare.prototype.searchTips = function(lat, lng, friendsOnly, callback) {
    this.makeRequest('tips/search?ll=' + lat + ',' + lng + (friendsOnly ? '&filter=friends' : ''),
                     function(response) { callback(response['response']['tips']) });
};

Foursquare.prototype.history = function(callback) {
    this.makeRequest('users/self/checkins?limit=250',
                     function(response) { callback(response['response']['checkins']['items'])  })
};

Foursquare.prototype.venueHistory = function(callback) {
    this.makeRequest('users/self/venuehistory',
                     function(response) { callback(response['response']['venues']['items']) });
};

Foursquare.prototype.todos = function(callback) {
    this.makeRequest('users/self/todos?sort=recent',
                     function(response) { callback(response['response']['todos']['items']) });
};

Foursquare.prototype.friends = function(callback) {
    this.makeRequest('users/self/friends',
                     function(response) { callback(response['response']['friends']['items']) });
};

/**
 * Helper utility duplicating goog.bind from Closure, useful for creating object-oriented callbacks.
 * something(bind(this.foo, this)) is equiavlent to var self = obj; something(function() { self.foo });
 */
function bind(f, obj) {
  return function() {
      f.apply(obj, arguments);
  }
}
