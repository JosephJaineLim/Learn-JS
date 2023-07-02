// we get form directly because there is only 1 form in the html file
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {
    // destructore properties
    const {cityDetails, weather} = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async(city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    // object shorthand notation
    // when property and value is the same
    return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err.message));

    // set to local storage
    localStorage.setItem('city',city);
});

// if this exist this will return a strin
// a string of any length is always true
if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
                .then(data => updateUI(data))
                .catch(err => console.log(err.message)); ;
}

// TEST IN THE CONSOLE
// cityForm.addEventListener('submit', e => {
//     e.preventDefault();
//     // get city value
//     const city = cityForm.city.value.trim();
//     cityForm.reset();
//     // update ui with the new city
//     updateCity(city)
//         .then(data => console.log(data))
//         .catch(err => console.log(err.message));
// });