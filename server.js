const express = require('express')
const app = express()

var port = 5000

export function coinFlip() {
    return Math.random() > 0.5 ? ('heads') : ('tails');
  }
  
  export function coinFlips(flips) {
    var tosses = []
    for (let i = 0; i < flips; i++) {
      tosses[i] = coinFlip();
    }
    return tosses
  }
  
  export function countFlips(array) {
    let heads_sum = 0;
    let tails_sum = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == 'heads') {
        heads_sum += 1;
      } else if (array[i] == 'tails') {
        tails_sum += 1;
      }
    }
  
    if (heads_sum == 0 || tails_sum == 0) {
      if (heads_sum == 0) {
        return "{ tails: " + tails_sum + " }";
      } else if (tails_sum == 0) {
        return "{ heads: " + heads_sum + " }";
      }
    }
    
    return {"heads": heads_sum, "tails": tails_sum };
  }
  
  export function flipACoin(call) {
    var flip = coinFlip();
    if (call == flip) {
      var status = 'win'
    } else {
      var status = 'lose'
    }
    return  {"call": call, "flip": flip, "result": status };
  }

const server = app.listen(port, () => {
    console.log('App is runnin on %port%'.replace('%port%', port))
})

app.get('/app', (req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
})

app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
}) 