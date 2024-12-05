"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Home() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Natal',
      description: 'Mari Natal',
      date: '2024-12-24'
    },
    {
      id: 2,
      title: 'Tahun Baru',
      description: 'Kembang Api',
      date: '2024-12-31'
    },
    {
      id: 3,
      title: 'Awal Kerja',
      description: 'Semangat Kerja',
      date: '2025-01-05'
    },
    {
      id: 4,
      title: 'Natal',
      description: 'Mari Natal',
      date: '2024-12-24'
    },
    {
      id: 5,
      title: 'Tahun Baru',
      description: 'Kembang Api',
      date: '2024-12-31'
    },
    {
      id: 6,
      title: 'Awal Kerja',
      description: 'Semangat Kerja',
      date: '2025-01-05'
    },
    {
      id: 7,
      title: 'Natal',
      description: 'Mari Natal',
      date: '2024-12-24'
    },
    {
      id: 8,
      title: 'Tahun Baru',
      description: 'Kembang Api',
      date: '2024-12-31'
    },
    {
      id: 9,
      title: 'Awal Kerja',
      description: 'Semangat Kerja',
      date: '2025-01-05'
    }
  ]);
  const [selectedEv, setSelectedEv] = useState({})

  useEffect(() => {    

  }, []);

  function showDetail(event) {
    setSelectedEv(event)
    document.getElementById('my_modal_2').showModal()
  }

  function updateEvent() {

  }

  function selectedEvChanges(e) {
    const { name, value } = e.target;
    setSelectedEv((prevState) => ({
      ...prevState, // Spread the previous state
      [name]: value, // Update the field that changed
    }));
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="container">
        <h1 className="font-bold text-5xl">Event List</h1>
        <button className="btn btn-active" style={{ float: 'right', marginTop: '-70px' }}>Logout</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              events.map(event => (
                <tr key={event.id}>
                  <th>{event.id}</th>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs" onClick={()=>showDetail(event)}>Detail</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
        <h2 className="text-lg mb-3">Detail</h2>
          <label className="input input-bordered flex items-center gap-2">
            Title
            <input type="text" name="title" className="grow" value={selectedEv.title} onChange={(e) => selectedEvChanges(e)}/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Description
            <input type="text" name="description" className="grow" value={selectedEv.description}  onChange={(e) => selectedEvChanges(e)}/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Date
            <input type="date" name="date" className="grow" value={selectedEv.date} onChange={(e) => selectedEvChanges(e)}/>
          </label>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-3">Close</button>
              <button className="btn" onClick={()=>updateEvent()}>Update</button>
            </form>
          </div>
        </div>
      </dialog>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
