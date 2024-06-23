import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card.jsx"

const Maincontent = ({type})=>{

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        setLoading(true);
        const fetchVideos = async()=>{
            await axios.get(`https://scholary-tube-server.vercel.app/api/videos/${type}`).then((res)=>{
            setLoading(false);
            setVideos(res.data);
        })
        }

        fetchVideos();

    },[type])

    return (
        <div id="mainContent" className="flex sm:ml-44 items-center justify-center h-full w-full bg-black flex-row flex-wrap mt-14">
            {loading ? (<img className="mt-14" src="https://i.pinimg.com/originals/4f/43/2d/4f432d9234988a5f33b26e0ba06bc6fe.gif" alt="" />):videos.map( (video)=>{
               return <Card key={video._id} video={video}/>
            })}
        </div>
    )
}

export default Maincontent;
