import React, { useState, useEffect, useRef } from 'react';
import './Event.css';

function Event() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // October 2024
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [events, setEvents] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // Start with modal closed
    const [formData, setFormData] = useState({
        eventName: '',
        organizer: '',
        location: '',
        cost: '',
        activities: '',
        date: '',
    });

    const modalRef = useRef(null); // Ref to track modal clicks

    useEffect(() => {
        // Handle click outside the modal to close it
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

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

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
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

                    {/* Plus icon for opening the modal */}
                    <div className="plus-button" onClick={openModal}>
                        <span>+</span>
                    </div>
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
                            const isEventDay =  events[dateStr];

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
                    <div className="modal-content" ref={modalRef}>
                        <h3>Add New Event</h3>
                        <div className="modal-header">
                            <button className="close" onClick={closeModal}>✖</button>
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
                                placeholder="Who is Conducting" 
                            />
                            <input 
                                type="text" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleFormChange} 
                                placeholder="Where it is Conducting" 
                            />
                            <input 
                                type="text" 
                                name="cost" 
                                value={formData.cost} 
                                onChange={handleFormChange} 
                                placeholder="Free or Cost Paying" 
                            />
                            <input 
                                type="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleFormChange} 
                                required 
                            />
                            <textarea 
                                name="activities" 
                                value={formData.activities} 
                                onChange={handleFormChange} 
                                placeholder="Activities Conducted on that Workshop" 
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
