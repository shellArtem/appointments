 /* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useEffect, useState } from "react";
import "./App.css";
import AppointmentForm from "./components/AppointmentForm";
import OneRow from "./components/OneRow";

import Pagination from "./components/Pagination";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [del, setDel] = useState(false);
  const [openDate, setOpenDate] = useState("");
  const [openMaster, setOpenMaster] = useState("");
  const [update, setUpdate] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [master, setMaster] = useState("");
  const [service, setService] = useState("");
  const [editService, setEditService] = useState("");
  const [message, setMessage] = useState("");
  const [appointmentForm, setAppointmentsForm] = useState(false);
  const getForm = () => {
    setAppointmentsForm(!appointmentForm);
  };

  const delHeandler = () => {
    setDel(!del);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://77.222.60.196:3003/appointments", {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        const result = await response.json();
        setAppointments(result);
      } catch (error) {
        console.log("OMG", error);
      }
    })();
  }, [update]);

  const deleteAppointment = async (id : number) => {
    try {
      await fetch("http://77.222.60.196:3003/appointments/", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: id }),
      });

      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDate = (date : string) => {
    setOpenDate(openDate === date ? "" : date);
    setOpenMaster("");
  };

  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const appointmentDetails = {
      date,
      time,
      master,
      service,
    };

    try {
      const response = await fetch("http://77.222.60.196:3003/appointments", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(appointmentDetails),
      });

      if (response.ok) {
        setMessage("Запись успешно добавлена");
        setUpdate(update + 1);
      } else {
        setMessage("Мастер в это время уже занят!");
      }

      setDate("");
      setTime("");
      setMaster("");
      setService("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditSubmit = async (id: number) => {
    try {
      await fetch("http://77.222.60.196:3003/appointments", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ editService, id }),
      });
      setUpdate(update + 1);
      setEditService("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleMaster = (master: string) => {
    setOpenMaster(openMaster === master ? "" : master);
  };

  const mastersByDate = appointments.reduce((acc, cur) => {
    const date = new Date(cur.date).toLocaleDateString();
    if (!acc[date]) acc[date] = new Set();
    acc[date].add(cur.master);
    return acc;
  }, {});

  const appointmentsByMasterOnDate = appointments.filter((appointment) => {
    const date = new Date(appointment.date).toLocaleDateString();
    return date === openDate && appointment.master === openMaster;
  });

  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  return (
    <>
      <div>
        <h2> Онлайн запись </h2>
        <h3> Только для мастеров </h3>
      </div>
      <div>
        <button type="button" onClick={() => getForm()}>
          {" "}
          Форма создания/удаления записи{" "}
        </button>
      </div>
      {appointmentForm && (
        <div>
          <AppointmentForm
            handleSubmit={handleSubmit}
            delHeandler={delHeandler}
            date={date}
            time={time}
            master={master}
            service={service}
            setDate={setDate}
            setTime={setTime}
            setMaster={setMaster}
            setService={setService}
            message={message}
          />
        </div>
      )}
      <div>
        <ul>
          {appointments.length ? (
            Object.keys(mastersByDate).map((date) => {


              const splittedDate = date.split(".");
              const formattedDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
              const dateObj = new Date(formattedDate);
              const dayOfWeek = days[dateObj.getDay()];
            
            return (
              <li key={date}>
                <div
                  style={{
                    position: "sticky",
                    top: "2%",
                    backgroundColor: "white",
                    opacity: "1",
                  }}
                >
                  <p style={{ border: "1px solid black" }}>
                    Дата: {date}({dayOfWeek})
                    <button onClick={() => toggleDate(date)}>Подробнее</button>
                  </p>
                  {openDate === date &&
                    Array.from(mastersByDate[date]).map((master) => (
                      <button key={master} onClick={() => toggleMaster(master)}>
                        {master}
                      </button>
                    ))}
                </div>
                {openDate === date &&
                  openMaster &&
                  appointmentsByMasterOnDate.map((el) => (
                    <OneRow
                      key={el.id}
                      el={el}
                      deleteAppointment={deleteAppointment}
                      editService={editService}
                      setEditService={setEditService}
                      handleEditSubmit={handleEditSubmit}
                      del={del}
                    />
                  ))}
              </li>
            )})
          ) : (
            <span> loading... </span>
          )}
        </ul>
        <div> ©shellArtem 2023 </div>
      </div>
    </>
  );
}

export default App;
