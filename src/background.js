const bgImage = document.querySelector(".bgImg");

const ACC_KEY = "Rcom4RnWiiGVzKoo21vXQKYcsexFKzgT1VYTTAWrbxA";
const API_URL = `https://api.unsplash.com/photos/random/?count=1&client_id=${ACC_KEY}`;

function paintImage(url) {
  bgImage.style.backgroundImage = `url(${url})`;
}

function getBgImg(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (results) {
      results.forEach(function (result) {
        paintImage(result.urls.regular);
      });
    });
}

getBgImg(API_URL);
