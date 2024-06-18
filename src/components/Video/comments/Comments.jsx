import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";


const Comments = ({videoId})=>{

    const [comments, setComments] = useState([]);
    const [newcmnt , setnewcmnt] = useState("");
    const [trig, setTrig] = useState(false);

    const {userDetails}  = useSelector(state=>state.user);


    useEffect(()=>{
        const fetchComments = async()=>{
            await axios.get(`https://scholary-tube-server.vercel.app/api/comments/${videoId}`).then( (res)=>{
                setComments(res.data);
            })
        }

        fetchComments();
    },[videoId,trig]);

    const handleNewcmnt = (e)=>{
        setnewcmnt(e.target.value);
    }

    const handleCmnt = async()=>{
        if(userDetails === null){
            alert("Please Login to comment");
            return ;
        }
        if (newcmnt.trim().length === 0) return;
        await axios.post(`https://scholary-tube-server.vercel.app/api/comments/addComment/${videoId}`, {newcmnt}).then( (res)=>{
            setnewcmnt("");
            setTrig(!trig);        
        })
    }

    return(
        <>
            <div>
                <div className="flex flex-row mx-4 my-6 ">
                    <div className="w-20">
                        <img className="rounded-full" style={{height: "50px"}} src={userDetails!==null && userDetails.img? userDetails.img : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"} alt="" srcSet="" />
                    </div>
                    <div className="w-9/12 mt-2">
                        <input value={newcmnt} onChange={handleNewcmnt} className="bg-black border-b-2 border-b-white focus:outline-none w-full" type="text" placeholder="Add a comment..." />
                        <div onClick={handleCmnt} className={` text-black font-semibold w-28 h-8 rounded-3xl mt-2 px-4 text-center flex items-center ${newcmnt.trim().length === 0 ? "bg-gray-500 cursor-not-allowed": "bg-[#65B8FF]  cursor-pointer"}`}>Comment</div>
                    </div>
                </div>
                <div>
                {comments.map( (comment)=>{
                    return (<Comment key={comment._id} comment={comment}/>)
                })}
                </div>
            </div>
            
        </>
    )
}

export default Comments;
