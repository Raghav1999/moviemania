import { useEffect, useState } from 'react';

import './App.css';
import MovieCard from './MovieCard';
// import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=7773cf9c';

const App = () => {
    const [movies, setMovies] = useState([]);

    const [searchText, setSearchText] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        if (data.Response !== 'False')
            setMovies(data.Search);
        else {
            setMovies([]);
        }
    }

    useEffect(() => {
        searchMovies('Marvel');
    }, [])
    
    return (
        <div id='top' className='app'>
            <h1>Moviemania</h1>
            <span id='by'>By Raghav Sharma</span>

            <div className='search'>
                <input 
                  placeholder='Search for movies'
                  value={ searchText }
                  onChange={(e) => { setSearchText(e.target.value) }} 
                />
                <button
                 alt="search"
                 onClick={ () => { searchMovies(searchText) } } >Search
                </button>
                {/* <img 
                  src={SearchIcon}
                  alt="search"
                  onClick={() => { searchMovies(searchText) }}
                /> */}
                 
            </div>

            <div className='container'>
                <a id='pseudo-top' href='/#bottom'>Go to bottom</a>
                {
                    movies.length > 0 ? (
                        <div className='container'>
                            { movies.map((movie) => (
                                <MovieCard movie={ movie }/>
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movie found!</h2>
                        </div>
                    )
                }
            </div><br/><br/>
            <a id='bottom' href='/#top'>Back to top</a>
        </div>
    )
}

export default App;