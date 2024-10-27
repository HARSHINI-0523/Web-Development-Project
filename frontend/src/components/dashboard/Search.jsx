import './Search.css';
import { ImSearch } from "react-icons/im";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../api/axios';
import Lottie from "react-lottie";
import  SearchAnimation from '../../assets/Animations/SearchAnimation.json';


function Search() {
    const { register, handleSubmit } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    const [category, setCategory] = useState([]);
    let navigate = useNavigate();
    function NavigateTo(cat) {
        navigate('/dashboard/art-showcase', { state: cat });
    }
    const onSearch = async (data) => {
        try {
            let { searchText } = data;
            const response = await fetch(`http://localhost:5000/api/searchUser?username=${searchText}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const out = await response.json(); // Axios automatically parses JSON
           
            setSearchResults(out); // Assuming `out` contains the list of users
             // Handle the response (update state, etc.)
             navigate('/dashboard/profiles-searched',{state : out});
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SearchAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return (
        <div className="container">
            

            <form onSubmit={handleSubmit(onSearch)}>
                <div className="search-bar">
                    <input
                        placeholder="Search for people"
                        type="text"
                        {...register("searchText")}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(onSearch)(); // Call handleSubmit with onSearch
                            }
                        }}
                    />
                    <Lottie
                        options={defaultOptions}
                        height={50}
                        width={50}/>
                </div>
            </form>
            {/* <div>
             {searchResults.length > 0 ? (
                 searchResults.map(user => (
                     <div key={user.id}>
                         <h3>{user.name}</h3>
                         <p>{user.profile}</p> 
                     </div>
                 ))
             ) : (
                 <p>No results found</p>
             )}
         </div>  */}
           
            <hr />
            <h3 className="mb-3 mt-3">
                Browse tags
            </h3>
            <div className="tags">

                <div className="tag">
                    <img alt="Painting image" height="50" src="https://th.bing.com/th/id/OIP.LJUFtw_rx5YyhezXJrvPZwHaE1?w=246&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Painting')}> Painting</button>
                    </div>
                </div>
                <div className="tag">
                    <img alt="Dance image" height="50" src="https://th.bing.com/th/id/OIP.xqluJ4Yv9WtVgtVujHMHuQHaE8?w=243&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Dance')}>Dance</button>
                    </div>
                </div>
                <div className="tag">
                    <img alt="Music image" height="50" src="https://th.bing.com/th/id/OIP.JF-QHjEA8-VyWElFTuZHbAHaEK?w=271&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Music')}> Music</button>
                    </div>
                </div>
                <div className="tag">
                    <img alt="Crafts image" height="50" src="https://th.bing.com/th/id/OIP.GfgYTfev0XtJCU8Ykn78zwHaJ5?w=165&h=220&c=7&r=0&o=5&dpr=1.5&pid=1.7" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Crafts')}>Crafts</button>
                    </div>
                </div>
                <div className="tag">
                    <img alt="Poetry image" height="50" src="https://th.bing.com/th/id/OIP.LShogaqzwcz0_Nq4c-2OhwHaHa?w=149&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" aspect-ratio="true" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Poetry')}>Poetry</button>
                    </div>
                </div>
                <div className="tag">
                    <img alt="Pottery image" height="50" src="https://th.bing.com/th/id/OIP.6jzk-Roii9poecISjHQv9QHaEd?w=253&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Pottery')}>Pottery</button>
                    </div>
                </div>
                <div className="tag">
                    <img alt="Story image" height="50" src="http://ts2.mm.bing.net/th?id=OIP.bWczaraxT_20VTgBa51Q6AHaJM&pid=15.1" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Story')}>Story </button>
                    </div>
                </div>
                <div className="tag">
                    <img alt="Drawing image" height="50" src="https://th.bing.com/th/id/OIP.2VgOvpgIToICjHPKgT5b8QHaJ4?w=195&h=260&c=7&r=0&o=5&dpr=1.5&pid=1.7" width="50" />
                    <div className="tag-text">
                        <button className='text-left w-100' onClick={() => NavigateTo('Drawing')}>Drawing</button>
                    </div>
                </div>
            </div>
        </div>

    )





}

export default Search;