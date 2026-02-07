import {useState, useEffect} from "react"
import API from "./api/api.js"
import EventList from "./components/EventList.jsx"
import EventForm from "./components/EventForm.jsx"

function App() {

  const [events , setEvents] = useState([]);

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
      <EventForm fetchData={fetchData}/>
      <EventList events={events}/>

    </>
  )
}

export default App
