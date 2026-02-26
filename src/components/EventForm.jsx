import { useState, useEffect } from 'react'
import API from '../api/api.js'
function EventForm({ fetchData, setEditEvent, editEvent }) {

    useEffect(() => {
        if (editEvent) {
            setEditForm(editEvent);
        }
    }, [editEvent]);

    const emptyForm = {
        event_title: "",
        event_description: "",
        event_date: "",
        event_time: "",
        location: "",
        max_participants: "",
        status: "active"
    }

    const createEvent = async (e) => {
        e.preventDefault();
        await API.post("/create", createForm)
        fetchData();
        setCreateForm(emptyForm);
    }
    const [createForm, setCreateForm] = useState(emptyForm);
    const [editForm, setEditForm] = useState(null);
    const handleCreateChanges = (e) => {
        setCreateForm({ ...createForm, [e.target.name]: e.target.value })
    }
    const handleEditChanges = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }
    const updateEvent = async (e) => {
        e.preventDefault();
        console.log(`/update/${editForm.id}`);
        await API.put(`/update/${editForm.id}`, editForm);  
        setEditEvent(null);
        setEditForm(null);
        fetchData();
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

            {editForm && (
                <div className="">
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Event</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={updateEvent}>
                                        <div className="modal-body row g-3">

                                            <div className="col-md-6">
                                                <label className="form-label">Event Title</label>
                                                <input
                                                    className="form-control"
                                                    name="event_title"
                                                    value={editForm.event_title}
                                                    onChange={handleEditChanges}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Location</label>
                                                <input
                                                    className="form-control"
                                                    name="location"
                                                    value={editForm.location}
                                                    onChange={handleEditChanges}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    name="description"
                                                    value={editForm.description}
                                                    onChange={handleEditChanges}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="event_date"
                                                    value={editForm.event_date}
                                                    onChange={handleEditChanges}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Time</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    name="event_time"
                                                    value={editForm.event_time}
                                                    onChange={handleEditChanges}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Status</label>
                                                <select
                                                    className="form-select"
                                                    name="status"
                                                    value={editForm.status}
                                                    onChange={handleEditChanges}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setEditEvent(null);
                                                    setEditForm(null);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button className="btn btn-primary">
                                                Update Event
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventForm