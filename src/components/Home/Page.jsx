
import Sidebar from "./Sidebar.jsx";
import Maincontent from "./Maincontent.jsx";

const Page = ({type})=>{
    return(
        <div className="flex flex-row h-full w-full">
            <Sidebar/>
            <Maincontent type={type} />
        </div>   
    )
}

export default Page;