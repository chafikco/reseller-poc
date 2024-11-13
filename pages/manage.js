'use client'

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from '../components/ManageCard';

export default function Manage() {
  const [subs, setSubs] = useState([]);

  const [open, setOpen] = useState(false)

  const [currentSub, setCurrentSub] = useState()

  const [singleSub, setSingleSub] = useState({})

  useEffect(() => {
    const getSubs = async () => {
      const response = await fetch("http://localhost:3000/api/getSubscriptions", { 
        method: "POST",         
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      setSubs(data.subData.data)
    }
    getSubs();
  }, []);

    useEffect(() => {
      const getSingleSub = async () => {
        const response = await fetch("http://localhost:3000/api/getSubscription", { 
          method: "POST",         
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(currentSub) 
        });
        let data = await response.json();
        setSingleSub(data.subData.data)
      }
      getSingleSub()
    }, [currentSub])

  const handleOpen = (subId) => {
    setCurrentSub(subId)
    setOpen(true)
  }

  console.log(singleSub)

  return (    
    <>
    <Navbar/>
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-750 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-[650px] transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="h-full overflow-y-auto bg-white p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Subscription Details</h3>
                    <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-gray-500">Subscription ID</dt>
                        <dd className="text-gray-900">{singleSub ? singleSub.id : ""}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-gray-500">Status</dt>
                        <dd className="text-gray-900">{singleSub ? singleSub.status : ""}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-gray-500">Created at</dt>
                        <dd className="text-gray-900">{singleSub ? new Date(singleSub.created_at).toLocaleString() : ""}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-gray-500">Renews at</dt>
                        <dd className="text-gray-900">{singleSub ? new Date(singleSub.next_billed_at).toLocaleString() : ""}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-gray-500">Current Plan</dt>
                        <dd className="text-gray-900">{singleSub ? (singleSub.items ? singleSub.items[0].price.name : "") : ""}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-gray-500">Seats</dt>
                        <dd className="text-gray-900">{singleSub ? (singleSub.items ? singleSub.items[0].quantity : 0) : 0}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-gray-500">Last Bill Amount</dt>
                        <dd className="text-gray-900">{((singleSub ? (singleSub.next_transaction ? parseInt(singleSub.next_transaction.details.totals.total): "") : "") / 100).toLocaleString("en-GB", {style: "currency", currency: "GBP" })}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Update Subscription</h3>
                   <Card currentSubData={singleSub}/>
                   </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
    <div className="px-4 py-24 sm:px-24 lg:px-24">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Subscriptions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Please see all current active, past_due and cancelled subscriptions below. 
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Subscription ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Plan Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Renews at
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {subs.map((sub) => (
                  <tr key={sub.id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">

                        <div className="">
                          <div className="font-medium text-gray-900">{sub.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{sub.items[0].price.name}</div>
                      <div className="mt-1 text-gray-500">Seat(s): {sub.items[0].quantity}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {sub.status === "active" ? 
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {sub.status}
                      </span>
                      : <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      {sub.status}
                      </span> }
                    </td>
                    {sub.next_billed_at != null ?
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{new Date(sub.next_billed_at).toLocaleString()}</td>
                    : <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">n/a</td> }
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" onClick={() => handleOpen(sub.id)} className="text-indigo-600 hover:text-indigo-900">
                        Manage<span className="sr-only"></span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
