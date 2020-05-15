const colorRandomizer = () => {
    const myColors = ['#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f1c40f', '#ffa781', '#5b0e2d'] //array of colors
    const randomNum = Math.floor((Math.random() * myColors.length)); //generate random number

    const randomColor = myColors[randomNum];
    // modify bg and txt color with my random color
    // get the DOM element
    const bg = document.querySelectorAll('.randomBgContainer');
    for (const ele of bg) {
        // set the css attribute on it
        ele.setAttribute('style', `background-color: ${randomColor}`);
    };
    const textElements = document.querySelectorAll('.randomTxtColor');
    for (const text of textElements) {
        // we have multiple elements where we want to change the text colors
        text.setAttribute('style', `color: ${randomColor}`)

    }
};

const endpoint = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';



function getQuote() {

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            displayQuote(data.quoteText, data.quoteAuthor);
            colorRandomizer();


        })
        //The first .then() block converts the raw response into JSON. To use the actual data, we need to chain another .then() method and then access the data from there.
        .catch(function(error) {
            console.log(error);
            // The catch block executes only if the fetch request or any of the then blocks above it throw an error.
        });

}

function displayQuote(quoteText, quoteAuthor) {
    const quoteShow = document.querySelector('.textquote');
    quoteShow.textContent = (quoteText + ' ' + ' - ' + quoteAuthor);

    const tweetQuote = document.querySelector('.tweet');
    tweetQuote.setAttribute('href', `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`);
    //tweetQuote.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + decodeURIComponent(quoteText + "" + quoteAuthor));

}

const quoteButton = document.querySelector(".newquote");

quoteButton.addEventListener('click', getQuote);

//you dont need to put functions in single/double .e.g getQuote
getQuote();