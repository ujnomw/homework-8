function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 1000)
  })
}
function getDataCached(timeRange){ // timeRange показывает насколько атуальные данные нам нужны
  if (getDataCached.lastTimeCalled === null || (getDataCached.lastTimeCalled - (Date.now()/ 1000) > timeRange)){
    getDataCached.cache = getData();
    getDataCached.lastTimeCalled = Date.now()/ 1000;
  }
  return getDataCached.cache;
}
getDataCached.lastTimeCalled = null;
getDataCached.cache = null;
getDataCached(10).then(data => {console.log(data)
  /*
    do smth with data
  */
});
getDataCached(0.0001).then(x => console.log(x));
