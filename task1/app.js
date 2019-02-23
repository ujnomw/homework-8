function httpGet(url) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      }
    };
    request.onerror = function() {
      reject(new Error("Network Error"));
    };
    request.send();
  });
}
const cities = document.getElementById('city_selector');
httpGet("./data/listOfCities.json").then(response => {
  let citiesContent = "";
  JSON.parse(response).forEach(function(el){
    citiesContent += "<option value='" + el + "'>" + el + "</option>";
  });
  cities.innerHTML = citiesContent;
});
const button = document.getElementsByClassName('button')[0];
button.addEventListener('click', function(){
  const cityName = document.getElementById('city_selector').value;
  httpGet("./data/cities/" + cityName.toLowerCase() + ".json").then(city => {
    httpGet("./data/balance.json").then(balance => {
      let message = '';
      city = JSON.parse(city);
      balance = JSON.parse(balance).amount;
      if (balance >= city.price){
        message = "You bought ticket to " + cityName + " for " + city.price +
        ". Your current balance is " + (balance-city.price) +
        ". Travel time is " + city.timeToGet + " minutes" +
        ". We recomend visitng " + city.placeToVisit;
      } else {
        message = "Ticket costs " + city.price + ". Your balance is " + balance + ".";
      }
      document.getElementById('message').innerHTML = message;
})
})
})
