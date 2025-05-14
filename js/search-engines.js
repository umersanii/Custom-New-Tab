document.addEventListener('DOMContentLoaded', function() {

  let currentSearchEngine = {
    name: 'google',
    url: 'https://www.google.com/search',
    paramName: 'q'
  };

  const searchEngines = [
    {
      name: 'google',
      url: 'https://www.google.com/search',
      paramName: 'q',
      icon: 'Icons/icons8-google.svg'
    },
    {
      name: 'bing',
      url: 'https://www.bing.com/search',
      paramName: 'q',
      icon: 'Icons/icons8-bing.svg'
    },
    {
        name: 'Google Scholar',
        url: 'https://scholar.google.com/scholar',
        paramName: 'q',
        icon: 'Icons/Google Scholar.png'
    },
    {
      name: 'youtube',
      url: 'https://www.youtube.com/results',
      paramName: 'search_query',
      icon: 'Icons/icons8-youtube-50.svg'
    },
    {
        name: 'Github',
        url: 'https://github.com/search?',
        paramName: 'q',
        icon: 'Icons/icons8-github-50.svg'
    }
  ];

  const searchEnginesContainer = document.querySelector('.search-engines');
  
  searchEngines.forEach(engine => {
    const button = document.createElement('button');
    button.classList.add('search-engine-button');
    button.setAttribute('data-engine', engine.name);
    
    const img = document.createElement('img');
    img.src = engine.icon;
    img.alt = engine.name;
    
    button.appendChild(img);
    searchEnginesContainer.appendChild(button);
    
    button.addEventListener('click', () => {
      setSearchEngine(engine);
    });
  });

  const savedEngine = localStorage.getItem('searchEngine');
  if (savedEngine) {
    const engine = searchEngines.find(e => e.name === savedEngine);
    if (engine) {
      setSearchEngine(engine);
    } else {
      setSearchEngine(searchEngines[0]);
    }
  } else {
    setSearchEngine(searchEngines[0]);
  }

  function setSearchEngine(engine) {
    currentSearchEngine = engine;
    localStorage.setItem('searchEngine', engine.name);
    
    const searchForm = document.querySelector('.search-form');
    searchForm.action = engine.url;
    
    const searchInput = document.querySelector('.search-form__input');
    searchInput.name = engine.paramName;
    
    document.querySelectorAll('.search-engine-button').forEach(btn => {
      if (btn.getAttribute('data-engine') === engine.name) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  setTimeout(() => {
    document.querySelector('.search-form__input').focus();
  }, 500);
});
