import { useEffect, useRef, useState } from "react"
import { StarComponent } from "./StarComponent/App.js";

export function UsePopcorn()
{
    const [query,setquery]=useState("");//for Taking user query
    const [movies,setmovies]=useState([]);//used to display query selected movies
    const [watchedId,setwatchedId]=useState(null);//selected movie id
    const [movieslisthide,setmovieslisthide]=useState(true);//query selected movies hide 
    const [watchedlisthide,setwatchedlisthide]=useState(true);//selected movies hide
    const [response,setresponse]=useState(false);//checking the response
    const [error,seterror]=useState(null);//error value in case of fetech error
    const [addlistmovie,setaddlistmovie]=useState(true)//adding movies to watched list
    function QueryChange(e)
    {
        console.log(e.target.value);
        setquery(e.target.value);
    }
    function HandlingMovieSelection(id)
    {
       
        setwatchedId(id);
        setaddlistmovie(!addlistmovie);

    }
    function HandlingHide(){
       
        setmovieslisthide((movieslisthide)=>!movieslisthide)
    }
    function HandlingWatchedHide()
    {
        setwatchedlisthide((watchedlisthide)=>!watchedlisthide);
    }
    function HandlingAddMovie()
    {
        setaddlistmovie(!addlistmovie);
    }

    useEffect(function (){
        const controller=new AbortController();
        if (query.trim() === "") {
            setmovies([]);  // Clear movies list if query is empty
            seterror(null); 
            setresponse(true);
            return;
        }

        async function GettingFetchedData()
        {
            setresponse(false);
            try{
                const response=await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=65ca496e&s=${query}`,{signal:controller.signal});
                
                if(!response.ok)
                {
                    throw new Error("Failed To Fetch");
                }
                
                const data=await response.json();
                if(data.Response!== "True")
                {
                    throw new Error("No Movie Found");
                }
             
                setresponse(true);
                seterror(null); 
               
                setmovies(data.Search || []); 
            }
            catch(error)
            {
                if(error.name!=="AbortError")
                {
                    seterror(error.message);
                    setmovies([]);
                }

                
            }
            finally{
                setresponse(true);

            }

            
        }
        GettingFetchedData();
        return function (){
            controller.abort();
        }

    },[query])
    return (
        <div className="outerborder">
            <div className="navbar">
                <Navbar query={QueryChange} movies={movies} setquery={setquery}/>
            </div>
            <div className="maincontent">
                <Box1 movies={movies} onclick={HandlingMovieSelection} movieshide={movieslisthide} onhide={HandlingHide} response={response} error={error}/>
                <Box2 watchedId={watchedId} onwatchhide={HandlingWatchedHide} watchhide={watchedlisthide} addmovie={addlistmovie} onaddmovie={HandlingAddMovie}/>
            </div>
        </div>
    )
}
function Navbar({query,movies,setquery}){
    const inputel=useRef(null);
    useEffect(function(){
        console.log("hello")
        function onclick(e)
        {
            if(e.code==="Enter")
            {
                inputel.current.focus();

            }
            
           

        }
        console.log(inputel.current)
        
        document.addEventListener("keydown",onclick)

        return function(){
            document.addEventListener("keydown",onclick)


        }

    },[])

    
    return (
        <ul>
            <li>
                <span>🍿 UsePopcorn</span>
            </li>
            <li>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <input  type="text" placeholder=" Search For a Movie" spellCheck="false" ref={inputel} style={{height:"40px" ,minWidth:"350px",backgroundColor:"white",color:"black",fontSize:"18px",textAlign:"center" }} onChange={(e)=>query(e)}></input>
                </form>
            </li>
            <li>Found {movies.length} Results</li>
        </ul>
    )
}
function Box1({movies,onclick,movieshide,onhide,response,error}){
  return (
    <>
    
    <ul className="box1" >
        
        <div style={{display:"flex",justifyContent:"space-between",border:"none"}} key="i">
            <p ></p>

          <button style={{textAlign:"center",marginRight:"10px",width:"50px"}} onClick={()=>onhide()}>{movieshide ? "➖":" ➕"}</button>

        </div>

        {response ? "" : <p style={{ textAlign: "center" }}>LOADING.....</p>}
        {error ?  <p style={{ textAlign: "center", color: "red" }}>{error}</p>:""}

        {
            response ? (
                movieshide ? (
                    movies.map((movie)=>(
                        <li className="box" key={movie.imdbID} onClick={()=>onclick(movie.imdbID)}>
                        <div className="imagebox" >
                         <img src={movie.Poster} alt="" ></img>
                            
                        </div>
                        <div className="moviedetails">
                            <p style={{fontWeight:"bold"}}> {movie.Title}</p>
                            <p>📅 {movie.Year}</p>
             
                        </div>
                     </li>
        
                    ))): null
            ): null
        }
    </ul>
    </>
  )
}
function Box2({watchedId,watchhide,onwatchhide,addmovie,onaddmovie})
{
   
    const [selectedmovie,setselectedmovie]=useState({});
    const [ratedvalue,setratedvalue]=useState(0);
    const Decisions=useRef(0);

    useEffect(function(){
        if(ratedvalue!==0) 
        {
            Decisions.current=Decisions.current+1;
            console.log(Decisions.current);
        }

    },[ratedvalue])
    const [newmovies, setnewmovies] = useState(() => {
        const storedData = localStorage.getItem('movies');
        return storedData ? JSON.parse(storedData) : [];
    });
    
    function HandlingSelectedMovie()
    {
        setselectedmovie({});
        // document.title="usePopcorn";

    }
    function handleDeleteMovie(id) {
        const updatedMovies = newmovies.filter((movie) => movie.imdbID !== id);
        setnewmovies(updatedMovies);
      }
   
    
  
    function HandlingAddList(newmovie)
    {  console.log(newmovie);
      setnewmovies((newmovies)=>[...newmovies,newmovie]);
     
      onaddmovie();
      setselectedmovie({});
     

    }
   
    
    
    useEffect(function(){
        async function FindingMovie()
        {
            const response = await fetch(`http://www.omdbapi.com/?i=${watchedId}&apikey=65ca496e`);
            const data=await response.json();
          
            setselectedmovie(data);
           
        }
        FindingMovie();
    


    },[watchedId])


    useEffect(function (){
       
        if(!selectedmovie.Title) return;
        document.title=`Movie|${selectedmovie.Title}`

        return function(){
            document.title="usePopcorn";
            
        }

    },[selectedmovie.Title])

    useEffect(function(){
        document.addEventListener('keydown',(e)=>{
            if(e.code==='Escape')
            {
                console.log(watchedId)
            }
        
        })

    },[watchedId])

    useEffect(function(){
        localStorage.setItem('movies',JSON.stringify(newmovies));

    },[newmovies])

   

    return (
        <ul className="box2" >
            {/* <div style={{display:"flex",justifyContent:"space-between",border:"none"}}>
                <button style={{width:"50px"}} onClick={()=>HandlingSelectedMovie()}>🔙 </button>

                <button style={{textAlign:"center",marginRight:"10px",width:"50px"}} onClick={()=>onwatchhide()}>{watchhide ? "➖":" ➕"}</button>

            </div> */}
            <div style={{ display: "flex", justifyContent: "space-between", border: "none" }}>
                {selectedmovie.Title && (<button style={{ width: "50px" }} onClick={HandlingSelectedMovie}>🔙</button>)}
                <button style={{ textAlign: "center", marginRight: "10px", width: "50px" }} onClick={onwatchhide}>{watchhide ? "➖" : "➕"}</button>
            </div>
            {
                addmovie && watchhide && (
                    <div style={{display:"flex",flexDirection:"column",border:"1px solid black",backgroundColor:"#343a40",padding:"10px",color:"white",gap:"10px"}}>
                    {
                        newmovies.map((movie)=>(
                            <div key={movie.imdbID} style={{display:"flex",border:"none",backgroundColor:"#343a40"}}>
                            <img src={movie.Poster} alt="" style={{width:"80px",height:"80px"}}></img>
                            <div style={{width:"300px" ,textAlign:"start",paddingTop:"10px",paddingLeft:"10px",border:"none"}}>
                                <h3>{movie.Title}</h3>
                                <p className="para">⭐ {Number(movie.imdbRating)}</p>  
                                <p className="para">🌟 {Number(ratedvalue)}</p>
                                <p className="para">⌛ {movie.Runtime}</p>
                              
                            </div>
                            <button
                                     style={{ marginLeft: "auto", padding: "5px 10px", backgroundColor: "red", color: "white", borderRadius: "4px", border: "none",height:"50px",marginTop:"18px" }}
                                     onClick={() => handleDeleteMovie(movie.imdbID)}>🗑️
                            </button>
                            
                        </div>
                        ))
                    }
                   
                  </div>
                )
            }
        
        
        
        
        {
            (watchhide && selectedmovie.Title && (
                
                     <li className="selectedmovie">
                      <div style={{display:'flex',gap:"10px",border:"none"}}>
                        <div style={{width:"130px",height:"180px",border:"none"}}>
                            <img src={selectedmovie.Poster} alt="" style={{width:"130px",height:"180px"}}></img>
                        </div>
                        <div style={{border:"none" ,width:"250px",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"space-evenly",color:"white"}}>
                            <div style={{fontSize:"22px",fontWeight:"bold",border:"none"}}>{selectedmovie.Title}</div>
                            <div style={{lineHeight:"30px",border:"none"}}>
                                <p>{selectedmovie.Released}   <span>⌛ {selectedmovie.Runtime}</span></p>
                                <p>{selectedmovie.Director} {selectedmovie.Genre}</p>
                                <p>⭐{selectedmovie.imdbRating} IMBD</p>
                            </div>
    
                        </div>
                        
                    </div>
                    <div style={{textAlign:"center",marginTop:"40px",border:"none",}}>
                        <div style={{border:"none"}}>
                            
                                <StarComponent maxlength={10} onset={setratedvalue} />
                            
                        </div>
                        <div style={{border:"none"}}>
                            <button style={{width:"100px",height:"40px",marginBottom:"10px"}} onClick={()=>HandlingAddList(selectedmovie)}> Add List</button>
                        </div>
    
                    </div>
                    <div style={{margin:"10px",textAlign:"justify",lineHeight:"20px",fontSize:"18px",fontStyle:"italic",border:"none",color:"white"}}>
                        <p> {selectedmovie.Plot}</p>
                    </div>
    
                </li>))
        }
            
         
            

    
    
        </ul>
      )
}
/**
 * each keypress has a code 
 * and each error name and message property
 * 
 * hooks in react is a special function that you allows hook in to react state and and life cycle of the componenet 
 * hookks start with use keyword
 * hooks does the component more flexible and resulable type
 * useState
 * useEffetct 
 * use Ref
 * usememo
 * useCallback
 * usecontext
 * useReducer
 * 
 * browser Api AbortController() which is used the previous fetch request after new fetching request is arrived
 * deleting fetch request throws an error
 * we know that each error has name property like e.name==="AbortError"
 * 
 * Rules of Hooks 
 * hooks are always at the top level not any conditional expression
 * beacuse inside react it all the states and effetcs are liki=ed to each other like linkedlist
 * 
 * state update is asynchrous any slo
 * use call back
 * 
 * 
 * local strorage 
 * is astrorage where the data is stored in the local storage and that data is visible only on that local host
 * 
 */