import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {format} from "timeago.js";

const Card = ({ video }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`http://localhost:8080/api/users/find/${video.userId}`);
      setUser(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <>
    <Link to={`/video/${video._id}`} className="no-underline m-4">
      <div
        className=
           "w-96 mb-11 cursor-pointer gap-2.5 m-2 h-[300px]"
      >
        <img 
          style={{  height: "220px", borderRadius: "15px"}}
          className={`w-full "h-50.5" bg-gray-600 flex-1`}
          src={video.imgUrl !== '' ? video.imgUrl :`https://i.ytimg.com/vi/BH4IMzxBg14/maxresdefault.jpg`}
          alt={video.title}
        />
        <div className={`flex mt-4 gap-3 flex-1`}>
          <img
            className={`w-9 h-9 rounded-full bg-gray-600 `}
            src={user.img ?  user.img : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"}
            alt={user.name}
          />
          <div>
            <h1 className="text-lg font-medium text-white break-words">{video.title.length > 60 ? video.title.substring(0, 65) + "..." :  video.title}</h1>
            <h2 className="text-base text-gray-500 my-2">{user.name}</h2>
            <div className="text-base text-gray-500">
              {video.views} views • {format(video.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
};

export default Card;
