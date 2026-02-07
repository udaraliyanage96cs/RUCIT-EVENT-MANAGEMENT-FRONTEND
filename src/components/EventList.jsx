import React from 'react'

function EventList({ events }) {
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
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 && <tr><td colSpan="5" className="text-center">No events available</td></tr>}
                            {
                                events.map((event) => (
                                    <tr key={event.id}>
                                        <td>{event.id}</td>
                                        <td>{event.event_time}</td>
                                        <td>{event.event_time}</td>
                                        <td>{event.location}</td>
                                        <td>{event.status}</td>
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