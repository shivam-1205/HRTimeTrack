export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  avatar: string;
};

export const DIRECTORY_STATS = {
  totalEmployees: "1,248",
  newJoiners: "24",
  departments: "12",
} as const;

export const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Design",
  "Marketing",
  "Product Management",
  "Human Resources",
] as const;

export const LOCATIONS = [
  "All Locations",
  "New York",
  "London",
  "Remote",
] as const;

export const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (EST)",
    email: "s.jenkins@enterprise.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApZHU6w6rj8SoCx2OQtfZu8nQxrdCnmYnBPGOfbS6nnbSwYPHqyEt-VYnRJvylrPlfvmN57bMSSllqqIHjvjtRcE3QpVagtNv9nLqzpddKVtGHJ2npAvten3e3laVe2zqCajQZuNFWW9kRgB9X--myjRXl42uq5-DKfGjEgUn-xM4REpP3s5VNSRgviNukvTMyLEf6d4XqB3BXaaexq8FaMrEovgSGbE5LAhw6YYBLhmhkOibJCr1w6YuIyD3J9Tz3DdeoGT1-D1gw",
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Product Lead",
    department: "Product Management",
    location: "New York HQ",
    email: "m.chen@enterprise.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDU1Xe5C3QiTIRfHX_8fMbQ2sraRP16hyyN8FlFlP0_rCilRFxBF9QlP-nWXhK1rsem3O6H6zWjoxD8q0zLVU7dkXRrcrgXvx7hMIb2qTMCz_ueGSGHhHo568WHlyhqg_NsMQrBJ9PUVJmtspLjzXN_HDIPmsbjwmjbohjJY3RoS6klm7-DSaI9xU-tXTGsNRaOrL7lSUjG4O10jlG8FuqgynQehpYwZ61DRb9_q6mYKTcSOiZumxaNSe64D2GAYa3ZueHY0Z0rF6VO",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "HR Director",
    department: "Human Resources",
    location: "London Office",
    email: "e.rodriguez@enterprise.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-5TeymVZN-43IlgxI7yMyrKNplON6Ea_eKhFiLpPexM1ywbV4YMNIMSWVDdphjAwhoWN6HOd09Z6Jl2HLsYuYFCYDMRT4Al68b6wcsKOIvLB-IUmFAhDgfKm9DBbC3Q1JHp2Loew2ogjI4kOwUdwJE73jhGSjqBqgvzvcc2z4LM2kEBKwoqB4CNwV6hjq0wN4qwqhE-ITEYbbz4eF3PhpurZqOx3e651Kscc9R-IoVeGU7ENazwwVfxLsmJqVbXJP4L7hpE0YO0su",
  },
];
