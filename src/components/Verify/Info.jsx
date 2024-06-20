import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Apply from "../Apply/Apply";

const Info = ()=>{
    const currentUser = useSelector(state=>state.user.userDetails);
    const [apply, setApply] = useState(false);
    return (
    <>
    
<div id="detailed-pricing" className="mx-auto  w-9/12 items-center justify-center flex flex-col overflow-x-auto gap-8  mt-28">
    <div className="overflow-hidden min-w-max border border-[#4195fc] shadow-lg shadow-[#4195fc]">
        <div className="grid grid-cols-4 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 ">
            <div className="flex items-center">Features</div>
            <div>Guest Edition</div>
            <div>Student Edition</div>
            <div>Teacher Edition</div>
        </div>
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-white font-semibold">Video Streaming</div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
        </div>
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-white font-semibold">Interactive Features</div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
        </div>
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-white font-semibold">Video Upload</div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </div>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
        </div>

        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400"></div>

            <div>
                {currentUser ? (<span className="text-white block w-full cursor-default bg-gray-600  focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center ">Default</span>):
                (<span className="text-white block w-full cursor-default bg-green-600  focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center ">Currently Active</span>)}             
            </div>
            
            <div>
                {currentUser ? (currentUser.role !== "uploader" ? <span className="text-white block w-full cursor-default bg-green-600  focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center ">Currently Active</span>
                : <span className="text-white block w-full cursor-default bg-green-600  focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center ">Included in Teacher</span>)
            :<Link to="/signin"><span className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Apply Now</span></Link>}
                
            </div>
            <div>
            {currentUser ? (currentUser.role !== "uploader" ? <span  onClick={() => {setApply(true)}} className="text-white cursor-pointer block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Apply Now</span>
                : <span className="text-white block w-full cursor-default bg-green-600  focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center ">Currently Active</span>)
            :<span className="text-white cursor-not-allowed block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Apply Now</span>}
            </div>
        </div>
    </div>

    <Link to="/home"><div className="flex bg-red-500 text-white px-5 py-2 text-xl rounded-lg">Close</div></Link>
</div>

<div>
    { apply && <Apply setApply={setApply}/>}
</div>
</>

    )
}

export default Info;