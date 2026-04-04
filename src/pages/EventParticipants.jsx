import {use, useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import API from "../api/api"
import Navbar from '../components/Navbar';

export default function EventParticipants() {
    const { eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        API.get(`/events/${eventId}/registrations`)
        .then((res) =>setParticipants(res.data.registrations))
        .catch((err) => console.log("There is an error : ", err))
        .finally(() => setLoading(false));
    }, [eventId]);

    return (
        <div>
            <Navbar/>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Event Participants</h3>
                    <Link to ="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
                </div>

                <div className="mt-4">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h5>Participants Count  {participants.length}</h5>
                        </div>

                        <div className="card-body">
                            {
                                loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle">
                                           <thead className='table-light'>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Registration Date</th>
                                                </tr>
                                           </thead>
                                           <tbody>
                                            {participants.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No participants registered for this event.</td>     
                                                </tr>
                                            ) : (
                                                participants.map((participant, index) => (
                                                    <tr key={index}>
                                                        <td>{participant.id}</td>
                                                        <td>{participant.user?.name}</td>
                                                        <td>{participant.user?.email}</td>
                                                        <td>{new Date(participant.created_at).toLocaleDateString()}</td>
                                                    </tr>
                                                ))
                                            )}
                                           </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
