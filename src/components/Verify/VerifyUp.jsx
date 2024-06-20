import axios from "axios";
import { useEffect, useState } from "react";
import { roleRedux } from "../redux/userSlice";
import { useSelector,useDispatch } from "react-redux";

const VerifyUp = () => {
    const [list, setList] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.user.userDetails);

    useEffect(() => {
        const fetch = async () => {
            await axios.get('https://scholary-tube-server.vercel.app/api/users/req').then((res) => {
                console.log(res.data);
                setList(res.data);
            });
        };

        fetch();
    }, [trigger]);

    const acceptUploader = async (applier) => {
        await axios.put(`https://scholary-tube-server.vercel.app/api/users/updateAcceptReq/${applier._id}`).then( (res) =>{
            if(applier._id === currentUser._id){
                dispatch(roleRedux("uploader"));
            }
            setTrigger(!trigger);
            
        })
    };

    const declineUploader = async (applier)=>{
        await axios.put(`https://scholary-tube-server.vercel.app/api/users/updateRejectReq/${applier._id}`).then( (res) =>{
            if(applier._id === currentUser._id){
                dispatch(roleRedux("student"));
            }
            setTrigger(!trigger);
        })
    }

    return (

        list.length > 0 ? (currentUser.admin ? (<div className="mt-14 flex flex-col gap-10 justify-center items-center">
            <h1 className="text-white text-5xl">Verify The Uploaders</h1>

            <div className="w-[50%] overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((applier) => (
                            <tr key={applier._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {applier.name}
                                </th>
                                <td className="px-6 py-4">{applier.email}</td>
                                <td className="px-6 py-4">{applier.role}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex flex-row justify-around items-center">
                                        <div id="allow">
                                            <img onClick={() => acceptUploader(applier)} className="cursor-pointer" style={{ height: "30px", width: "30px" }} src="https://img.icons8.com/?size=100&id=59850&format=png&color=40C057" alt="" />
                                        </div>
                                        <div id="cancel">
                                            <img onClick={() => declineUploader(applier)} className="cursor-pointer" style={{ height: "30px", width: "30px" }} src="https://img.icons8.com/?size=100&id=7703&format=png&color=FA5252" alt="" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>):
        
        
        <div className="">
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-white text-5xl">Permission Restricted</h1>
            </div>
            
        </div>)
        :
        (
            <div className="flex justify-center items-center">
                <h1 className="text-white font-bold text-4xl mt-24">No Pending Requests</h1>
            </div>
        )
        
    );
};

export default VerifyUp;
