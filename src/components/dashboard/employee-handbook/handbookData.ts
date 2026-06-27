export type HandbookSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: { title: string; description: string }[];
  subsections?: { id: string; title: string; paragraphs: string[] }[];
};

export type HandbookPolicy = {
  id: string;
  label: string;
  version: string;
  lastUpdated: string;
  signatureStatus: "pending" | "signed";
  sections: HandbookSection[];
};

export const HANDBOOK_POLICIES: HandbookPolicy[] = [
  {
    id: "code-of-conduct",
    label: "Code of Conduct",
    version: "v2.4",
    lastUpdated: "Oct 12, 2023",
    signatureStatus: "pending",
    sections: [
      {
        id: "introduction",
        title: "1. Introduction",
        paragraphs: [
          "This Employee Handbook outlines the standards of behavior expected of all employees at Enterprise HRMS. It serves as a guide to our corporate culture, ethical principles, and professional responsibilities.",
          "By continuing employment, you agree to uphold these policies and represent our company values in every interaction—with colleagues, clients, and the public.",
        ],
      },
      {
        id: "core-values",
        title: "2. Core Values",
        bullets: [
          {
            title: "Integrity First",
            description:
              "We act honestly and transparently in all business dealings, even when no one is watching.",
          },
          {
            title: "Radical Transparency",
            description:
              "We share information openly within teams to build trust and enable better decisions.",
          },
          {
            title: "Human-Centric Execution",
            description:
              "We prioritize people—employees and customers—in every process, product, and policy we create.",
          },
        ],
      },
      {
        id: "workplace-environment",
        title: "3. Workplace Environment",
        paragraphs: [
          "We are committed to maintaining a safe, respectful, and inclusive workplace for everyone.",
        ],
        subsections: [
          {
            id: "anti-harassment",
            title: "3.1 Anti-Harassment",
            paragraphs: [
              "Harassment of any kind—including verbal, physical, or visual conduct—is strictly prohibited. Report incidents immediately to HR or your manager.",
            ],
          },
          {
            id: "diversity-inclusion",
            title: "3.2 Diversity & Inclusion",
            paragraphs: [
              "We celebrate diverse backgrounds and perspectives. Discrimination based on race, gender, religion, age, disability, or any protected characteristic will not be tolerated.",
            ],
          },
        ],
      },
      {
        id: "conflicts-of-interest",
        title: "4. Conflicts of Interest",
        paragraphs: [
          "Employees must avoid situations where personal interests conflict with company interests. Disclose any potential conflicts to HR before they arise.",
        ],
      },
      {
        id: "confidentiality",
        title: "5. Confidentiality",
        paragraphs: [
          "Protect company data, client information, and proprietary knowledge. Do not share confidential information outside the organization without written approval.",
        ],
      },
    ],
  },
  {
    id: "joining-policy",
    label: "Joining Policy",
    version: "v1.8",
    lastUpdated: "Jan 5, 2024",
    signatureStatus: "signed",
    sections: [
      {
        id: "onboarding-overview",
        title: "1. Onboarding Overview",
        paragraphs: [
          "All new hires complete a structured onboarding program during their first two weeks. This includes orientation, IT setup, policy acknowledgements, and team introductions.",
          "Your manager and HR partner will provide a personalized onboarding checklist on your first day.",
        ],
      },
      {
        id: "documentation",
        title: "2. Required Documentation",
        bullets: [
          {
            title: "Identity Verification",
            description: "Government-issued ID and proof of address must be submitted within 3 business days.",
          },
          {
            title: "Employment Contract",
            description: "Signed offer letter and employment agreement are required before system access is granted.",
          },
          {
            title: "Tax & Payroll Forms",
            description: "Complete all payroll and tax documentation through the employee portal.",
          },
        ],
      },
      {
        id: "probation-period",
        title: "3. Probation Period",
        paragraphs: [
          "New employees serve a 90-day probation period. Performance reviews occur at 30, 60, and 90 days. Confirmation is subject to satisfactory performance and conduct.",
        ],
      },
      {
        id: "equipment-access",
        title: "4. Equipment & Access",
        paragraphs: [
          "IT will provision laptop, email, and required software on day one. Return all company equipment upon separation. Report lost or damaged items immediately.",
        ],
      },
    ],
  },
  {
    id: "attendance-policy",
    label: "Attendance Policy",
    version: "v3.1",
    lastUpdated: "Mar 18, 2024",
    signatureStatus: "pending",
    sections: [
      {
        id: "working-hours",
        title: "1. Working Hours",
        paragraphs: [
          "Standard working hours are 9:00 AM to 6:00 PM, Monday through Friday, with a one-hour lunch break. Flexible start times (8:30–9:30 AM) are available with manager approval.",
        ],
      },
      {
        id: "attendance-tracking",
        title: "2. Attendance Tracking",
        paragraphs: [
          "All employees must clock in and out daily using the HRMS portal. Missing punches must be regularized within 48 hours with manager approval.",
        ],
      },
      {
        id: "late-arrivals",
        title: "3. Late Arrivals & Absences",
        bullets: [
          {
            title: "Grace Period",
            description: "A 10-minute grace period applies to clock-in. Repeated lateness may result in disciplinary action.",
          },
          {
            title: "Unplanned Absence",
            description: "Notify your manager before 9:30 AM if you cannot attend work. Apply for leave retroactively if needed.",
          },
        ],
      },
      {
        id: "remote-work",
        title: "4. Remote & Hybrid Work",
        paragraphs: [
          "Hybrid employees must be in office at least 3 days per week unless otherwise approved. Remote work days require prior manager consent and must be logged in the system.",
        ],
      },
    ],
  },
  {
    id: "security-policy",
    label: "Security Policy",
    version: "v2.0",
    lastUpdated: "Jun 1, 2024",
    signatureStatus: "signed",
    sections: [
      {
        id: "data-security",
        title: "1. Data Security",
        paragraphs: [
          "Protect all company and customer data. Use strong passwords, enable MFA where required, and never share credentials. Report suspected breaches to security@enterprise.com immediately.",
        ],
      },
      {
        id: "device-policy",
        title: "2. Device & Network Policy",
        bullets: [
          {
            title: "Company Devices",
            description: "Only approved software may be installed. Devices must have full-disk encryption enabled.",
          },
          {
            title: "Public Networks",
            description: "Use VPN when accessing company systems on public Wi-Fi. Do not process sensitive data on unsecured networks.",
          },
        ],
      },
      {
        id: "physical-security",
        title: "3. Physical Security",
        paragraphs: [
          "Wear your ID badge on office premises. Do not tailgate through secure doors. Escort visitors at all times and log them at reception.",
        ],
      },
      {
        id: "incident-reporting",
        title: "4. Incident Reporting",
        paragraphs: [
          "Report lost devices, phishing attempts, or unauthorized access within 1 hour. The security team will guide containment and remediation steps.",
        ],
      },
    ],
  },
  {
    id: "exit-policy",
    label: "Exit Policy",
    version: "v1.5",
    lastUpdated: "Aug 22, 2023",
    signatureStatus: "pending",
    sections: [
      {
        id: "resignation",
        title: "1. Resignation Process",
        paragraphs: [
          "Employees must provide written notice as per their employment contract (typically 30–60 days). Submit resignation through the HRMS portal and discuss transition plans with your manager.",
        ],
      },
      {
        id: "clearance",
        title: "2. Exit Clearance",
        bullets: [
          {
            title: "IT Clearance",
            description: "Return laptop, access cards, and revoke all system access on last working day.",
          },
          {
            title: "Finance Clearance",
            description: "Settle any outstanding advances or company dues. Final settlement is processed within 45 days.",
          },
          {
            title: "HR Exit Interview",
            description: "Complete exit interview and policy acknowledgement forms before departure.",
          },
        ],
      },
      {
        id: "knowledge-transfer",
        title: "3. Knowledge Transfer",
        paragraphs: [
          "Document ongoing work and hand over responsibilities during the notice period. Managers may assign a replacement or interim owner for critical tasks.",
        ],
      },
      {
        id: "post-employment",
        title: "4. Post-Employment Obligations",
        paragraphs: [
          "Confidentiality and non-solicitation obligations continue after employment ends. Do not retain company data or intellectual property after your last day.",
        ],
      },
    ],
  },
];

export function getPolicyById(id: string) {
  return HANDBOOK_POLICIES.find((p) => p.id === id) ?? HANDBOOK_POLICIES[0];
}
