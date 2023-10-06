// function AppointmentForm({
//   handleSubmit, 
//   delHeandler,
//   date,
//   time,
//   master,
//   service,
//   setDate,
//   setTime,
//   setMaster,
//   setService,
//   message
// } : any) {

//   return (
//      <div>
//         <div>
//           {message === "Запись успешно добавлена" ? (
//             <div style={{ color: "#5a9954" }}>{message}</div>
//           ) : (
//             <div style={{ color: "#c73c3c" }}>{message}</div>
//           )}
//           <form
//           style={{display:'flex', flexDirection: 'column', marginTop: '20px', gap: '10px'}} 
//           onSubmit={handleSubmit}
//           >
//             <label>
//               Дата:
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(event) => setDate(event.target.value)}
//                 required
//               />
//             </label>
//             <br />
//             <label>
//               Время:
//               <input
//                 type="time"
//                 value={time}
//                 onChange={(event) => setTime(event.target.value)}
//                 required
//               />
//             </label>
//             <br />
//             <div>
//               <label>
//                 {" "}
//                 Мастер:
//                 <select
//                   value={master}
//                   onChange={(event) => setMaster(event.target.value)}
//                   required
//                 >
//                   <option value="">Выбери мастера</option>
//                   <option value="Даша">Даша</option>
//                   <option value="Зина">Зина</option>
//                   <option value="Уля">Уля</option>
//                   <option value="Юля">Юля</option>
//                 </select>
//               </label>
//             </div>
//             <label>
//               Услуга:
//               <input
//                 type="text"
//                 value={service}
//                 onChange={(event) => setService(event.target.value)}
//                 required
//               />
//             </label>
//             <br />
//             <button style={{ backgroundColor: "#5a9954" }} type="submit">
//               Добавить запись
//             </button>
//             <button
//               style={{ backgroundColor: "#c73c3c" }}
//               type="button"
//               onClick={() => delHeandler()}
//             >
//               Удалить запись
//             </button>
//           </form>
//         </div>
//       </div>
//   );
// }

// export default AppointmentForm;