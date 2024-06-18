import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";


const Comment = ({comment})=>{

    const [commenter, setCommenter] = useState({});

    useEffect(()=>{
        const getCommer = async()=>{
            await axios.get(`https://scholary-tube-server.vercel.app/api/users/find/${comment.userId}`).then( (res)=>{
                setCommenter(res.data);
            })
        }

        getCommer();
    },[comment.userId]);

    return(
        <>
        <div className="flex flex-row mt-4">
            <div id="profile" className="w-14">
                <img className="rounded-full" style={{height: "40px"}} src={commenter.img? commenter.img : `https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg`} alt="" srcSet="" />
            </div>
            <div id="content" className="flex flex-col">
                <span className="text-white">{commenter.name} <span className="text-gray-500 mx-1 text-xs">{format(comment.createdAt)} </span></span>
                <span>{comment.desc}</span>
                
            </div>
        </div>
        </>
    )
}


export default Comment;
