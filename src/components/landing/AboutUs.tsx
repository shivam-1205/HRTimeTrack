"use client";

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

export default function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Chief Executive Officer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2hVMim6x4ViSvc51aRfmJGo8iuM5HaRhP4scNkW7XIpEGsuOwlAhqvSzMTNlusEj8YhEwE5ml9bYimHgK2DtFvKktWLYuRgj8JFfjcC7qNaaPSKIe2xOtTimiXazFY4um3dp5GiFyUtQ2Xw_HPmsLeIjzEXehZ-KAEbqtv9p__ePLcbCWw51ecNhCCis8b06b8xcCCVPSSwe4_ThQi-thauPvE23sCPvqPWN2fdjFDsJiUQnXqIvAcJDdg5YzpvfhmHZ89eTSteb0",
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Chief Operating Officer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDVeH4GvjirrGoU7L-mVGPW9sOpIbtnItISC1aleA-nMISrZo2ihPoYsPJbW-mv6HFZidtBC5Ok41nnpArvpWGm-edvSC3_Lfu5uoRCgGypt-fw0pVRvTsv4Q4RKH8mOIWJQU6_cFvfuzmEaZYsZQhnYmQzXjjxv4trd_7jQA-oAXGg8n-gasN82WPxWoWmJH4K1vof3_rG5x9Rz-jWL7aAxWymeGi9iG5dFT51tWbonqMyUktlg2Ynsql9IRRW60nLL-UgxuLGft_0",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Chief Technology Officer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbUfhPB7OYPdMI7DaNf6tO_D7UyZ1iBvpo5MfVQdmDyCHYuauaFLGnx5whbAd2qaos4lJFmUXNgnIkVm55Nf2nI8FsACsGyt-_mrobmMaK2BEggBoh25io6ZH0YbmyIww1hz3k2sfH-80YiLMfJ_K89Au7W4OYpxiurUzLMYugmVFHO2Rq6aE4qwTvACVoHhKWEG9slI-GPrH7y_PHBEdmDMlhg6v7GkBWS6n7xjmX0Lu9O59dN0keLwRhQ49loWZui5fiJwyXA3rk",
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      role: "Chief Product Officer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAhJQobXgtRsvG33JCHo_exO58ObHT9qzZAm3iy3CgYvijtLSx4GrXCxf-pcuss_yNbtbp3ZRzct-56Jqt-6xYjRm1dNIg44ZWikQ30vdA7KUNCRsd730TZsMyr_FZ9onfDgifG_o1t85lDZ240xNPyI9q3V547kX7AYsvgusnesHMpzHO8eBkiJrHfNPWMutQITGyQmea3USoiwkk2ono1J0bNgBa6Bqcljlc9fEiq4JpIVbbLrj_t4BOol0gdLTyMDyJAZ6a5P7VU",
    },
  ];

  const timelineData = [
    {
      id: 1,
      year: "2019",
      title: "The Inception",
      description:
        "Founded with a single goal: to make enterprise tools feel as intuitive as consumer apps.",
    },
    {
      id: 2,
      year: "2021",
      title: "Global Expansion",
      description:
        "Expanded our footprint across three continents, supporting over 500 enterprise clients.",
    },
    {
      id: 3,
      year: "2024",
      title: "AI Integration",
      description:
        "Launched our next-generation platform featuring deeply integrated predictive HR analytics.",
    },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col ">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center overflow-hidden bg-surface-container-low px-[24px] py-[48px] lg:py-[80px]">
          {/* Decorative Gradient Blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[100px]"></div>
            <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[80px]"></div>
          </div>

          <div className="relative z-10 max-w-full mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-[32px] items-center">
            <div className="flex flex-col gap-[16px]">
              <span className="text-[13px] leading-[18px] font-medium text-primary tracking-wider uppercase">
                Our Mission
              </span>
              <h1 className="font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-on-surface mb-4">
                Redefining Work,
                <br />
                Empowering People.
              </h1>
              <p className="text-[16px] leading-[24px] font-normal text-on-surface-variant mb-4 max-w-lg">
                We build enterprise HRMS solutions that bridge the gap between
                high-performance systems and human-centric design. Calm
                productivity is at the core of everything we do.
              </p>
              <div className="flex gap-[16px] pt-[8px]">
                <button className=" mt-2 py-3 px-5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200">
                  Join the Team
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-xl overflow-hidden shadow-lg bg-surface-container-lowest/70 backdrop-blur-sm border border-outline/50">
                <img
                  alt="Team collaboration"
                  className="object-cover overflow-hidden rounded-xl shadow-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYuA0MlQvoeltCmcm0maR75x98Lf-bZtSMQnLxFXv2cviZLMVu-KGCkFimeJU-NDraQL97eR4I-fLUIUMYD6DyiExVq77iOKKSKKWTqixk0-0chS7RJl14Pin8u9dol7wNG05W69raydwN8jjcIxM7MXoveawgqqFrqpSjIqkJWxUnJCTrS1WAagc6hSFL0Kj7tNHfIBldIBjisMBMHlzkt7ToTqUlrFki7uJ9Tx-tIt8R_RZr1XghMOTlEas2AVZqECxPAIYXvf48"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className="bg-surface py-[48px] px-[24px] relative">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-[32px]">
              <h1 className="font-bold text-[30px] leading-[36px] text-on-surface mb-[8px]">
                Our Story
              </h1>
              <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant max-w-2xl mx-auto">
                The journey of simplifying enterprise complexity.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20"></div>
              
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row mb-[48px] last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[8px] md:left-1/2 top-6 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-lowest shadow-md transform -translate-x-1/2 z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-[40px] md:ml-0 w-full md:w-1/2 md:px-[48px]">
                    <div className="bg-surface-container-lowest backdrop-blur-md p-[24px] rounded-xl shadow-sm border border-outline hover:shadow-md transition-shadow">
                      <span className="text-primary font-semibold text-[13px] leading-[18px] mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="text-[20px] leading-[28px] font-bold text-on-surface mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[14px] leading-[20px] text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-[48px] px-[24px] bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-[32px]">
              <h2 className="font-bold text-[30px] leading-[36px] text-on-surface mb-[8px]">
                Leadership Team
              </h2>
              <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant max-w-xl mb-4">
                Guided by experienced professionals dedicated to transforming
                the modern workplace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="relative flex flex-col items-center bg-surface-container-lowest rounded-xl p-6 border border-outline hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-surface-container-lowest shadow-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[20px] leading-[28px] font-bold text-on-surface text-center">
                    {member.name}
                  </h3>
                  <span className="text-primary font-medium text-[13px] leading-[18px] mb-4 text-center">
                    {member.role}
                  </span>
                  <div className="flex gap-3 mt-auto text-outline">
                    <EmailOutlinedIcon className="hover:text-primary cursor-pointer text-[20px] transition-colors" />
                    <LinkOutlinedIcon className="hover:text-primary cursor-pointer text-[20px] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence / CTA */}
        <section className="py-[48px] px-[24px] bg-surface-container-high relative overflow-hidden">
          {/* Pattern Background */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          <div className="absolute inset-0 bg-primary/5 z-0"></div>

          <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch gap-8 xl:gap-12">
            {/* LEFT BOX */}
            <div 
              className="w-full lg:w-1/2 p-10 md:p-14 lg:p-10 rounded-2xl border border-outline/30 shadow-md bg-surface-container-lowest/70 backdrop-blur-md"
            >
              <h2 className="font-bold text-[30px] leading-[36px] text-on-surface mb-4">
                Global Presence, Local Focus
              </h2>
              <p className="text-[14px] leading-[20px] font-normal text-on-surface-variant mb-6">
                Our platform is trusted by enterprises across the globe. We
                maintain a robust infrastructure designed to comply with
                international data regulations while providing a localized,
                seamless experience for every employee.
              </p>
              <div className="grid grid-cols-2 gap-5 mb-8">
                <div>
                  <span className="block text-[42px] font-bold text-primary mb-2">
                    500+
                  </span>
                  <span className="text-[12px] leading-[16px] tracking-[0.01em] font-medium text-on-surface-variant uppercase tracking-wide">
                    Enterprise Clients
                  </span>
                </div>
                <div>
                  <span className="block text-[42px] font-bold text-primary mb-2">
                    40+
                  </span>
                  <span className="text-[12px] leading-[16px] tracking-[0.01em] font-medium text-on-surface-variant uppercase tracking-wide">
                    Countries Served
                  </span>
                </div>
              </div>
              <button className="mt-2 py-3 px-7 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-[13px] leading-[18px] font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                View Open Positions
                <ArrowForwardOutlinedIcon className="text-[18px]" />
              </button>
            </div>

            {/* RIGHT BOX */}
            <div className="w-full lg:w-1/2 min-h-[350px] md:min-h-[450px] rounded-2xl overflow-hidden shadow-sm border border-outline/20 relative bg-surface-container-lowest flex items-center justify-center">
              <PublicOutlinedIcon className="text-[120px] text-outline/20 absolute" />
              <div className="text-center z-10 px-4">
                <span className="text-[20px] leading-[28px] tracking-[-0.01em] font-bold text-on-surface-variant block mb-2">
                  Operating Worldwide
                </span>
                <span className="text-[14px] leading-[20px] font-normal text-on-surface-variant">
                  Interactive map visualization would render here
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}