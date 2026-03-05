import { useState, useEffect } from "react"
import API from '../api/api.js'
import EventForm from '../components/EventForm'
import EventList from '../components/EventList'
import Navbar from '../components/Navbar'

export default function Dashboard() {

    const [events, setEvents] = useState([]);
    const [editEvent, setEditEvent] = useState(null);

    const fetchData = async () => {
        const result = await API.get("/events");
        console.log(result.data.events);
        setEvents(result.data.events);
    }



    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="container mt-4">
                <h3>Event Management</h3>
                <EventForm fetchData={fetchData} setEditEvent={setEditEvent} editEvent={editEvent} />
                <EventList events={events}
                    fetchData={fetchData}
                    setEditEvent={setEditEvent} />
            </div>
        </div>
    )
}
