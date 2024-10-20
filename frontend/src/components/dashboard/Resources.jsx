// src/components/dashboard/Resources.jsx
import React from 'react';
import "./Resources.css";
import { useState } from 'react';
function Resources() {

    const [showResources, setShowResources] = useState(false);
    const [showTypes, setShowTypes] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedResource, setSelectedResource] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleResourcesClick = () => {
        setShowResources(!showResources);
    };

    const handleTypesClick = () => {
        setShowTypes(!showTypes);
    };



    const handleResourceSelect = (resource) => {
        setSelectedResource(resource);
        setShowResources(false);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setShowTypes(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Simulate fetching data from an API
        const fetchedResults = Array.from({ length: 9 }, (_, index) => ({
            title: `${searchQuery} in ${selectedResource}`,
            link: `https://${selectedResource.toLowerCase()}.com/${searchQuery.toLowerCase()}-${index + 1}`,
            image: 'https://placehold.co/300x200'
        }));
        setResults(fetchedResults);
    };

    return (
        <div>
            <main className="w-4/5 p-8">
                <h2 className="text-3xl font-bold mb-8">Resources</h2>
                <form onSubmit={handleSearchSubmit} className="flex mb-8 d-flex" >
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-1/3 p-2 border rounded mr-4"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className="relative w-5 mr-4">
                        <button type="button" onClick={handleResourcesClick} className="w-full p-2 border rounded flex justify-between items-center ele">
                            <span>{selectedResource || 'Resources'}</span>
                            <i className={`fas fa-chevron-${showResources ? 'up' : 'down'}`}></i>
                        </button>
                        {showResources && (
                            <ul className="absolute w-full bg-white border rounded mt-1">
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleResourceSelect('YouTube')}>YouTube</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleResourceSelect('Instagram')}>Instagram</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleResourceSelect('Pinterest')}>Pinterest</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleResourceSelect('Chrome')}>Chrome</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleResourceSelect('Others')}>Others</li>
                            </ul>
                        )}
                    </div>
                    <div className="relative w-1/3 ele">
                        <button type="button" onClick={handleTypesClick} className="w-full p-2 border rounded flex justify-between items-center">
                            <span>{selectedType || 'Type'}</span>
                            <i className={`fas fa-chevron-${showTypes ? 'up' : 'down'}`}></i>
                        </button>
                        {showTypes && (
                            <ul className="absolute w-full bg-white border rounded mt-1">
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleTypeSelect('Poetry')}>Poetry</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleTypeSelect('Stories')}>Stories</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleTypeSelect('Drawings')}>Drawings</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleTypeSelect('Painting')}>Painting</li>
                                <li className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleTypeSelect('Crafts')}>Crafts</li>
                            </ul>
                        )}
                    </div>
                </form>
                <div className="grid grid-cols-3 gap-4 ele">
                    {results.map((result, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow">
                            <img src={result.image} alt={result.title} className="mb-4 rounded" />
                            <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                {result.title}
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Resources;
