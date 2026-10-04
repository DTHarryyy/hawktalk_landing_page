/**
 * Quick topic shortcuts shown on the empty chat screen (/demo) and the
 * scripted answers for each suggested question.
 *
 * ⚠️ Values marked PLACEHOLDER are not official — replace with real CSU info.
 */
import type { Scenario } from './types';

export type QuickTopic = {
  id: string;
  label: string;
  icon: string;
  /** Suggested questions — `scenario` is the id of the answer to play */
  questions: { label: string; scenario: string }[];
};

export const quickTopics: QuickTopic[] = [
  {
    id: 'academics',
    label: 'Academics',
    icon: 'graduation-cap',
    questions: [
      { label: 'How do I enroll?', scenario: 'qt-enroll' },
      { label: 'What is the grading system?', scenario: 'qt-grading' },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    icon: 'clipboard-list',
    questions: [
      { label: 'Admission requirements', scenario: 'qt-admission-reqs' },
      { label: 'Enrollment process', scenario: 'qt-enroll' },
      { label: 'Tuition fees', scenario: 'qt-tuition' },
    ],
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    icon: 'award',
    questions: [
      { label: 'Available scholarship', scenario: 'qt-scholarships' },
      { label: 'How do I apply?', scenario: 'qt-scholarship-apply' },
    ],
  },
  {
    id: 'services',
    label: 'Campus Services',
    icon: 'building-2',
    questions: [
      { label: 'Library hours', scenario: 'qt-library' },
      { label: 'Clinic services', scenario: 'qt-clinic' },
      { label: 'Guidance counseling', scenario: 'qt-guidance' },
    ],
  },
  {
    id: 'tech',
    label: 'Technical Support',
    icon: 'life-buoy',
    questions: [
      { label: 'Reset my password', scenario: 'qt-password' },
      { label: 'LMS access issues', scenario: 'qt-lms' },
    ],
  },
];

const MANUAL = 'CSU Student Manual'; // PLACEHOLDER
const HELP = 'HawkTalk Help Center'; // PLACEHOLDER

export const quickTopicScenarios: Scenario[] = [
  {
    id: 'qt-enroll',
    prompt: 'How do I enroll?',
    keywords: [['enroll'], ['enrollment'], ['enrol'], ['mag', 'enroll']],
    status: 'manuals',
    answer: `Here’s the **enrollment process** for continuing students: *(placeholder steps)*

1. **Get advised** by your program adviser and confirm your subjects.
2. **Settle your assessment** at the Cashier (or confirm your free-tuition eligibility).
3. **Encode your subjects** online or at your college.
4. **Print or download** your **Certificate of Registration (COR)**.

New and transferee students also submit their admission documents to the **Registrar** first.`,
    sources: [{ doc: MANUAL, page: 14, excerpt: 'Enrollment procedure: advising, assessment, payment of fees, and issuance of the Certificate of Registration…' }],
    reasoning: ['Searched the Student Manual (enrollment)', 'Formatted the process as numbered steps', 'Cited 1 source'],
  },
  {
    id: 'qt-grading',
    prompt: 'What is the grading system?',
    keywords: [['grading'], ['grading', 'system'], ['passing', 'grade']],
    status: 'manuals',
    answer: `CSU uses a **percentage-based grading system**: *(placeholder table)*

| Grade | Description |
|---|---|
| **96–100** | Excellent |
| **90–95** | Very Good |
| **85–89** | Good |
| **80–84** | Satisfactory |
| **75–79** | Passing |
| **Below 75** | Failed |

The **passing grade is 75**.`,
    sources: [{ doc: MANUAL, page: 28, excerpt: 'The University adopts the following grading system… 75 is the passing grade.' }],
    reasoning: ['Searched the Student Manual (grading)', 'Kept the grade ranges exact', 'Rendered them as a table', 'Cited 1 source'],
  },
  {
    id: 'qt-admission-reqs',
    prompt: 'Admission requirements',
    keywords: [['admission'], ['admission', 'requirements'], ['freshman', 'requirements']],
    status: 'manuals',
    answer: `**Admission requirements for incoming freshmen:** *(placeholder)*

- Accomplished **application form**
- **CSU admission test** result (CSUCAT)
- **Form 138** (Senior High School report card)
- **Certificate of Good Moral Character**
- **PSA Birth Certificate**
- Two **2x2 ID photos**

Transferees also need a **Transcript of Records** and **Honorable Dismissal**.`,
    sources: [{ doc: MANUAL, page: 9, excerpt: 'Applicants for admission shall submit the following requirements…' }],
    reasoning: ['Searched the Student Manual (admission)', 'Separated freshman and transferee requirements', 'Cited 1 source'],
  },
  {
    id: 'qt-tuition',
    prompt: 'Tuition fees',
    keywords: [['tuition'], ['fees'], ['magkano'], ['how', 'much']],
    status: 'manuals',
    answer: `Under the **Free Higher Education Act (RA 10931)**, qualified undergraduate students in CSU pay **₱0 tuition**. *(placeholder)*

You may still pay **other fees** that aren’t covered, such as:

- **ID and insurance** — around **₱[placeholder]**
- **Graduation and transcript fees** when requested

Your exact assessment appears on your **Certificate of Registration**.`,
    sources: [{ doc: MANUAL, page: 16, excerpt: 'Pursuant to RA 10931, qualified students are exempt from tuition and other school fees…' }],
    reasoning: ['Searched the Student Manual (fees)', 'Kept the free-tuition condition (“qualified”) attached', 'Cited 1 source'],
  },
  {
    id: 'qt-scholarships',
    prompt: 'Available scholarship',
    keywords: [['available', 'scholarship'], ['scholarships'], ['list', 'scholarship']],
    status: 'manuals',
    answer: `**Scholarships available to CSU students** include: *(placeholder list)*

- **Academic scholarships** — for President’s and Dean’s Listers
- **CHED scholarships** (e.g., CHED Merit, Tulong Dunong)
- **Government grants** (e.g., TES)
- **Private and LGU-sponsored** scholarships
- **Athletes and performing artists** grants

Ask me **“How do I apply?”** for the steps.`,
    sources: [{ doc: MANUAL, page: 46, excerpt: 'Scholarships and grants-in-aid available to students…' }],
    reasoning: ['Searched the Student Manual (scholarships)', 'Grouped scholarships by type', 'Cited 1 source'],
  },
  {
    id: 'qt-scholarship-apply',
    prompt: 'How do I apply?',
    keywords: [['apply', 'scholarship'], ['scholarship', 'application']],
    status: 'manuals',
    answer: `**How to apply for a scholarship:** *(placeholder steps)*

1. **Choose a scholarship** from the list at the Office of Student Development and Welfare (OSDW).
2. **Prepare the requirements** — COR, latest grades, and any certificates the scholarship asks for.
3. **Fill out the application form** and **submit** it before the deadline.
4. **Wait for the list of qualified scholars** to be posted.`,
    sources: [{ doc: MANUAL, page: 47, excerpt: 'Applicants for scholarships shall submit the accomplished application form together with the documentary requirements…' }],
    reasoning: [
      'Understood “How do I apply?” in the Scholarships topic',
      'Searched the Student Manual',
      'Formatted the process as steps',
      'Cited 1 source',
    ],
  },
  {
    id: 'qt-library',
    prompt: 'Library hours',
    keywords: [['library', 'hours'], ['library', 'open'], ['library', 'time']],
    status: 'manuals',
    answer: `**University Library hours:** *(placeholder)*

- **Monday–Friday:** 7:30 AM – 6:00 PM
- **Saturday:** 8:00 AM – 12:00 NN
- **Closed** on Sundays and holidays

Bring your **validated student ID** to enter and borrow books.`,
    sources: [{ doc: MANUAL, page: 54, excerpt: 'The University Library is open from Monday to Saturday…' }],
    reasoning: ['Searched the Student Manual (library)', 'Put the hours first', 'Cited 1 source'],
  },
  {
    id: 'qt-clinic',
    prompt: 'Clinic services',
    keywords: [['clinic'], ['medical'], ['nurse'], ['doctor'], ['dental']],
    status: 'manuals',
    answer: `The **University Health Services** clinic offers: *(placeholder)*

- **Free consultation** and first aid
- **Basic medicines** for minor illnesses
- **Medical and dental certificates**
- **Annual physical exams** for enrolled students

Open **Monday–Friday, 8:00 AM – 5:00 PM**.`,
    sources: [{ doc: MANUAL, page: 58, excerpt: 'The Health Services Unit provides medical and dental services to students…' }],
    reasoning: ['Searched the Student Manual (health services)', 'Listed the services', 'Cited 1 source'],
  },
  {
    id: 'qt-guidance',
    prompt: 'Guidance counseling',
    keywords: [['guidance'], ['counseling'], ['counselling'], ['counselor']],
    status: 'manuals',
    answer: `The **Guidance and Counseling Office** offers **free and confidential** support: *(placeholder)*

- **Individual counseling** — walk in or book an appointment
- **Career guidance** and psychological testing
- **Referral** to partner professionals when needed

You can visit during office hours, **Monday–Friday, 8:00 AM – 5:00 PM**.`,
    sources: [{ doc: MANUAL, page: 60, excerpt: 'Guidance and counseling services shall be made available to all students…' }],
    reasoning: ['Searched the Student Manual (guidance services)', 'Highlighted that it’s confidential', 'Cited 1 source'],
  },
  {
    id: 'qt-password',
    prompt: 'Reset my password',
    keywords: [['reset', 'password'], ['forgot', 'password'], ['password']],
    status: 'manuals',
    answer: `To **reset your HawkTalk password**:

1. On the login screen, tap **“Forgot password?”**
2. Enter your **registered email**.
3. Open the **reset link** we send you and choose a new password.

Didn’t get the email? Check your **spam** folder, then try again after a few minutes.`,
    sources: [{ doc: HELP, page: 3, excerpt: 'To recover your account, select “Forgot password?” on the login screen…' }],
    reasoning: ['Recognized an account question', 'Searched the Help Center', 'Gave the steps in order', 'Cited 1 source'],
  },
  {
    id: 'qt-lms',
    prompt: 'LMS access issues',
    keywords: [['lms'], ['learning', 'management'], ['canvas'], ['moodle']],
    status: 'manuals',
    answer: `If you can’t access the **LMS**, try these first: *(placeholder)*

1. Log in with your **official CSU student email**.
2. **Clear your browser cache** or try another browser.
3. Make sure you’re **officially enrolled** — LMS accounts activate after enrollment.

Still locked out? Contact the **university ICT office** with your student number.`,
    sources: [{ doc: MANUAL, page: 66, excerpt: 'Students experiencing problems with university online systems may seek assistance from the ICT office…' }],
    reasoning: ['Recognized a technical support question', 'Listed the most common fixes first', 'Pointed to the office that can help', 'Cited 1 source'],
  },
];
