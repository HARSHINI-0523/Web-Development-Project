import { useLocation } from "react-router-dom";
import './ProfilesSearched.css';
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import NoResultFound from "../../assets/Animations/NoResultFound.json"
function ProfilesSearched(){
    const {state}  = useLocation();
    console.log(state);
    let defaultOptions={
        loop:true,
        autoplay:true,
        animationData:NoResultFound,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
          }
    }
    let navigate=useNavigate();
    let NavigatetoProfile = async(user)=>{
        navigate('/dashboard/profile',{state:user})
    }


    return(
        <div className="search-results">
            <h1>Search Results</h1>
        {state.length > 0 ? (
            state.map(user => (
                <div key={user._id} className="search-profile" onClick={()=>NavigatetoProfile(user)}>
                    
                    <img src={user.photo} alt={user.name} style={{width:40 , height:40}} />
                    <h4>{user.username}</h4>
                    
                </div>
            ))
        ) : (
            <div className="no-result-found">
                <Lottie 
                    options={defaultOptions}
                    width={200}
                    height={200}
                    padding={50}/>
            <p className="text-center text-danger ">No results found</p>
            </div>
        )}
    </div>
    )
}

export default  ProfilesSearched;
