/**
 * Chemistry (Department of Examinations subject 02).
 *
 * Unit list, period allocations and grade split follow the National Institute
 * of Education syllabus for Grades 12 and 13, effective from 2017. Sinhala and
 * Tamil unit names come from the NIE Sinhala and Tamil editions of the same
 * syllabus; topic names are the syllabus competency-level headings.
 *
 * The English final edition and the Sinhala and Tamil editions differ slightly
 * in period allocations for some units; the values here are those of the
 * English final edition.
 */
import { defineSyllabus } from './define';

export const chemistrySyllabus = defineSyllabus({
  subjectId: 'chemistry',
  source: 'NIE G.C.E. (A/L) Chemistry Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'official',
  units: [
    {
      name: { en: 'Atomic structure', si: 'පරමාණුක ව්‍යුහය', ta: 'அணுக்கட்டமைப்பு' },
      periods: 35,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Sub-atomic particles and atomic models',
            si: 'උප පරමාණුක අංශු සහ පරමාණුක ආකෘති',
            ta: 'உப அணுத் துகள்களும் அணு மாதிரிகளும்',
          },
        },
        {
          name: {
            en: 'Quantum numbers and orbitals',
            si: 'ක්වොන්ටම් සංඛ්‍යා සහ කක්ෂිකා',
            ta: 'குவாண்டம் எண்களும் ஓர்பிட்டால்களும்',
          },
        },
        { name: { en: 'Ionization energies', si: 'අයනීකරණ ශක්ති', ta: 'அயனாக்கல் சக்திகள்' } },
        { name: { en: 'Electron configuration', si: 'ඉලෙක්ට්‍රෝන වින්‍යාසය', ta: 'இலத்திரன் அமைப்பு' } },
        {
          name: {
            en: 'Periodic table and periodic trends',
            si: 'ආවර්තිතා වගුව සහ ආවර්තිතා ප්‍රවණතා',
            ta: 'ஆவர்த்தன அட்டவணையும் ஆவர்த்தனப் போக்குகளும்',
          },
        },
      ],
    },
    {
      name: { en: 'Structure and bonding', si: 'ව්‍යුහය සහ බන්ධන', ta: 'கட்டமைப்பும் பிணைப்பும்' },
      periods: 35,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Ionic, covalent and metallic bonding',
            si: 'අයනික, සහසංයුජ සහ ලෝහ බන්ධන',
            ta: 'அயனி, சக மற்றும் உலோகப் பிணைப்புகள்',
          },
        },
        {
          name: {
            en: 'Lewis structures and VSEPR',
            si: 'ලුවිස් ව්‍යුහ සහ VSEPR වාදය',
            ta: 'லூயிஸ் கட்டமைப்புகளும் VSEPR கொள்கையும்',
          },
        },
        {
          name: {
            en: 'Hybridisation and polarity',
            si: 'දෙමුහුම්කරණය සහ ධ්‍රැවීයතාව',
            ta: 'கலப்பினமாக்கமும் முனைவுத்தன்மையும்',
          },
        },
        { name: { en: 'Resonance', si: 'අනුනාදය', ta: 'ஒத்ததிர்வு' } },
        { name: { en: 'Secondary interactions', si: 'ද්විතීයික අන්තර්ක්‍රියා', ta: 'இரண்டாம் நிலை இடைவினைகள்' } },
      ],
    },
    {
      name: { en: 'Chemical calculations', si: 'රසායනික ගණනය', ta: 'இரசாயனக் கணித்தல்கள்' },
      periods: 37,
      grade: 12,
      topics: [
        { name: { en: 'Oxidation number', si: 'ඔක්සිකරණ අංකය', ta: 'ஒட்சியேற்ற எண்' } },
        { name: { en: 'Balancing equations', si: 'සමීකරණ තුලනය කිරීම', ta: 'சமன்பாடுகளைச் சமப்படுத்தல்' } },
        {
          name: {
            en: 'Stoichiometry and solutions',
            si: 'ස්ටොයිකියෝමිතිය සහ ද්‍රාවණ',
            ta: 'ஸ்டோய்க்கியோமெட்ரியும் கரைசல்களும்',
          },
        },
      ],
    },
    {
      name: { en: 'Gaseous state of matter', si: 'පදාර්ථයේ වායු අවස්ථාව', ta: 'சடப்பொருளின் வாயு நிலை' },
      periods: 32,
      grade: 12,
      topics: [
        { name: { en: 'States of matter', si: 'පදාර්ථයේ අවස්ථා', ta: 'சடப்பொருளின் நிலைகள்' } },
        { name: { en: 'The ideal gas', si: 'පරමාදර්ශී වායුව', ta: 'இலட்சிய வாயு' } },
        { name: { en: 'Kinetic theory', si: 'චාලක වාදය', ta: 'இயக்கக் கொள்கை' } },
        {
          name: {
            en: "Dalton's law of partial pressures",
            si: 'ඩෝල්ටන්ගේ අර්ධ පීඩන නියමය',
            ta: 'டால்டனின் பகுதி அமுக்க விதி',
          },
        },
        { name: { en: 'Real gases', si: 'තාත්වික වායු', ta: 'உண்மை வாயுக்கள்' } },
      ],
    },
    {
      name: { en: 'Energetics', si: 'ශක්ති විද්‍යාව', ta: 'சக்தியியல்' },
      periods: 41,
      grade: 12,
      topics: [
        {
          name: {
            en: "Enthalpy changes and Hess's law",
            si: 'එන්තැල්පි විපර්යාස සහ හෙස්ගේ නියමය',
            ta: 'எந்தல்பி மாற்றங்களும் ஹெஸ் விதியும்',
          },
        },
        {
          name: {
            en: 'Lattice energy and Born-Haber cycles',
            si: 'ජාලක ශක්තිය සහ බෝන්-හේබර් චක්‍ර',
            ta: 'சாலகச் சக்தியும் போர்ன்-ஹேபர் சுழற்சிகளும்',
          },
        },
        {
          name: {
            en: 'Entropy and Gibbs energy',
            si: 'එන්ට්‍රොපිය සහ ගිබ්ස් ශක්තිය',
            ta: 'எந்திரோப்பியும் கிப்ஸ் சக்தியும்',
          },
        },
      ],
    },
    {
      name: {
        en: 'Chemistry of s, p and d block elements',
        si: 's, p හා d ගොනුවලට අයත් මූල ද්‍රව්‍යයන්ගේ රසායනය',
        ta: 's, p, d தொகுப்பு மூலகங்களின் இரசாயனம்',
      },
      periods: 64,
      grade: 12,
      topics: [
        { name: { en: 's-block elements', si: 's-ගොනු මූලද්‍රව්‍ය', ta: 's-தொகுப்பு மூலகங்கள்' } },
        { name: { en: 'p-block elements', si: 'p-ගොනු මූලද්‍රව්‍ය', ta: 'p-தொகுப்பு மூலகங்கள்' } },
        { name: { en: 'Trends in compounds', si: 'සංයෝගවල ප්‍රවණතා', ta: 'சேர்வைகளின் போக்குகள்' } },
        { name: { en: 'd-block elements', si: 'd-ගොනු මූලද්‍රව්‍ය', ta: 'd-தொகுப்பு மூலகங்கள்' } },
        {
          name: {
            en: 'Acidic, basic and amphoteric oxides',
            si: 'අම්ලීය, භාෂ්මික සහ උභයගුණික ඔක්සයිඩ',
            ta: 'அமில, மூல மற்றும் ஈரியல்பு ஒட்சைட்டுகள்',
          },
        },
        { name: { en: 'Complex compounds', si: 'සංකීර්ණ සංයෝග', ta: 'சிக்கல் சேர்வைகள்' } },
      ],
    },
    {
      name: {
        en: 'Basic concepts of organic chemistry',
        si: 'කාබනික රසායන විද්‍යාවේ මූලික සංකල්ප',
        ta: 'சேதன இரசாயனத்தின் அடிப்படை எண்ணக்கருக்கள்',
      },
      periods: 17,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Variety of organic compounds',
            si: 'කාබනික සංයෝගවල විවිධත්වය',
            ta: 'சேதனச் சேர்வைகளின் பல்வகைமை',
          },
        },
        { name: { en: 'Nomenclature', si: 'නාමකරණය', ta: 'பெயரிடல்' } },
        {
          name: {
            en: 'Functional groups and isomerism',
            si: 'ක්‍රියාකාරී කාණ්ඩ සහ සමාවයවිකතාව',
            ta: 'வினைத் தொகுதிகளும் ஐசோமரியமும்',
          },
        },
      ],
    },
    {
      name: {
        en: 'Hydrocarbons and halohydrocarbons',
        si: 'හයිඩ්‍රොකාබන හා හැලජනීකෘත හයිඩ්‍රොකාබන',
        ta: 'ஐதரோகாபன்களும் அலசனேற்றப்பட்ட ஐதரோகாபன்களும்',
      },
      periods: 46,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Alkanes, alkenes and alkynes',
            si: 'ඇල්කේන, ඇල්කීන සහ ඇල්කයින',
            ta: 'அல்கேன்கள், அல்கீன்கள் மற்றும் அல்கைன்கள்',
          },
        },
        {
          name: {
            en: 'Benzene and electrophilic substitution',
            si: 'බෙන්සීන් සහ ඉලෙක්ට්‍රෝන ස්නේහී ආදේශනය',
            ta: 'பென்சீனும் இலத்திரன் நாட்டப் பிரதியீடும்',
          },
        },
        { name: { en: 'Directing groups', si: 'දිශානති කාණ්ඩ', ta: 'திசைப்படுத்தும் தொகுதிகள்' } },
        { name: { en: 'Halohydrocarbons', si: 'හැලජනීකෘත හයිඩ්‍රොකාබන', ta: 'அலசனேற்றப்பட்ட ஐதரோகாபன்கள்' } },
        { name: { en: 'Reaction mechanisms', si: 'ප්‍රතික්‍රියා යාන්ත්‍රණ', ta: 'வினை இயங்குமுறைகள்' } },
      ],
    },
    {
      name: {
        en: 'Oxygen containing organic compounds',
        si: 'ඔක්සිජන් අඩංගු කාබනික සංයෝග',
        ta: 'ஒட்சிசனைக் கொண்டுள்ள சேதனச் சேர்வைகள்',
      },
      periods: 46,
      grade: 12,
      topics: [
        { name: { en: 'Alcohols', si: 'ඇල්කොහොල', ta: 'அல்ககோல்கள்' } },
        { name: { en: 'Phenols', si: 'ෆීනෝල', ta: 'பீனோல்கள்' } },
        { name: { en: 'Aldehydes and ketones', si: 'ඇල්ඩිහයිඩ සහ කීටෝන', ta: 'அல்டிகைட்டுகளும் கீட்டோன்களும்' } },
        { name: { en: 'Carboxylic acids', si: 'කාබොක්සිලික අම්ල', ta: 'காபொக்சிலிக் அமிலங்கள்' } },
        { name: { en: 'Acid derivatives', si: 'අම්ල ව්‍යුත්පන්න', ta: 'அமில வழிப்பொருள்கள்' } },
      ],
    },
    {
      name: {
        en: 'Nitrogen containing organic compounds',
        si: 'නයිට්‍රජන් අඩංගු කාබනික සංයෝග',
        ta: 'நைதரசனைக் கொண்டுள்ள சேதனச் சேர்வைகள்',
      },
      periods: 14,
      grade: 12,
      topics: [
        { name: { en: 'Amines', si: 'ඇමීන', ta: 'அமீன்கள்' } },
        { name: { en: 'Basicity of amines', si: 'ඇමීනවල භාෂ්මිකතාව', ta: 'அமீன்களின் மூலத்தன்மை' } },
        { name: { en: 'Diazonium salts', si: 'ඩයිසෝනියම් ලවණ', ta: 'டையசோனியம் உப்புகள்' } },
      ],
    },
    {
      name: { en: 'Chemical kinetics', si: 'චාලක රසායනය', ta: 'இரசாயன இயக்கவியல்' },
      periods: 41,
      grade: 13,
      topics: [
        { name: { en: 'Rate of reaction', si: 'ප්‍රතික්‍රියා වේගය', ta: 'வினை வீதம்' } },
        { name: { en: 'Energy diagrams', si: 'ශක්ති සටහන්', ta: 'சக்தி வரைபுகள்' } },
        {
          name: {
            en: 'Rate laws and order of reaction',
            si: 'වේග නියම සහ ප්‍රතික්‍රියා පෙළ',
            ta: 'வீத விதிகளும் வினையின் ஒழுங்கும்',
          },
        },
        { name: { en: 'Factors affecting rate', si: 'වේගයට බලපාන සාධක', ta: 'வீதத்தைப் பாதிக்கும் காரணிகள்' } },
        { name: { en: 'Reaction mechanisms', si: 'ප්‍රතික්‍රියා යාන්ත්‍රණ', ta: 'வினை இயங்குமுறைகள்' } },
      ],
    },
    {
      name: { en: 'Equilibrium', si: 'සමතුලිතතාව', ta: 'சமநிலை' },
      periods: 94,
      grade: 13,
      topics: [
        {
          name: {
            en: "Dynamic equilibrium and Le Chatelier's principle",
            si: 'ගතික සමතුලිතතාව සහ ලෙ ෂැටෙලියේ මූලධර්මය',
            ta: 'இயங்கு சமநிலையும் லெ சாட்லியே கோட்பாடும்',
          },
        },
        { name: { en: 'Acids, bases and pH', si: 'අම්ල, භාෂ්ම සහ pH', ta: 'அமிலங்கள், மூலங்கள் மற்றும் pH' } },
        { name: { en: 'Buffer solutions', si: 'ආන්තරක ද්‍රාවණ', ta: 'இடையகக் கரைசல்கள்' } },
        { name: { en: 'Solubility product', si: 'ද්‍රාව්‍යතා ගුණිතය', ta: 'கரைதிறன் பெருக்கம்' } },
        { name: { en: 'Pure liquid systems', si: 'ශුද්ධ ද්‍රව පද්ධති', ta: 'தூய திரவத் தொகுதிகள்' } },
        { name: { en: 'Liquid-liquid systems', si: 'ද්‍රව-ද්‍රව පද්ධති', ta: 'திரவ-திரவத் தொகுதிகள்' } },
        { name: { en: 'Partition and extraction', si: 'විභජනය සහ නිස්සාරණය', ta: 'பங்கீடும் பிரித்தெடுத்தலும்' } },
      ],
    },
    {
      name: { en: 'Electrochemistry', si: 'විද්‍යුත් රසායනය', ta: 'மின்னிரசாயனம்' },
      periods: 33,
      grade: 13,
      topics: [
        {
          name: {
            en: 'Electrolytes and conductivity',
            si: 'විද්‍යුත් විච්ඡේද්‍ය සහ සන්නායකතාව',
            ta: 'மின்பகுபொருள்களும் கடத்துதிறனும்',
          },
        },
        { name: { en: 'Reversible electrodes', si: 'ප්‍රතිවර්ත්‍ය ඉලෙක්ට්‍රෝඩ', ta: 'மீளக்கூடிய மின்வாய்கள்' } },
        {
          name: {
            en: 'Electrochemical cells and the Nernst equation',
            si: 'විද්‍යුත් රසායනික සෛල සහ නර්න්ස්ට් සමීකරණය',
            ta: 'மின்னிரசாயனக் கலங்களும் நேர்ன்ஸ்ட் சமன்பாடும்',
          },
        },
        { name: { en: 'Electrolysis', si: 'විද්‍යුත් විච්ඡේදනය', ta: 'மின்பகுப்பு' } },
      ],
    },
    {
      name: {
        en: 'Industrial chemistry and Environmental pollution',
        si: 'කර්මාන්ත රසායනය හා පරිසර දූෂණය',
        ta: 'கைத்தொழில் இரசாயனமும் சூழல் மாசாக்கமும்',
      },
      periods: 65,
      grade: 13,
      topics: [
        {
          name: {
            en: 'Basics of the chemical industry',
            si: 'රසායනික කර්මාන්තයේ මූලික කරුණු',
            ta: 'இரசாயனக் கைத்தொழிலின் அடிப்படைகள்',
          },
        },
        {
          name: {
            en: 'Major inorganic production',
            si: 'ප්‍රධාන අකාබනික නිෂ්පාදන',
            ta: 'முக்கிய அசேதன உற்பத்திகள்',
          },
        },
        { name: { en: 'Titanium industry', si: 'ටයිටේනියම් කර්මාන්තය', ta: 'டைட்டானியக் கைத்தொழில்' } },
        { name: { en: 'Polymers', si: 'බහුඅවයවික', ta: 'பல்பகுதியங்கள்' } },
        {
          name: {
            en: 'Plant-based industries',
            si: 'ශාක පදනම් කරගත් කර්මාන්ත',
            ta: 'தாவர அடிப்படையிலான கைத்தொழில்கள்',
          },
        },
        { name: { en: 'Air quality', si: 'වායු ගුණාත්මය', ta: 'காற்றின் தரம்' } },
        { name: { en: 'Water quality', si: 'ජල ගුණාත්මය', ta: 'நீரின் தரம்' } },
      ],
    },
  ],
});
