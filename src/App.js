import Navbar from "./Navbar";
import Body from "./Body";
import Watch from "./Watch";
import { Routes, Route } from "react-router-dom";
import Search from "./Search";
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
