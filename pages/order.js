'use client'

import { useEffect, useState } from "react";
import { useNumberInput, Button, Image } from "@chakra-ui/react";
import { initializePaddle } from '@paddle/paddle-js';
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Navbar from "../components/Navbar";
import Dropdown from "../components/Dropdown";

export default function Order() {
     // initial array configuration for plan
  const [params, setParams] = useState({
			quantity: 1,
			priceId: "pri_01jbpj85yevhvzv3g6qsgm1a0j"
  });

  useEffect(() => {
	console.log(params);
  }, [params])

  // -------- all below is quantity component
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 1,
      min: 1,
      max: 100,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  // -------- all above is quantity component

  const [totals, setTotals] = useState(null);

  //state for toast message
  const [show, setShow] = useState(false)

  //order info for toast message
  const [orderInfo, setOrderInfo] = useState({
    id: null
  })

  const [paddle, setPaddle] = useState();

  useEffect(() => {
		initializePaddle({ environment: 'sandbox', token: 'test_4cd800f93e1f3c8969c57bea9f2', eventCallback: (event) => {
      		console.log(event)
    } }).then(
      (paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    ).catch((error) => {
      console.log(error);
      if (errorCallback) {
        errorCallback(error);
      }
    });
  }, []);

  useEffect(() => {
    if (paddle && params.priceId && paddle.Initialized) {
      paddle?.PricePreview({
        items: [{
            quantity: params.quantity,
            priceId: params.priceId,
          },
        ],
        address: {
          countryCode: 'GB'
        }
      }).then((result) => {
          setTotals(result)
        })
        .catch((error) => {
          console.error(error);
        });
      }
  }, [paddle, params.priceId, params.quantity])

  const createTransaction = async (params) => {
    const response = await fetch("http://localhost:3000/api/createTransaction", { 
    method: "POST",         
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params) 
    });
    const orderData = await response.json();
    setOrderInfo({
      id: orderData.data.data.id
    })
    setShow(true)
  }

  return (
    <>
    <Navbar/>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl min-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#2b5486] sm:text-4xl">
			        Discover our Plans
            </h2>
            <p className="mt-6 text-xl leading-8 text-[#2b5486]">
			        Choose your plan term, number of seats, and generate a quote with up-to-date pricing information. Once you're happy with your quote, click confirm to create your order.  
            </p>
           </div>
            <div className="m-auto mt-16 rounded-2xl max-w-4xl ring-2 ring-[#2b5486] sm:mt-20 lg:mx-auto lg:flex">
			        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              	<div className="py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-24">
                <div className="mx-auto max-w-s px-4">
                  <Image
                    src="https://assets.lumion.com/f/180614/x/2e1c624631/lumion-pro-blue.svg"
                    alt="lumion"
                    className={"m-auto mb-8"}
                  />
                  <Dropdown/>
                  <p className="mt-4 mb-4 text-base leading-7 text-[#2b5486]">
                  Choose your plan frequency:
                  </p>
                  <Button className="mr-2 focus:bg-[#2b5486] focus:text-white"
                    onClick={() => {
                      setParams({...params, priceId: "pri_01jbpj85yevhvzv3g6qsgm1a0j"})
                    }}
                  >
                  1-Year
                  </Button>
                  <Button className="focus:bg-[#2b5486] focus:text-white"
                    onClick={() => {
                      setParams({...params, priceId: "pri_01jbpj9w8tp7jpa05ghb2amwmq"})
                    }}
                  >
                  3-Year
                  </Button>
                  <p className="mt-6 text-base leading-7 text-[#2b5486]">
                  Choose the number of seats for your plan:
                  </p>
                  <div className="max-w-[125px] my-4 m-auto flex justify-between">
                  <button
                    {...dec}
                    onClick={() => setParams({...params, quantity: parseInt(input.value)})}
                    type="button"
                    className="rounded-full bg-[#2b5486] p-2 text-white shadow-sm hover:bg-[#337ab7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#337ab7]"
                  >
                    <MinusIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                    <input
                      {...input}
                      placeholder="1"
                      className="block w-[40px] rounded-md border-0 py-1.5 text-[#2b5486] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2b5486] sm:text-sm/6"
                    />
                  <button
                    {...inc}
                    onClick={() => setParams({...params, quantity: parseInt(input.value)})}
                    type="button"
                    className="rounded-full bg-[#2b5486] p-2 text-white shadow-sm hover:bg-[#337ab7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#337ab7]"
                  >
                    <PlusIcon aria-hidden="true" className="h-5 w-5" />
                  </button>  
                  </div>
                </div>
            	</div>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="bg-white/10 rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-24">
                <div className="mx-auto max-w-xs px-4">
                  <h2
                    id="summary-heading"
                    className="text-3xl font-medium text-[#2b5486]"
                  >
                    Order summary
                  </h2>
                  <dl className="mt-6 space-y-4">
                    {totals != null
                      ? totals.data.details.lineItems.map((totals, index) => (
                          <div
                            key={totals.quantity}
                            className="flex items-center justify-between"
                          >
								<dt className="text-base text-[#2b5486]">
								{totals.price.name} x {totals.quantity}
								</dt>
								<dd className="text-base font-medium text-[#2b5486]">
								{totals.formattedTotals.subtotal}
								</dd>
                          </div>
						  
                        ))
                      : ""}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="flex text-base text-[#2b5486]">
                        <span>
                          Tax @{" "}
                          {totals != null
                            ? totals.data.details.lineItems[0].taxRate *
                              100
                            : "0"}
                          %
                        </span>
                      </dt>
                      <dd className="text-base font-medium text-[#2b5486]">
                        {totals != null
                          ? totals.data.details.lineItems[0].formattedTotals.tax
                          : ""}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-base font-medium text-[#2b5486]">
                        Order total
                      </dt>
                      <dd className="text-base font-medium text-[#2b5486]">
                        {totals != null
                          ? totals.data.details.lineItems[0].formattedTotals.total
                          : ""}{" "}
                        per{" "}
						{totals != null
                          ? totals.data.details.lineItems[0].price.billingCycle.frequency
                          : ""}{" "}
                        {totals != null
                          ? totals.data.details.lineItems[0].price.billingCycle.interval
                          : ""}{"(s)"}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6">
					          <button
                      type="submit"
                      className="w-full mt-4 rounded-md border border-transparent bg-[#2b5486] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#337ab7] focus:outline-none focus:ring-2 focus:ring-[#337ab7] focus:ring-offset-2 focus:ring-offset-gray-50"
					           onClick={() => { createTransaction(params) }}
                    >
                      Confirm Order
                    </button>
                  </div>
                  <p className="mt-6 text-xs leading-5 text-[#2b5486]">
                    Once you click confirm, you agree to our terms and conditions as stated in your reseller agreement.  The order will be immediately generated and an invoice will be sent to your email.
					          This invoice should be ignored, and payment should be made at the end of the month. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
	  {/* Toast message below */}
	  <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={show}>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-3 w-500 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Order {orderInfo.id} created!</p>
                    <p className="mt-1 text-sm text-gray-500">You should receive an order confirmation email soon.</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShow(false)
                      }}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
