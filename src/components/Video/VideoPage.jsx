import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchVideo } from "../redux/videoSlice";
import { format } from "timeago.js";
import axios from "axios";
import { dislikeRedux, likeRedux, subscription } from "../redux/userSlice";
import Comments from "./comments/Comments";
import Suggestion from "./suggestions/Suggestion";

axios.defaults.withCredentials = true;

const VideoPage = () => {
    const dispatch = useDispatch();
    const videoId = useParams().id;
    const navigate = useNavigate();

    const [channel, setChannel] = useState({});
    const { userDetails } = useSelector(state => state.user);
    const { videoDetails } = useSelector(state => state.video);

    useEffect(() => {
        const fetchdata = async () => {
            await axios.put(`https://scholary-tube-server.vercel.app/api/videos/addView/${videoId}`).then(() => {
                console.log("Added view");
            });

            // Get video details
            await axios.get(`https://scholary-tube-server.vercel.app/api/videos/fetch/${videoId}`).then((res) => {
                dispatch(fetchVideo(res.data));
            });
        };

        fetchdata();
    }, [dispatch, videoId]);

    useEffect(() => {
        if (videoDetails?.userId) {
            const getChannel = async () => {
                await axios.get(`https://scholary-tube-server.vercel.app/api/users/find/${videoDetails.userId}`).then((res) => {
                    setChannel(res.data);
                });
            };
            getChannel();
        }
    }, [videoDetails]);

    const handleLike = async () => {
        if (userDetails === null) {
            alert('You have to login to Like or Dislike Videos');
            return;
        }
        if (!userDetails.likedVids?.includes(videoDetails._id)) {
            await axios.put(`https://scholary-tube-server.vercel.app/api/videos/like/${videoDetails._id}`).then(() => {
                console.log("Video Liked successfully");
                dispatch(likeRedux(videoDetails._id));
            });
        }
    };

    const handleDislike = async () => {
        if (userDetails === null) {
            alert('You have to login to Like or Dislike Videos');
            return;
        }
        if (!userDetails.dislikedVids?.includes(videoDetails._id)) {
            await axios.put(`https://scholary-tube-server.vercel.app/api/videos/dislike/${videoDetails._id}`).then(() => {
                console.log("Video disLiked successfully");
                dispatch(dislikeRedux(videoDetails._id));
            });
        }
    };

    const handleDelete = async () => {
        if (userDetails === null) {
            alert('You have to login to Delete Your Videos');
            return;
        }
        if (channel._id === userDetails._id) {
            await axios.delete(`https://scholary-tube-server.vercel.app/api/videos/${videoDetails._id}`).then(() => {
                console.log("Deleted Successfully!");
                navigate("/home");
            });
        } else {
            alert("You can delete only your Videos");
        }
    };

    const handleSub = async () => {
        if (userDetails === null) {
            alert('You have to login to Subscribe Channels');
            return;
        }
        userDetails.subscribedUsers.includes(channel._id)
            ? await axios.put(`https://scholary-tube-server.vercel.app/api/users/unsub/${channel._id}`)
            : await axios.put(`https://scholary-tube-server.vercel.app/api/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
    };

    if (!videoDetails) {
        return <h1>Loading...</h1>;
    }

    // <div id="mainvid" className="h-[250px] sm:h-[560px]">
    //                 <video controls style={{ height: "250px", width: "950px" }} className="rounded-2xl z-[-1]" src={videoDetails.videoUrl} alt="" />

    return (
        <div id="main" className="flex flex-row justify-between w-full mt-14">
            <div id="videoSide" className="w-full sm:w-[63%] text-white m-6 mr-5">
                <div id="mainvid" className="h-[220px] sm:h-[450px]">
                    <video controls style={{ height: "100%", width: "950px" }} className="rounded-2xl z-[-1]" src={videoDetails.videoUrl} alt="" />
                </div>
                <div id="detail">
                    <div>
                        <h1 id="title" className="font-semibold text-2xl px-2 break-all"> {videoDetails.title} </h1>
                    </div>
                    <div id="Views_bar" className="flex flex-row justify-between">
                        <div id="left">
                            <span className="text-gray-400 mx-2">{videoDetails.views} views</span>
                            <span className="text-gray-400">• {format(videoDetails.createdAt)}</span>
                        </div>
                        <div id="right" className="flex flex-row">
                            {userDetails !== null && channel._id === userDetails._id ? <img id="deleteIcon" onClick={handleDelete} className="cursor-pointer mx-4" style={{ height: "30px" }} src="https://img.icons8.com/?size=100&id=67884&format=png&color=FA5252" alt="" /> : ""}
                            <img id="likeIcon" className="cursor-pointer" onClick={handleLike} style={{ height: "30px" }} src={userDetails !== null && userDetails.likedVids?.includes(videoDetails._id) ? "https://img.icons8.com/?size=100&id=2E76pMxsh8Dc&format=png&color=FFFFFF" : "https://img.icons8.com/?size=100&id=SVZUo0RhRuHJ&format=png&color=FFFFFF"} alt="" />
                            <span className="text-white pt-1 pl-1 mr-6">{videoDetails.likes}</span>
                            <img id="dislikeIcon" className="cursor-pointer" onClick={handleDislike} style={{ height: "30px" }} src={userDetails !== null && userDetails.dislikedVids?.includes(videoDetails._id) ? "https://img.icons8.com/?size=100&id=IQC3obUf4TWM&format=png&color=FFFFFF" : "https://img.icons8.com/?size=100&id=NZQelJByff0r&format=png&color=FFFFFF"} alt="" />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-row justify-between">
                        <div id="left2">
                            <div id="channel" className="flex flex-row">
                                <div id="profile">
                                    <img style={{ height: "40px" }} className="rounded-full" src={channel.img || "https://m.media-amazon.com/images/I/41jLBhDISxL.jpg"} alt="" />
                                </div>
                                <div id="channelinfo" className="flex flex-col">
                                    <span className="text-white mx-4">{channel.name}</span>
                                    <span className="text-gray-400 mx-4 text-sm">{channel.subscribers} subscribers</span>
                                </div>
                            </div>
                        </div>
                        <div id="right2">
                            <div id="bt" onClick={handleSub} className="bg-red-700 text-white h-10 px-3 flex items-center rounded-lg cursor-pointer">{userDetails !== null && userDetails.subscribedUsers?.includes(channel._id) ? "Subscribed" : "Subscribe"}</div>
                        </div>
                    </div>
                    <div id="desc" className="ml-12 px-2 mt-2">
                        <span className="text-white">{videoDetails.desc}</span>
                    </div>
                </div>
                <hr className="my-4" />
                <div id="comments">
                    <h1 className="text-white text-lg">Comments</h1>
                    <Comments videoId={videoId} />
                </div>
            </div>
            <div id="Suggestions" className="sm:w-2/6 text-white">
                <Suggestion tags={videoDetails.tags} />
            </div>
        </div>
    );
};

export default VideoPage;
