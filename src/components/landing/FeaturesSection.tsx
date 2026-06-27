// components/landing/features/FeaturesSection.tsx
"use client";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MonitoringIcon from '@mui/icons-material/LegendToggleOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlineOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-full mx-auto px-6 py-24 relative">
      <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] rounded-full bg-primary/20 opacity-30 blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 -ml-[10%] -mb-[10%] rounded-full bg-surface-variant opacity-50 blur-3xl z-0" />

      <div className="relative text-center mb-16">
        <h2 className="text-4xl font-bold text-on-surface mb-4">
          Everything you need, unified.
        </h2>

        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          A comprehensive suite of tools designed to handle complex organizational structures with elegant simplicity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(250px,auto)]">
        <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-3xl border border-outline shadow-sm p-8 flex flex-col md:flex-row gap-8 overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="flex-1 flex flex-col justify-center z-10">
            <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-4">
              <AccountTreeIcon fontSize="small" className="text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-on-surface mb-3">
              Multi-tenant Architecture
            </h3>
            <p className="text-sm text-on-surface-variant leading-7">
              Manage multiple subsidiaries, regions, or brands from a single, centralized dashboard with distinct access controls and localized policies.
            </p>
          </div>

          <div className="flex-1 bg-surface-container-low rounded-3xl border border-outline/50 p-4 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-shadow duration-300">
            <div className="w-full flex flex-col gap-3">
              <div className="h-8 w-[60%] bg-surface-container-lowest rounded-full shadow-sm border border-outline flex items-center px-3 gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="h-2 w-16 bg-surface-variant rounded-full" />
              </div>
              <div className="h-8 w-[80%] bg-surface-container-lowest rounded-full shadow-sm border border-outline flex items-center px-3 gap-3 ml-8">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <div className="h-2 w-20 bg-surface-variant rounded-full" />
              </div>
              <div className="h-8 w-[70%] bg-surface-container-lowest rounded-full shadow-sm border border-outline flex items-center px-3 gap-3 ml-10">
                <div className="w-2 h-2 rounded-full bg-primary/70" />
                <div className="h-2 w-12 bg-surface-variant rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-surface-container-lowest rounded-3xl border border-outline shadow-sm p-8 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
            <MonitoringIcon sx={{ fontSize: 150 }} className="text-primary rounded-2xl" />
          </div>
          <div className="flex-1 flex flex-col z-10">
            <div className="w-11 h-11 bg-surface-container-low flex items-center justify-center text-primary mb-4 rounded-xl ">
              <MonitoringIcon fontSize="small" className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-on-surface mb-3">
              Predictive Analytics
            </h3>
            <p className="text-sm text-on-surface-variant leading-7">
              Forecast hiring needs and identify flight risks before they impact your organization.
            </p>
          </div>
        </div>

        <div className="col-span-1 bg-surface-container-lowest rounded-3xl border border-outline shadow-sm p-8 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute bottom-0 right-0 p-6 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
            <GavelIcon sx={{ fontSize: 150 }} className="text-primary rounded-2xl" />
          </div>
          <div className="flex-1 flex flex-col z-10">
            <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-4">
              <GavelIcon fontSize="small" className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-on-surface mb-3">
              Global Compliance
            </h3>
            <p className="text-sm text-on-surface-variant leading-7">
              Automated adherence to local labor laws, tax codes, and reporting requirements across 150+ countries.
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-3xl border border-outline shadow-sm p-8 flex flex-col md:flex-row gap-8 overflow-hidden relative group hover:shadow-md transition-shadow">
          <div className="flex-1 bg-surface-container-low rounded-3xl border border-outline/50 p-4 flex items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-[220px] flex flex-col gap-4">
              <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-outline p-3 flex items-center gap-3">
                <MailOutlineIcon fontSize="large" className="text-primary" />
                <div className="flex-1 h-4 bg-surface-variant rounded-full" />
              </div>
              <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-outline p-3 flex items-center gap-3 opacity-80">
                <DescriptionIcon fontSize="small" className="text-primary" />
                <div className="flex-1 h-2 bg-surface-variant rounded-full" />
              </div>
              <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-outline p-3 flex items-center gap-3 opacity-60">
                <LaptopMacIcon fontSize="small" className="text-primary" />
                <div className="flex-1 h-2 bg-surface-variant rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center z-10">
            <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-4">
              <RocketLaunchIcon fontSize="small" className="text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-on-surface mb-3">
              Frictionless Onboarding
            </h3>
            <p className="text-sm text-on-surface-variant leading-7">
              Create self-guided digital journeys that integrate IT provisioning, document signing, and cultural immersion from day zero.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
