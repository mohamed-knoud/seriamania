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
    const [elements, setElements] = useState([]);
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
            setNumberOfEpisodes(result.seasons[0].episode_count)
              if(result.seasons[0].season_number===1)
                  setSeason(0)
              else{
                  setSeason(1)
              }
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
        const selectedSeason = event.target.value;
          setSeason(selectedSeason);
          setNumberOfEpisodes(data.seasons[selectedSeason].episode_count);
        console.log(data.seasons[season].episode_count)
        console.log(season)
      }
    useEffect(() => {
    if (data && season !== "") {
      setNumberOfEpisodes(data.seasons[season].episode_count);
      const episodes = [];
          for (let i = 0; i < data.seasons[season].episode_count; i++) {
                episodes.push(<option key={i}>{i + 1}</option>);
              }
    console.log(elements)
              setElements(episodes);

    }
  }, [data, season]);
      const handleChange2 = (event)=>{
        setEpisode(event.target.value)
      }
    
  return (


    <>
    <div id="info">
{data !== null ? (
    <>
    <p id="centered"><img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt={data.original_name}/></p>
    <div id="info2">
        <h1 style={{fontWeight: '900'}}>{data.original_name}</h1>
        <span style={{fontStyle:'italic',fontWeight: '900'}}>{data.tagline}</span>
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
        <label style={{color:'white'}} for='season'>Season :  </label><select id="season" value={season} onChange={handleChange1}>
            {data !== null && data.seasons.map((season, index) => (
                season.season_number !== 0 ? (
                    <option key={index} value={index}>{(data.seasons[0].season_number===1)?index+1:index}</option>
                ) : null
            ))}
      </select>
        <label style={{color:'white',marginLeft:'5px'}} for='episode'>Episode :  </label><select id="episode" onChange={handleChange2} value={episode}>{elements}</select>
    </div>
    <div id="servers" style={{ backgroundColor:'rgb(20,20,20)',width:'370px',borderRadius:'10px',padding:'10px 0',margin:'auto',textAlign:'center',marginBottom:'20px',marginTop:"20px"}}>
        <span onClick={()=>{setSrc(`https://vidsrc.icu/embed/tv/`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold',marginRight:'20px'}}>VidSrc</span>
        <span onClick={()=>{setSrc(`https://vidsrc.pro/embed/tv/`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold',marginRight:'20px'}}>Vid.pro</span>
        <span onClick={()=>{setSrc(`https://vidsrc.in/embed/tv/`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold',marginRight:'20px'}}>Vid.in</span>
        <span onClick={()=>{setSrc(`https://multiembed.mov/?video_id=`)}} style={{cursor:'pointer',color:'rgb(120,120,120)',fontWeight:'bold'}}>SuberEmbed</span>
    </div>
    <div style={{textAlign:'center'}}>
    <iframe
src={(src==='https://multiembed.mov/?video_id=')?`${src}${tvseriesid}&tmdb=1&s=${data!==null && data.seasons[0].season_number===1?parseInt(season)+1:season}&e=${episode}`:`${src}${tvseriesid}/${data!==null && data.seasons[0].season_number===1?parseInt(season)+1:season}/${episode}`}
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
