"use client";

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import EditDocumentOutlinedIcon from '@mui/icons-material/EditDocument';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function Features() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full">
        {/* Web Top Header Area */}
        <div className="flex justify-between items-center px-[32px] py-[24px] sticky top-0 bg-surface/90 backdrop-blur-md z-30 border-b border-outline/30">
          <div>
            <h2 className="text-[30px] leading-[36px] tracking-[-0.01em] font-bold text-on-surface">
              Platform Features
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-on-surface-variant mt-[4px]">
              Explore the comprehensive suite of enterprise HR tools.
            </p>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="relative">
              {/* <SearchOutlinedIcon className="absolute left-[8px] top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" />
              <input
                className="pl-[32px] pr-[16px] py-[8px] bg-surface-container-low border border-outline rounded-full text-[14px] leading-[20px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                placeholder="Search features..."
                type="text"
              /> */}
            </div>
            <button className="px-8 py-3 bg-surface-container-lowest border border-outline rounded-xl hover:bg-surface-container-low transition flex items-center gap-2">
              Request Demo
            </button>
          </div>
        </div>

        <div className="p-[32px] space-y-[48px]">
          {/* Hero Section */}
          <section className="relative rounded-xl overflow-hidden bg-surface-container-high border border-outline/50 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
            <div className="relative p-[48px] grid grid-cols-1 lg:grid-cols-2 gap-[32px] items-center">
              <div>
                <span className="inline-block px-[8px] py-[4px] bg-primary/10 text-primary text-[12px] leading-[16px] tracking-[0.01em] font-medium rounded-full mb-[16px] border border-primary/20">
                  Unified Platform
                </span>
                <h3 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-on-surface mb-[16px]">
                  Everything you need to manage your workforce.
                </h3>
                <p className="text-[16px] leading-[24px] font-normal text-on-surface-variant mb-[32px] max-w-lg">
                  A single, intelligent source of truth for HR, payroll, and talent management designed for modern, efficient enterprises.
                </p>
                <div className="flex gap-[16px]">
                  <button className="mt-2 py-3 px-5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200">
                    Start Interactive Tour
                  </button>
                  <button className="mt-2 py-3 px-5 bg-surface-container-lowest hover:bg-surface-container-low rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200 text-on-surface border border-outline">
                    View Pricing
                  </button>
                </div>
              </div>
              <div className="relative h-64 lg:h-full min-h-[300px] rounded-lg overflow-hidden border border-outline/30 shadow-md">
                <img
                  alt="Platform Overview"
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHLia5ddI2t6qu3FmxvGei7Y2DcTxyEMcTbU4WamDaAJNBnwFCj2GJfdbjuBAm3yeEBRWZqKqNDX2kwUrH7EjuZ_BhuX2Io0-_JxEbk6vPStFtwfn7E1pFRPK3UxsKT5IC9L3Eilz7dH3xaVo7lrc8_tLZblcZ5EdxeiaqKxnCyxdhuElBQFJ3egdLdYjWJ11Aq0N4natRKOlSURqXy9a9cHZmOKID4qgbYTH8vQ8qU0ZTbQ_HROInFrMUGYISxFRx77bbENMZk1TP"
                />
              </div>
            </div>
          </section>

          {/* Core HR Management (Bento Grid) */}
          <section>
            <div className="mb-[24px]">
              <div className="flex items-center gap-[8px] mb-[4px]">
                <GroupsOutlinedIcon className="text-primary text-[24px]" />
                <h4 className="text-[24px] leading-[32px] tracking-[-0.01em] font-bold text-on-surface">
                  Core HR Management
                </h4>
              </div>
              <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant">
                Streamline your foundational HR processes with automated workflows and centralized data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              {/* Bento Item 1 (Large) */}
              <div className="md:col-span-2 bg-surface-container-lowest border border-outline rounded-xl p-[24px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <ContactPageOutlinedIcon className="text-primary mb-[16px] text-[32px]" />
                <h5 className="text-[20px] leading-[28px] tracking-[-0.01em] font-bold text-on-surface mb-[8px]">
                  Employee Directory &amp; Profiles
                </h5>
                <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant mb-[16px] max-w-md">
                  Maintain a rich, centralized database of all employee information. Easily search, filter, and view comprehensive profiles including reporting lines and contact details.
                </p>
                <div className="mt-auto pt-[16px] border-t border-outline/30 flex justify-between items-center">
                  <span className="text-[12px] leading-[16px] tracking-[0.01em] font-medium text-on-surface-variant">
                    Self-service updates enabled
                  </span>
                  <button className="mt-2 py-3 px-5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200">
                    Learn more
                    <ArrowForwardOutlinedIcon className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Bento Item 2 */}
              <div className="bg-surface-container-lowest border border-outline rounded-xl p-[24px] shadow-sm hover:shadow-md transition-shadow">
                <EditDocumentOutlinedIcon className="text-primary mb-[16px] text-[32px]" />
                <h5 className="text-[20px] leading-[28px] tracking-[-0.01em] font-bold text-on-surface mb-[8px]">
                  Document Management
                </h5>
                <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant">
                  Securely store and manage contracts, policies, and compliance documents.
                </p>
              </div>

              {/* Bento Item 3 */}
              <div className="bg-surface-container-lowest border border-outline rounded-xl p-[24px] shadow-sm hover:shadow-md transition-shadow">
                <RouteOutlinedIcon className="text-primary mb-[16px] text-[32px]" />
                <h5 className="text-[20px] leading-[28px] tracking-[-0.01em] font-bold text-on-surface mb-[8px]">
                  Onboarding Workflows
                </h5>
                <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant">
                  Automate provisioning and task assignment for new hires.
                </p>
              </div>

              {/* Bento Item 4 (Large) */}
              <div className="md:col-span-2 bg-surface-container-lowest border border-outline rounded-xl p-[24px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex gap-[24px] items-center h-full">
                  <div className="flex-1">
                    <AccountTreeOutlinedIcon className="text-primary mb-[16px] text-[32px]" />
                    <h5 className="text-[20px] leading-[28px] tracking-[-0.01em] font-bold text-on-surface mb-[8px]">
                      Organizational Charts
                    </h5>
                    <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant">
                      Visualize reporting structures dynamically based on directory data.
                    </p>
                  </div>
                  <div className="w-1/3 h-full min-h-[120px] bg-surface-container-low rounded-lg border border-outline/30 flex items-center justify-center">
                    <SchemaOutlinedIcon className="text-outline text-[48px]" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}