
const quotes = [
    { "quote": "There is no sun, there is no glory, there is no victory. But it's all in one.", "author": "David Goggins" },
    { "quote": "Discipline will hurt you for a moment. Laziness will haunt you for a lifetime", "author": "Unknown" },
    { "quote": "A fool prays for an easier life. A warrior prays for the strength to endure a difficult one.", "author": "Bruce Lee" },
    { "quote": "Without Allah I am nothing but a road to my own distruction", "author": "Unknown" },
    { "quote": "Does the stone realise every strike of the hammer and chisel is shaping it into a masterpiece", "author": "Unknown" },
    { "quote": "If there's no shoulder to cry on, there's definitely a floor to kneel and pray on", "author": "Unknown" },
    { "quote": "It's absence will teach you more than it's presence ever could", "author": "Unknown" },
    { "quote": "You can't wish for both a strong character and an easy life. The price of each, is the other.", "author": "Unknown" },
    { "quote": "A head full of fears has no space for dreams", "author": "Unknown" },
    { "quote": "When small men begin to cast big shadows, it means the sun is about to set", "author": "Lin Yutang" },
    { "quote": "The man who is a master of patience is a master of everything else", "author": "George Savile" },
    { "quote": "All my victories belong to Allah, and all my losses are mine alone.", "author": "Unknown" },
    { "quote": "An addiction to distraction is the death of your ability to think, and a mind that cannot think is the easiest to control.", "author": "Aldous Huxley" }
];


function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteElement = document.getElementById('quote');
    quoteElement.innerHTML = `
        <span id="quoteText" style="cursor: pointer;">"${randomQuote.quote}"</span> 
        <span id="quoteAuthor" style="cursor: pointer;">- ${randomQuote.author}</span>
    `;

    document.getElementById('quoteText').onclick = function() {
        const query = `${randomQuote.quote}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        window.open(searchUrl, '_blank');
    };

    document.getElementById('quoteAuthor').onclick = function() {
        const query = `${randomQuote.author}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        window.open(searchUrl, '_blank');
    };
}

displayRandomQuote();
