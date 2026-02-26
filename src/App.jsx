import {useState, useEffect} from "react"
import API from "./api/api.js"
import EventList from "./components/EventList.jsx"
import EventForm from "./components/EventForm.jsx"

function App() {

  const [events , setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);

  const fetchData = async () => {
    const result = await API.get("/events");
    console.log(result.data.events);
    setEvents(result.data.events);
  }

 

  useEffect(() =>{
    fetchData();
  }, [])


  return (
    <>
      <EventForm fetchData={fetchData} setEditEvent={setEditEvent} editEvent={editEvent}/>
      <EventList events={events} 
      fetchData={fetchData}
      setEditEvent={setEditEvent}/>

    </>
  )
}

export default App
