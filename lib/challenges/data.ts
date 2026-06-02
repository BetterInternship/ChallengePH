export type ChallengePhChallenge = {
  id: string;
  host: string;
  sector: string;
  title: string;
  shortTitle: string;
  reward: string;
  rewardType: string;
  deadline: string;
  location: string;
  difficulty: string;
  summary: string;
  problem: string;
  whyItMatters: string;
  brief: string[];
  eligibility: string[];
  deliverables: string[];
  timeline: Array<{
    label: string;
    detail: string;
  }>;
  judgingCriteria: string[];
  tags: string[];
  accent: string;
  logo?: string;
  overviewSections?: Array<{
    title: string;
    paragraphs?: string[];
    items?: string[];
    subsections?: Array<{
      title: string;
      paragraphs?: string[];
      items?: string[];
    }>;
  }>;
  overviewMarkdown?: string;
  winningCriteria?: Array<{
    criteria: string;
    weight: string;
    description: string;
  }>;
  successMetrics?: string[];
  objective?: string;
  submissionCalloutTitle?: string;
};

export const challengePhChallenges: ChallengePhChallenge[] = [
  {
    id: "browhaus-booking-operations",
    host: "Browhaus",
    sector: "Service operations and customer experience",
    title: "Beyond the Spreadsheet: Reimagining how Browhaus handles bookings",
    shortTitle: "Beyond the Spreadsheet",
    reward: "PHP30,000 prize pool + bring your solution to life",
    rewardType: "Prize pool plus Browhaus pilot opportunity",
    deadline: "July 18, 2026",
    location: "Philippines",
    difficulty: "Intermediate",
    summary:
      "Redesign how Browhaus manages bookings behind the scenes so teams can work with more clarity, less friction, and greater care.",
    problem:
      "Every growing business eventually reaches the same moment: the tools that once helped them move fast begin to hold them back. For Browhaus, that moment is happening in booking operations. Today, appointments are managed through Google Sheets shared across internal teams. It is familiar and flexible, but as daily booking volume grows, the workflow becomes harder to manage with speed, accuracy, and confidence.",
    whyItMatters:
      "This challenge asks you to redesign how Browhaus manages bookings behind the scenes. A better system could help staff spend less time searching, updating, and coordinating, and more time serving customers well. ",
    brief: [
      "Map the current booking flow: customer inquiry or booking request, manual appointment encoding, schedule confirmation, appointment updates or reschedules, customer arrival and status tracking, and end-of-day review.",
      "Identify where friction happens and propose a better way for the workflow to operate.",
      "Consider multiple staff members interacting with bookings, real-time updates throughout the day, ease of onboarding for non-technical users, operational reliability, customer privacy, and future scalability.",
      "Solutions do not need to be fully engineered products. Prototypes, workflow redesigns, service blueprints, automation concepts, or MVPs are welcome.",
    ],
    eligibility: [
      "Open to students and early-career builders.",
      "Solo submissions and teams are welcome.",
      "Specific eligibility requirements are to be announced by Browhaus.",
    ],
    deliverables: [
      "A clear explanation of the problem being solved.",
      "Proposed workflow improvements.",
      "Mockups, wireframes, or prototypes.",
      "Implementation considerations.",
      "Optional demos or MVPs.",
      "A clear explanation of who uses the system, how it fits into daily operations, and why it improves the current workflow.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 6, 2026" },
      { label: "Submission deadline", detail: "July 18, 2026" },
      { label: "Review period", detail: "July 21-25, 2026" },
      { label: "Winner announcement", detail: "July 30, 2026" },
    ],
    judgingCriteria: [
      "Operational Impact, 25%: Reduces manual work, improves coordination, and solves real workflow problems.",
      "Ease of Use, 20%: Clear, intuitive experience for day-to-day staff use.",
      "Feasibility, 20%: Realistic to pilot and implement in a service business environment.",
      "Scalability, 15%: Able to support growing booking volume and operational complexity.",
      "Customer Experience, 10%: Improves speed, clarity, reliability, or overall service experience.",
      "Quality of Thinking, 10%: Thoughtful understanding of the workflow, users, and operational needs.",
    ],
    tags: ["Operations", "Booking", "Customer experience"],
    accent: "#B77900",
    logo: "/images/companies/browhaus_logo.png",
    overviewMarkdown: `## The Problem

Every growing business eventually reaches the same moment: the tools that once helped them move fast begin to hold them back.

For Browhaus, that moment is happening in booking operations.

Today, appointments are managed through Google Sheets shared across internal teams. It is familiar and flexible, but as daily booking volume grows, the workflow becomes harder to manage with speed, accuracy, and confidence.

## The Opportunity

This challenge asks **YOU** to redesign how Browhaus manages bookings behind the scenes.

A better system could help staff spend less time searching, updating, and coordinating — and more time serving customers well.

### Current Workflow

A typical booking flow may involve:

1. customer inquiry or booking request,
2. manual appointment encoding,
3. schedule confirmation,
4. appointment updates or reschedules,
5. customer arrival and status tracking,
6. end-of-day review.

Participants should identify where friction happens and propose a better way for the workflow to operate.

## Submission Requirements

### 1. Deployed Website or Prototype

Submit a working link to your proposed booking operations experience.

This can be a deployed website, clickable prototype, no-code build, dashboard mockup, or product flow.

Your submission should:

- show the booking operations experience clearly,
- include a logical flow for staff managing bookings,
- show how appointments are created, updated, confirmed, rescheduled, or tracked,
- demonstrate how the solution reduces friction in the current workflow,
- and be accessible through the link you provide.

It does not need to be fully functional, as long as the experience and logic are clear.

### 2. 3-5 Minute Video Pitch

Submit a short video walking through your solution.

Your video should:

* introduce yourself or your team,
* explain the booking friction you identified,
* show how your proposed workflow works,
* highlight how it improves speed, clarity, accuracy, or customer experience,
* and explain why it is realistic for Browhaus to pilot.

Upload the video as an unlisted YouTube link.`,
    successMetrics: [
      "Key Result 1: Reduces the number of manual steps needed to create, update, confirm, reschedule, or track a booking.",
      "Key Result 2: Allows staff to search and filter bookings by customer name, date, status, service, or branch.",
      "Key Result 3: Clearly shows booking status, including pending, confirmed, rescheduled, cancelled, completed, or no-show.",
      "Key Result 4: Prevents or flags scheduling conflicts before a booking is confirmed.",
      "Key Result 5: Includes a clear path for Browhaus to test the solution in a real branch or team workflow.",
    ],
    objective:
      "Design a booking operations system that helps Browhaus manage appointments with more speed, clarity, and reliability as the business grows.",
    submissionCalloutTitle: "Ready to reimagine booking operations?",
  },
  {
    id: "flood-ready-commutes",
    host: "Urban Mobility Lab",
    sector: "Transport and disaster response",
    title: "Build a flood-ready commute planner for Metro Manila students",
    shortTitle: "Flood-ready commutes",
    reward: "PHP 75,000 pilot bounty",
    rewardType: "Cash prize plus LGU showcase",
    deadline: "June 28, 2026",
    location: "Metro Manila",
    difficulty: "Intermediate",
    summary:
      "Create a practical way for students to choose safer routes when heavy rain disrupts normal commutes.",
    problem:
      "Students often make commute decisions with fragmented information: weather alerts in one place, flood posts on social media, class advisories elsewhere, and no clear sense of what route is still usable.",
    whyItMatters:
      "Flooding can turn a routine trip into a safety risk and a financial burden. A better decision tool could help students avoid stranded routes, missed classes, and unsafe transfers.",
    brief: [
      "Design a mobile-first experience that combines route options, flood severity, transport availability, and school advisories.",
      "Prioritize clarity under stress: students should understand the safest next step within a few seconds.",
      "Show how your solution could work even when official data is delayed or incomplete.",
    ],
    eligibility: [
      "Open to students and early-career builders in the Philippines.",
      "Teams of one to four members are allowed.",
      "No production app required, but working prototypes get stronger consideration.",
    ],
    deliverables: [
      "Problem framing and user assumptions.",
      "Clickable prototype, demo video, or working proof of concept.",
      "Short implementation plan covering data sources, limitations, and rollout.",
    ],
    timeline: [
      { label: "Brief opens", detail: "May 30, 2026" },
      { label: "Submission deadline", detail: "June 28, 2026" },
      { label: "Final demos", detail: "July 8, 2026" },
    ],
    judgingCriteria: [
      "Usefulness during real flood conditions.",
      "Quality of user flow and information hierarchy.",
      "Practicality of data collection and maintenance.",
      "Strength of risk and edge-case thinking.",
    ],
    tags: ["Mobility", "Climate", "Student safety"],
    accent: "#B77900",
  },
  {
    id: "sari-sari-stockouts",
    host: "Neighborhood Retail Network",
    sector: "MSME retail",
    title: "Predict sari-sari store stockouts before they happen",
    shortTitle: "Sari-sari stockout tracker",
    reward: "PHP 50,000 bounty",
    rewardType: "Cash prize plus distributor pilot",
    deadline: "July 5, 2026",
    location: "Nationwide",
    difficulty: "Beginner friendly",
    summary:
      "Help small neighborhood stores avoid missed sales by forecasting which fast-moving goods need replenishment.",
    problem:
      "Many sari-sari stores track inventory manually, making it hard to know when staples like prepaid load, canned goods, rice, coffee sachets, and hygiene products are about to run out.",
    whyItMatters:
      "A stockout can mean lost income for the store and extra trips for the neighborhood. Lightweight forecasting could make everyday retail more resilient without expensive software.",
    brief: [
      "Create a simple inventory assistant that can work with handwritten logs, phone photos, spreadsheet input, or chat-based updates.",
      "Focus on low-friction adoption for store owners who do not want another complicated dashboard.",
      "Recommend what to restock, when to restock, and why.",
    ],
    eligibility: [
      "Open to students interested in retail, data, operations, or product design.",
      "Solo submissions and small teams are welcome.",
      "Solutions should be usable by non-technical store owners.",
    ],
    deliverables: [
      "Prototype or workflow mockup.",
      "Sample input and output using at least ten common store items.",
      "Explanation of forecasting logic in plain language.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 3, 2026" },
      { label: "Submission deadline", detail: "July 5, 2026" },
      { label: "Pilot selection", detail: "July 15, 2026" },
    ],
    judgingCriteria: [
      "Ease of use for sari-sari store owners.",
      "Practicality in low-connectivity settings.",
      "Quality of forecasting assumptions.",
      "Potential to improve store income.",
    ],
    tags: ["MSME", "Retail", "Forecasting"],
    accent: "#B77900",
  },
  {
    id: "barangay-health-queues",
    host: "Community Health Systems Group",
    sector: "Public health",
    title: "Reduce waiting time in barangay health center queues",
    shortTitle: "Barangay health queues",
    reward: "PHP 40,000 plus internship shortlist",
    rewardType: "Cash prize and health-tech internship path",
    deadline: "July 12, 2026",
    location: "Philippines",
    difficulty: "Intermediate",
    summary:
      "Design a queue and triage workflow that helps barangay health centers serve patients faster and more fairly.",
    problem:
      "Barangay health centers often handle checkups, records, vaccination, referrals, and follow-ups with limited staff and mostly manual queue systems.",
    whyItMatters:
      "Long waits discourage people from seeking care early. Better triage and queue visibility can improve service quality without requiring a large new budget.",
    brief: [
      "Map the patient journey from arrival to release or referral.",
      "Design a queueing system that separates urgent cases, scheduled visits, and simple transactions.",
      "Consider staff workload, privacy, paper records, and intermittent internet.",
    ],
    eligibility: [
      "Open to students in product, public health, operations, design, and engineering.",
      "Teams may include non-technical members.",
      "Submissions should respect patient privacy and avoid collecting sensitive data unnecessarily.",
    ],
    deliverables: [
      "Service blueprint or journey map.",
      "Prototype, flow diagram, or lightweight system design.",
      "Metrics for measuring reduced wait time and staff burden.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 8, 2026" },
      { label: "Submission deadline", detail: "July 12, 2026" },
      { label: "Review week", detail: "July 13-19, 2026" },
    ],
    judgingCriteria: [
      "Fit with barangay health center constraints.",
      "Patient safety and privacy awareness.",
      "Operational clarity for staff.",
      "Measurable improvement plan.",
    ],
    tags: ["Health", "Operations", "Service design"],
    accent: "#B77900",
  },
  {
    id: "agri-cold-chain",
    host: "Agri Logistics Studio",
    sector: "Agriculture and logistics",
    title: "Track produce spoilage across local cold-chain gaps",
    shortTitle: "Cold-chain spoilage tracker",
    reward: "PHP 80,000 prototype grant",
    rewardType: "Prototype grant plus mentor review",
    deadline: "July 19, 2026",
    location: "Luzon, Visayas, Mindanao",
    difficulty: "Advanced",
    summary:
      "Help farmers and consolidators identify where vegetables and fruits lose value before reaching market.",
    problem:
      "Produce spoilage is often treated as unavoidable, but the actual loss points across transport, storage, sorting, and market handoff are poorly documented.",
    whyItMatters:
      "Reducing spoilage can improve farmer income, stabilize prices, and make local food systems more efficient.",
    brief: [
      "Design a tracking method for spoilage events from harvest to market.",
      "Make the workflow realistic for cooperatives, truckers, and market operators.",
      "Show how the data would help decide where to invest in cold storage, packaging, or route changes.",
    ],
    eligibility: [
      "Open to students interested in agriculture, supply chain, hardware, data, or field research.",
      "Teams are encouraged to include someone familiar with provincial food systems.",
      "Submissions may be software, research, operations, or hybrid proposals.",
    ],
    deliverables: [
      "Loss-point map and stakeholder workflow.",
      "Prototype dashboard, form, sensor concept, or reporting system.",
      "Rollout plan for a three-month pilot.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 10, 2026" },
      { label: "Submission deadline", detail: "July 19, 2026" },
      { label: "Mentor review", detail: "July 29, 2026" },
    ],
    judgingCriteria: [
      "Understanding of agricultural logistics.",
      "Quality of field assumptions.",
      "Potential to reduce waste and protect income.",
      "Pilot feasibility.",
    ],
    tags: ["Agriculture", "Logistics", "Food waste"],
    accent: "#B77900",
  },
  {
    id: "jeepney-demand-dashboard",
    host: "Transit Data Collective",
    sector: "Public transport",
    title: "Create a demand dashboard for modern jeepney routes",
    shortTitle: "Jeepney route demand",
    reward: "PHP 60,000 bounty",
    rewardType: "Cash prize plus transit lab internship interview",
    deadline: "July 26, 2026",
    location: "Metro Manila and key cities",
    difficulty: "Intermediate",
    summary:
      "Turn messy commuter and operator signals into route-level insights that help modern jeepney fleets plan trips.",
    problem:
      "Operators need to know when and where demand spikes, but ridership signals are scattered across dispatcher notes, driver experience, payment data, and commuter complaints.",
    whyItMatters:
      "Better dispatching can reduce long waits for commuters and improve earnings for drivers without adding unnecessary trips.",
    brief: [
      "Design a route dashboard that shows peak demand, undersupplied stops, and schedule gaps.",
      "Include a data collection approach that does not assume every vehicle has advanced hardware.",
      "Explain what actions an operator should take after seeing your dashboard.",
    ],
    eligibility: [
      "Open to students interested in transport, analytics, civic tech, or operations.",
      "Teams may submit either a product prototype or analytics case study.",
      "Use public or synthetic data unless you have permission to use real data.",
    ],
    deliverables: [
      "Dashboard mockup or working analytics prototype.",
      "Sample route scenario and recommended decisions.",
      "Data reliability and privacy notes.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 12, 2026" },
      { label: "Submission deadline", detail: "July 26, 2026" },
      { label: "Operator feedback", detail: "August 5, 2026" },
    ],
    judgingCriteria: [
      "Decision usefulness for operators.",
      "Clarity for non-technical transport teams.",
      "Handling of incomplete data.",
      "Impact on commuter wait time and driver economics.",
    ],
    tags: ["Transport", "Data", "Operations"],
    accent: "#B77900",
  },
  {
    id: "coastal-plastic-recovery",
    host: "Blue Communities Network",
    sector: "Environment and circular economy",
    title: "Make coastal plastic recovery financially sustainable",
    shortTitle: "Coastal plastic recovery",
    reward: "PHP 70,000 challenge bounty",
    rewardType: "Cash prize plus NGO accelerator slot",
    deadline: "August 2, 2026",
    location: "Coastal Philippines",
    difficulty: "Intermediate",
    summary:
      "Design a system that helps coastal communities collect, sort, and sell recovered plastic with better incentives.",
    problem:
      "Plastic recovery efforts often depend on short-term cleanups. Communities need a repeatable model that connects collection, sorting, buyers, and transparent payouts.",
    whyItMatters:
      "A sustainable recovery system can protect coastal livelihoods while giving residents a reason to keep plastic out of waterways.",
    brief: [
      "Design the incentive loop for households, collectors, sorters, and buyers.",
      "Show how plastic quality, volume, and payout data would be tracked.",
      "Account for trust, fraud prevention, and community coordination.",
    ],
    eligibility: [
      "Open to students in sustainability, business, product, design, or engineering.",
      "Community research is welcome but not required.",
      "Solutions should avoid unpaid labor assumptions.",
    ],
    deliverables: [
      "System model or marketplace flow.",
      "Prototype, operations plan, or financial model.",
      "Risk notes for fraud, safety, and long-term adoption.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 15, 2026" },
      { label: "Submission deadline", detail: "August 2, 2026" },
      { label: "Community review", detail: "August 12, 2026" },
    ],
    judgingCriteria: [
      "Sustainability of incentives.",
      "Operational fit for coastal communities.",
      "Clarity of buyer and payout flow.",
      "Environmental and livelihood impact.",
    ],
    tags: ["Environment", "Circular economy", "Community"],
    accent: "#B77900",
  },
  {
    id: "ofw-remittance-helper",
    host: "Inclusive Finance Lab",
    sector: "Fintech and family finance",
    title: "Help OFW families turn remittances into monthly plans",
    shortTitle: "OFW remittance planner",
    reward: "PHP 55,000 bounty",
    rewardType: "Cash prize plus fintech internship interview",
    deadline: "August 9, 2026",
    location: "Nationwide",
    difficulty: "Beginner friendly",
    summary:
      "Build a budgeting assistant that helps families plan remittance use without shame, jargon, or complicated spreadsheets.",
    problem:
      "Families receiving remittances often balance bills, debt, tuition, groceries, savings, and emergencies with little shared visibility between sender and receiver.",
    whyItMatters:
      "A respectful planning tool could reduce money stress, improve savings behavior, and help families make decisions together.",
    brief: [
      "Design a budgeting flow for both the OFW sender and the family member receiving money.",
      "Emphasize trust, privacy, and emotional tone.",
      "Show how the tool handles irregular income, urgent requests, and shared goals.",
    ],
    eligibility: [
      "Open to students interested in fintech, behavioral design, product, or family finance.",
      "No finance background required.",
      "Solutions must avoid manipulative savings or lending patterns.",
    ],
    deliverables: [
      "User flow for sender and receiver.",
      "Prototype, worksheet, chatbot flow, or mobile concept.",
      "Explanation of tone, privacy, and financial safeguards.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 18, 2026" },
      { label: "Submission deadline", detail: "August 9, 2026" },
      { label: "Final interviews", detail: "August 19, 2026" },
    ],
    judgingCriteria: [
      "Empathy for family money dynamics.",
      "Simplicity of planning flow.",
      "Privacy and trust design.",
      "Potential to improve household financial stability.",
    ],
    tags: ["Fintech", "OFW", "Behavioral design"],
    accent: "#B77900",
  },
  {
    id: "shs-skills-mapper",
    host: "Youth Workforce Bridge",
    sector: "Education and employment",
    title: "Map senior high school skills to real entry-level work",
    shortTitle: "SHS skills mapper",
    reward: "PHP 45,000 bounty",
    rewardType: "Cash prize plus employer demo day",
    deadline: "August 16, 2026",
    location: "Philippines",
    difficulty: "Beginner friendly",
    summary:
      "Create a tool that helps senior high school students understand what work they can already try, practice, or prepare for.",
    problem:
      "Many students graduate with projects, strand knowledge, and informal skills, but they struggle to translate those experiences into specific roles, portfolios, or next steps.",
    whyItMatters:
      "Better skill translation can help students discover opportunities earlier and help employers see potential beyond credentials.",
    brief: [
      "Design a mapper that turns student projects, interests, and strand experience into role suggestions.",
      "Show what evidence a student should prepare for each suggested path.",
      "Make the output encouraging but honest about gaps to close.",
    ],
    eligibility: [
      "Open to students, educators, and early-career builders.",
      "Teams may include senior high school students.",
      "Solutions should be accessible on low-end phones.",
    ],
    deliverables: [
      "Skills-to-role matching flow.",
      "Sample outputs for at least three student profiles.",
      "Plan for guidance counselors, schools, or employers to use the tool.",
    ],
    timeline: [
      { label: "Brief opens", detail: "June 20, 2026" },
      { label: "Submission deadline", detail: "August 16, 2026" },
      { label: "Employer demo day", detail: "August 26, 2026" },
    ],
    judgingCriteria: [
      "Usefulness for students with little work experience.",
      "Quality of role and portfolio recommendations.",
      "Accessibility for schools and low-end devices.",
      "Potential employer relevance.",
    ],
    tags: ["Education", "Workforce", "Career discovery"],
    accent: "#B77900",
  },
];

export function getChallengeById(id: string) {
  return challengePhChallenges.find((challenge) => challenge.id === id);
}
