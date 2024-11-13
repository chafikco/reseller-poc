import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useNumberInput } from "@chakra-ui/react";
import { useState, useEffect } from 'react' 
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const plans = [
  { name: 'Standard', priceMonthly: '£111.08', priceYearly: '£3999', limit: '3,900+ models', price_id: 'pri_01jbpj85yevhvzv3g6qsgm1a0j' },
  { name: 'Pro', priceMonthly: '£124.91', priceYearly: '£1499', limit: '9,100+ models', price_id: 'pri_01jbpj9w8tp7jpa05ghb2amwmq' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Card(currentSubData) {
  const [selected, setSelected] = useState()

  const [showAlert, setShowAlert] = useState(false)

  const [pricePreview, setPricePreview] = useState()

  let subPayload = currentSubData.currentSubData
  console.log(subPayload)

  const [params, setParams] = useState({
    sub_id: "",
    newPriceId: plans.price_id,
    newQuantity: 0,
  })

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

  useEffect(() => {
	console.log(pricePreview);
  }, [pricePreview])

  const updateSub = async (params) => {
      const response = await fetch("http://localhost:3000/api/previewUpdateSubscription", { 
        method: "POST",         
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params) 
      });
      const data = await response.json();
      const preview = data.data
      setPricePreview(preview)
    }
    
  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm/6 font-semibold text-gray-900">Amount</dt>
            <dd className="mt-1 text-base font-semibold text-gray-900">{((pricePreview ? pricePreview.data.update_summary.charge.amount : "") / 100).toLocaleString("en-GB", {style: "currency", currency: "GBP" })} now</dd>
            <dd className="mt-1 text-base font-semibold text-gray-500">{((pricePreview ? pricePreview.data.next_transaction.details.totals.total : "") / 100).toLocaleString("en-GB", {style: "currency", currency: "GBP" })} recurring</dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Status</dt>
            <dd className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
              Preview
            </dd>
          </div>
          <div className="mt-6 flex w-full flex-none border-t border-gray-900/5 px-6 pt-6">
          <fieldset aria-label="Pricing plans">
            <RadioGroup value={selected} onChange={setSelected} className="relative -space-y-px rounded-md bg-white">
                {plans.map((plan, planIdx) => (
                <Radio
                    key={plan.name}
                    value={plan}
                    aria-label={plan.name}
                    onClick={() => setParams({ ...params, newPriceId: plan.price_id, sub_id: subPayload.id })}
                    aria-description={`${plan.priceYearly} per year`}
                    className={classNames(
                    planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                    planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                    'group relative flex cursor-pointer flex-col border border-gray-200 p-4 focus:outline-none data-[checked]:z-10 data-[checked]:border-indigo-200 data-[checked]:bg-indigo-50 md:grid md:grid-cols-3 md:pl-4 md:pr-6',
                    )}
                >
                    <span className="flex items-center text-sm">
                    <span
                        aria-hidden="true"
                        className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white group-data-[checked]:border-transparent group-data-[checked]:bg-indigo-600 group-data-[focus]:ring-2 group-data-[focus]:ring-indigo-600 group-data-[focus]:ring-offset-2"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="ml-3 font-medium text-gray-900 group-data-[checked]:text-indigo-900">{plan.name}</span>
                    </span>
                    <span className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                    <span className="font-medium text-gray-900 group-data-[checked]:text-indigo-900">
                        {plan.priceMonthly} / mo
                    </span>{' '}
                    <span className="text-gray-500 group-data-[checked]:text-indigo-700">({plan.priceYearly} / yr)</span>
                    </span>
                    <span className="ml-6 pl-1 text-sm text-gray-500 group-data-[checked]:text-indigo-700 md:ml-0 md:pl-0 md:text-right">
                    {plan.limit}
                    </span>
                </Radio>
                ))}
            </RadioGroup>
            </fieldset>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dd className="text-sm/6 text-gray-500">Extra Seat Count</dd>
          </div>
          <div className="mt-2 flex w-full flex-none gap-x-4 px-6">
          <div className="w-[125px] my-4 flex justify-between">
            <button
            	{...dec}
              onClick={() => setParams({...params, newQuantity: parseInt(input.value), sub_id: subPayload.id})}
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
              onClick={() => setParams({...params, newQuantity: parseInt(input.value), sub_id: subPayload.id})}
              type="button"
              className="rounded-full bg-[#2b5486] p-2 text-white shadow-sm hover:bg-[#337ab7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#337ab7]"
            >
              <PlusIcon aria-hidden="true" className="h-5 w-5" />
            </button>  
            </div>
          </div>
        </dl>
        <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
          <a href="#" onClick={() => updateSub(params)} className="text-sm/6 font-semibold text-gray-900">
            Preview <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="flex mt-4">
        <button
            type="button"
            onClick={() => setShowAlert(!showAlert)}
            className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        Confirm Update
        </button>
                <button
                className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                <Link
                    type="button"
                    href={subPayload ? subPayload.management_urls.cancel : ""}
                    target={"_blank"}
                >
                Cancel Subscription
                </Link>
            </button>
      </div>
      {showAlert && (
           <div className="rounded-md bg-green-50 mt-4 p-4">
           <div className="flex">
           <div className="shrink-0">
             <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
           </div>
           <div className="ml-3">
             <h3 className="text-sm font-medium text-green-800">Subscription Updated</h3>
             <div className="mt-2 text-sm text-green-700">
               <p>A new invoice reflecting the changes will be issued & sent to your email shortly.</p>
             </div>
             <div className="mt-4">
               <div className="-mx-2 -my-1.5 flex">
                 <button
                   type="button"
                   onClick={() => setShowAlert(!showAlert)}
                   className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                 >
                   Dismiss
                 </button>
               </div>
             </div>
           </div>
           </div>
         </div>
      )}
    </div>
    
  )
}
