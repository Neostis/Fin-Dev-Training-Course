import fetch from 'node-fetch';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
    ' ' +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
  );
}

const main = async () => {
  const res = await fetch('https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT');

  const chart: any = await res.json();

  const arr = {};
  chart.forEach((element) => {
    const result = {
      [formatDate(new Date(element[0]))]: {
        open: element[1],
        high: element[2],
        low: element[3],
        close: element[4],
      },
    };

    Object.assign(arr, result);
  });

  console.log(arr);
};

main();
