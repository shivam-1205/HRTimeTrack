"use client";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
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
      year: "2021",
      title: "Global Expansion",
      description:
        "Expanded our footprint across three continents, supporting over 500 enterprise clients.",
    },
    {
      id: 2,
      year: "2022",
      title: "AI Integration",
      description:
        "Introduced AI-powered automation tools to streamline HR workflows and payroll systems.",
    },
    {
      id: 3,
      year: "2026",
      title: "Enterprise Growth",
      description:
        "Scaled infrastructure globally with advanced analytics and workforce management solutions.",
    },
  ];
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative min-h-full flex items-center justify-center overflow-hidden bg-surface-container-low px-lg py-2xl">
          {/* Decorative Gradient Blobs */}

          <div className="relative z-10  mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-xl items-center ">
            <div className="flex flex-col gap-lg">
              <h2 className=" text-primary tracking-wider uppercase">
                Our Mission
              </h2>
              <h1 className="font-bold text-display text-6xl mb-4  text-on-surface">
                Redefining Work,
                <br />
                Empowering People.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-4 max-w-lg">
                We build enterprise HRMS solutions that bridge the gap between
                high-performance systems and human-centric design. Calm
                productivity is at the core of everything we do.
              </p>
              <div className="flex gap-md pt-sm">
                <button className=" mt-2 py-3 px-5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200">
                  Join the Team
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Team collaboration"
                className="object-cover overflow-hidden rounded-xl shadow-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYuA0MlQvoeltCmcm0maR75x98Lf-bZtSMQnLxFXv2cviZLMVu-KGCkFimeJU-NDraQL97eR4I-fLUIUMYD6DyiExVq77iOKKSKKWTqixk0-0chS7RJl14Pin8u9dol7wNG05W69raydwN8jjcIxM7MXoveawgqqFrqpSjIqkJWxUnJCTrS1WAagc6hSFL0Kj7tNHfIBldIBjisMBMHlzkt7ToTqUlrFki7uJ9Tx-tIt8R_RZr1XghMOTlEas2AVZqECxPAIYXvf48"
              />
            </div>
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className=" bg-[#f9f9ff] py-2xl px-lg ">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-indigo-200 opacity-30 blur-3xl" />

          <div className="text-center mb-16 relative z-10">
            <div className="text-center mb-xl">
              <h1 className="font-bold text-3xl text-on-surface mb-sm">
                Our Story
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                The journey of simplifying enterprise complexity.
              </p>
            </div>
            <div className="relative border-l-2 border-primary ml-4 md:ml-1/2 md:-translate-x-1/2 pl-8 md:pl-0 max-w-4xl mx-auto space-y-5 text-start">
              {timelineData.map((item) => (
                <div
                  key={item.id}
                  className="relative md:w-1/2 md:ml-auto md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute top-0 -left-[41px] md:-left-[9px] w-4 h-4 rounded-full bg-primary border-4 border-white"></div>

                  {/* Card */}
                  <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <span className="text-primary font-semibold mb-2 block">
                      {item.year}
                    </span>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-2xl px-lg bg-surface-container-lowest">
          <div className="max-w-full mx-auto">
            <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
              <div>
                <h2 className="font-bold text-3xl text-on-surface mb-sm">
                  Leadership Team
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-4">
                  Guided by experienced professionals dedicated to transforming
                  the modern workplace.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className=" relative flex flex-col items-center bg-surface-container-low rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 text-center">
                    {member.name}
                  </h3>

                  <span className="text-indigo-600 font-medium mb-4 text-center">
                    {member.role}
                  </span>

                  <div className="flex gap-3 mt-auto text-gray-400">
                    <EmailOutlinedIcon className="hover:text-indigo-600 cursor-pointer text-[20px]" />
                    <LinkOutlinedIcon className="hover:text-indigo-600 cursor-pointer text-[20px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence / CTA */}
   <section className="py-2xl px-5 bg-surface-container-high relative overflow-hidden">
  
  <div className="absolute inset-0 bg-primary/5 z-0"></div>

  <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 xl:gap-12">

    {/* LEFT BOX */}
    <div className="w-full lg:w-1/2 bg-white/70 backdrop-blur-md p-10 md:p-14 lg:p-20 rounded-2xl border border-outline-variant/30 shadow-md">
      
      <h2 className="font-bold text-4xl text-on-surface mb-4">
        Global Presence, Local Focus
      </h2>

      <p className="font-body-md text-body-md text-on-surface-variant mb-4">
        Our platform is trusted by enterprises across the globe. We
        maintain a robust infrastructure designed to comply with
        international data regulations while providing a localized,
        seamless experience for every employee.
      </p>

      <div className="grid grid-cols-2 gap-5 mb-4">
        
        <div>
          <span className="block font-display text-[42px] font-bold text-primary mb-4">
            500+
          </span>

          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wide">
            Enterprise Clients
          </span>
        </div>

        <div>
          <span className="block font-display text-[42px] font-bold text-primary mb-4">
            40+
          </span>

          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wide">
            Countries Served
          </span>
        </div>

      </div>

      <button className="mt-2 py-3 px-7 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
        
        View Open Positions

        <span className="material-symbols-outlined text-[18px]">
          <ArrowForwardOutlinedIcon />
        </span>

      </button>

    </div>

    {/* RIGHT BOX */}
    <div className="w-full lg:w-1/2 min-h-[350px] md:min-h-[450px] rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 relative bg-surface-container-lowest flex items-center justify-center">
      
      <span className="material-symbols-outlined text-[120px] text-outline-variant/20 absolute">
        public
      </span>

      <div className="text-center z-10 px-4">

        <span className="font-h3 text-h3 text-on-surface-variant block mb-sm">
          Operating Worldwide
        </span>

        <span className="font-body-md text-body-md text-outline">
          Interactive map visualization would render here
        </span>

      </div>

    </div>

  </div>

</section>
      </main>

      <style jsx global>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .pattern-dots {
          background-img: radial-gradient(
            rgba(53, 37, 205, 0.1) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
