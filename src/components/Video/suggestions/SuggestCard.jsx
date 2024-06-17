import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const SuggestCard = ({ vid }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`http://localhost:8080/api/users/find/${vid.userId}`);
      setUser(res.data);
    };
    fetchChannel();
  }, [vid.userId]);

  return (
    <Link to={`/video/${vid._id}`}>
      <div className="w-full mb-2 flex flex-row cursor-pointer h-[110px] my-4 justify-between ">
        <div className="w-[200px] ">
          <img
            style={{ width: "200px", height: "100%", borderRadius: "5px" }}
            className={`bg-gray-600`}
            src={vid.imgUrl !== '' ? vid.imgUrl : `https://i.ytimg.com/vi/BH4IMzxBg14/maxresdefault.jpg`}
            alt={vid.title}
          />
        </div>

        <div className="flex w-[58%] flex-col mt-0 gap-3 ml-3 ">
          <div id="card-content" className="flex flex-col content-between">
            <h1 className="text-base font-medium text-white m-0 p-0 break-words">{vid.title.length > 60 ? vid.title.substring(0, 65) + "..." :  vid.title}</h1>
            <h2 className="text-base text-gray-500 m-0 p-0">{user.name}</h2>
            <div className="text-base text-gray-500 m-0 p-0">
              {vid.views} views • {format(vid.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SuggestCard;
