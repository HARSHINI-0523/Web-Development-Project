import React, { useState, useEffect, useRef } from 'react';
import './Event.css';
import API from '../../api/axios';
import { MdDeleteOutline } from "react-icons/md";

function Event() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // October 2024
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [events, setEvents] = useState({});
    const [yearlyEvents, setYearlyEvents] = useState([]); // State for yearly events
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [formData, setFormData] = useState({
        eventName: '',
        organizer: '',
        location: '',
        cost: '',
        activities: '',
        date: '',
        contactPhone: '',
    });

    const modalRef = useRef(null);

    useEffect(() => {

        fetchEvents();
    }, [currentMonth]);
    const fetchEvents = async () => {
        try {
            const res = await API.get(`/events/month/${currentMonth.getFullYear()}/${currentMonth.getMonth() + 1}`);
            const data = res.data;
            console.log(data); // Check the structure of fetched data

            // Update the events state
            const formattedEvents = data.reduce((acc, event) => {
                const eventDate = new Date(event.date).toISOString().split('T')[0];
                acc[eventDate] = event;
                return acc;
            }, {});

            setEvents(formattedEvents);

            // Update the yearly events state as well
            setYearlyEvents(data.map(event => ({
                date: event.date,
                eventName: event.eventName,
                location: event.location,
                // Add any other properties you need
            })));

        } catch (error) {
            console.error('Error fetching events', error);
        }
    };
    const openDeleteModal = (eventId) => {
        setEventToDelete(eventId);
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
        setEventToDelete(null);
    };

    const confirmDeleteEvent = async () => {
        const token = localStorage.getItem('token');
        try {
            await API.delete(`/events/${eventToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Remove the deleted event from the state
            setEvents((prev) => {
                const updatedEvents = { ...prev };
                delete updatedEvents[selectedDate];
                return updatedEvents;
            });
            // Close the modal
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event. Please try again.');
        }
        fetchEvents();
    };

    const today = new Date();

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handleDateClick = (day) => {
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
    };

    const handleYearlyEventClick = (eventDate) => {
        const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
        setSelectedDate(formattedDate); // Set selected date to display event details
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { date, eventName, organizer, location, cost, activities, contactPhone } = formData;
        console.log(formData);

        if (date && eventName) {
            const token = localStorage.getItem('token');
            try {
                // Send event data to the backend using a POST request
                const response = await API.post('/events', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // If the request is successful, proceed with the rest of the code
                const newEvent = response.data; // Axios directly gives you the response data
                console.log("newEvent", newEvent);

                // Update the events and yearlyEvents state with the new event
                setEvents((prev) => ({
                    ...prev,
                    [date]: newEvent,
                }));

                setYearlyEvents((prev) => [
                    ...prev,
                    { date: date, eventName: eventName, location: location },
                ]);

                // Close the modal and reset the form data
                closeModal();
                setFormData({
                    eventName: '',
                    organizer: '',
                    location: '',
                    cost: '',
                    activities: '',
                    date: '',
                    contactPhone: '',
                });
            } catch (error) {
                // Handle the error response from the backend
                console.error('Error submitting event:', error);
                const errorMessage = error.response?.data?.message || 'Failed to add event. Please try again later.';
                alert('Failed to add event: ' + errorMessage);
            }
        } else {
            alert('Please fill out the event name and date.');
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
                            const isEventDay = events[dateStr];

                            return (
                                <div
                                    key={day}
                                    className={`calendar-date ${isToday ? 'today' : ''}${isEventDay ? 'event-day' : ''}`}
                                    onClick={() => handleDateClick(day)}
                                    style={{ backgroundColor: isToday ? 'blue' : (isEventDay ? 'red' : 'initial'), color: isToday ? 'white' : 'initial' }} // Highlight in red if it's an event day
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
                            <div className='d-flex justify-content-between'>
                                <h4>{events[selectedDate].eventName}</h4>
                                <button onClick={() => openDeleteModal(events[selectedDate]._id)} className='deletebtn fs-4'><MdDeleteOutline /></button>
                            </div>
                            <p>Organizer: {events[selectedDate].organizer}</p>
                            <p>Location: {events[selectedDate].location}</p>
                            <p>Cost: {events[selectedDate].cost}</p>
                            <p>Activities: {events[selectedDate].activities}</p>
                            <p>Contact: {events[selectedDate].contactPhone}</p>

                        </div>
                    ) : (
                        <p>No events found for this date.</p>
                    )}

                </div>
            </div>
            {/* Delete Confirmation Modal */}
            {deleteModalIsOpen && (
                <div className={`deletemodal ${deleteModalIsOpen ? 'show' : ''}`}>
                    <div className="deletemodal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this event?</p>
                        <div className="deletemodalBtns ">
                            <button onClick={confirmDeleteEvent} className="deleteconfirm-btn">Yes, Delete</button>
                            <button onClick={closeDeleteModal} className="deletecancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className={`modal ${isModalOpen ? 'show' : ''}`}>
                    <div className="modal-content" ref={modalRef}>
                        
                        <div className="modal-header">
                            <h3>Add New Event</h3>
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
                                placeholder="Cost"
                            />
                            <input
                                type="text"
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
                                placeholder="Date"
                                required
                            />
                            <input
                                type="text"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleFormChange}
                                placeholder="Contact Phone"
                            />
                            <button type="submit">Add Event</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Yearly Main Events Section */}
            <div className="yearly-events">
                <h3>Events Schedule</h3>
                <div className="events-list">
                    {yearlyEvents.map((event) => {
                        const eventDate = new Date(event.date);
                        const formattedDate = `${String(eventDate.getDate()).padStart(2, '0')}/${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
                        return (
                            <div key={event.date} className="event-item" onClick={() => handleYearlyEventClick(eventDate)}>

                                <div className="event-date-circle">
                                    {formattedDate}
                                </div>
                                <span className="event-name">{event.eventName}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Event;
