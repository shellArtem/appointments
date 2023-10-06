import { useState } from "react";

function OneRow({
  el,
  deleteAppointment,
  editService,
  setEditService,
  handleEditSubmit,
  del,
}: any) {
  const [write, setWrite] = useState(true);

  const getWrite = () => {
    setWrite(!write);
  };

  return (
    <div>
      <p>
        {" "}
        Время: {el.time}{" "}
        <span>
          {" "}
          <strong> Мастер: {el.master} </strong>{" "}
        </span>
        <span
          style={
            el.service === "Записи нет" ||
            el.service === "нет" ||
            el.service === "свободно" ||
            el.service === "пусто" ||
            el.service === "нет записи" ||
            el.service === "записи нет" ||
            el.service === "отмена" || 
            el.service === "Нет" ||
            el.service === "Свободно" ||
            el.service === "Пусто" ||
            el.service === "Нет записи" ||
            el.service === "Отмена" ||
            el.service === ""
              ? { color: "#5a9954" }
              : { color: "#c73c3c" }
          }
        >
          {" "}
          Услуга: {el.service}{" "}
        </span>
        {del && <button onClick={() => deleteAppointment(el.id)}>x</button>}
      </p>

      {write ? (
        <button onClick={() => getWrite()}>записать</button>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label>
            Услуга:
            <input
              type="text"
              value={editService}
              onChange={(event) => setEditService(event.target.value)}
              required
            />
          </label>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          <button
            style={{ backgroundColor: "#5a9954" }}
            type="button"
            onClick={() => {
              handleEditSubmit(el.id);
              getWrite();
            }}
          >
            Ок
          </button>
          <button
            style={{ backgroundColor: "#c73c3c" }}
            type="button"
            onClick={() => getWrite()}
          >
            Отмена
          </button>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
}

export default OneRow;
