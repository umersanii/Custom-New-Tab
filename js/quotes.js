// Quotes data directly in JavaScript
const quotes = [
    {"quote": "There is no sun, there is no glory, there is no victory. But it's all in one.", "author": "David Goggins"},
    ];

function displayRandomQuote() {
    // Select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote and author with separate clickable elements
    const quoteElement = document.getElementById('quote');
    quoteElement.innerHTML = `
        <span id="quoteText" style="cursor: pointer;">"${randomQuote.quote}"</span> 
        <span id="quoteAuthor" style="cursor: pointer;">- ${randomQuote.author}</span>
    `;

    // Add click event listener for the quote text
    document.getElementById('quoteText').onclick = function() {
        // Create a search query using the quote
        const query = `${randomQuote.quote}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        // Open the search results in a new tab
        window.open(searchUrl, '_blank');
    };

    // Add click event listener for the author name
    document.getElementById('quoteAuthor').onclick = function() {
        // Create a search query using the author's name
        const query = `${randomQuote.author}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        // Open the search results in a new tab
        window.open(searchUrl, '_blank');
    };
}

displayRandomQuote();
