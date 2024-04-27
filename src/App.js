import React from "react";
import { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';

import { useNavigate } from "react-router-dom";


// import { useHistory } from "react-router-dom";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import SearchHistory from  "./SearchHistory";
import closeIcon from './close.svg'

class Stack {
    constructor(){
        this.items=[];
        this.count=0;
    }

    isEmpty(){
        console.log(this.items.length);
        return this.items.length ===0; 
    }

    push(item){
        
        this.items.push(item);
        this.count =  this.items.length;
    }

    pop(){

        if(this.isEmpty()){
            return null;
        }
        this.count--;
        return this.items.pop();
    }
    
    peek(){
        if(this.isEmpty()){
            return null;
        }
        return this.items[this.items.length-1];
    }

    clear(){
        this.items=[];
        this.count=0;
    }

    display(){  
        this.items.forEach(element => {
            console.log(element);
        });

    }
}


class Queue{
    constructor(){
        this.queue=[];
    }
  
    enqueue(item){
        this.queue.push(item);
    }
  
    dequeue(){
        if (this.isEmpty()) {
            return null;
          }
          return this.queue.shift();
    }
  
    peek() {
        if (this.isEmpty()) {
          return null;
        }
        return this.queue[0];
      }
    
      getSize(){
        return this.queue.length;
      }
  
      //Fisher-Yates shuffle algorithm
      shuffleQueue() {
        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }
    }
  }
 

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";



const App = ()=>{

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]); 
    const [searchTerm, setSearchTerm]  = useState([]);
    const [searchHistory, setSearchHistory] = useState({ items: [] });
    const [play, setPlay] = useState('');
    const [watchList, setWatchList] = useState(new Queue());

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        if (data.Search && data.Search.length > 0) {
            addToSearchHistory(title);
        }
        // console.log(JSON.stringify(movies));

    }
    

   const handleMovieClicked=(movie)=>{
        setPlay(movie.imdbID);
        navigate(`/nowplaying/${movie.imdbID}`);
        console.log({play});
    }

    const addToSearchHistory=(term)=>{
        setSearchHistory((prev)=>{
            const newSearchHistory = new Stack();
            newSearchHistory.items = prev.items;
            newSearchHistory.push(term);
            console.log(newSearchHistory.display());
            return newSearchHistory;
        })
    }

    const deleteFromSearchHistory = (index) => {
        setSearchHistory((prev) => {
            const updatedHistory = [...prev.items];
            updatedHistory.splice(index, 1);
            return { items: updatedHistory };
        });
    };
    const handleSearchHistoryItemClick = (term) => {
        setSearchTerm(term);
    };

    const addToWatchList=(id)=>{
        setWatchList((prev)=>{
            const updatedList = new Queue();
            updatedList.queue = prev.queue;
            updatedList.enqueue(id);
            return updatedList;
        });
        
    }
    const removeFromWatchList = (id) => {
        setWatchList((prev)=>{
            const updatedList = prev.dequeue(id);
            return updatedList;
        })
    }
  
    return(
        <div className="app">
            <h1>Movie Land</h1>
            <div className="search" style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
        <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { e.key === 'Enter' && searchMovies(searchTerm); }}
        />
        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
    </div>
    <div>
        {searchHistory.items.length > 0 && (
            <div className="search-history">
                <SearchHistory
                    items={searchHistory.items}
                    onDelete={deleteFromSearchHistory}
                    onSearchItemClick={handleSearchHistoryItemClick}
                />
            </div>
        )}
    </div>
</div>


            {movies?.length>0 ?(
            <div className="container">
                {movies.map((movie)=>(
                <MovieCard movie = {movie} onClick={()=>handleMovieClicked(movie)}/>
            ))}
             </div> ) :(
             <div className="empty">No results found.</div>
            )
            }
             
            {/* <NowPlaying play={'tt1488589'} /> */}

            {/* <div style={iframeContainer}>
            <iframe
          style={iframeContent}
          src={`https://vidsrc.in/embed/${play}/`}
          allowFullScreen
      />
      </div> */}

           
        </div>
    );
};

export default App;