//CLOCK JS//
function clock() {
    $('#clock').html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}
setInterval(clock, 1000);
//END OF CLOCK JS//

//START OF WEATHER JS//
var userFormEl = document.querySelector("#userForm");
var nameInputEl = document.querySelector("#citySearch");
var searchedCityEl = document.querySelector("#city");
var todayTemp = document.querySelector('#currentTemp');
var todayWind = document.querySelector('#currentWind');
var todayHum = document.querySelector('#currentHum');
var todayUV = document.querySelector('#currentUV');
var modal = document.getElementById("modal1"); 
var modalText= document.getElementById("modal-text");
var modalBtn = document.getElementsByClassName("modal-close")[0];

// fetch current day data from api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid=1a43c0eec6dcda3a7a81a3791424d2bd
var getCurrentDay = function (name) {

    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=1a43c0eec6dcda3a7a81a3791424d2bd&units=imperial";
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrent(data);
            });
        } else {
            modal1.style.display = "block";
            modalText.textContent = "Enter a valid city!";

            modalBtn.onclick = function(){
            modal1.style.display = "none"
            }
        }
    });
}


// display searched city current conditions
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = nameInputEl.value

    if (cityName) {
        getCurrentDay(cityName);
    } else {
        modal1.style.display = "block";
        modalText.textContent = "Enter a City!";

        modalBtn.onclick = function(){
            modal1.style.display = "none"
        }
    }
}

var displayCurrent = function (data) {
    const m = moment();
    var currentCity = data.name;
    var currentTemp = data.main.temp;
    var currentHum = data.main.humidity;
    var currentWind = data.wind.speed;
    // var currentIcon = data.weather[0].main
    // var iconEl = $("#icon-info");
    // var nowDate = m.format('L');
    // clear current content
    searchedCityEl.textContent = "";

    // display info
    searchedCityEl.textContent = currentCity; //+ ' (' + nowDate + ')';
    todayTemp.textContent = "Temp: " + currentTemp + " \xB0 F";
    todayHum.textContent = "Humidity: " + currentHum + " %";
    todayWind.textContent = "Wind: " + currentWind + " MPH";


    // if (currentIcon === "Clear") {
    //     iconEl.addClass("oi oi-sun")
    // } else if (currentIcon === "Clouds") {
    //     iconEl.addClass("oi oi-cloud")
    // } else if (currentIcon === "Rain") {
    //     iconEl.addClass("oi oi-rain")
    // }
}

userFormEl.addEventListener("submit", formSubmitHandler);
//END OF WEATHER JS//

//START OF NEWS JS//
var newsCardEl = document.getElementById("news-card");
var newsSearchForm = document.getElementById("news-search");
var newsInputEl = document.getElementById("news-input")

var newsSubmitHandler = function (event) {
    event.preventDefault();

    var searchTerm = newsInputEl.value.trim();
    newsInputEl.value = "";

    searchNews(searchTerm);
}

//get news
var getNews = function () {

    fetch('https://gnews.io/api/v3/topics/nation?&max=3&token=43720a239752027317cec258fed618fc')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayNews(data);
        });
}
//display news
var displayNews = function (data) {

    for (var i = 0; i < data.articles.length; i++) {
        //find and define news data
        var newsTitle = data.articles[i].title;
        var newsLink = data.articles[i].url;
        //create news title element and append
        var newsTitleEl = document.createElement("h5");
        newsTitleEl.textContent = newsTitle;
        newsTitleEl.className = "news-title"
        newsCardEl.appendChild(newsTitleEl);
        //create news article link element and append
        var newsLinkEl = document.createElement("a");
        newsLinkEl.textContent = "Read Article";
        newsLinkEl.className = "news-link";
        newsLinkEl.setAttribute('href', newsLink);
        newsLinkEl.setAttribute('target', '_blank')
        newsCardEl.appendChild(newsLinkEl);

    }
}

//search news
var searchNews = function (searchTerm) {
    fetch('https://gnews.io/api/v3/search?q=' + searchTerm + '&max=3&token=43720a239752027317cec258fed618fc')
        .then(function (response) {
            return response.json();
        })
        .then(function (searchData) {
            console.log(searchData);
            displaySearchedNews(searchData, searchTerm)
        });
}

//display searched topic
var displaySearchedNews = function (searchData, searchTerm) {
    newsCardEl.textContent = "";

    var searchHeader = document.createElement("h3");
    searchHeader.className = "news-header";
    searchHeader.textContent = "Searched Topic: " + searchTerm;
    newsCardEl.appendChild(searchHeader);

    for (var i = 0; i < searchData.articles.length; i++) {
        //find and define news data
        var searchTitle = searchData.articles[i].title;
        var searchLink = searchData.articles[i].url;
        //create news title element and append
        var searchTitleEl = document.createElement("h5");
        searchTitleEl.textContent = searchTitle
        searchTitleEl.className = "news-title"
        newsCardEl.appendChild(searchTitleEl);
        //create news article link element and append
        var searchLinkEl = document.createElement("a");
        searchLinkEl.textContent = "Read Article";
        searchLinkEl.className = "news-link";
        searchLinkEl.setAttribute('href', searchLink);
        searchLinkEl.setAttribute('target', '_blank')
        newsCardEl.appendChild(searchLinkEl);
    }
}

getNews();
newsSearchForm.addEventListener("submit", newsSubmitHandler);
//END OF NEWS JS//

//START OF TASK LIST JS//
var deleteBtn = document.querySelector('.delete-btn')

$('.save-btn').on('click', function () {
    var taskNumber = $(this).attr('id');
    var task = $(this).siblings('div.task-div').children("input").val();
    console.log(task);

    localStorage.setItem(taskNumber, task);
})

$("#task1").children("input").val(localStorage.getItem("task-1"));

$("#task2").children("input").val(localStorage.getItem("task-2"));

$("#task3").children("input").val(localStorage.getItem("task-3"));

$("#task4").children("input").val(localStorage.getItem("task-4"));

$("#task5").children("input").val(localStorage.getItem("task-5"));

//END OF TASK LIST JS//

$(document).ready(function () {
    clock();
})