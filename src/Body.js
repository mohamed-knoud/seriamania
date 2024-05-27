import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './Body.css'
import { Link } from 'react-router-dom';

function Body() {
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmYzOTcwNGJhOTEwMjlkM2NhZDY3MzQwY2E2ODYwMCIsInN1YiI6IjY2MzZhNzk0OTU5MGUzMDEyM2JjNDlhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImAuflKe7r_PCIM-jUc8wa9hCTYlwFWQqhQaIXgKVhI'
        }
      };
    useEffect(() => {
      const fetchData1 = async () => {
        try {
          const response = await axios.get('https://api.themoviedb.org/3/tv/popular',options);
          setData(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData1();

      const fetchData2 = async () => {
        try {
          const response = await axios.get('https://api.themoviedb.org/3/trending/tv/week',options);
          setData2(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData2();
  
      // Cleanup function to cancel any pending requests
      return () => {
        // Cleanup code here (if needed)
      };
    }, []); // Empty dependency array to run effect only once when component mounts
  return (
    <div>
        <h1 style={{textAlign:'center',color:'white',marginTop:"20px",fontSize:'30px'}}>POPULAR TV SHOWS</h1>

        <div style={{display:'flex',flexWrap:'wrap',width:"100%",margin:"40px auto",justifyContent:'center'}}>
        {data !== null ? (
    data.map((result, index) => (
        <Link style={{textDecoration:'none'}} key={index} to={`/${result.id}`}><div className='tv'>
            <span style={{margin:'0 0 20px 0',fontSize:'15px',color:'white',fontWeight:'bold'}}>{result.name}</span>
            <img style={{width:'165px',aspectRatio:"4/5",objectFit:'cover'}}src={`https://image.tmdb.org/t/p/original${result.poster_path}`} alt={result.name} />
        </div></Link>
    ))
) : (
    ''
)}</div>

<h1 style={{textAlign:'center',color:'white',marginTop:"20px",fontSize:'30px'}}>TRENDING TV SHOWS</h1>

        <div style={{display:'flex',flexWrap:'wrap',width:"100%",margin:"20px auto",justifyContent:'center'}}>
        {data2 !== null ? (
    data2.map((result, index) => (
        <Link style={{textDecoration:'none'}} key={index} to={`/${result.id}`}><div className='tv'>
            <span style={{margin:'0 0 20px 0',fontSize:'15px',color:'white',fontWeight:'bold'}}>{result.name}</span>
            <img style={{width:'165px',aspectRatio:"4/5",objectFit:'cover'}}src={`https://image.tmdb.org/t/p/original${result.poster_path}`} alt={result.name} />
        </div></Link>
    ))
) : (
    ''
)}</div>

    </div>
  )
}

export default Body
