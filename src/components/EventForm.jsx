import { useState } from 'react'
import API from '../api/api.js'

function EventForm({fetchData}) {

    const emptyForm = {
        event_title: "",
        event_description: "",
        event_date: "",
        event_time: "",
        location:"",
        max_participants: "",
        status: "active"
    }

    const createEvent = async (e) => {
        e.preventDefault();
        await API.post("/create",createForm)
        fetchData();
        setCreateForm(emptyForm);
    }
    
    const [createForm, setCreateForm] = useState(emptyForm);

    const handleCreateChanges = (e) => {
        setCreateForm({ ...createForm, [e.target.name] : e.target.value })
    }
    return (
        <div>
            <div className="card">
                <div className="card-header">Create New Event</div>
                <div className="card-body">
                    <form onSubmit={createEvent}>
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="">Event Title</label>
                                <input type="text" name="event_title" value={createForm.event_title} onChange={handleCreateChanges} required />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="">Event Description</label>
                                <input type="text" name="event_description" value={createForm.event_description} onChange={handleCreateChanges} required />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="">Event Date</label>
                                <input type="date" name="event_date" value={createForm.event_date} onChange={handleCreateChanges} required />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="">Event Time</label>
                                <input type="time" name="event_time" value={createForm.event_time} onChange={handleCreateChanges} required />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="">Event Location</label>
                                <input type="text" name="location" value={createForm.location} onChange={handleCreateChanges} required />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="">Max Participants</label>
                                <input type="number" name="max_participants" value={createForm.max_participants} onChange={handleCreateChanges} required />
                            </div>

                            <div className="col-md-3">
                                <button className="btn btn-primary">Create Event</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EventForm