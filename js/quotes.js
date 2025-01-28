// Quotes data directly in JavaScript
const quotes = [
    { "quote": "There is no sun, there is no glory, there is no victory. But it's all in one.", "author": "David Goggins" }
];

function displayRandomQuote() {
    // Check if the quotes array has at least one quote
    if (quotes.length === 0) {
        console.error("No quotes available to display.");
        return;
    }

    // Select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote and author with separate clickable elements
    const quoteElement = document.getElementById('quote');
    quoteElement.innerHTML = `
        <span id="quoteText" title="Search this quote" style="cursor: pointer;">"${randomQuote.quote}"</span> 
        <span id="quoteAuthor" title="Search this author" style="cursor: pointer;">- ${randomQuote.author}</span>
    `;

    document.getElementById("quote").removeAttribute("style");

    // Add click event listener for the quote text
    document.getElementById('quoteText').onclick = function() {
        const query = `${randomQuote.quote}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
    };

    // Add click event listener for the author name
    document.getElementById('quoteAuthor').onclick = function() {
        const query = `${randomQuote.author}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
    };


}

// Add an event listener for theme changes to update the quote box style
const themeCheckbox = document.getElementById('chb_theme');
themeCheckbox.addEventListener('change', displayRandomQuote);

// Initial display
displayRandomQuote();
