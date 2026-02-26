import React from 'react'
import API from '../api/api.js'

function EventList({ events, fetchData, setEditEvent }) {
    const deleteEvent = async (id) => {
        if(confirm("Delete this event ?")){
            await API.delete(`/delete/${id}`);
            fetchData();
        }
    }
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h5>Event List</h5>
                </div>

                <div className="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Time</th>
                                <th scope="col">Location</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 && <tr><td colSpan="6" className="text-center">No events available</td></tr>}
                            {
                                events.map((event) => (
                                    <tr key={event.id}>
                                        <td>{event.id}</td>
                                        <td>{event.event_time}</td>
                                        <td>{event.event_time}</td>
                                        <td>{event.location}</td>
                                        <td>{event.status}</td>
                                        <td>
                                            <button className='btn btn-primary me-2' 
                                            onClick={()=>setEditEvent(event)}>
                                                Edit
                                            </button>
                                            <button className='btn btn-danger' 
                                            onClick={()=>deleteEvent(event.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default EventList