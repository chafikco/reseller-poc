import Link from 'next/link'
import Navbar from '../components/Navbar';

export default function Example() {

  let resellerName = "Paddle Ltd.";
  
  const tiers = [
    {
      name: 'create-order',
      id: 'create-order',
      href: '/order',
      header: "Create New Order",
      priceId: { monthly: 'pri_01gswn2pwscp9j6btjb6rkj1f4', annually: 'pri_01gswn2btpmzsss87d9rn2arnj' },
      description: 'Get the latest pricing for Lumion products, provide quotes for your customers in real time, and create orders instantly',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
    {
      name: 'upgrade-sub',
      id: 'upgrade-sub',
      href: '/manage',
      header: "Manage Subscriptions",
      priceId: { monthly: 'pri_01gswn2pwscp9j6btjb6rkj1f4', annually: 'pri_01gswn2btpmzsss87d9rn2arnj' },
      description: 'View & upgrade/downgrade all of your customers subscriptions, see their next renewal price, and cancel or turn off auto-renewal',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
    {
      name: 'Standard',
      id: 'tier-standard',
      href: '/history',
      header: "View All Payments",
      priceId: { monthly: 'pri_01gswn2pwscp9j6btjb6rkj1f4', annually: 'pri_01gswn2btpmzsss87d9rn2arnj' },
      description: 'View all previous orders & payments, generate financial reports & view your monthly payment summary',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (
    <>
    <Navbar/>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-[#2b5486]">Dashboard</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[#2b5486] sm:text-5xl">
            Welcome {resellerName}, to your Reseller Portal
          </p>
        </div>
        <p className="mx-auto mt-6 mb-10 max-w-2xl text-center text-lg leading-8 text-[#2b5486]">
          Here you can create new orders, manage plans & see upcoming payments/renewals.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-3 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:grid-rows-1">
          
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'bg-[#2b5486]/5 ring-2 ring-[#2b5486]' : 'ring-1 ring-[#2b5486]/10',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
                <p className="text-2xl font-bold tracking-tight text-[#2b5486]">{tier.header}</p>
                <p className="mt-4 text-sm leading-6 text-[#2b5486]">{tier.description}</p>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-[#2b5486] text-white shadow-sm hover:bg-[#b8d6ed] hover:text-[#2b5486] focus-visible:outline-indigo-500'
                    : 'bg-[#2b5486] text-white shadow-sm hover:bg-[#b8d6ed] focus-visible:outline-indigo-500',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                Click to Continue
              </Link>
              {/* <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-[#2b5486] xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-[#2b5486]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  )
}