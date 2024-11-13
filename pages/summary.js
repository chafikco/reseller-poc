import Link from "next/link";
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";

const projects = [
    {
      id: 1,
      name: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    // More projects...
  ]
  
  export default function Summary() {
    const [transactions, setTransactions] = useState([]);
    const [count, setCount] = useState({})

    useEffect(() => {
      const getTransactions = async () => {
        const response = await fetch("http://localhost:3000/api/getTransactions", { 
          method: "POST",         
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await response.json();
        setTransactions(data.transactionData.data)
      }
      getTransactions();
    }, []);
  
    console.log(transactions)
  
    useEffect(() => {
      const getTransactions = async () => {
        const response = await fetch("http://localhost:3000/api/getTransactions", { 
          method: "POST",         
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await response.json();
        setTransactions(data.transactionData.data)
      }
      getTransactions();
    }, []);
  
    const getInvoice = async (currentTxn) => {
      const response = await fetch("http://localhost:3000/api/getInvoice", { 
        method: "POST",         
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentTxn) 
      });
      const data = await response.json();
      let invoiceUrl = (data.invoiceUrl.data.url)
      window.open(invoiceUrl, "_blank")
    }

    useEffect(() => {
      let countSubTotal = transactions.reduce((a,v) =>  a = a + parseInt(v.details.totals.subtotal) , 0 )
      let countTax = transactions.reduce((a,v) =>  a = a + parseInt(v.details.totals.tax) , 0 )
      let countTotal = transactions.reduce((a,v) =>  a = a + parseInt(v.details.totals.total) , 0 )
      setCount({...count, subtotal: countSubTotal, tax: countTax, total: countTotal})
      console.log({...count, subtotal: countSubTotal, tax: countTax, total: countTotal});
    }, [transactions])
  
    return (
      <>
      <Navbar/>
      <div className="px-4 py-24 sm:px-24 lg:px-24">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Payment Summary for November 2024</h1>
            <p className="mt-2 text-sm text-gray-700">
              For orders created from <time dateTime="2024-11-01">November 1, 2024</time> to{' '}
              <time dateTime="2024-11-30">November 30, 2024</time>.
            </p>
            <p className="mt-4 mb-4 text-sm text-gray-700">
              Please see payment details below:
            </p>
            {/* inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 */}
            <div className="max-w-fit rounded-md bg-green-50 p-4 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            <div className="flex justify-between">
              <p className="text-gray-700 mr-10">Payment Reference:</p>
              <span className="font-bold text-black">9z8j1hj-2024-NOV</span>
            </div>
            <div className="flex justify-between my-1">
            <p className="text-gray-700 mr-10">IBAN:</p>
              <span className="font-bold text-black">GB38CHAS60924276977793</span>
            </div>
            <div className="flex justify-between">
            <p className="text-gray-700 mr-10">Bank Details:</p>
              <span className="font-bold text-black">JPMORGAN CHASE BANK, N.A.</span>
            </div>
            </div>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block ml-4 rounded-md bg-[#2b5486] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#337ab7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#337ab7"
            >
              Export
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
            </colgroup>
            <thead className="border-b border-gray-300 text-gray-900">
            <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Transaction ID
                  </th>

                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    PO Number
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Margin
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Plan
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Earnings
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Seat(s)
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap text-right px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Total Price
                  </th>
                  <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200">
                  <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">{transaction.id}</div>
                    <div className="mt-1 truncate text-gray-500">{transaction.status}</div>
                  </td>
                  <td className="py-5 pl-3 pr-4 text-sm text-gray-500 sm:pr-0">9z8j1hj-2024-NOV</td>
                  <td className="py-5 pl-3 pr-4 text-sm text-gray-500 sm:pr-0">15%</td>
                  <td className="py-5 pl-3 pr-4 text-sm text-gray-500 sm:pr-0">{transaction.items[0].price.name}</td>       
                  <td className="py-5 pl-3 pr-4 text-sm text-gray-500 sm:pr-0">{(parseInt(transaction.details.totals.total) * .0015).toLocaleString("en-gb", {style:"currency", currency:"GBP"})}</td>
                  <td className="py-5 pl-3 pr-4 text-sm text-gray-500 sm:pr-0">{transaction.items[0].quantity}</td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">{(parseInt(transaction.details.totals.total) / 100).toLocaleString("en-gb", {style:"currency", currency:"GBP"})}</td>
                  <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={ () => getInvoice(transaction.id) }
                      >
                      Invoice PDF
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={6}
                  className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Subtotal
                </th>
                <th scope="row" className="pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:hidden">
                  Subtotal
                </th>
                <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-0">{(parseInt(count.subtotal) / 100).toLocaleString("en-gb", {style:"currency", currency:"GBP"})}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={6}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Tax
                </th>
                <th scope="row" className="pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:hidden">
                  Tax
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-0">{(parseInt(count.tax) / 100).toLocaleString("en-gb", {style:"currency", currency:"GBP"})}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={6}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th scope="row" className="pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:hidden">
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">{(parseInt(count.total) / 100).toLocaleString("en-gb", {style:"currency", currency:"GBP"})}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
    )
  }
  