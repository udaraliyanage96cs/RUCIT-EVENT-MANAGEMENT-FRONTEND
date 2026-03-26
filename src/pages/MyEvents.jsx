import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../api/api'

export default function MyEvents() {

    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/my-events')
            .then((res) => {
                setRegistrations(res.data.registrations)
            }).catch((error) => {
                console.log("There is a error : ", error);
            }).finally(() => setLoading(false))
    }, [])
    return (
        <div>
            <Navbar />
            {loading ? (
                <p>Loading...</p>
            ) : registrations.length == 0 ? (
                <p>No Event Registratuions Available</p>
            ):(
                <div className="row">
                    {
                        registrations.map((reg,index) => {
                            const event = reg.event
                            if(!event) return null

                            return (
                                <div 
                                key={index}
                                className="col-md-3 gap-2 ms-2 me-2 d-flex justify-content-center p-2" style={{backgroundColor:"antiquewhite"}}>
                                    <div  key={index}>
                                        <p><strong>{event.event_title}</strong></p>
                                        <p>{event.event_date}</p>
                                    </div>
                                </div>
                            )
                        })
                    
                    }
                </div>
            )}
        </div>
    )
}
