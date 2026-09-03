/**
 * Engineering Technology (Department of Examinations subject 65).
 *
 * The National Institute of Education publishes this syllabus in Sinhala and
 * Tamil only — no English edition exists — so the period allocations and the
 * ordering below come from the official Sinhala and Tamil editions (2017,
 * 300 periods per grade), and the English titles are translations of the
 * Sinhala competency statements rather than official NIE English wording.
 * Competency numbering restarts in Grade 13, which is why two units can share
 * a position in the printed syllabus.
 *
 * The syllabus does not publish sub-topics in a form that could be verified,
 * so this subject is tracked at unit level: each unit is one trackable item.
 */
import { defineSyllabus } from './define';

export const engineeringTechnologySyllabus = defineSyllabus({
  subjectId: 'engineering-technology',
  source: 'NIE G.C.E. (A/L) Engineering Technology Syllabus, Grades 12–13 (2017), Sinhala and Tamil editions',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: {
        en: 'Introduction to engineering technology',
        si: 'ඉංජිනේරු තාක්ෂණවේදය හැඳින්වීම',
        ta: 'பொறியியற் தொழினுட்பவியல் அறிமுகம்',
      },
      periods: 7,
      grade: 12,
    },
    {
      name: { en: 'Engineering drawing', si: 'ඉංජිනේරු චිත්‍ර', ta: 'பொறியியல் வரைபடம்' },
      periods: 40,
      grade: 12,
    },
    {
      name: {
        en: 'Safety and health at work',
        si: 'වැඩ පරිසරයේ ආරක්ෂාව සහ සෞඛ්‍යය',
        ta: 'பணியிடப் பாதுகாப்பும் சுகாதாரமும்',
      },
      periods: 10,
      grade: 12,
    },
    {
      name: { en: 'Building construction', si: 'ගොඩනැගිලි ඉදිකිරීම', ta: 'கட்டிட நிர்மாணம்' },
      periods: 49,
      grade: 12,
    },
    {
      name: {
        en: 'Mechanisms and motion control',
        si: 'යාන්ත්‍රණ සහ චලිත පාලනය',
        ta: 'இயங்கமைவுகளும் இயக்கக் கட்டுப்பாடும்',
      },
      periods: 36,
      grade: 12,
    },
    {
      name: { en: 'Motor vehicle systems', si: 'මෝටර් රථ පද්ධති', ta: 'மோட்டார் வாகன முறைமைகள்' },
      periods: 58,
      grade: 12,
    },
    {
      name: {
        en: 'Electrical power in everyday use',
        si: 'එදිනෙදා භාවිතයේ විදුලි ජවය',
        ta: 'அன்றாடப் பயன்பாட்டில் மின் வலு',
      },
      periods: 46,
      grade: 12,
    },
    {
      name: {
        en: 'Materials and production techniques',
        si: 'ද්‍රව්‍ය සහ නිෂ්පාදන ශිල්පීය ක්‍රම',
        ta: 'பொருட்களும் உற்பத்தி நுட்பங்களும்',
      },
      periods: 36,
      grade: 12,
    },
    {
      name: {
        en: 'Measurement and instruments',
        si: 'මිනුම් සහ මිනුම් උපකරණ',
        ta: 'அளவீடும் அளவிடும் கருவிகளும்',
      },
      periods: 18,
      grade: 12,
    },
    {
      name: {
        en: 'Engineering standards and specifications',
        si: 'ඉංජිනේරු ප්‍රමිති සහ පිරිවිතර',
        ta: 'பொறியியல் தரங்களும் விவரக்குறிப்புகளும்',
      },
      periods: 10,
      grade: 13,
    },
    {
      name: {
        en: 'Generation, transmission and distribution of electrical power',
        si: 'විදුලි ජවය උත්පාදනය, සම්ප්‍රේෂණය සහ බෙදාහැරීම',
        ta: 'மின் வலு உற்பத்தி, செலுத்துகை மற்றும் விநியோகம்',
      },
      periods: 44,
      grade: 13,
    },
    {
      name: { en: 'Electronic technology', si: 'ඉලෙක්ට්‍රොනික තාක්ෂණය', ta: 'இலத்திரனியல் தொழினுட்பம்' },
      periods: 74,
      grade: 13,
    },
    {
      name: { en: 'Fluid power machines', si: 'තරල ජව යන්ත්‍ර', ta: 'மியவலு இயந்திரங்கள்' },
      periods: 39,
      grade: 13,
    },
    {
      name: {
        en: 'Land surveying and levelling',
        si: 'බිම් මැනීම සහ මට්ටම් ගැනීම',
        ta: 'நில அளவையும் மட்டமாக்கலும்',
      },
      periods: 52,
      grade: 13,
    },
    {
      name: {
        en: 'Water supply and waste management',
        si: 'ජල සම්පාදනය සහ කසළ කළමනාකරණය',
        ta: 'நீர் வழங்கலும் கழிவு முகாமைத்துவமும்',
      },
      periods: 37,
      grade: 13,
    },
    {
      name: {
        en: 'Bills of quantities and cost estimation',
        si: 'ප්‍රමාණ බිල්පත් සහ පිරිවැය ඇස්තමේන්තු',
        ta: 'அளவுப் பட்டியலும் செலவு மதிப்பீடும்',
      },
      periods: 26,
      grade: 13,
    },
    {
      name: {
        en: 'Production and business skills',
        si: 'නිෂ්පාදන සහ ව්‍යාපාර කුසලතා',
        ta: 'உற்பத்தி மற்றும் வணிகத் திறன்கள்',
      },
      periods: 18,
      grade: 13,
    },
  ],
});
