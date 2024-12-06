"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchData from '../fetch/fetch';
import { useCookies } from 'next-client-cookies';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEv, setSelectedEv] = useState({ title: '', description: '', date:'' });
  const [createEv, setCreateEv] = useState({ title: '', description: '', date:'' });
  const [type, setType] = useState('');
  const router = useRouter();
  const cookies = useCookies();

  useEffect(() => {    
    getData();
  }, []);

  async function getData() {
    let response = await fetchData('/event','GET');
    const data = await response.json();
    setEvents(data)
  }

  function showDetail(event) {
    setSelectedEv(event)
    document.getElementById('my_modal_2').showModal();
  }

  function selectedEvChanges(e) {
    const { name, value } = e.target;
    setSelectedEv((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function logoutButton() {
    cookies.remove('token')
    router.push('/login');
  }

  function addEvent() {
    setCreateEv({ title: '', description: '', date:'' });
    document.getElementById('my_modal_1').showModal();
  }

  async function createEvent() {
    setType('create');
    document.getElementById('my_modal_3').showModal();
  }

  async function deleteEvent(event) {
    setSelectedEv(event);
    setType('delete');
    document.getElementById('my_modal_3').showModal();
  }

  async function updateEvent() {
    setType('update');
    document.getElementById('my_modal_3').showModal();
  }
  
  function createEvChanges(e) {
    const { name, value } = e.target;
    setCreateEv((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function confirmButton() {    
    if (type == 'delete') {
      let response = await fetchData(`/event/${selectedEv.id}`,'DELETE');
      const data = await response.json();
      if (data) await getData();
    } else if (type == 'update') {
      let response = await fetchData(`/event/${selectedEv.id}`,'PATCH', selectedEv);
      const data = await response.json();
      if (data) await getData();
    } else if (type == 'create') {
      let response = await fetchData(`/event`,'POST', createEv);
      const data = await response.json();
      if (data) await getData();
    }
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="container">
        <h1 className="font-bold text-5xl">Event List</h1>
        <button className="btn btn-active" style={{ float: 'right', marginTop: '-70px' }} type="button" onClick={logoutButton}>Logout</button>
      </div>
      <div className="overflow-x-auto">
        <button className="btn btn-active" style={{ float: 'right' }} type="button" onClick={addEvent}>Add Event</button>
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
                    <button className="btn btn-ghost btn-xs" onClick={()=>deleteEvent(event)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
        <h2 className="text-lg mb-3">New Event</h2>
          <label className="input input-bordered flex items-center gap-2">
            Title
            <input type="text" name="title" className="grow" value={createEv.title} onChange={(e) => createEvChanges(e)}/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Description
            <input type="text" name="description" className="grow" value={createEv.description}  onChange={(e) => createEvChanges(e)}/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Date
            <input type="date" name="date" className="grow" value={createEv.date} onChange={(e) => createEvChanges(e)}/>
          </label>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-3">Close</button>
              <button className="btn" onClick={()=>createEvent()}>Submit</button>
            </form>
          </div>
        </div>
      </dialog>

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

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Question</h3>
          <p className="py-4">Are you sure want to do the change?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">No</button>
              <button className="btn" onClick={() => confirmButton()}>Yes</button>
            </form>
          </div>
        </div>
      </dialog>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>About tech stack :</p>
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
