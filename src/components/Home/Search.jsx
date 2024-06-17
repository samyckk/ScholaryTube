import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";


const Search = () => {
    const query = useLocation().search;
    const [allVids, setAllVids] = useState([]);

    useEffect(() => {
        const getVids = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/videos/search${query}`);
                setAllVids(res.data);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        getVids();
    }, [query]); // Depend on `q` to refetch when the query changes

    return (
        <div className="mt-16 flex flex-row">
            <Sidebar />
            <div className="ml-44 flex flex-row flex-wrap">
            {allVids.length ===0 ? (<h1 className="text-white font-semibold text-4xl m-auto">Nothing To Display</h1>):allVids.map( (video)=>{
               return <Card key={video._id} video={video}/>
            })}
            </div>
        </div>
    );
};

export default Search;
