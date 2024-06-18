import axios from 'axios';
import { roleRedux } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const Apply = ({setApply})=>{

    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.user.userDetails);

    const closeApply = ()=>{
        setApply(false);
    }

    const handleApply = async()=>{
        await axios.put('https://scholary-tube.vercel.app/api/users/applyEdu').then((res)=>{
            console.log(res.data);
            dispatch(roleRedux("requested"));
            setApply(false);
        })
    }

    return(
        
            currentUser.role === "requested" ? (
                <div className="fixed inset-0 trans bg-black/[.8] z-50 flex justify-center items-center">
                <div className="w-2/4 h-[100px] bg-[#666666]/[.8] m-auto flex flex-col items-end">
                <img onClick={() => { setApply(false)}} className="cursor-pointer items-end" style={{ height: "20px" }} src="https://img.icons8.com/?size=100&id=71200&format=png&color=FFFFFF" alt="" />
                    <h1 className="text-white text-3xl mt-2 mx-auto">Your Request is under Process</h1>
                </div>
            </div>)
            :
            (<div className="fixed inset-0 trans bg-black/[.8] z-50 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center w-2/4 h-[30%] bg-[#212121] gap-10">
                    <h1 className="text-white text-3xl">Do you wnt to apply for Educator?</h1>
                    <div id="botons" className=" flex flex-row w-full items-center justify-center gap-8">
                        <div id="applyBtn" onClick={handleApply} className=" bg-green-500 rounded-lg px-5 py-1 cursor-pointer hover:bg-green-700">
                            <span>Apply</span>
                        </div>
                        <div id="cancelBtn" onClick={closeApply} className=" bg-red-500 rounded-lg px-5 py-1 cursor-pointer hover:bg-red-700">
                            <span>Cancel</span>
                        </div>
                    </div>
                </div>
            </div>)
        
        
    )
}

export default Apply;
