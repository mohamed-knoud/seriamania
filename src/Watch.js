import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Watch.css'
function Watch() {
    const { tvseriesid } = useParams();
    const [data, setData] = useState(null);
    const [episode,setEpisode] = useState(1)
    const [season,setSeason] = useState(1)
    const [src,setSrc] = useState(`https://vidsrc.icu/embed/tv/`)
    const [numberOfEpisodes,setNumberOfEpisodes] = useState(null)
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmYzOTcwNGJhOTEwMjlkM2NhZDY3MzQwY2E2ODYwMCIsInN1YiI6IjY2MzZhNzk0OTU5MGUzMDEyM2JjNDlhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImAuflKe7r_PCIM-jUc8wa9hCTYlwFWQqhQaIXgKVhI'
        }
      };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${tvseriesid}`,options);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);
            console.log(result)
          } catch (error) {
            console.log(error)
          }
        };
    
        fetchData();
    
        return () => {
        };
      }, []); 

      const handleChange1 = (event)=>{
        setSeason(event.target.value)
        setNumberOfEpisodes(result.seasons[season].episode_count)
           const elements = [];

          for (let i = 0; i < result.seasons[season].episode_count; i++) {
            elements.push(<option onClick={handlChange2} key={i}>{i}</option>);
          }
      }
      const handleChange2 = (event)=>{
        setEpisode(event.target.value)
      }
    
  return (


    <>
    <div id="info">
{data !== null ? (
    <>
    <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt={data.original_name}/>
    <div id="info2">
        <h1>{data.original_name}</h1>
        <span>{data.tagline}</span>
        <span>First air date : {data.first_air_date}</span>
        <div>Genres : {data.genres.map((element, index) => (
                <span className='genre' key={index}>{element.name}</span>
                    ))}
                    </div>
        <span id="overview">Overview : {data.overview}</span>
    </div>
    </>
) : (
    ''
)}
    </div>
    <div style={{marginBottom:'40px',padding:'10px',textAlign:'center',width:'100%',margin:'auto',marginTop:'20px'}}>
        <label style={{color:'white'}} for='season'>Season :  </label><select id="season" value={season}>{
    data.seasons.map((season,index)=>{
        <option onClick={handleChange1}>{index+1}</option>
    })
        }</select>
        <label style={{color:'white'}} for='episode'>Episode :  </label><select id="episode" value={episode}>{elements}</select>
    </div>
    <div style={{ backgroundColor:'rgb(20,20,20)',width:'350px',borderRadius:'10px',padding:'10px 0',margin:'auto',textAlign:'center',marginBottom:'20px',marginTop:"20px"}}>
        <span onClick={()=>{setSrc(`https://vidsrc.icu/embed/tv/`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold',marginRight:'20px'}}>VidSrc</span>
        <span onClick={()=>{setSrc(`https://vidsrc.pro/embed/tv/`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold',marginRight:'20px'}}>Vid.pro</span>
        <span onClick={()=>{setSrc(`https://vidsrc.in/embed/tv/`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold',marginRight:'20px'}}>Vid.in</span>
        <span onClick={()=>{setSrc(`https://multiembed.mov/?video_id=`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold'}}>SuberEmbed</span>
    </div>
    <div style={{textAlign:'center'}}>
    <iframe
            src={(src==='https://multiembed.mov/?video_id=')?`${src}${tvseriesid}&tmdb=1&s=${season}&e=${episode}`:`${src}${tvseriesid}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            height="550"
            title="Video Player"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
            style={{border:'none',outline:'none',width:'90%',marginBottom:'50px'}}
          ></iframe>
    </div>
    </>
  )
}

export default Watch
