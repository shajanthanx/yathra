/**
 * Information & Communication Technology (Department of Examinations subject 20).
 *
 * Unit list, period allocations and grade split follow the National Institute
 * of Education syllabus for Grades 12 and 13, effective from 2017. Sinhala and
 * Tamil names are translations rather than the official wording: the NIE
 * Sinhala and Tamil editions are published with legacy non-Unicode fonts.
 *
 * The official unit table sums to 487 periods while the syllabus text quotes
 * 442 plus 30 for the project; the per-unit figures below are the table's.
 */
import { defineSyllabus } from './define';

export const ictSyllabus = defineSyllabus({
  subjectId: 'ict',
  source: 'NIE G.C.E. (A/L) Information and Communication Technology Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: {
        en: 'Concept of ICT',
        si: 'තොරතුරු හා සන්නිවේදන තාක්ෂණයේ සංකල්පය',
        ta: 'தகவல் தொடர்பாடல் தொழினுட்பவியலின் எண்ணக்கரு',
      },
      periods: 28,
      grade: 12,
      topics: [
        { name: { en: 'Data and information', si: 'දත්ත සහ තොරතුරු', ta: 'தரவும் தகவலும்' } },
        { name: { en: 'Information life cycle', si: 'තොරතුරු ජීවන චක්‍රය', ta: 'தகவல் வாழ்க்கைச் சுழற்சி' } },
        { name: { en: 'Components of a computer', si: 'පරිගණකයේ අංග', ta: 'கணினியின் கூறுகள்' } },
        { name: { en: 'Software and its activities', si: 'මෘදුකාංග සහ ඒවායේ ක්‍රියාකාරකම්', ta: 'மென்பொருளும் அதன் செயற்பாடுகளும்' } },
        { name: { en: 'Data processing', si: 'දත්ත සැකසීම', ta: 'தரவுச் செயலாக்கம்' } },
        { name: { en: 'Impact of ICT on society', si: 'සමාජයට තොරතුරු තාක්ෂණයේ බලපෑම', ta: 'சமூகத்தில் தகவல் தொழினுட்பத்தின் தாக்கம்' } },
      ],
    },
    {
      name: { en: 'Introduction to Computer', si: 'පරිගණකය හැඳින්වීම', ta: 'கணினி அறிமுகம்' },
      periods: 22,
      grade: 12,
      topics: [
        { name: { en: 'Evolution of computers', si: 'පරිගණක පරිණාමය', ta: 'கணினிகளின் பரிணாமம்' } },
        { name: { en: 'Functional components', si: 'ක්‍රියාකාරී අංග', ta: 'செயற்பாட்டுக் கூறுகள்' } },
        { name: { en: 'Von Neumann architecture', si: 'වොන් නියුමාන් නිර්මිතිය', ta: 'வொன் நியூமன் கட்டமைப்பு' } },
        { name: { en: 'Memory hierarchy', si: 'මතක ධූරාවලිය', ta: 'நினைவகப் படிநிலை' } },
      ],
    },
    {
      name: { en: 'Data Representation', si: 'දත්ත නිරූපණය', ta: 'தரவு உருவகிப்பு' },
      periods: 18,
      grade: 12,
      topics: [
        { name: { en: 'Number systems', si: 'සංඛ්‍යා පද්ධති', ta: 'எண் முறைமைகள்' } },
        { name: { en: 'Character representation', si: 'අක්ෂර නිරූපණය', ta: 'எழுத்து உருவகிப்பு' } },
        { name: { en: 'Binary arithmetic and logic operations', si: 'ද්විමය ගණිත හා තර්ක කර්ම', ta: 'இருமக் கணிதமும் தருக்கச் செயற்பாடுகளும்' } },
      ],
    },
    {
      name: { en: 'Fundamentals of Digital Circuits', si: 'ඩිජිටල් පරිපථවල මූලික කරුණු', ta: 'இலக்கமுறைச் சுற்றுகளின் அடிப்படைகள்' },
      periods: 26,
      grade: 12,
      topics: [
        { name: { en: 'Logic gates', si: 'තර්ක ද්වාර', ta: 'தருக்க வாயில்கள்' } },
        { name: { en: 'Boolean algebra', si: 'බූලීය වීජ ගණිතය', ta: 'பூலிய அட்சரகணிதம்' } },
        { name: { en: 'Designing logic circuits', si: 'තර්ක පරිපථ නිර්මාණය', ta: 'தருக்கச் சுற்று வடிவமைப்பு' } },
        { name: { en: 'Combinational logic and the CPU', si: 'සංයුක්ත තර්කය සහ CPU', ta: 'சேர்மானத் தருக்கமும் CPU உம்' } },
      ],
    },
    {
      name: { en: 'Computer Operating System', si: 'පරිගණක මෙහෙයුම් පද්ධතිය', ta: 'கணினி இயக்க முறைமை' },
      periods: 22,
      grade: 12,
      topics: [
        { name: { en: 'Role of an operating system', si: 'මෙහෙයුම් පද්ධතියේ කාර්යභාරය', ta: 'இயக்க முறைமையின் பங்கு' } },
        { name: { en: 'File management', si: 'ගොනු කළමනාකරණය', ta: 'கோப்பு முகாமைத்துவம்' } },
        { name: { en: 'Process management', si: 'ක්‍රියාවලි කළමනාකරණය', ta: 'செயன்முறை முகாமைத்துவம்' } },
        { name: { en: 'Memory management', si: 'මතක කළමනාකරණය', ta: 'நினைவக முகாமைத்துவம்' } },
      ],
    },
    {
      name: { en: 'Data Communication and Networking', si: 'දත්ත සන්නිවේදනය සහ ජාලකරණය', ta: 'தரவுத் தொடர்பாடலும் வலையமைப்பும்' },
      periods: 50,
      grade: 12,
      topics: [
        { name: { en: 'Signals and their properties', si: 'සංඥා සහ ඒවායේ ගුණ', ta: 'சமிக்ஞைகளும் அவற்றின் பண்புகளும்' } },
        { name: { en: 'Transmission media', si: 'සම්ප්‍රේෂණ මාධ්‍ය', ta: 'செலுத்து ஊடகங்கள்' } },
        { name: { en: 'Digital data encoding', si: 'ඩිජිටල් දත්ත කේතනය', ta: 'இலக்கமுறைத் தரவுக் குறியாக்கம்' } },
        { name: { en: 'Network devices and topologies', si: 'ජාල උපාංග සහ ජාල ස්වරූප', ta: 'வலையமைப்புச் சாதனங்களும் அமைப்புருக்களும்' } },
        { name: { en: 'Protocols and reference models', si: 'ප්‍රොටෝකෝල සහ ආදර්ශ ආකෘති', ta: 'நெறிமுறைகளும் மேற்கோள் மாதிரிகளும்' } },
        { name: { en: 'Network security', si: 'ජාල ආරක්ෂාව', ta: 'வலையமைப்புப் பாதுகாப்பு' } },
        { name: { en: 'Internet access technologies', si: 'අන්තර්ජාල ප්‍රවේශ තාක්ෂණ', ta: 'இணைய அணுகல் தொழினுட்பங்கள்' } },
      ],
    },
    {
      name: { en: 'System Analysis and Design', si: 'පද්ධති විශ්ලේෂණය සහ නිර්මාණය', ta: 'முறைமை பகுப்பாய்வும் வடிவமைப்பும்' },
      periods: 68,
      grade: 12,
      topics: [
        { name: { en: 'Systems and information systems', si: 'පද්ධති සහ තොරතුරු පද්ධති', ta: 'முறைமைகளும் தகவல் முறைமைகளும்' } },
        { name: { en: 'System development life cycle', si: 'පද්ධති සංවර්ධන ජීවන චක්‍රය', ta: 'முறைமை அபிவிருத்தி வாழ்க்கைச் சுழற்சி' } },
        { name: { en: 'Preliminary investigation', si: 'ප්‍රාථමික විමර්ශනය', ta: 'ஆரம்ப ஆய்வு' } },
        { name: { en: 'Requirements analysis', si: 'අවශ්‍යතා විශ්ලේෂණය', ta: 'தேவைகள் பகுப்பாய்வு' } },
        { name: { en: 'Logical design tools', si: 'තාර්කික නිර්මාණ මෙවලම්', ta: 'தருக்க வடிவமைப்புக் கருவிகள்' } },
        { name: { en: 'Development and testing', si: 'සංවර්ධනය සහ පරීක්ෂාව', ta: 'அபிவிருத்தியும் சோதனையும்' } },
        { name: { en: 'Deployment methods', si: 'ක්‍රියාත්මක කිරීමේ ක්‍රම', ta: 'நடைமுறைப்படுத்தல் முறைகள்' } },
      ],
    },
    {
      name: { en: 'Database Management', si: 'දත්ත සමුදාය කළමනාකරණය', ta: 'தரவுத்தள முகாமைத்துவம்' },
      periods: 50,
      grade: 13,
      topics: [
        { name: { en: 'Data and information concepts', si: 'දත්ත සහ තොරතුරු සංකල්ප', ta: 'தரவு மற்றும் தகவல் எண்ணக்கருக்கள்' } },
        { name: { en: 'Relations and tables', si: 'සම්බන්ධතා සහ වගු', ta: 'உறவுகளும் அட்டவணைகளும்' } },
        { name: { en: 'Keys and constraints', si: 'යතුරු සහ බාධක', ta: 'திறவுகோல்களும் கட்டுப்பாடுகளும்' } },
        { name: { en: 'Entity relationship diagrams', si: 'එකක සම්බන්ධතා රූප සටහන්', ta: 'பொருள் உறவு வரைபடங்கள்' } },
        { name: { en: 'Logical schema design', si: 'තාර්කික ක්‍රමලේඛ නිර්මාණය', ta: 'தருக்க அமைப்பு வடிவமைப்பு' } },
        { name: { en: 'Normalization', si: 'සාමාන්‍යකරණය', ta: 'இயல்பாக்கம்' } },
      ],
    },
    {
      name: { en: 'Programming', si: 'ක්‍රමලේඛනය', ta: 'நிரலாக்கம்' },
      periods: 74,
      grade: 13,
      topics: [
        { name: { en: 'Problem solving and algorithms', si: 'ගැටලු විසඳීම සහ ඇල්ගොරිතම', ta: 'பிரச்சினை தீர்த்தலும் படிமுறைத் தீர்வுகளும்' } },
        { name: { en: 'Programming languages and translation', si: 'ක්‍රමලේඛන භාෂා සහ පරිවර්තනය', ta: 'நிரலாக்க மொழிகளும் மொழிபெயர்ப்பும்' } },
        { name: { en: 'Development environments', si: 'සංවර්ධන පරිසර', ta: 'அபிவிருத்திச் சூழல்கள்' } },
        { name: { en: 'Program structure', si: 'ක්‍රමලේඛ ව්‍යුහය', ta: 'நிரல் அமைப்பு' } },
        { name: { en: 'Control structures', si: 'පාලන ව්‍යුහ', ta: 'கட்டுப்பாட்டு அமைப்புகள்' } },
        { name: { en: 'Sub-programs', si: 'උප ක්‍රමලේඛ', ta: 'உப நிரல்கள்' } },
        { name: { en: 'Data structures', si: 'දත්ත ව්‍යුහ', ta: 'தரவு அமைப்புகள்' } },
        { name: { en: 'Searching and sorting', si: 'සෙවීම සහ පෙළගැස්ම', ta: 'தேடலும் வரிசைப்படுத்தலும்' } },
      ],
    },
    {
      name: { en: 'Web Development', si: 'වෙබ් සංවර්ධනය', ta: 'இணைய அபிவிருத்தி' },
      periods: 60,
      grade: 13,
      topics: [
        { name: { en: 'The web and its uses', si: 'වෙබය සහ එහි භාවිත', ta: 'இணையமும் அதன் பயன்பாடுகளும்' } },
        { name: { en: 'Multimedia for the web', si: 'වෙබය සඳහා බහුමාධ්‍ය', ta: 'இணையத்திற்கான பல்லூடகம்' } },
        { name: { en: 'HTML page structure', si: 'HTML පිටු ව්‍යුහය', ta: 'HTML பக்க அமைப்பு' } },
        { name: { en: 'Linking pages', si: 'පිටු සම්බන්ධ කිරීම', ta: 'பக்கங்களை இணைத்தல்' } },
        { name: { en: 'Style sheets', si: 'ශෛලි පත්‍ර', ta: 'பாணித் தாள்கள்' } },
        { name: { en: 'Authoring tools', si: 'නිර්මාණ මෙවලම්', ta: 'உருவாக்கக் கருவிகள்' } },
        { name: { en: 'Dynamic web pages with PHP', si: 'PHP සමඟ ගතික වෙබ් පිටු', ta: 'PHP உடன் இயங்குநிலை இணையப் பக்கங்கள்' } },
        { name: { en: 'Publishing and maintaining a site', si: 'වෙබ් අඩවියක් ප්‍රකාශනය සහ නඩත්තුව', ta: 'இணையத்தளத்தை வெளியிடலும் பராமரித்தலும்' } },
      ],
    },
    {
      name: { en: 'Internet of Things', si: 'දේවල්වල අන්තර්ජාලය', ta: 'பொருட்களின் இணையம்' },
      periods: 15,
      grade: 13,
      topics: [
        { name: { en: 'Building blocks of IoT', si: 'IoT හි මූලික අංග', ta: 'IoT இன் அடிப்படைக் கூறுகள்' } },
        { name: { en: 'Creating IoT solutions', si: 'IoT විසඳුම් නිර්මාණය', ta: 'IoT தீர்வுகளை உருவாக்கல்' } },
      ],
    },
    {
      name: { en: 'ICT in Business', si: 'ව්‍යාපාරයේ තොරතුරු තාක්ෂණය', ta: 'வணிகத்தில் தகவல் தொழினுட்பம்' },
      periods: 12,
      grade: 13,
      topics: [
        { name: { en: 'Role of ICT in business', si: 'ව්‍යාපාරයේ තොරතුරු තාක්ෂණයේ කාර්යභාරය', ta: 'வணிகத்தில் தகவல் தொழினுட்பத்தின் பங்கு' } },
        { name: { en: 'E-commerce and e-business', si: 'ඉ-වාණිජ්‍යය සහ ඉ-ව්‍යාපාර', ta: 'மின் வணிகமும் மின் தொழிலும்' } },
        { name: { en: 'Types of e-business transactions', si: 'ඉ-ව්‍යාපාර ගනුදෙනු වර්ග', ta: 'மின் தொழில் பரிவர்த்தனை வகைகள்' } },
      ],
    },
    {
      name: {
        en: 'New Trends and Future Directions of ICT',
        si: 'තොරතුරු තාක්ෂණයේ නව ප්‍රවණතා සහ අනාගත දිශානතිය',
        ta: 'தகவல் தொழினுட்பத்தின் புதிய போக்குகளும் எதிர்கால திசைகளும்',
      },
      periods: 12,
      grade: 13,
      topics: [
        { name: { en: 'New trends in ICT', si: 'තොරතුරු තාක්ෂණයේ නව ප්‍රවණතා', ta: 'தகவல் தொழினுட்பத்தின் புதிய போக்குகள்' } },
        { name: { en: 'Software agents', si: 'මෘදුකාංග කාරක', ta: 'மென்பொருள் முகவர்கள்' } },
        { name: { en: 'Emerging models of computing', si: 'නැගී එන පරිගණන ආකෘති', ta: 'உருவாகும் கணிப்பீட்டு மாதிரிகள்' } },
      ],
    },
    {
      name: { en: 'Project', si: 'ව්‍යාපෘතිය', ta: 'செயற்திட்டம்' },
      periods: 30,
      grade: 13,
      topics: [
        { name: { en: 'Designing an information system', si: 'තොරතුරු පද්ධතියක් නිර්මාණය', ta: 'தகவல் முறைமையொன்றை வடிவமைத்தல்' } },
        { name: { en: 'Implementing and demonstrating the system', si: 'පද්ධතිය ක්‍රියාත්මක කිරීම සහ ඉදිරිපත් කිරීම', ta: 'முறைமையை நடைமுறைப்படுத்தலும் நிரூபித்தலும்' } },
      ],
    },
  ],
});
