// Quotes data directly in JavaScript
const quotes = [
    { "quote": "There is no sun, there is no glory, there is no victory. But it's all in one.", "author": "David Goggins"
    ,"quote": "Discipline will hurt you for a moment. Laziness will haunt you for a lifetime", "author": "Unknown"
    ,"quote": "A fool prays for an easier life. A warrior prays for the strength to endure a difficult one.", "author": "Bruce Lee"
    ,"quote": "Without Allah I am nothing but a road to my own distruction" , "author": "Unknown"
    ,"quote": "Does the stone realise every strike of the hammer and chisel is shaping it into a masterpiece", "author": "Unknown"
    ,"quote": "If there's no shoulder to cry on, there's definitely a floor to kneel and pray on", "author": "Unknown"
    ,"quote": "It's abscene will teach you more than it's presence ever could", "author": "Unknown"
    ,"quote": "You can't wish for both a strong character and an easy life. The price of each, is the other.", "author": ""
    ,"quote": "a head full of fears has no space for dreams", "author": ""
    ,"quote": "When small men begin to cast big shadwos, it means the sun is about to set", "author": "Lin Yutang"
    ,"qupte": "The man who is a master of patience is a master of everything else", "author": "George Savile"
    ,"quote": "Discipline will hurt you for a moment. Laziness will haunt you for a lifetime", "author": "Unknown"    
     
}
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
