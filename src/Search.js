import React,{useState} from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import no from './no.png'
function Search() {
    const [query,setQuery] = useState('')
    const handleChange = (event)=>{
        setQuery(event.target.value)
    }
    const [data,setData] = useState(null)
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmYzOTcwNGJhOTEwMjlkM2NhZDY3MzQwY2E2ODYwMCIsInN1YiI6IjY2MzZhNzk0OTU5MGUzMDEyM2JjNDlhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImAuflKe7r_PCIM-jUc8wa9hCTYlwFWQqhQaIXgKVhI'
        }
      };
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === 'Enter') {
            const fetchData = async () => {
                try {
                  const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}`,options);
                  if (!response.ok) {
                    throw new Error('Failed to fetch data');
                  }
                  const result = await response.json();
                 
                  if(result.results.length>0)
                    setData(result.results);
                  else 
                    setData(null)

                } catch (error) {
                  console.log(error)
                }
              };
          
              fetchData();
          }
        };
    
        document.addEventListener('keypress', handleKeyPress);
    
        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
      }, [query]);
    
  return (
    <>
    <div style={{margin:'20px 0 20px 30px'}}>
        <i className="fa-solid fa-magnifying-glass" style={{marginRight:'10px',fontSize:'20px',color:'white',padding:'5px',borderRadius:'5px'}}></i><input onChange={handleChange} value={query} style={{width:'250px',color:'white',backgroundColor:'black',borderRadius:'10px',padding:'15px 20px',outline:'none',border:'1px solid rgb(20,20,20)'}} placeholder='Search for tv shows' type="text"/>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',width:"100%",margin:"40px auto",justifyContent:'center'}}>

    {data !== null ? (
        data.map((result, index) => (
            <Link style={{textDecoration:'none'}} key={index} to={`/${result.id}`}><div className='tv'>
                <span style={{margin:'0 0 20px 0',fontSize:'15px',color:'white',fontWeight:'bold'}}>{result.name}</span>
                <img style={{width:'165px',aspectRatio:"4/5",objectFit:'cover'}} src={result.poster_path!==null?`https://image.tmdb.org/t/p/original${result.poster_path}`:no} alt={result.name} />
            </div></Link>
        ))
    ) : (
        ""
    )}</div>
    </>
  )
}

export default Search