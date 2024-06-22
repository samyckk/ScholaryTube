import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Uploader = ({ setUploader }) => {
    const [thumbnail, setThumbnail] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState([]);
    const [vidprogress, setvidProgress] = useState(0);
    const [thumbprogress, setThumbProgress] = useState(0);
    const [isthumb, setIsthumb] = useState(true);
    const [isvid, setIsvid] = useState(false);
    const [sucess, setSucess] = useState(false);
    const [videoUrl, setvideoUrl] = useState("");
    const [imgUrl, setimgUrl] = useState("");
    
    const navigate = useNavigate();

    useEffect(()=>{

        const send = async()=>{
           await axios.post(`https://scholary-tube-server.vercel.app/api/videos/addVid`, {title, desc, tags,videoUrl, imgUrl}).then( (res)=>{
                console.log(res.data);
                navigate(`/video/${res.data._id}`)
           });
        }

        if(isthumb === true && isvid === true){
            setSucess(true);

            send();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[desc, imgUrl, isthumb, isvid, tags, title, videoUrl]);

    const handleUpload = () => {
        if (!video || !title) {
            alert("Video and title are required");
            return;
        }

        const storage = getStorage();
        const videoRef = ref(storage, `videos/${video.name}`);
        const uploadTask = uploadBytesResumable(videoRef, video);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setvidProgress(prog);
                console.log("Upload is " + prog + "% done");
            },
            (error) => {
                console.error("Upload failed", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setvideoUrl(downloadURL);
                    setIsvid(true);
                    console.log("File available at", downloadURL);
                    // Handle the download URL (e.g., save it to your database)
                });
            }
        );

        if (thumbnail) {
            setIsthumb(false);
            const thumbnailRef = ref(storage, `thumbnails/${thumbnail.name}`);
            const uploadThumbnailTask = uploadBytesResumable(thumbnailRef, thumbnail);

            uploadThumbnailTask.on(
                "state_changed",
                (snapshot) => {
                    const progthum = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setThumbProgress(progthum);
                    console.log("Thumbnail upload is " + progthum + "% done");
                },
                (error) => {
                    console.error("Thumbnail upload failed", error);
                },
                () => {
                    getDownloadURL(uploadThumbnailTask.snapshot.ref).then((downloadURL) => {
                        setimgUrl(downloadURL);
                        setIsthumb(true);
                        console.log("Thumbnail available at", downloadURL);
                        // Handle the thumbnail download URL
                    });
                }
            );
        }
    };

    return (
        <div className="fixed inset-0 trans bg-black/[.8] z-50 flex justify-center items-center">
            <div className="w-11/12 sm:w-2/4 h-[90%] bg-[#212121]">
                <div id="title" className="m-4 flex flex-row justify-between">
                    <span className="text-white font-bold text-4xl">Upload Your Video</span>
                    <img onClick={() => { setUploader(false) }} className="cursor-pointer" style={{ height: "30px" }} src="https://img.icons8.com/?size=100&id=71200&format=png&color=FFFFFF" alt="" />
                </div>
                <div className="flex flex-col ml-4">
                    <h1 className="text-white text-lg mx-2 mt-2">Video:  {vidprogress > 0? `${vidprogress.toFixed(2)}%` : "" } </h1>
                    <input onChange={(e) => { setVideo(e.target.files[0]) }} className="w-11/12 border-[1px] p-2 m-2 border-gray-400 text-white" type="file" accept="video/*" />

                    <h1 className="text-white text-lg mx-2 mt-2">Title:<span className="text-gray-500 text-xs px-2">(required)</span> </h1>
                    <input className="w-11/12 border-[1px] p-2 m-2 border-gray-400 text-white bg-[#121212]" type="text" placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />

                    <h1 className="text-white text-lg mx-2 mt-2">Tags:</h1>
                    <input onChange={(e) => { setTags(e.target.value.split(",")) }} className="w-11/12 border-[1px] p-2 m-2 border-gray-400 text-white bg-[#121212]" type="text" placeholder="Place commas(,) to seperate your tags Eg: shopping,news,sports,music etc." />

                    <h1 className="text-white text-lg mx-2 mt-2">Description:</h1>
                    <textarea className="w-11/12 border-[1px] p-2 m-2 border-gray-400 text-white bg-[#121212]" placeholder="Description" onChange={(e) => { setDesc(e.target.value) }} rows={4} />

                    <h1 className="text-white text-lg mx-2 mt-2">Thumbnail: {thumbprogress>0? `${thumbprogress.toFixed(2)}%` : ""} </h1>
                    <input onChange={(e) => { setThumbnail(e.target.files[0]) }} className="w-11/12 border-[1px] p-2 m-2 border-gray-400 text-white" type="file" accept="image/*" />

                    <div className="w-full flex items-center justify-center ">
                        <h1 onClick={handleUpload} className="text-[#121212] bg-[#65B8FF] w-32 cursor-pointer text-center text-lg p-2 rounded-2xl font-semibold"> Upload</h1>
                    </div>
                </div>
            </div>
            {
              sucess && <div className="flex absolute top-0 left-0 w-full h-full items-center">
                <div className="w-[450px] h-[100px] bg-black/[.8] m-auto flex flex-col items-end">
                <img onClick={() => { setSucess(false); setUploader(false) }} className="cursor-pointer items-end" style={{ height: "20px" }} src="https://img.icons8.com/?size=100&id=71200&format=png&color=FFFFFF" alt="" />
                    <h1 className="text-green-300 text-3xl mt-2 mx-auto">Video Uploaded Successfully !</h1>
                </div>
              
              </div>
            }
        </div>
    );
};

export default Uploader;
