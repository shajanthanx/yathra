/**
 * Business Studies (Department of Examinations subject 32).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 18 competencies with 300 periods in each grade.
 * Those competencies are the units below, with their long competency
 * statements shortened to titles that fit a phone screen. Sinhala and Tamil
 * names are translations rather than the official wording: the NIE Sinhala and
 * Tamil editions are published with legacy non-Unicode fonts.
 */
import { defineSyllabus } from './define';

export const businessStudiesSyllabus = defineSyllabus({
  subjectId: 'business-studies',
  source: 'NIE G.C.E. (A/L) Business Studies Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: { en: 'Business and its environment', si: 'ව්‍යාපාරය සහ එහි පරිසරය', ta: 'வணிகமும் அதன் சூழலும்' },
      periods: 50,
      grade: 12,
      topics: [
        { name: { en: 'Concept of business', si: 'ව්‍යාපාර සංකල්පය', ta: 'வணிக எண்ணக்கரு' } },
        { name: { en: 'Classification of businesses', si: 'ව්‍යාපාර වර්ගීකරණය', ta: 'வணிக வகைப்பாடு' } },
        { name: { en: 'Business as a system', si: 'පද්ධතියක් ලෙස ව්‍යාපාරය', ta: 'முறைமையாக வணிகம்' } },
        { name: { en: 'Reasons for business failure', si: 'ව්‍යාපාර අසාර්ථක වීමේ හේතු', ta: 'வணிகத் தோல்விக்கான காரணங்கள்' } },
        { name: { en: 'The micro environment', si: 'ක්ෂුද්‍ර පරිසරය', ta: 'நுண் சூழல்' } },
        { name: { en: 'The macro environment', si: 'සාර්ව පරිසරය', ta: 'பேரண்ட சூழல்' } },
        { name: { en: 'The global environment', si: 'ගෝලීය පරිසරය', ta: 'உலகளாவிய சூழல்' } },
      ],
    },
    {
      name: {
        en: 'Social responsibility and business ethics',
        si: 'සමාජ වගකීම සහ ව්‍යාපාරික සදාචාරය',
        ta: 'சமூகப் பொறுப்பும் வணிக நெறிமுறைகளும்',
      },
      periods: 20,
      grade: 12,
      topics: [
        { name: { en: 'Stakeholders of a business', si: 'ව්‍යාපාරයේ පාර්ශවකරුවන්', ta: 'வணிகத்தின் பங்குதாரர்கள்' } },
        { name: { en: 'Social responsibility', si: 'සමාජ වගකීම', ta: 'சமூகப் பொறுப்பு' } },
        { name: { en: 'Business ethics', si: 'ව්‍යාපාරික සදාචාරය', ta: 'வணிக நெறிமுறைகள்' } },
      ],
    },
    {
      name: { en: 'Business and government', si: 'ව්‍යාපාරය සහ රජය', ta: 'வணிகமும் அரசாங்கமும்' },
      periods: 30,
      grade: 12,
      topics: [
        { name: { en: 'Government and business relationship', si: 'රජය සහ ව්‍යාපාර සම්බන්ධතාව', ta: 'அரசாங்க வணிக உறவு' } },
        { name: { en: 'Social and economic aims of government', si: 'රජයේ සමාජ හා ආර්ථික අරමුණු', ta: 'அரசாங்கத்தின் சமூக பொருளாதார நோக்கங்கள்' } },
        { name: { en: 'Government intervention', si: 'රජයේ මැදිහත්වීම', ta: 'அரசாங்கத் தலையீடு' } },
        { name: { en: 'State institutions', si: 'රාජ්‍ය ආයතන', ta: 'அரச நிறுவனங்கள்' } },
        { name: { en: 'Consumer protection', si: 'පාරිභෝගික ආරක්ෂණය', ta: 'நுகர்வோர் பாதுகாப்பு' } },
      ],
    },
    {
      name: { en: 'Types of business organizations', si: 'ව්‍යාපාර සංවිධාන වර්ග', ta: 'வணிக நிறுவன வகைகள்' },
      periods: 40,
      grade: 12,
      topics: [
        { name: { en: 'Concept of business organization', si: 'ව්‍යාපාර සංවිධාන සංකල්පය', ta: 'வணிக நிறுவன எண்ணக்கரு' } },
        { name: { en: 'Sole proprietorship', si: 'තනි හිමි ව්‍යාපාර', ta: 'ஒற்றை உரிமையாண்மை' } },
        { name: { en: 'Partnerships', si: 'හවුල් ව්‍යාපාර', ta: 'கூட்டாண்மை' } },
        { name: { en: 'Companies', si: 'සමාගම්', ta: 'கம்பனிகள்' } },
        { name: { en: 'Co-operatives and state enterprises', si: 'සමූපකාර සහ රාජ්‍ය ව්‍යවසාය', ta: 'கூட்டுறவுகளும் அரச தொழில்முயற்சிகளும்' } },
        { name: { en: 'Registration and legal formalities', si: 'ලියාපදිංචිය සහ නීතිමය කටයුතු', ta: 'பதிவும் சட்ட நடைமுறைகளும்' } },
      ],
    },
    {
      name: { en: 'Entrepreneurship', si: 'ව්‍යවසායකත්වය', ta: 'தொழில்முனைவு' },
      periods: 20,
      grade: 12,
      topics: [
        { name: { en: 'Nature of entrepreneurship', si: 'ව්‍යවසායකත්වයේ ස්වභාවය', ta: 'தொழில்முனைவின் தன்மை' } },
        { name: { en: 'The entrepreneurial process', si: 'ව්‍යවසායක ක්‍රියාවලිය', ta: 'தொழில்முனைவுச் செயன்முறை' } },
        { name: { en: 'Acting as an entrepreneur', si: 'ව්‍යවසායකයෙකු ලෙස ක්‍රියා කිරීම', ta: 'தொழில்முனைவோராகச் செயற்படல்' } },
      ],
    },
    {
      name: { en: 'Small and medium businesses', si: 'කුඩා හා මධ්‍ය පරිමාණ ව්‍යාපාර', ta: 'சிறு நடுத்தர வணிகங்கள்' },
      periods: 15,
      grade: 12,
      topics: [
        { name: { en: 'Importance of small and medium businesses', si: 'කුඩා හා මධ්‍ය පරිමාණ ව්‍යාපාරවල වැදගත්කම', ta: 'சிறு நடுத்தர வணிகங்களின் முக்கியத்துவம்' } },
        { name: { en: 'Support institutions', si: 'සහාය ආයතන', ta: 'ஆதரவு நிறுவனங்கள்' } },
      ],
    },
    {
      name: { en: 'Money and financial institutions', si: 'මුදල් සහ මූල්‍ය ආයතන', ta: 'பணமும் நிதி நிறுவனங்களும்' },
      periods: 40,
      grade: 12,
      topics: [
        { name: { en: 'Importance of money', si: 'මුදලේ වැදගත්කම', ta: 'பணத்தின் முக்கியத்துவம்' } },
        { name: { en: 'The financial system', si: 'මූල්‍ය පද්ධතිය', ta: 'நிதி முறைமை' } },
        { name: { en: 'Role of the Central Bank', si: 'මහ බැංකුවේ කාර්යභාරය', ta: 'மத்திய வங்கியின் பங்கு' } },
        { name: { en: 'Commercial banks', si: 'වාණිජ බැංකු', ta: 'வர்த்தக வங்கிகள்' } },
        { name: { en: 'Other financial institutions', si: 'වෙනත් මූල්‍ය ආයතන', ta: 'ஏனைய நிதி நிறுவனங்கள்' } },
        { name: { en: 'Payment instruments and e-banking', si: 'ගෙවීම් උපකරණ සහ ඉ-බැංකුකරණය', ta: 'கொடுப்பனவுக் கருவிகளும் மின் வங்கியியலும்' } },
      ],
    },
    {
      name: { en: 'Insurance', si: 'රක්ෂණය', ta: 'காப்புறுதி' },
      periods: 15,
      grade: 12,
      topics: [
        { name: { en: 'Importance of insurance', si: 'රක්ෂණයේ වැදගත්කම', ta: 'காப்புறுதியின் முக்கியத்துவம்' } },
        { name: { en: 'Principles of insurance', si: 'රක්ෂණ මූලධර්ම', ta: 'காப்புறுதிக் கோட்பாடுகள்' } },
        { name: { en: 'Types of insurance', si: 'රක්ෂණ වර්ග', ta: 'காப்புறுதி வகைகள்' } },
      ],
    },
    {
      name: { en: 'Business communication', si: 'ව්‍යාපාරික සන්නිවේදනය', ta: 'வணிகத் தொடர்பாடல்' },
      periods: 10,
      grade: 12,
      topics: [
        { name: { en: 'Effective business communication', si: 'ඵලදායී ව්‍යාපාරික සන්නිවේදනය', ta: 'பயனுறுதியான வணிகத் தொடர்பாடல்' } },
        { name: { en: 'Communication methods', si: 'සන්නිවේදන ක්‍රම', ta: 'தொடர்பாடல் முறைகள்' } },
      ],
    },
    {
      name: { en: 'Logistics', si: 'සැපයුම් කළමනාකරණය', ta: 'தளவாட முகாமைத்துவம்' },
      periods: 20,
      grade: 12,
      topics: [
        { name: { en: 'Contribution of logistics', si: 'සැපයුම් කළමනාකරණයේ දායකත්වය', ta: 'தளவாட முகாமைத்துவத்தின் பங்களிப்பு' } },
        { name: { en: 'Modes of transport', si: 'ප්‍රවාහන ක්‍රම', ta: 'போக்குவரத்து முறைகள்' } },
        { name: { en: 'Warehousing and storage', si: 'ගබඩාකරණය', ta: 'கிடங்கு வசதியும் சேமிப்பும்' } },
        { name: { en: 'Supply chain services', si: 'සැපයුම් දාම සේවා', ta: 'விநியோகச் சங்கிலி சேவைகள்' } },
      ],
    },
    {
      name: { en: 'Trade and distribution', si: 'වෙළඳාම සහ බෙදාහැරීම', ta: 'வர்த்தகமும் விநியோகமும்' },
      periods: 40,
      grade: 12,
      topics: [
        { name: { en: 'Trade and distribution channels', si: 'වෙළඳාම සහ බෙදාහැරීමේ නාලිකා', ta: 'வர்த்தகமும் விநியோக வாய்க்கால்களும்' } },
        { name: { en: 'Retail trade', si: 'සිල්ලර වෙළඳාම', ta: 'சில்லறை வர்த்தகம்' } },
        { name: { en: 'Wholesale trade', si: 'තොග වෙළඳාම', ta: 'மொத்த வர்த்தகம்' } },
        { name: { en: 'International trade', si: 'ජාත්‍යන්තර වෙළඳාම', ta: 'சர்வதேச வர்த்தகம்' } },
        { name: { en: 'Import and export procedures', si: 'ආනයන හා අපනයන ක්‍රියාපටිපාටි', ta: 'இறக்குமதி ஏற்றுமதி நடைமுறைகள்' } },
        { name: { en: 'Trade documents and finance', si: 'වෙළඳ ලේඛන සහ මූල්‍යකරණය', ta: 'வர்த்தக ஆவணங்களும் நிதியிடலும்' } },
        { name: { en: 'Electronic trade', si: 'ඉලෙක්ට්‍රොනික වෙළඳාම', ta: 'மின்னணு வர்த்தகம்' } },
      ],
    },
    {
      name: { en: 'Management', si: 'කළමනාකරණය', ta: 'முகாமைத்துவம்' },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Need for management', si: 'කළමනාකරණයේ අවශ්‍යතාව', ta: 'முகாமைத்துவத்தின் தேவை' } },
        { name: { en: 'Evolution of management thought', si: 'කළමනාකරණ චින්තනයේ පරිණාමය', ta: 'முகாமைத்துவ சிந்தனையின் பரிணாமம்' } },
        { name: { en: 'Functions of management', si: 'කළමනාකරණ කාර්ය', ta: 'முகாமைத்துவச் செயற்பாடுகள்' } },
        { name: { en: 'Planning and organizing', si: 'සැලසුම්කරණය සහ සංවිධානය', ta: 'திட்டமிடலும் ஒழுங்கமைத்தலும்' } },
        { name: { en: 'Leading and directing', si: 'නායකත්වය සහ මෙහෙයවීම', ta: 'தலைமைத்துவமும் வழிநடத்தலும்' } },
        { name: { en: 'Motivation', si: 'අභිප්‍රේරණය', ta: 'ஊக்குவிப்பு' } },
        { name: { en: 'Controlling', si: 'පාලනය', ta: 'கட்டுப்படுத்தல்' } },
      ],
    },
    {
      name: { en: 'Operations management', si: 'මෙහෙයුම් කළමනාකරණය', ta: 'செயற்பாட்டு முகாமைத்துவம்' },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Importance of operations', si: 'මෙහෙයුම්වල වැදගත්කම', ta: 'செயற்பாடுகளின் முக்கியத்துவம்' } },
        { name: { en: 'Production systems', si: 'නිෂ්පාදන පද්ධති', ta: 'உற்பத்தி முறைமைகள்' } },
        { name: { en: 'Break-even analysis', si: 'බිඳුම් ලක්ෂ්‍ය විශ්ලේෂණය', ta: 'சமன்நிலைப் பகுப்பாய்வு' } },
        { name: { en: 'Plant location and layout', si: 'කම්හල් පිහිටීම සහ සැකැස්ම', ta: 'ஆலை அமைவிடமும் தளவமைப்பும்' } },
        { name: { en: 'Capacity and inventory', si: 'ධාරිතාව සහ තොග', ta: 'கொள்ளளவும் சரக்கிருப்பும்' } },
        { name: { en: 'Quality management', si: 'ගුණාත්මක කළමනාකරණය', ta: 'தரமுகாமைத்துவம்' } },
      ],
    },
    {
      name: { en: 'Marketing management', si: 'අලෙවිකරණ කළමනාකරණය', ta: 'சந்தைப்படுத்தல் முகாமைத்துவம்' },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Basic marketing concepts', si: 'මූලික අලෙවිකරණ සංකල්ප', ta: 'அடிப்படை சந்தைப்படுத்தல் எண்ணக்கருக்கள்' } },
        { name: { en: 'Marketing philosophies', si: 'අලෙවිකරණ දර්ශන', ta: 'சந்தைப்படுத்தல் தத்துவங்கள்' } },
        { name: { en: 'Segmentation and targeting', si: 'වෙළඳපොළ ඛණ්ඩනය සහ ඉලක්කගත කිරීම', ta: 'சந்தைப் பிரிவாக்கமும் இலக்குவைத்தலும்' } },
        { name: { en: 'The marketing mix', si: 'අලෙවිකරණ මිශ්‍රණය', ta: 'சந்தைப்படுத்தல் கலவை' } },
        { name: { en: 'Product and branding', si: 'නිෂ්පාදනය සහ වෙළඳ නාමකරණය', ta: 'உற்பத்திப் பொருளும் வர்த்தக நாமமும்' } },
        { name: { en: 'Pricing', si: 'මිල නියම කිරීම', ta: 'விலை நிர்ணயம்' } },
        { name: { en: 'Distribution channels', si: 'බෙදාහැරීමේ නාලිකා', ta: 'விநியோக வாய்க்கால்கள்' } },
        { name: { en: 'Promotion', si: 'ප්‍රවර්ධනය', ta: 'ஊக்குவிப்பு' } },
      ],
    },
    {
      name: { en: 'Financial management', si: 'මූල්‍ය කළමනාකරණය', ta: 'நிதி முகாமைத்துவம்' },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Role of financial management', si: 'මූල්‍ය කළමනාකරණයේ කාර්යභාරය', ta: 'நிதி முகாமைத்துவத்தின் பங்கு' } },
        { name: { en: 'Sources of finance', si: 'මූල්‍ය ප්‍රභව', ta: 'நிதி மூலங்கள்' } },
        { name: { en: 'Investment alternatives', si: 'ආයෝජන විකල්ප', ta: 'முதலீட்டு மாற்றுவழிகள்' } },
        { name: { en: 'Analysis of financial statements', si: 'මූල්‍ය ප්‍රකාශන විශ්ලේෂණය', ta: 'நிதிக் கூற்றுகளின் பகுப்பாய்வு' } },
        { name: { en: 'Working capital', si: 'ක්‍රියාකාරී ප්‍රාග්ධනය', ta: 'நடைமுறை மூலதனம்' } },
        { name: { en: 'The stock exchange', si: 'කොටස් වෙළඳපොළ', ta: 'பங்குப் பரிவர்த்தனை' } },
      ],
    },
    {
      name: { en: 'Human resource management', si: 'මානව සම්පත් කළමනාකරණය', ta: 'மனிதவள முகாமைத்துவம்' },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Concept and need for HRM', si: 'මානව සම්පත් කළමනාකරණයේ සංකල්පය', ta: 'மனிதவள முகாமைத்துவ எண்ணக்கரு' } },
        { name: { en: 'Human resource planning', si: 'මානව සම්පත් සැලසුම්කරණය', ta: 'மனிதவளத் திட்டமிடல்' } },
        { name: { en: 'Recruitment and selection', si: 'බඳවා ගැනීම සහ තෝරා ගැනීම', ta: 'ஆட்சேர்ப்பும் தெரிவும்' } },
        { name: { en: 'Induction and training', si: 'ඇතුළත් කිරීම සහ පුහුණුව', ta: 'அறிமுகமும் பயிற்சியும்' } },
        { name: { en: 'Performance appraisal', si: 'කාර්ය සාධන ඇගයීම', ta: 'செயலாற்றுகை மதிப்பீடு' } },
        { name: { en: 'Rewards and discipline', si: 'ත්‍යාග සහ විනය', ta: 'வெகுமதிகளும் ஒழுக்கமும்' } },
      ],
    },
    {
      name: { en: 'Information systems in business', si: 'ව්‍යාපාරයේ තොරතුරු පද්ධති', ta: 'வணிகத்தில் தகவல் முறைமைகள்' },
      periods: 35,
      grade: 13,
      topics: [
        { name: { en: 'Importance of information', si: 'තොරතුරුවල වැදගත්කම', ta: 'தகவலின் முக்கியத்துவம்' } },
        { name: { en: 'Classification of information systems', si: 'තොරතුරු පද්ධති වර්ගීකරණය', ta: 'தகவல் முறைமைகளின் வகைப்பாடு' } },
        { name: { en: 'Benefits of information systems', si: 'තොරතුරු පද්ධතිවල ප්‍රතිලාභ', ta: 'தகவல் முறைமைகளின் நன்மைகள்' } },
        { name: { en: 'Use of the internet in business', si: 'ව්‍යාපාරයේ අන්තර්ජාල භාවිතය', ta: 'வணிகத்தில் இணையப் பயன்பாடு' } },
      ],
    },
    {
      name: { en: 'Business plan', si: 'ව්‍යාපාර සැලැස්ම', ta: 'வணிகத் திட்டம்' },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'Preparing a business plan', si: 'ව්‍යාපාර සැලැස්මක් සකස් කිරීම', ta: 'வணிகத் திட்டம் தயாரித்தல்' } },
        { name: { en: 'Marketing plan', si: 'අලෙවිකරණ සැලැස්ම', ta: 'சந்தைப்படுத்தல் திட்டம்' } },
        { name: { en: 'Operational plan', si: 'මෙහෙයුම් සැලැස්ම', ta: 'செயற்பாட்டுத் திட்டம்' } },
        { name: { en: 'Human resource plan', si: 'මානව සම්පත් සැලැස්ම', ta: 'மனிதவளத் திட்டம்' } },
        { name: { en: 'Financial plan', si: 'මූල්‍ය සැලැස්ම', ta: 'நிதித் திட்டம்' } },
        { name: { en: 'Feasibility and executive summary', si: 'ශක්‍යතාව සහ විධායක සාරාංශය', ta: 'சாத்தியக்கூறும் நிறைவேற்றுச் சுருக்கமும்' } },
      ],
    },
  ],
});
