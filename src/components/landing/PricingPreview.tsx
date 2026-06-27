"use client";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
export default function PricingPreview() {
   return (
    <main className="min-h-screen bg-surface text-on-background antialiased py-5 pb-10">
      <div className="max-w-full mx-auto px-6 flex flex-col gap-20">
        <section className="max-w-3xl mx-auto text-center pt-20 pb-10">
          <h1 className="text-5xl md:text-6xl font-semibold text-on-surface mb-6">
            Predictable pricing for modern teams
          </h1>
          <p className="text-lg text-on-surface-variant">
            Scale your enterprise operations with transparent tiers designed for growth, efficiency, and platform control. No hidden fees.
          </p>
        </section>

        <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-stretch">
          <div className="bg-surface-container-lowest border border-outline rounded-3xl p-8 flex flex-col h-[500px] shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-on-surface mb-2">Starter</h2>
              <p className="text-base text-on-surface-variant">Essential tools for growth.</p>
            </div>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-on-surface">$0</span>
              <span className="text-base text-on-surface-variant">/month</span>
            </div>
            <ul className="flex-grow flex flex-col gap-4 mb-8 text-on-surface">
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Up to 10 users
              </li>
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Basic reporting
              </li>
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Standard support
              </li>
            </ul>
            <button className="w-full py-4 rounded-2xl border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors cursor-pointer">
              Start Free Trial
            </button>
          </div>

          <div className="relative bg-surface-container-lowest border border-outline rounded-3xl p-8 flex flex-col h-[500px] shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary uppercase tracking-[0.2em] text-xs px-4 py-2 rounded-full shadow-sm">
              Most Popular
            </div>
            <div className="mb-8 pt-6">
              <h2 className="text-2xl font-semibold text-on-surface mb-2">Pro</h2>
              <p className="text-base text-on-surface-variant">Advanced enterprise features.</p>
            </div>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-on-surface">$149</span>
              <span className="text-base text-on-surface-variant">/month</span>
            </div>
            <ul className="flex-grow flex flex-col gap-4 mb-8 text-on-surface">
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Unlimited users
              </li>
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Priority 24/7 support
              </li>
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Custom workflows
              </li>
            </ul>
            <button className="w-full py-4 rounded-2xl border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors cursor-pointer">
              Get Started
            </button>
          </div>

          <div className="bg-surface-container-lowest border border-outline rounded-3xl p-8 flex flex-col h-[500px] shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-on-surface mb-2">Custom</h2>
              <p className="text-base text-on-surface-variant">Dedicated platform control.</p>
            </div>
            <div className="mb-10 flex items-center h-[53px]">
              <span className="text-5xl font-bold text-on-surface">Let's Talk</span>
            </div>
            <ul className="flex-grow flex flex-col gap-4 mb-8 text-on-surface">
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                Dedicated account manager
              </li>
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" />
                On-premise deployment
              </li>
              <li className="flex items-center gap-3 text-base">
                <CheckCircleOutlineOutlinedIcon className="text-primary" /          >
                Custom SLAs
              </li>
            </ul>
            <button className="w-full py-4 rounded-2xl border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors cursor-pointer">
              Contact Sales
            </button>
          </div>
        </section>

        <section className="w-full max-w-5xl mx-auto mb-10">
          <h3 className="text-3xl font-semibold text-on-surface mb-8 text-center">Feature Comparison</h3>
          <div className="bg-surface-container-lowest rounded-3xl border border-outline shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline">
                    <th className="p-5 text-md font-semibold text-on-surface w-2/5">Feature</th>
                    <th className="p-5 text-md font-semibold text-on-surface text-center w-1/5">Starter</th>
                    <th className="p-5 text-md font-semibold text-primary text-center w-1/5">Pro</th>
                    <th className="p-5 text-md font-semibold text-on-surface text-center w-1/5">Custom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-5 text-base text-on-surface">User Limit</td>
                    <td className="p-5 text-base text-on-surface-variant text-center">10</td>
                    <td className="p-5 text-base text-on-surface text-center font-medium">Unlimited</td>
                    <td className="p-5 text-base text-on-surface-variant text-center">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-5 text-base text-on-surface">Data History</td>
                    <td className="p-5 text-base text-on-surface-variant text-center">30 Days</td>
                    <td className="p-5 text-base text-on-surface text-center font-medium">1 Year</td>
                    <td className="p-5 text-base text-on-surface-variant text-center">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-5 text-base text-on-surface">Audit Logs</td>
                    <td className="p-5 text-center text-on-surface-variant">
                      <span className=" text-outline text-[20px]"><HorizontalRuleOutlinedIcon/></span>
                    </td>
                    <td className="p-5 text-center text-primary">
                      <span className=" text-primary text-[20px]"><CheckOutlinedIcon/></span>
                    </td>
                    <td className="p-5 text-center text-primary">
                      <span className=" text-primary text-[20px]"><CheckOutlinedIcon/></span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-5 text-base text-on-surface">API Access</td>
                    <td className="p-5 text-center text-on-surface-variant">
                      <span className=" text-outline text-[20px]"><HorizontalRuleOutlinedIcon/></span>
                    </td>
                    <td className="p-5 text-center text-primary">
                      <span className=" text-primary text-[20px]"><CheckOutlinedIcon/></span>
                    </td>
                    <td className="p-5 text-center text-primary">
                      <span className=" text-primary text-[20px]"><CheckOutlinedIcon/></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="w-full max-w-3xl mx-auto pb-10">
          <h3 className="text-3xl font-semibold text-on-surface mb-8 text-center">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-4">
            <div className="bg-surface-container-lowest rounded-3xl border border-outline p-6">
              <h4 className="text-xl font-semibold text-on-surface mb-2">Can I change my plan later?</h4>
              <p className="text-base text-on-surface-variant">Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected on your next billing cycle.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-3xl border border-outline p-6">
              <h4 className="text-xl font-semibold text-on-surface mb-2">What payment methods do you accept?</h4>
              <p className="text-base text-on-surface-variant">We accept all major credit cards, PayPal, and wire transfers for annual enterprise contracts.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-3xl border border-outline p-6">
              <h4 className="text-xl font-semibold text-on-surface mb-2">Is there a discount for annual billing?</h4>
              <p className="text-base text-on-surface-variant">Yes, we offer a 20% discount on all plans when you choose to be billed annually instead of monthly.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
     );
}



