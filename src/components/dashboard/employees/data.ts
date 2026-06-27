export type EmployeeRecord = {
  id: string;
  name: string;
  department: string;
  designation: string;
  phone: string;
  joiningDate: string;
  email: string;
  location: string;
  employeeId: string;
  manager: string;
  status: "Active" | "On Leave";
  avatar?: string;
};

export const EMPLOYEE_LIST: EmployeeRecord[] = [
  {
    id: "1",
    name: "Shivam Singh",
    department: "FRONT-END",
    designation: "Full Stack",
    phone: "8208746919",
    joiningDate: "Sep 1, 2025",
    email: "shivam.singh@enterprise.com",
    location: "San Francisco, CA",
    employeeId: "EMP-1024",
    manager: "Alex Mercer",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    department: "ENGINEERING",
    designation: "Senior Frontend Engineer",
    phone: "8208746920",
    joiningDate: "Jan 15, 2024",
    email: "s.jenkins@enterprise.com",
    location: "Remote (EST)",
    employeeId: "EMP-1008",
    manager: "Marcus Chen",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApZHU6w6rj8SoCx2OQtfZu8nQxrdCnmYnBPGOfbS6nnbSwYPHqyEt-VYnRJvylrPlfvmN57bMSSllqqIHjvjtRcE3QpVagtNv9nLqzpddKVtGHJ2npAvten3e3laVe2zqCajQZuNFWW9kRgB9X--myjRXl42uq5-DKfGjEgUn-xM4REpP3s5VNSRgviNukvTMyLEf6d4XqB3BXaaexq8FaMrEovgSGbE5LAhw6YYBLhmhkOibJCr1w6YuIyD3J9Tz3DdeoGT1-D1gw",
  },
  {
    id: "3",
    name: "Marcus Chen",
    department: "PRODUCT",
    designation: "Product Lead",
    phone: "8208746921",
    joiningDate: "Mar 8, 2023",
    email: "m.chen@enterprise.com",
    location: "New York HQ",
    employeeId: "EMP-0992",
    manager: "Elena Rodriguez",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDU1Xe5C3QiTIRfHX_8fMbQ2sraRP16hyyN8FlFlP0_rCilRFxBF9QlP-nWXhK1rsem3O6H6zWjoxD8q0zLVU7dkXRrcrgXvx7hMIb2qTMCz_ueGSGHhHo568WHlyhqg_NsMQrBJ9PUVJmtspLjzXN_HDIPmsbjwmjbohjJY3RoS6klm7-DSaI9xU-tXTGsNRaOrL7lSUjG4O10jlG8FuqgynQehpYwZ61DRb9_q6mYKTcSOiZumxaNSe64D2GAYa3ZueHY0Z0rF6VO",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    department: "HR",
    designation: "HR Director",
    phone: "8208746922",
    joiningDate: "Jun 20, 2022",
    email: "e.rodriguez@enterprise.com",
    location: "London Office",
    employeeId: "EMP-0871",
    manager: "Alex Mercer",
    status: "On Leave",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-5TeymVZN-43IlgxI7yMyrKNplON6Ea_eKhFiLpPexM1ywbV4YMNIMSWVDdphjAwhoWN6HOd09Z6Jl2HLsYuYFCYDMRT4Al68b6wcsKOIvLB-IUmFAhDgfKm9DBbC3Q1JHp2Loew2ogjI4kOwUdwJE73jhGSjqBqgvzvcc2z4LM2kEBKwoqB4CNwV6hjq0wN4qwqhE-ITEYbbz4eF3PhpurZqOx3e651Kscc9R-IoVeGU7ENazwwVfxLsmJqVbXJP4L7hpE0YO0su",
  },
];

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
