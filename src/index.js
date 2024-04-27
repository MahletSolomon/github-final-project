import React from "react";
import ReactDOM  from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App  from './App';
import NowPlaying from "./NowPlaying";
import NotFoundPage from "./NotFoundPage";

import { useParams } from 'react-router-dom';

const NowPlayingRoute = () => {
  const { movieid } = useParams();

  return <NowPlaying play={movieid} />;
};

// const router = createBrowserRouter([{
//     path: '/',
//     element: <App/>,
//     errorElement: <NotFoundPage/>,

// },
// {
//     path: '/nowplaying',
//     element: <NowPlaying/>,
// }, 
// {
//     path: '/nowplaying/:movieid',
//     element: props => (<NowPlaying movieId={props.match?.params.movieid} />)
// }

// ]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/nowplaying" element={<NowPlaying />} />
        <Route path="/nowplaying/:movieid" element={<NowPlayingRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
        </Router>
    </React.StrictMode>
);