import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actioningId, setActioningId] = useState(null);
    const [joinedIds, setJoinedIds] = useState(new Set());

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const eventResults = await API.get("/events");
                console.log("eventResults", eventResults);
                setEvents(eventResults.data.events || []);

                if(token){
                    const myRes = await API.get('/my-events');
                    const ids = new Set(
                        (myRes.data.registrations || []).map((r) => r.id)
                    )
                    setJoinedIds(ids);
                }
            } catch (error) {
                setEvents([]);
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, []);

    const handelJoin = async (event) => {
        if(!token){
            navigate("/login");
            return;
        }
        setActioningId(event.id);
        try{
            const res = await API.post("/events/join",{event_id:event.id});
            setJoinedIds((prv) => new Set([...prv,event.id]))
            alert(res.data.message ?? "You have successfully joined");
        }catch(error){
            const msg = error.response?.data?.message || "Something went wrong, please try again";
        }finally{
            setActioningId(null);
        }
    }

    const handelLeave = async (event) => {
        if(!token){
            navigate("/login");
            return;
        }
        setActioningId(event.id);
        try{
            const res = await API.delete(`/events/leave/${event.id}`);
            setJoinedIds((prev) => {
                const next = new Set(prev);
                next.delete(event.id);
                return next;
            })
            alert(res.data.message ?? "You have successfully leave");
        }catch(error){
            const msg = error.response?.data?.message || "Something went wrong, please try again";
            alert(msg);
        }finally{
            setActioningId(null);
        }
    }

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
                        <div className='row'>
                            {
                                events.map((event, index) => {
                                    return (
                                        <div 
                                        key={index}
                                        className="col-md-3 gap-2 ms-2 me-2 d-flex justify-content-center p-2" 
                                        style={{backgroundColor:"antiquewhite"}}>
                                            <div className={styles.card} key={index}>
                                                <p><strong>{event.event_title}</strong></p>
                                                <p>{event.description}</p>

                                                {joinedIds.has(event.id) ? (
                                                    <button className='btn btn-danger' onClick={()=> handelLeave(event)}>Leave</button>
                                                ): (
                                                    <button className='btn btn-success' onClick={()=> handelJoin(event)}>Join</button>
                                                )}

                                            </div>
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


const styles = {
    page: {
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
    },
    // Navbar
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        height: "64px",
        background: "#0f172a",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        position: "sticky",
        top: 0,
        zIndex: 100,
    },
    brand: {
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#f8fafc",
        letterSpacing: "-0.3px",
    },
    navRight: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    navUser: {
        color: "#94a3b8",
        fontSize: "0.9rem",
    },
    navLink: {
        color: "#94a3b8",
        textDecoration: "none",
        fontSize: "0.9rem",
    },
    navBtn: {
        background: "#3b82f6",
        color: "#fff",
        padding: "0.4rem 1rem",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "0.85rem",
        fontWeight: "600",
    },
    navBtnOutline: {
        border: "1px solid #334155",
        color: "#e2e8f0",
        padding: "0.4rem 1rem",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "0.85rem",
    },
    // Hero
    hero: {
        background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "4rem 1rem 3.5rem",
    },
    heroTitle: {
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: "800",
        margin: "0 0 0.75rem",
        letterSpacing: "-0.5px",
    },
    heroSub: {
        fontSize: "1.1rem",
        color: "rgba(255,255,255,0.8)",
        margin: 0,
    },
    // Container
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2.5rem 1.5rem",
        flex: 1,
    },
    // Grid
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.5rem",
    },
    // Card
    card: {
        background: "#fff",
        borderRadius: "14px",
        padding: "1.5rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "box-shadow 0.2s",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badge: {
        fontSize: "0.72rem",
        fontWeight: "700",
        padding: "0.25rem 0.65rem",
        borderRadius: "999px",
        textTransform: "capitalize",
        letterSpacing: "0.3px",
    },
    cardDate: {
        fontSize: "0.8rem",
        color: "#64748b",
    },
    cardTitle: {
        fontSize: "1.15rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
        lineHeight: "1.3",
    },
    cardDesc: {
        fontSize: "0.88rem",
        color: "#64748b",
        lineHeight: "1.6",
        margin: 0,
        flexGrow: 1,
    },
    metaRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
    },
    meta: {
        fontSize: "0.78rem",
        color: "#475569",
        background: "#f1f5f9",
        borderRadius: "6px",
        padding: "0.25rem 0.6rem",
    },
    joinBtn: {
        marginTop: "0.5rem",
        background: "linear-gradient(135deg, #3b82f6, #6366f1)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "0.65rem 1rem",
        fontWeight: "700",
        fontSize: "0.9rem",
        cursor: "pointer",
        width: "100%",
        transition: "opacity 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40px",
    },
    joinBtnLoading: {
        opacity: 0.7,
        cursor: "not-allowed",
    },
    leaveBtn: {
        background: "transparent",
        color: "#dc2626",
        border: "1px solid #fca5a5",
    },
    // Spinner inside button
    btnSpinner: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        border: "2px solid rgba(255,255,255,0.4)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
    },
    // Center message
    centerMsg: {
        textAlign: "center",
        padding: "5rem 0",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "3px solid #e2e8f0",
        borderTopColor: "#3b82f6",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        margin: "0 auto",
    },
    // Toast
    toast: {
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#16a34a",
        color: "#fff",
        padding: "0.8rem 1.8rem",
        borderRadius: "10px",
        fontWeight: "600",
        fontSize: "0.95rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        zIndex: 9999,
        whiteSpace: "nowrap",
    },
    toastError: {
        background: "#dc2626",
    },
    // Footer
    footer: {
        textAlign: "center",
        padding: "1.5rem",
        color: "#94a3b8",
        fontSize: "0.85rem",
        borderTop: "1px solid #e2e8f0",
    },
};

const styleTag = document.createElement("style");
styleTag.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);