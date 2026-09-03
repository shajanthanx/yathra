/**
 * Science for Technology (Department of Examinations subject 67).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 25 competencies with 300 periods in each grade.
 * Those competencies are the units below, with their long competency
 * statements shortened to titles that fit a phone screen. Sinhala and Tamil
 * names are translations rather than the official wording: the NIE Sinhala and
 * Tamil editions are published with legacy non-Unicode fonts.
 */
import { defineSyllabus } from './define';

export const scienceForTechnologySyllabus = defineSyllabus({
  subjectId: 'science-for-technology',
  source: 'NIE G.C.E. (A/L) Science for Technology Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: { en: 'Area and volume', si: 'වර්ගඵලය සහ පරිමාව', ta: 'பரப்பளவும் கனவளவும்' },
      periods: 17,
      grade: 12,
      topics: [
        { name: { en: 'Area of plane figures', si: 'තල රූපවල වර්ගඵලය', ta: 'தள உருவங்களின் பரப்பளவு' } },
        { name: { en: 'Volume of solids', si: 'ඝන වස්තූන්ගේ පරිමාව', ta: 'திண்மங்களின் கனவளவு' } },
      ],
    },
    {
      name: { en: 'Measuring units and instruments', si: 'මිනුම් ඒකක සහ උපකරණ', ta: 'அளவீட்டு அலகுகளும் கருவிகளும்' },
      periods: 12,
      grade: 12,
      topics: [
        { name: { en: 'Measuring units', si: 'මිනුම් ඒකක', ta: 'அளவீட்டு அலகுகள்' } },
        { name: { en: 'Measuring instruments', si: 'මිනුම් උපකරණ', ta: 'அளவிடும் கருவிகள்' } },
      ],
    },
    {
      name: { en: 'Pythagoras relationship', si: 'පයිතගරස් සම්බන්ධතාව', ta: 'பித்தகோரஸ் தொடர்பு' },
      periods: 6,
      grade: 12,
    },
    {
      name: {
        en: 'Cells and organisms in technology',
        si: 'තාක්ෂණයේ සෛල සහ ජීවීන්',
        ta: 'தொழினுட்பத்தில் கலங்களும் அங்கிகளும்',
      },
      periods: 50,
      grade: 12,
      topics: [
        { name: { en: 'Cell structure', si: 'සෛල ව්‍යුහය', ta: 'கல அமைப்பு' } },
        { name: { en: 'Cell components', si: 'සෛල අංග', ta: 'கலக் கூறுகள்' } },
        { name: { en: 'Microscopy', si: 'අන්වීක්ෂ භාවිතය', ta: 'நுணுக்குக்காட்டி பயன்பாடு' } },
        { name: { en: 'Cell division', si: 'සෛල බෙදීම', ta: 'கலப் பிரிவு' } },
        { name: { en: 'Biomolecules', si: 'ජෛව අණු', ta: 'உயிர் மூலக்கூறுகள்' } },
        { name: { en: 'Tissues', si: 'පටක', ta: 'திசுக்கள்' } },
        { name: { en: 'Microorganisms in technology', si: 'තාක්ෂණයේ ක්ෂුද්‍රජීවීන්', ta: 'தொழினுட்பத்தில் நுண்ணுயிர்கள்' } },
      ],
    },
    {
      name: { en: 'Force and its effects', si: 'බලය සහ එහි ප්‍රයෝග', ta: 'விசையும் அதன் விளைவுகளும்' },
      periods: 42,
      grade: 12,
      topics: [
        { name: { en: 'Nature of forces', si: 'බලවල ස්වභාවය', ta: 'விசைகளின் தன்மை' } },
        { name: { en: 'Effects of forces', si: 'බලවල ප්‍රයෝග', ta: 'விசைகளின் விளைவுகள்' } },
        { name: { en: "Newton's laws of motion", si: 'නිව්ටන්ගේ චලිත නියම', ta: 'நியூட்டனின் இயக்க விதிகள்' } },
        { name: { en: 'Equilibrium and moments', si: 'සමතුලිතතාව සහ ඝූර්ණ', ta: 'சமநிலையும் திருப்புத்திறனும்' } },
      ],
    },
    {
      name: { en: 'Work, energy and power', si: 'කාර්ය, ශක්තිය සහ ක්ෂමතාව', ta: 'வேலை, சக்தி மற்றும் வலு' },
      periods: 14,
      grade: 12,
    },
    {
      name: { en: 'Trigonometric ratios', si: 'ත්‍රිකෝණමිතික අනුපාත', ta: 'திரிகோணகணித விகிதங்கள்' },
      periods: 24,
      grade: 12,
      topics: [
        { name: { en: 'Trigonometric ratios', si: 'ත්‍රිකෝණමිතික අනුපාත', ta: 'திரிகோணகணித விகிதங்கள்' } },
        { name: { en: 'Applications of trigonometry', si: 'ත්‍රිකෝණමිතියේ භාවිත', ta: 'திரிகோணகணிதப் பிரயோகங்கள்' } },
        { name: { en: 'Lengths and angles in practice', si: 'ප්‍රායෝගික දිග සහ කෝණ', ta: 'நடைமுறையில் நீளங்களும் கோணங்களும்' } },
      ],
    },
    {
      name: { en: 'Rotational motion', si: 'භ්‍රමණ චලිතය', ta: 'சுழற்சி இயக்கம்' },
      periods: 24,
      grade: 12,
    },
    {
      name: { en: 'Electricity and circuits', si: 'විද්‍යුතය සහ පරිපථ', ta: 'மின்சாரமும் சுற்றுகளும்' },
      periods: 27,
      grade: 12,
      topics: [
        { name: { en: 'Current electricity', si: 'ධාරා විද්‍යුතය', ta: 'ஓட்ட மின்னியல்' } },
        { name: { en: 'Circuits and appliances', si: 'පරිපථ සහ උපකරණ', ta: 'சுற்றுகளும் உபகரணங்களும்' } },
      ],
    },
    {
      name: { en: 'Heat', si: 'තාපය', ta: 'வெப்பம்' },
      periods: 23,
      grade: 12,
      topics: [
        { name: { en: 'Heat and temperature', si: 'තාපය සහ උෂ්ණත්වය', ta: 'வெப்பமும் வெப்பநிலையும்' } },
        { name: { en: 'Transfer of heat', si: 'තාප සම්ප්‍රේෂණය', ta: 'வெப்பக் கடத்தல்' } },
      ],
    },
    {
      name: { en: 'Thermochemistry', si: 'තාප රසායනය', ta: 'வெப்ப இரசாயனம்' },
      periods: 17,
      grade: 12,
      topics: [
        { name: { en: 'Basic thermochemistry', si: 'මූලික තාප රසායනය', ta: 'அடிப்படை வெப்ப இரசாயனம்' } },
        { name: { en: 'Heat of reaction', si: 'ප්‍රතික්‍රියා තාපය', ta: 'வினை வெப்பம்' } },
      ],
    },
    {
      name: { en: 'Chemical kinetics', si: 'චාලක රසායනය', ta: 'இரசாயன இயக்கவியல்' },
      periods: 20,
      grade: 12,
      topics: [
        { name: { en: 'Rate of reaction', si: 'ප්‍රතික්‍රියා වේගය', ta: 'வினை வீதம்' } },
        { name: { en: 'Applications of reaction rates', si: 'ප්‍රතික්‍රියා වේගයේ භාවිත', ta: 'வினை வீதப் பிரயோகங்கள்' } },
      ],
    },
    {
      name: {
        en: 'Organic compounds and biomolecules',
        si: 'කාබනික සංයෝග සහ ජෛව අණු',
        ta: 'சேதனச் சேர்வைகளும் உயிர் மூலக்கூறுகளும்',
      },
      periods: 24,
      grade: 12,
      topics: [
        { name: { en: 'Organic compounds', si: 'කාබනික සංයෝග', ta: 'சேதனச் சேர்வைகள்' } },
        { name: { en: 'Carbohydrates', si: 'කාබෝහයිඩ්‍රේට', ta: 'கார்போஹைட்ரேட்டுகள்' } },
        { name: { en: 'Proteins', si: 'ප්‍රෝටීන', ta: 'புரதங்கள்' } },
        { name: { en: 'Lipids', si: 'ලිපිඩ', ta: 'கொழுப்புகள்' } },
        { name: { en: 'Nucleic acids', si: 'න්‍යෂ්ටික අම්ල', ta: 'கருவமிலங்கள்' } },
      ],
    },
    {
      name: { en: 'Polymers', si: 'බහුඅවයවික', ta: 'பல்பகுதியிகள்' },
      periods: 17,
      grade: 13,
      topics: [
        { name: { en: 'Classifying polymers', si: 'බහුඅවයවික වර්ගීකරණය', ta: 'பல்பகுதியிகளின் வகைப்பாடு' } },
        { name: { en: 'Uses of polymers', si: 'බහුඅවයවිකවල භාවිත', ta: 'பல்பகுதியிகளின் பயன்பாடுகள்' } },
      ],
    },
    {
      name: {
        en: 'Mechanical properties of matter',
        si: 'පදාර්ථයේ යාන්ත්‍රික ගුණ',
        ta: 'சடத்தின் பொறியியல் இயல்புகள்',
      },
      periods: 12,
      grade: 13,
    },
    {
      name: { en: 'Fluids at rest and in motion', si: 'නිශ්චල සහ චලිත තරල', ta: 'நிலையான மற்றும் இயங்கும் மியங்கள்' },
      periods: 26,
      grade: 13,
      topics: [
        { name: { en: 'Fluids at rest', si: 'නිශ්චල තරල', ta: 'நிலையான மியங்கள்' } },
        { name: { en: 'Fluids in motion', si: 'චලිත තරල', ta: 'இயங்கும் மியங்கள்' } },
      ],
    },
    {
      name: { en: 'Chemical industries in Sri Lanka', si: 'ශ්‍රී ලංකාවේ රසායනික කර්මාන්ත', ta: 'இலங்கையில் இரசாயனக் கைத்தொழில்கள்' },
      periods: 35,
      grade: 13,
      topics: [
        { name: { en: 'Industrial skills', si: 'කාර්මික කුසලතා', ta: 'கைத்தொழில் திறன்கள்' } },
        { name: { en: 'Regulating reactions', si: 'ප්‍රතික්‍රියා නියාමනය', ta: 'வினைகளை ஒழுங்குபடுத்தல்' } },
        { name: { en: 'Advanced chemical industries', si: 'උසස් රසායනික කර්මාන්ත', ta: 'மேம்பட்ட இரசாயனக் கைத்தொழில்கள்' } },
      ],
    },
    {
      name: {
        en: 'Natural products and extraction',
        si: 'ස්වාභාවික නිෂ්පාදන සහ නිස්සාරණය',
        ta: 'இயற்கைப் பொருட்களும் பிரித்தெடுத்தலும்',
      },
      periods: 43,
      grade: 13,
      topics: [
        { name: { en: 'Natural products', si: 'ස්වාභාවික නිෂ්පාදන', ta: 'இயற்கைப் பொருட்கள்' } },
        { name: { en: 'Extraction methods', si: 'නිස්සාරණ ක්‍රම', ta: 'பிரித்தெடுக்கும் முறைகள்' } },
      ],
    },
    {
      name: {
        en: 'Linear and quadratic functions',
        si: 'රේඛීය සහ වර්ගජ ශ්‍රිත',
        ta: 'நேரிய மற்றும் இருபடிச் சார்புகள்',
      },
      periods: 22,
      grade: 13,
      topics: [
        { name: { en: 'Coordinates', si: 'ඛණ්ඩාංක', ta: 'ஆள்கூறுகள்' } },
        { name: { en: 'Linear and quadratic functions', si: 'රේඛීය සහ වර්ගජ ශ්‍රිත', ta: 'நேரிய மற்றும் இருபடிச் சார்புகள்' } },
      ],
    },
    {
      name: { en: 'Descriptive statistics', si: 'වර්ණනාත්මක සංඛ්‍යානය', ta: 'விவரண புள்ளிவிபரவியல்' },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Measures of central tendency', si: 'මධ්‍යස්ථ ප්‍රවණතා මිනුම්', ta: 'மைய நாட்ட அளவைகள்' } },
        { name: { en: 'Interpreting data', si: 'දත්ත අර්ථකථනය', ta: 'தரவு விளக்கம்' } },
        { name: { en: 'Measures of dispersion', si: 'විසිරුම් මිනුම්', ta: 'சிதறல் அளவைகள்' } },
      ],
    },
    {
      name: { en: 'Computer systems and devices', si: 'පරිගණක පද්ධති සහ උපාංග', ta: 'கணினி முறைமைகளும் சாதனங்களும்' },
      periods: 4,
      grade: 13,
    },
    {
      name: { en: 'Operating systems', si: 'මෙහෙයුම් පද්ධති', ta: 'இயக்க முறைமைகள்' },
      periods: 9,
      grade: 13,
      topics: [
        { name: { en: 'The operating system', si: 'මෙහෙයුම් පද්ධතිය', ta: 'இயக்க முறைமை' } },
        { name: { en: 'Using a computer', si: 'පරිගණකය භාවිතය', ta: 'கணினியைப் பயன்படுத்தல்' } },
      ],
    },
    {
      name: { en: 'Application software', si: 'යෙදුම් මෘදුකාංග', ta: 'பயன்பாட்டு மென்பொருள்' },
      periods: 36,
      grade: 13,
      topics: [
        { name: { en: 'Word processing', si: 'වචන සැකසීම', ta: 'சொல் செயலாக்கம்' } },
        { name: { en: 'Spreadsheets', si: 'පැතුරුම්පත්', ta: 'விரிதாள்கள்' } },
        { name: { en: 'Presentations', si: 'ඉදිරිපත් කිරීම්', ta: 'விளக்கக்காட்சிகள்' } },
      ],
    },
    {
      name: { en: 'Internet and communication', si: 'අන්තර්ජාලය සහ සන්නිවේදනය', ta: 'இணையமும் தொடர்பாடலும்' },
      periods: 15,
      grade: 13,
      topics: [
        { name: { en: 'Using the internet for information', si: 'තොරතුරු සඳහා අන්තර්ජාලය', ta: 'தகவலுக்கு இணையத்தைப் பயன்படுத்தல்' } },
        { name: { en: 'Electronic mail', si: 'ඉලෙක්ට්‍රොනික තැපෑල', ta: 'மின்னஞ்சல்' } },
      ],
    },
    {
      name: {
        en: 'Technology and the environment',
        si: 'තාක්ෂණය සහ පරිසරය',
        ta: 'தொழினுட்பமும் சூழலும்',
      },
      periods: 36,
      grade: 13,
      topics: [
        { name: { en: 'Natural resources', si: 'ස්වාභාවික සම්පත්', ta: 'இயற்கை வளங்கள்' } },
        { name: { en: 'Environmental impacts of technology', si: 'තාක්ෂණයේ පාරිසරික බලපෑම්', ta: 'தொழினுட்பத்தின் சூழல் தாக்கங்கள்' } },
        { name: { en: 'Climate change', si: 'දේශගුණ විපර්යාස', ta: 'காலநிலை மாற்றம்' } },
        { name: { en: 'Mitigation methods', si: 'අවම කිරීමේ ක්‍රම', ta: 'தணிப்பு முறைகள்' } },
      ],
    },
  ],
});
