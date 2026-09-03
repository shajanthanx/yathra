/**
 * Accounting (Department of Examinations subject 33).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 16 competencies with 300 periods in each grade.
 * Those competencies are the units below, with their long competency
 * statements shortened to titles that fit a phone screen. Sinhala and Tamil
 * names are translations rather than the official wording: the NIE Sinhala and
 * Tamil editions are published with legacy non-Unicode fonts.
 */
import { defineSyllabus } from './define';

export const accountingSyllabus = defineSyllabus({
  subjectId: 'accounting',
  source: 'NIE G.C.E. (A/L) Accounting Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: { en: 'Accounting and its need', si: 'ගිණුම්කරණය සහ එහි අවශ්‍යතාව', ta: 'கணக்கீடும் அதன் தேவையும்' },
      periods: 5,
      grade: 12,
      topics: [
        { name: { en: 'Importance of accounting information', si: 'ගිණුම්කරණ තොරතුරුවල වැදගත්කම', ta: 'கணக்கீட்டுத் தகவலின் முக்கியத்துவம்' } },
        { name: { en: 'Trends in accounting', si: 'ගිණුම්කරණයේ ප්‍රවණතා', ta: 'கணக்கீட்டில் போக்குகள்' } },
      ],
    },
    {
      name: { en: 'The accounting equation', si: 'ගිණුම්කරණ සමීකරණය', ta: 'கணக்கீட்டுச் சமன்பாடு' },
      periods: 15,
      grade: 12,
      topics: [
        { name: { en: 'Effect of transactions on assets', si: 'ගනුදෙනුවල වත්කම් මත බලපෑම', ta: 'பரிவர்த்தனைகளின் சொத்துக்கள் மீதான தாக்கம்' } },
        { name: { en: 'Changes in equity', si: 'හිමිකම් වෙනස්වීම්', ta: 'உரிமையில் ஏற்படும் மாற்றங்கள்' } },
        { name: { en: 'Statements from the equation', si: 'සමීකරණයෙන් මූල්‍ය ප්‍රකාශන', ta: 'சமன்பாட்டிலிருந்து நிதிக் கூற்றுகள்' } },
      ],
    },
    {
      name: { en: 'Double entry system', si: 'ද්විත්ව ප්‍රවේශ ක්‍රමය', ta: 'இரட்டைப் பதிவு முறை' },
      periods: 12,
      grade: 12,
      topics: [
        { name: { en: 'Importance of double entry', si: 'ද්විත්ව ප්‍රවේශයේ වැදගත්කම', ta: 'இரட்டைப் பதிவின் முக்கியத்துவம்' } },
        { name: { en: 'Recording business transactions', si: 'ව්‍යාපාර ගනුදෙනු වාර්තා කිරීම', ta: 'வணிகப் பரிவர்த்தனைகளைப் பதிதல்' } },
      ],
    },
    {
      name: { en: 'Prime entry books and the ledger', si: 'ප්‍රාථමික ප්‍රවේශ පොත් සහ ලෙජරය', ta: 'முதற்பதிவு ஏடுகளும் பேரேடும்' },
      periods: 93,
      grade: 12,
      topics: [
        { name: { en: 'Importance of prime entry books', si: 'ප්‍රාථමික ප්‍රවේශ පොත්වල වැදගත්කම', ta: 'முதற்பதிவு ஏடுகளின் முக்கியத்துவம்' } },
        { name: { en: 'Recording cash transactions', si: 'මුදල් ගනුදෙනු වාර්තා කිරීම', ta: 'ரொக்கப் பரிவர்த்தனைகளைப் பதிதல்' } },
        { name: { en: 'Petty cash', si: 'සුළු මුදල්', ta: 'சில்லறை ரொக்கம்' } },
        { name: { en: 'Bank reconciliation', si: 'බැංකු සැසඳුම', ta: 'வங்கி ஒப்புரவாக்கம்' } },
        { name: { en: 'Control accounts', si: 'පාලන ගිණුම්', ta: 'கட்டுப்பாட்டுக் கணக்குகள்' } },
        { name: { en: 'Trial balance', si: 'ශේෂ පරීක්ෂාව', ta: 'இருப்பாய்வு' } },
        { name: { en: 'Rectification of errors', si: 'දෝෂ නිවැරදි කිරීම', ta: 'பிழைகளைத் திருத்தல்' } },
      ],
    },
    {
      name: {
        en: 'Accounting concepts and the conceptual framework',
        si: 'ගිණුම්කරණ සංකල්ප සහ සංකල්පීය රාමුව',
        ta: 'கணக்கீட்டு எண்ணக்கருக்களும் கருத்தியல் கட்டமைப்பும்',
      },
      periods: 34,
      grade: 12,
      topics: [
        { name: { en: 'Basis of financial accounting', si: 'මූල්‍ය ගිණුම්කරණයේ පදනම', ta: 'நிதிக் கணக்கீட்டின் அடிப்படை' } },
        { name: { en: 'Accounting concepts', si: 'ගිණුම්කරණ සංකල්ප', ta: 'கணக்கீட்டு எண்ணக்கருக்கள்' } },
        { name: { en: 'Qualitative characteristics of information', si: 'තොරතුරුවල ගුණාත්මක ලක්ෂණ', ta: 'தகவலின் தரமான இயல்புகள்' } },
        { name: { en: 'Measurement bases', si: 'මිනුම් පදනම්', ta: 'அளவீட்டு அடிப்படைகள்' } },
      ],
    },
    {
      name: {
        en: 'Financial statements of a sole proprietorship',
        si: 'තනි හිමි ව්‍යාපාරයක මූල්‍ය ප්‍රකාශන',
        ta: 'ஒற்றை உரிமையாளர் வணிகத்தின் நிதிக் கூற்றுகள்',
      },
      periods: 46,
      grade: 12,
      topics: [
        { name: { en: 'Importance of financial statements', si: 'මූල්‍ය ප්‍රකාශනවල වැදගත්කම', ta: 'நிதிக் கூற்றுகளின் முக்கியத்துவம்' } },
        { name: { en: 'Income statement', si: 'ආදායම් ප්‍රකාශය', ta: 'வருமானக் கூற்று' } },
        { name: { en: 'Statement of financial position', si: 'මූල්‍ය තත්ත්ව ප්‍රකාශය', ta: 'நிதி நிலைக் கூற்று' } },
        { name: { en: 'Adjustments at the year end', si: 'වර්ෂාන්ත ගැලපුම්', ta: 'ஆண்டிறுதிச் சரிக்கட்டல்கள்' } },
      ],
    },
    {
      name: { en: 'Manufacturing businesses', si: 'නිෂ්පාදන ව්‍යාපාර', ta: 'உற்பத்தி வணிகங்கள்' },
      periods: 10,
      grade: 12,
      topics: [
        { name: { en: 'Cost of production', si: 'නිෂ්පාදන පිරිවැය', ta: 'உற்பத்திச் செலவு' } },
        { name: { en: 'Manufacturing account', si: 'නිෂ්පාදන ගිණුම', ta: 'உற்பத்திக் கணக்கு' } },
      ],
    },
    {
      name: { en: 'Not-for-profit organizations', si: 'ලාභ නොලබන ආයතන', ta: 'இலாபநோக்கற்ற நிறுவனங்கள்' },
      periods: 16,
      grade: 12,
      topics: [
        { name: { en: 'Receipts and payments account', si: 'ලැබීම් සහ ගෙවීම් ගිණුම', ta: 'பெறுகை கொடுப்பனவுக் கணக்கு' } },
        { name: { en: 'Income and expenditure account', si: 'ආදායම් සහ වියදම් ගිණුම', ta: 'வருமான செலவினக் கணக்கு' } },
        { name: { en: 'Financial position of a society', si: 'සමිතියක මූල්‍ය තත්ත්වය', ta: 'சங்கமொன்றின் நிதி நிலை' } },
      ],
    },
    {
      name: { en: 'Incomplete records', si: 'අසම්පූර්ණ වාර්තා', ta: 'முழுமையற்ற பதிவுகள்' },
      periods: 14,
      grade: 12,
      topics: [
        { name: { en: 'Determining profit from incomplete records', si: 'අසම්පූර්ණ වාර්තාවලින් ලාභය නිර්ණය', ta: 'முழுமையற்ற பதிவுகளிலிருந்து இலாபம் காணல்' } },
        { name: { en: 'Preparing statements from incomplete records', si: 'අසම්පූර්ණ වාර්තාවලින් ප්‍රකාශන සකස් කිරීම', ta: 'முழுமையற்ற பதிவுகளிலிருந்து கூற்றுகள் தயாரித்தல்' } },
      ],
    },
    {
      name: { en: 'Partnerships', si: 'හවුල් ව්‍යාපාර', ta: 'கூட்டாண்மை' },
      periods: 55,
      grade: 12,
      topics: [
        { name: { en: 'Legal environment of a partnership', si: 'හවුල් ව්‍යාපාරයක නීතිමය පරිසරය', ta: 'கூட்டாண்மையின் சட்டச் சூழல்' } },
        { name: { en: 'Special transactions of partners', si: 'හවුල්කරුවන්ගේ විශේෂ ගනුදෙනු', ta: 'கூட்டாளிகளின் விசேட பரிவர்த்தனைகள்' } },
        { name: { en: "Partners' equity", si: 'හවුල්කරුවන්ගේ හිමිකම', ta: 'கூட்டாளிகளின் உரிமை' } },
        { name: { en: 'Financial statements of a partnership', si: 'හවුල් ව්‍යාපාරයක මූල්‍ය ප්‍රකාශන', ta: 'கூட்டாண்மையின் நிதிக் கூற்றுகள்' } },
        { name: { en: 'Changes in the partnership', si: 'හවුලේ වෙනස්කම්', ta: 'கூட்டாண்மையில் ஏற்படும் மாற்றங்கள்' } },
      ],
    },
    {
      name: { en: 'Limited liability companies', si: 'සීමිත වගකීම් සමාගම්', ta: 'வரையறுக்கப்பட்ட பொறுப்புக் கம்பனிகள்' },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'Nature of a company', si: 'සමාගමක ස්වභාවය', ta: 'கம்பனியின் தன்மை' } },
        { name: { en: 'Share capital', si: 'කොටස් ප්‍රාග්ධනය', ta: 'பங்கு மூலதனம்' } },
        { name: { en: 'Records and disclosures', si: 'වාර්තා සහ අනාවරණය', ta: 'பதிவுகளும் வெளிப்படுத்தல்களும்' } },
        { name: { en: 'Introduction to accounting standards', si: 'ගිණුම්කරණ ප්‍රමිති හැඳින්වීම', ta: 'கணக்கீட்டுத் தரங்கள் அறிமுகம்' } },
        { name: { en: 'Accounting for events after the reporting period', si: 'වාර්තාකරණ කාලයෙන් පසු සිදුවීම්', ta: 'அறிக்கைக் காலத்தின் பின்னரான நிகழ்வுகள்' } },
      ],
    },
    {
      name: { en: 'Sri Lanka Accounting Standards', si: 'ශ්‍රී ලංකා ගිණුම්කරණ ප්‍රමිති', ta: 'இலங்கை கணக்கீட்டுத் தரங்கள்' },
      periods: 90,
      grade: 13,
      topics: [
        { name: { en: 'Legal background of a company', si: 'සමාගමක නීතිමය පසුබිම', ta: 'கம்பனியின் சட்டப் பின்னணி' } },
        { name: { en: 'Issue of shares', si: 'කොටස් නිකුත් කිරීම', ta: 'பங்குகளை வழங்கல்' } },
        { name: { en: 'Property, plant and equipment', si: 'දේපළ, පිරියත සහ උපකරණ', ta: 'சொத்து, ஆலை மற்றும் உபகரணங்கள்' } },
        { name: { en: 'Inventories', si: 'තොග', ta: 'சரக்கிருப்புகள்' } },
        { name: { en: 'Income statement and financial position', si: 'ආදායම් ප්‍රකාශය සහ මූල්‍ය තත්ත්වය', ta: 'வருமானக் கூற்றும் நிதி நிலையும்' } },
        { name: { en: 'Statement of cash flows', si: 'මුදල් ප්‍රවාහ ප්‍රකාශය', ta: 'ரொக்கப் பாய்வுக் கூற்று' } },
      ],
    },
    {
      name: { en: 'Ratio analysis and interpretation', si: 'අනුපාත විශ්ලේෂණය සහ අර්ථකථනය', ta: 'விகித பகுப்பாய்வும் விளக்கமும்' },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'Need for analysis', si: 'විශ්ලේෂණයේ අවශ්‍යතාව', ta: 'பகுப்பாய்வின் தேவை' } },
        { name: { en: 'Liquidity ratios', si: 'ද්‍රවශීලතා අනුපාත', ta: 'நீர்மைத்தன்மை விகிதங்கள்' } },
        { name: { en: 'Profitability ratios', si: 'ලාභදායිතා අනුපාත', ta: 'இலாபத்தன்மை விகிதங்கள்' } },
        { name: { en: 'Efficiency ratios', si: 'කාර්යක්ෂමතා අනුපාත', ta: 'செயற்திறன் விகிதங்கள்' } },
        { name: { en: 'Investment ratios', si: 'ආයෝජන අනුපාත', ta: 'முதலீட்டு விகிதங்கள்' } },
      ],
    },
    {
      name: { en: 'Management accounting', si: 'කළමනාකරණ ගිණුම්කරණය', ta: 'முகாமைத்துவக் கணக்கீடு' },
      periods: 90,
      grade: 13,
      topics: [
        { name: { en: 'Concepts of management accounting', si: 'කළමනාකරණ ගිණුම්කරණ සංකල්ප', ta: 'முகாமைத்துவக் கணக்கீட்டு எண்ணக்கருக்கள்' } },
        { name: { en: 'Classification of costs', si: 'පිරිවැය වර්ගීකරණය', ta: 'செலவு வகைப்பாடு' } },
        { name: { en: 'Material control', si: 'ද්‍රව්‍ය පාලනය', ta: 'பொருள் கட்டுப்பாடு' } },
        { name: { en: 'Labour cost', si: 'ශ්‍රම පිරිවැය', ta: 'உழைப்புச் செலவு' } },
        { name: { en: 'Payroll preparation', si: 'වැටුප් පත්‍රය සකස් කිරීම', ta: 'ஊதியப் பட்டியல் தயாரித்தல்' } },
        { name: { en: 'Overheads', si: 'උඩිසි පිරිවැය', ta: 'மேலதிகச் செலவுகள்' } },
      ],
    },
    {
      name: {
        en: 'Cost behaviour and CVP analysis',
        si: 'පිරිවැය හැසිරීම සහ පිරිවැය-පරිමා-ලාභ විශ්ලේෂණය',
        ta: 'செலவு நடத்தையும் செலவு-அளவு-இலாப பகுப்பாய்வும்',
      },
      periods: 20,
      grade: 13,
      topics: [
        { name: { en: 'Behaviour of cost', si: 'පිරිවැයේ හැසිරීම', ta: 'செலவின் நடத்தை' } },
        { name: { en: 'Cost-volume-profit analysis', si: 'පිරිවැය-පරිමා-ලාභ විශ්ලේෂණය', ta: 'செலவு-அளவு-இலாப பகுப்பாய்வு' } },
        { name: { en: 'Short-term decision making', si: 'කෙටිකාලීන තීරණ ගැනීම', ta: 'குறுங்கால முடிவெடுத்தல்' } },
      ],
    },
    {
      name: { en: 'Capital investment decisions', si: 'ප්‍රාග්ධන ආයෝජන තීරණ', ta: 'மூலதன முதலீட்டு முடிவுகள்' },
      periods: 20,
      grade: 13,
      topics: [
        { name: { en: 'Long-term decision making', si: 'දිගුකාලීන තීරණ ගැනීම', ta: 'நீண்டகால முடிவெடுத்தல்' } },
        { name: { en: 'Capital budgeting techniques', si: 'ප්‍රාග්ධන අයවැයකරණ ක්‍රම', ta: 'மூலதன வரவுசெலவுத் திட்ட நுட்பங்கள்' } },
      ],
    },
  ],
});
