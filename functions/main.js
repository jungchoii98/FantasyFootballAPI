var http = require('http');

function getPlayers(jsonArray) {
    var json = JSON.parse(jsonArray);
    // create an array of players
    var players = {};
    // iterate through each player
    json.forEach(player => {
        // iterate through each company
        var average = 0;
        var numberOfCompanies = 0;
        player.company.forEach(company => {
            average = average + company.pickNumber;
            numberOfCompanies = numberOfCompanies + 1;
        });
        average = average/numberOfCompanies;
        players[player.name] = average;
    });
    return players;
}

const callPlayerApi = new Promise((resolve, reject) => {
    http.get({
        hostname: 'localhost',
        port: 3000,
        path: '/api/players',
        agent: false  // Create a new agent just for this one request
      }, (res) => {
        // Do stuff with response
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
//        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            resolve(chunk);
        });
      });
});

function sortPlayers(players) {
    // Create items array
    var items = Object.keys(players).map(function(key) {
    return [key, players[key]];
    });
  
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return first[1] - second[1];
    });
    console.log(items);
}

async function displayBestPlayers() {
    var players = await callPlayerApi.then(result => getPlayers(result));
    sortPlayers(players);

}

displayBestPlayers();