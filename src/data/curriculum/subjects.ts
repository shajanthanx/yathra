/**
 * Subject names and Department of Examinations subject numbers.
 * Source: Department of Examinations, Sri Lanka — "List of Subjects and Subject
 * Numbers" (trilingual), and NIE syllabus cover pages (2017 revision).
 */
import type { Subject, SubjectId } from '@/types/content';

export const SUBJECTS: readonly Subject[] = [
  {
    id: 'physics',
    mark: { en: 'PH', si: 'භෞ', ta: 'பௌ' },
    code: '01',
    name: { en: 'Physics', si: 'භෞතික විද්‍යාව', ta: 'பௌதிகவியல்' },
    shortName: { en: 'Physics', si: 'භෞතික විද්‍යාව', ta: 'பௌதிகவியல்' },
  },
  {
    id: 'chemistry',
    mark: { en: 'CH', si: 'රස', ta: 'இர' },
    code: '02',
    name: { en: 'Chemistry', si: 'රසායන විද්‍යාව', ta: 'இரசாயனவியல்' },
    shortName: { en: 'Chemistry', si: 'රසායන විද්‍යාව', ta: 'இரசாயனவியல்' },
  },
  {
    id: 'biology',
    mark: { en: 'BI', si: 'ජීව', ta: 'உயி' },
    code: '09',
    name: { en: 'Biology', si: 'ජීව විද්‍යාව', ta: 'உயிரியல்' },
    shortName: { en: 'Biology', si: 'ජීව විද්‍යාව', ta: 'உயிரியல்' },
  },
  {
    id: 'combined-mathematics',
    mark: { en: 'CM', si: 'ගණි', ta: 'இக' },
    code: '10',
    name: { en: 'Combined Mathematics', si: 'සංයුක්ත ගණිතය', ta: 'இணைந்த கணிதம்' },
    shortName: { en: 'Combined Maths', si: 'සංයුක්ත ගණිතය', ta: 'இணைந்த கணிதம்' },
  },
  {
    id: 'ict',
    mark: { en: 'ICT', si: 'ICT', ta: 'ICT' },
    code: '20',
    name: {
      en: 'Information & Communication Technology',
      si: 'තොරතුරු හා සන්නිවේදන තාක්ෂණය',
      ta: 'தகவல் தொடர்பாடல் தொழினுட்பவியல்',
    },
    shortName: { en: 'ICT', si: 'ICT', ta: 'ICT' },
  },
  {
    id: 'accounting',
    mark: { en: 'AC', si: 'ගිණු', ta: 'கண' },
    code: '33',
    name: { en: 'Accounting', si: 'ගිණුම්කරණය', ta: 'கணக்கீடு' },
    shortName: { en: 'Accounting', si: 'ගිණුම්කරණය', ta: 'கணக்கீடு' },
  },
  {
    id: 'business-studies',
    mark: { en: 'BS', si: 'ව්‍යා', ta: 'வணி' },
    code: '32',
    name: { en: 'Business Studies', si: 'ව්‍යාපාර අධ්‍යයනය', ta: 'வணிகக் கல்வி' },
    shortName: { en: 'Business Studies', si: 'ව්‍යාපාර අධ්‍යයනය', ta: 'வணிகக் கல்வி' },
  },
  {
    id: 'economics',
    mark: { en: 'EC', si: 'ආර්', ta: 'பொரு' },
    code: '21',
    name: { en: 'Economics', si: 'ආර්ථික විද්‍යාව', ta: 'பொருளியல்' },
    shortName: { en: 'Economics', si: 'ආර්ථික විද්‍යාව', ta: 'பொருளியல்' },
  },
  {
    id: 'business-statistics',
    mark: { en: 'ST', si: 'සංඛ්', ta: 'புள்' },
    code: '31',
    name: { en: 'Business Statistics', si: 'ව්‍යාපාර සංඛ්‍යානය', ta: 'வணிகப் புள்ளிவிபரவியல்' },
    shortName: { en: 'Business Statistics', si: 'ව්‍යාපාර සංඛ්‍යානය', ta: 'வணிகப் புள்ளிவிபரவியல்' },
  },
  {
    id: 'agricultural-science',
    mark: { en: 'AG', si: 'කෘෂි', ta: 'விவ' },
    code: '08',
    name: { en: 'Agricultural Science', si: 'කෘෂි විද්‍යාව', ta: 'விவசாய விஞ்ஞானம்' },
    shortName: { en: 'Agri. Science', si: 'කෘෂි විද්‍යාව', ta: 'விவசாய விஞ்ஞானம்' },
  },
  {
    id: 'engineering-technology',
    mark: { en: 'ET', si: 'ET', ta: 'ET' },
    code: '65',
    name: { en: 'Engineering Technology', si: 'ඉංජිනේරු තාක්ෂණවේදය', ta: 'பொறியியற் தொழினுட்பவியல்' },
    shortName: { en: 'Eng. Technology', si: 'ඉංජිනේරු තාක්ෂණවේදය', ta: 'பொறியியற் தொழினுட்பவியல்' },
  },
  {
    id: 'bio-systems-technology',
    mark: { en: 'BST', si: 'BST', ta: 'BST' },
    code: '66',
    name: { en: 'Bio Systems Technology', si: 'ජෛව පද්ධති තාක්ෂණවේදය', ta: 'உயிர் முறைமைகள் தொழினுட்பவியல்' },
    shortName: { en: 'Bio Systems Tech.', si: 'ජෛව පද්ධති තාක්ෂණවේදය', ta: 'உயிர் முறைமைகள் தொழினுட்பவியல்' },
  },
  {
    id: 'science-for-technology',
    mark: { en: 'SFT', si: 'SFT', ta: 'SFT' },
    code: '67',
    name: { en: 'Science for Technology', si: 'තාක්ෂණවේදය සඳහා විද්‍යාව', ta: 'தொழினுட்பவியலுக்கான விஞ்ஞானம்' },
    shortName: { en: 'Science for Tech.', si: 'තාක්ෂණවේදය සඳහා විද්‍යාව', ta: 'தொழினுட்பவியலுக்கான விஞ்ஞானம்' },
  },
];

const SUBJECT_BY_ID: ReadonlyMap<SubjectId, Subject> = new Map(SUBJECTS.map((s) => [s.id, s]));

export function getSubject(id: SubjectId): Subject {
  const subject = SUBJECT_BY_ID.get(id);
  if (!subject) throw new Error(`Unknown subject: ${id}`);
  return subject;
}

export function findSubject(id: string): Subject | undefined {
  return SUBJECT_BY_ID.get(id as SubjectId);
}
