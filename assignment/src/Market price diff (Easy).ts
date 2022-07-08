import fetch from 'node-fetch';

const main = async () => {
  const resFtx = await fetch('https://ftx.com/api/markets/BTC/USDT');
  const resBinance = await fetch('https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT');

  const ftx: any = await resFtx.json();
  const binance: any = await resBinance.json();

  console.log('FTX BTC Price: ' + ftx.result.price + ' USDT');

  console.log('Binance BTC Price: ' + binance.price + ' USDT');

  console.log(
    'Diff: ' +
      Math.abs(ftx.result.price - binance.price) +
      ' USDT' +
      ' ( ' +
      (Math.abs(ftx.result.price - binance.price) / ftx.result.price).toFixed(4) +
      ' %)',
  );
};

main();
