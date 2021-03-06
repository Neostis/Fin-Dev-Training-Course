import axios from 'axios'

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
    return (
    [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
    ].join(':')
    );
}

interface Chart {

    [time: string] : 
    ChartDetails
}

interface ChartDetails {
        open: string;
        high: string;
        low: string;
        close: string;
}
var obj: Chart = {}

var array: Array<Chart> = []

let temp: ChartDetails = {
    open: " ",
    high: " ",
    low: " ",
    close: " "
}

axios.get('https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT')
.then(function (response) {
    const element:[][] = response.data;
    for(let item1 in element){
        for(let item2 in element[item1]){
            var key
            switch(Number(item2)){
                case 0 : 
                    key = formatDate(new Date(element[item1][item2]))
                case 1 : 
                    temp.open = String(element[item1][item2])
                case 2 : 
                    temp.high = String(element[item1][item2])
                case 3 : 
                    temp.low = String(element[item1][item2])
                case 4 : 
                    temp.close = String(element[item1][item2])
                default : break
            }
            obj = {
                [String(key)]: temp
            }
            array.push(obj)
            
        } 
    }
    console.log(array)

})
.catch(function (error) {
      console.log(error);
    })