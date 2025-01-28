import { Routes, Route } from "react-router-dom";

const Navbar = React.lazy(() => import('./Navbar'));
const Body = React.lazy(() => import('./Body'));
const Watch = React.lazy(() => import('./Watch'));
const Search = React.lazy(() => import('./Search'));

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Body/>} />
        <Route exact path='/:tvseriesid' element={<Watch/>} />
        <Route exact path='/search' element={<Search/>} />
      </Routes>
      
    </>
  );
}

export default App;
