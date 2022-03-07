const minimist = require('minimist')
const express = require('express')

// Getting args, setting express const and setting to that or default of 5000
var args = minimist(process.argv.slice(2))

const app = express()
const port = args.port || process.env.PORT || 5000


//CoinFlip functions 
function coinFlip() {
    return Math.random() > 0.5 ? ('heads') : ('tails');
  }
  
function coinFlips(flips) {
    var tosses = []
    for (let i = 0; i < flips; i++) {
      tosses[i] = coinFlip();
    }
    return tosses
  }
  
function countFlips(array) {
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
  
function flipACoin(call) {
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

app.use(function(req, res){
    res.status(404).send("404 Not found")
    res.type("text/plain")
}) 

app.get('/app', (req, res) => {
    res.status(200).send('200 OK')
    res.type('text/plain')
})

app.get('/app/flip/', (req, res) => {
    res.status(200).json({'flip': coinFlip()})
})

app.get('/app/flips/:number/', (req, res) => {
    res.status(200).json({'raw': coinFlips(req.params.number), 'summary': countFlips(coinFlips(req.params.number))})
})

app.get('/app/flip/call/tails/', (req, res) => {
    res.status(200).json(flipACoin('tails'))
})

app.get('/app/flip/call/heads/', (req, res) => {
    res.status(200).json(flipACoin('heads'))
})