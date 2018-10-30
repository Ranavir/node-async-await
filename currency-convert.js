//from to quantity
//20 USD is worth 26 CAD. You can spend them in the following countries :Canada

// http://data.fixer.io/api/latest?access_key=fe2c24113f46ef2c0d7191609a9d6703&format=1
// https://restcountries.eu/rest/v2/currency/INR

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=fe2c24113f46ef2c0d7191609a9d6703&format=1').then((response) => {
//     var euro = 1 / response.data.rates[from];
//     var rate = euro * response.data.rates[to];
//
//     return rate;
//   });
// };

const getExchangeRate = async (from, to) => {
  var response = await axios.get('http://data.fixer.io/api/latest?access_key=fe2c24113f46ef2c0d7191609a9d6703&format=1');
  var euro = 1 / response.data.rates[from];
  var rate = euro * response.data.rates[to];

  return rate;
};

// const getCountries = (countryCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`).then((response) => {
//     return response.data.map((country) => country.name);
//   });
// };

const getCountries = async (countryCode) => {
  var response= await axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`);
  return response.data.map((country) => country.name);
};

getExchangeRate('USD','INR').then((rate) => {
  console.log(rate);
}).catch((err)=>{
  console.log(err);
});

getCountries('INR').then((countries) => {
  console.log(countries);
});
