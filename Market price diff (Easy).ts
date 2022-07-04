import axios from 'axios'

let priceFTX:number
let priceBinance:number

axios.get('https://ftx.com/api/markets/BTC/USDT')
.then(function (response) {
  priceFTX = response.data.result.price

})
.catch(function (error) {
      console.log(error);
    })

axios.get('https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT')
.then(function (response) {

  priceBinance = Number(response.data.price)
  console.log("FTX BTC Price: " + priceFTX +" USDT")
  console.log("Binance BTC Price: " + priceBinance + " USDT")
  console.log("Diff: " +  Math.abs(priceFTX - priceBinance).toFixed(8) + " USDT" + " ( "  + 
  (Math.abs(priceFTX - priceBinance)/priceFTX).toFixed(4) + " %)")

})
.catch(function (error) {
  console.log(error);
})