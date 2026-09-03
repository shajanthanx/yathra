/**
 * Business Statistics (Department of Examinations subject 31).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 11 competencies. Those competencies are the units
 * below, with their long competency statements shortened to titles that fit a
 * phone screen. Sinhala and Tamil names are translations rather than the
 * official wording: the NIE Sinhala and Tamil editions are published with
 * legacy non-Unicode fonts.
 *
 * Sub-topics are not published in a form that could be verified, so this
 * subject is tracked at unit level: each unit is one trackable item.
 */
import { defineSyllabus } from './define';

export const businessStatisticsSyllabus = defineSyllabus({
  subjectId: 'business-statistics',
  source: 'NIE G.C.E. (A/L) Business Statistics Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: {
        en: 'Scope and nature of business statistics',
        si: 'ව්‍යාපාර සංඛ්‍යානයේ විෂය පථය සහ ස්වභාවය',
        ta: 'வணிகப் புள்ளிவிபரவியலின் நோக்கும் தன்மையும்',
      },
      periods: 8,
      grade: 12,
    },
    {
      name: {
        en: 'Organising and presenting business data',
        si: 'ව්‍යාපාරික දත්ත සංවිධානය සහ ඉදිරිපත් කිරීම',
        ta: 'வணிகத் தரவை ஒழுங்கமைத்தலும் முன்வைத்தலும்',
      },
      periods: 60,
      grade: 12,
    },
    {
      name: { en: 'Descriptive statistics', si: 'වර්ණනාත්මක සංඛ්‍යානය', ta: 'விவரண புள்ளிவிபரவியல்' },
      periods: 60,
      grade: 12,
    },
    {
      name: {
        en: 'Correlation and regression',
        si: 'සහසම්බන්ධතාව සහ ප්‍රතිගාමීතාව',
        ta: 'ஒட்டுறவும் தலைகீழ் அளவீடும்',
      },
      periods: 40,
      grade: 12,
    },
    {
      name: { en: 'Probability', si: 'සම්භාවිතාව', ta: 'நிகழ்தகவு' },
      periods: 100,
      grade: 12,
    },
    {
      name: { en: 'Sampling', si: 'නියැදීම', ta: 'மாதிரியெடுப்பு' },
      periods: 32,
      grade: 12,
    },
    {
      name: { en: 'Statistical estimation', si: 'සංඛ්‍යානමය ඇස්තමේන්තුකරණය', ta: 'புள்ளிவிபர மதிப்பீடு' },
      periods: 100,
      grade: 13,
    },
    {
      name: { en: 'Hypothesis testing', si: 'උපකල්පන පරීක්ෂාව', ta: 'கருதுகோள் சோதனை' },
      periods: 70,
      grade: 13,
    },
    {
      name: {
        en: 'Time series and forecasting',
        si: 'කාල ශ්‍රේණි සහ පුරෝකථනය',
        ta: 'கால வரிசையும் முன்கணிப்பும்',
      },
      periods: 50,
      grade: 13,
    },
    {
      name: {
        en: 'Statistical quality control',
        si: 'සංඛ්‍යානමය ගුණාත්මක පාලනය',
        ta: 'புள்ளிவிபரத் தரக் கட்டுப்பாடு',
      },
      periods: 40,
      grade: 13,
    },
    {
      name: { en: 'Index numbers', si: 'දර්ශක සංඛ්‍යා', ta: 'சுட்டெண்கள்' },
      periods: 40,
      grade: 13,
    },
  ],
});
