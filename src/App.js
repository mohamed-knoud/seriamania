import { Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';
import './App.css'
// Lazy loading components
const Navbar = React.lazy(() => import('./Navbar'));
const Body = React.lazy(() => import('./Body'));
const Watch = React.lazy(() => import('./Watch'));
const Search = React.lazy(() => import('./Search'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Body />} />
          <Route path='/:tvseriesid' element={<Watch />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
