import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card.jsx"

const Maincontent = ({type})=>{

    const [videos, setVideos] = useState([]);

    useEffect( ()=>{
        const fetchVideos = async()=>{
            await axios.get(`https://scholary-tube-server.vercel.app/api/videos/${type}`).then((res)=>{
            setVideos(res.data);
        })
        }

        fetchVideos();

    },[type])

    return (
        <div id="mainContent" className="flex sm:ml-44 h-full w-full bg-black flex-row flex-wrap mt-14">
            {videos.length ===0 ? (<h1 className="text-white font-semibold text-4xl m-auto">Nothing To Display</h1>):videos.map( (video)=>{
               return <Card key={video._id} video={video}/>
            })}
        </div>
    )
}

export default Maincontent;
