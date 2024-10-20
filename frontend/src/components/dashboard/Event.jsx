import React, { useState, useEffect } from 'react';
import './Event.css'; // Import the CSS styles

function Event() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // October 2024
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [events, setEvents] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [formData, setFormData] = useState({
        eventName: '',
        organizer: '',
        location: '',
        cost: '',
        activities: '',
        date: '',
    });

    // Get the current day
    const today = new Date();

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handleDateClick = (day) => {
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleSearchDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const [day, month, year] = searchDate.split('-');
        const searchDateObj = new Date(year, month - 1, day);

        if (searchDateObj && searchDateObj.getDate() === parseInt(day)) {
            setCurrentMonth(searchDateObj);
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            setSelectedDate(formattedDate);
        } else {
            alert('Invalid date. Please use the format dd-mm-yyyy.');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        console.log("Plus")
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { date, eventName, organizer, location, cost, activities } = formData;
        if (date && eventName) {
            setEvents((prev) => ({
                ...prev,
                [date]: {
                    eventName,
                    organizer,
                    location,
                    cost,
                    activities,
                },
            }));
            closeModal();
        } else {
            alert('Please fill out the event name and date');
        }
    };

    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const upcomingEvents = [
        { date: '2024-10-30', title: 'Halloween Party', description: 'Join us for spooky fun!' },
        { date: '2024-11-25', title: 'Thanksgiving Feast', description: 'Celebrate with a feast.' },
    ];

    return (
        <div className="event-container">
            <div className="event-header">
                <h2>Events</h2>
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input 
                        type="text" 
                        value={searchDate} 
                        onChange={handleSearchDateChange} 
                        placeholder="dd-mm-yyyy" 
                        required 
                    />
                    <button type="submit">Search</button>
                    <div className="plus-button" onClick={openModal}>+</div>
                    
                </form>
           
            </div>

            <div className="calendar-container">
                <div className="calendar">
                    <div className="calendar-header">
                        <button onClick={handlePreviousMonth}>←</button>
                        <h3>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                        <button onClick={handleNextMonth}>→</button>
                    </div>
                    <div className="days-of-week">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="day">{day}</div>
                        ))}
                    </div>
                    <div className="calendar-grid">
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="calendar-date empty"></div>
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const isToday = dateStr === today.toISOString().split('T')[0];
                            const isEventDay =  events[dateStr] 


                            return (
                                <div
                                    key={day}
                                    className={`calendar-date ${isToday ? 'today' : ''}${isEventDay ? 'event-day' : ''}`}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="event-section">
                    <h3>Events for {selectedDate || today.toISOString().split('T')[0]}</h3>
                    {selectedDate && events[selectedDate] ? (
                        <div>
                            <h4>{events[selectedDate].eventName}</h4>
                            <p>Organizer: {events[selectedDate].organizer}</p>
                            <p>Location: {events[selectedDate].location}</p>
                            <p>Cost: {events[selectedDate].cost}</p>
                            <p>Activities: {events[selectedDate].activities}</p>
                        </div>
                    ) : (
                        <p>No events found for this date.</p>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className={`modal ${isModalOpen ? 'show' : ''}`}>
                    <div className="modal-content">
                        <h3>Modal is Open!</h3>
                        <h3>{isModalOpen}</h3>
                        <div className="modal-header">
                            <h3>Plan Event</h3>
                            <span className="close" onClick={closeModal}>Close</span>   {/*&times;*/}
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <input 
                                type="text" 
                                name="eventName" 
                                value={formData.eventName} 
                                onChange={handleFormChange} 
                                placeholder="Event Name" 
                                required 
                            />
                            <input 
                                type="text" 
                                name="organizer" 
                                value={formData.organizer} 
                                onChange={handleFormChange} 
                                placeholder="Organizer" 
                            />
                            <input 
                                type="text" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleFormChange} 
                                placeholder="Location" 
                            />
                            <input 
                                type="text" 
                                name="cost" 
                                value={formData.cost} 
                                onChange={handleFormChange} 
                                placeholder="Cost (e.g., Free or $20)" 
                            />
                            <textarea 
                                name="activities" 
                                value={formData.activities} 
                                onChange={handleFormChange} 
                                placeholder="Activities" 
                            />
                            <input 
                                type="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleFormChange} 
                                required 
                            />
                            <button type="submit">Save Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Event;
