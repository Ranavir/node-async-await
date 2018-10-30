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
  try{
    var response = await axios.get('http://data.fixer.io/api/latest?access_key=fe2c24113f46ef2c0d7191609a9d6703&format=1');
    var euro = 1 / response.data.rates[from];
    var rate = euro * response.data.rates[to];
    if(isNaN(rate)){
      throw new Error();
    }
    return rate;
  }catch(e){
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

// const getCountries = (countryCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`).then((response) => {
//     return response.data.map((country) => country.name);
//   });
// };

const getCountries = async (countryCode) => {
  try{
    var response= await axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`);
    return response.data.map((country) => country.name);
  }catch(err){
    throw new Error(`Unable to get countries that use ${countryCode}.`);
  }

};

// getExchangeRate('USD','INR').then((rate) => {
//   console.log(rate);
// }).catch((err)=>{
//   console.log(err);
// });
//
// getCountries('INR').then((countries) => {
//   console.log(countries);
// });

// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExchangeRate(from, to).then((rate) => {
//     convertedAmount = (amount * rate).toFixed(2);
//     return getCountries(to);
//   }).then((countries) => {
//     return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend them in the following countries :${countries.join(', ')}`;
//   });
// };

const convertCurrency = async (from, to, amount) => {
  var rate = await getExchangeRate(from, to);
  var convertedAmount = (amount * rate).toFixed(2);
  var countries = await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend them in the following countries :${countries.join(', ')}`;
};

convertCurrency('USD','INR',20).then((message) => {
  console.log(message)
}).catch((err) => {
  console.log(err);
});
