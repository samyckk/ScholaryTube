import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Uploader from "../Upload/Uploader";
import { changeMenu } from "../redux/menuSlice";


const Navbar = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.user.userDetails);
    const [uploader, setUploader] = useState(false);
    const [q, setQuery] = useState("");
    // const [menu, setMenu] = useState(false);

    const { menu } = useSelector(state => state.menu);

    const handleMenu = ()=>{
        dispatch(changeMenu());
    }

    const handleSearch = ()=>{
        setQuery(q);
        navigate(`/search?q=${q}`);
        console.log(currentUser.img);
    }

    const handleUploader = ()=>{
        if(uploader=== false){
            setUploader(true);
        }
    }

    return (
        <>
        <div id="main" className="flex h-14 bg-[#212121] justify-between fixed top-0 w-full z-50">
       
            <div id="left" className="flex justify-center h-full">
                <div onClick={handleMenu} className="flex sm:hidden justify-center items-center cursor-pointer" >
                    <img style={{height: "30px"}} src="https://img.icons8.com/?size=100&id=36389&format=png&color=FFFFFF" alt="" />
                </div>
                <Link to="/home">
               
                    <div id="youtube_icon" className="flex items-center">
                        <img style={{height: "56px"}} src={`${process.env.PUBLIC_URL}/Dlogo.png`} alt="yt_icon" srcSet="" />
                        <p className="text-white m-auto font-semibold text-base sm:text-2xl">ScholarlyTube</p>
                    </div>
                </Link>
            </div>

            <div id="mid" className="flex w-1/4 sm:w-1/2 h-full items-center">
                <input 
                    onChange={(e)=>{setQuery(e.target.value)}}
                    type="text" 
                    name="search" 
                    placeholder="Search" 
                    className="bg-[#121212] w-3/4 h-4/6 p-3 focus:outline-none text-white " 
                    style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem'}}
                />
                <div className="w-12 h-9 bg-[#303030] flex items-center" style={{borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem'}}>
                    <img onClick={handleSearch} className="cursor-pointer" style={{width: "20px", margin: "auto"}} src="https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF" alt="" srcSet="" />
                </div>
            </div>
            <div id="right" className="flex h-full items-center">
                {
                   currentUser &&  currentUser.admin && 
                   ( 
                    <Link to="/verifyUploaders">
                        <div className="hidden sm:flex text-white bg-yellow-500 mr-6 rounded-lg p-1 px-2 cursor-pointer">
                            <span>Verify Uploaders</span>
                        </div>
                    </Link>)
                }
                
                {currentUser ? (<div className="flex flex-row">
                    {currentUser.role === "uploader" &&
                    (<img className="cursor-pointer" onClick={handleUploader} style={{height: "30px", marginRight: "15px", marginTop: "4px"}} src="https://img.icons8.com/?size=100&id=11374&format=png&color=FFFFFF" alt="" />)
                    }
                    <div className="flex flex-row">
                        <img style={{height: "40px"}} className="rounded-full ml-4 " src={currentUser.img ? currentUser.img : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"} alt="" />
                        <span className="hidden sm:flex text-white mx-2 mr-4 mt-2">{currentUser.name[0].toUpperCase() + currentUser.name.slice(1)}</span>
                    </div>

                    {/* {
                        openDrop && (
                            <div className="relative top-6 right-9">
                                <h1 className="text-white my-28"> Sup!!</h1>
                            </div>
                            
                        )
                    } */}
                    
                </div>) : (<Link to="signin" className="flex h-3/4 items-center px-4 border border-solid border-blue-500 rounded-md mr-2">
                <div className="flex h-3/4 items-center ">
                    <p className="text-white ">Sign In</p>
                </div>
                </Link>)}
            </div>
        </div>

        <div>
            { uploader && <Uploader setUploader={setUploader}/>}
        </div>
        </>
    )
}

export default Navbar;
