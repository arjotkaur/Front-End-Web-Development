var map;

$('.button-collapse').sideNav();

var jaipurCoordinates = {
    lat: 19.0760,
    lng: 72.8777
};

var indicators = [];

var infoPane = '';

var appLayout = {
    list: ko.observableArray([]),
    searchQuery: ko.observable(),
    ifAnyerr: ko.observable(false),
    warningMsg: ko.observable(''),



    constructor: function () {
        for (var a in indicators) {
            appLayout.list.push(indicators[a].malls);

        }
    },


    fun: function (query) {

        appLayout.list.removeAll();

        for (var b in indicators) {

            if (indicators[b].malls.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                appLayout.list.push(indicators[b].malls);
                indicators[b].setVisible(true);
            } else {
                indicators[b].setVisible(false);
            }
        }

    }

}

function if_map_Not_work() {
    appLayout.ifAnyerr(true);

    Materialize.toast("Map can't be loaded", 4000, 'rounded');

}

function gettingMallsMumbai() {
    $.ajax({
        url: 'https://api.foursquare.com/v2/venues/search?v=20161016&ll=19.0760%2C%2072.8777&query=mall&limit=10&intent=checkin&client_id=JXK1SHNPOMRYMKF3LIZYR134EBJZ3BJYL4EX5QYARZCW0I1C&client_secret=P1JNPU0AST4BWRXQWZNGI02A5QRUDUQHNKZUZTNAKDTMFRRC',
        async: true
    }).done(function (response) {
        var stored_data = response.response.venues;
        console.log(stored_data);
        for (var i in stored_data) {
            var indicator = new google.maps.Marker({
                malls: stored_data[i].name,
                position: {
                    lat: parseFloat(stored_data[i].location.lat),
                    lng: parseFloat(stored_data[i].location.lng)

                },
                map: map,
                animation: google.maps.Animation.DROP,
                addre : stored_data[i].location.address

            });
            indicator.addListener('click', raiseWindow2);
            indicators.push(indicator);
        }
        var leap = new google.maps.LatLngBounds();
        for (var k in indicators) {
            leap.extend(indicators[k].position);
        }
        map.fitBounds(leap);
        appLayout.constructor();
    }).fail(function () {
        appLayout.ifAnyerr(true);

        Materialize.toast('malls cant be displayed', 4000, 'rounded')

    });

}


function shake_marker(indicator) {
    indicator.setIcon('http://maps.google.com/mapfiles/kml/shapes/shopping.png');
    indicator.setAnimation(google.maps.Animation.BOUNCE);
}


function raiseWindow2() {
    raiseWindow(this);

}


function unshake_marker(indicator) {
    infoPane.indicator.setIcon(null);
    infoPane.indicator.setAnimation(null);
}

function open(malls) {
    for (var i in indicators) {
        if (indicators[i].malls == malls) {

            raiseWindow(indicators[i]);
            return;
        }
    }
}

function raiseWindow(indicator) {
    if (infoPane.indicator !== indicator && infoPane.indicator !== undefined) {
        unshake_marker(infoPane.indicator);
    }
    shake_marker(indicator);
    var content = '<h1>'+ "Name - " + indicator.malls + '</h1>';
    content += '<h2>' + "Address -"+ indicator.addre + '</h2>';
    infoPane.indicator = indicator;
    infoPane.open(map, indicator);
    infoPane.setContent(content);
    infoPane.addListener('closeclick', unshake_marker);
}

function jaipurMap() {
    infoPane = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: jaipurCoordinates,
        zoom: 12
    });
    gettingMallsMumbai();
}


ko.applyBindings(appLayout);
appLayout.searchQuery.subscribe(appLayout.fun);