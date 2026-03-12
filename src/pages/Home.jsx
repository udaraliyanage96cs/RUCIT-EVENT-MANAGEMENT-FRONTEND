import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import API from '../api/api'

export default function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const eventResults = await API.get("/events");
                console.log("eventResults", eventResults);
                setEvents(eventResults.data.events || []);
            } catch (error) {
                setEvents([]);
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                {loading ? (
                    <div>Loading</div>
                )
                    : events.length === 0 ? (
                        <div> No Available Events</div>
                    ) : (
                        <div>
                            {
                                events.map((event, index) => {
                                    return (
                                        <div className="" key={index}>
                                            {event.event_title}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
