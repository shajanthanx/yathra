/**
 * Physics (Department of Examinations subject 01).
 *
 * Unit list, period allocations and grade split follow the National Institute
 * of Education syllabus for Grades 12 and 13, effective from 2017. Sinhala and
 * Tamil unit names come from the NIE Sinhala and Tamil editions of the same
 * syllabus; topic names are the syllabus competency-level headings.
 */
import { defineSyllabus } from './define';

export const physicsSyllabus = defineSyllabus({
  subjectId: 'physics',
  source: 'NIE G.C.E. (A/L) Physics Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'official',
  units: [
    {
      name: { en: 'Measurement', si: 'මිනුම', ta: 'அளவீடு' },
      periods: 30,
      grade: 12,
      topics: [
        { name: { en: 'Introduction to physics', si: 'භෞතික විද්‍යාව හැඳින්වීම', ta: 'பௌதிகவியல் அறிமுகம்' } },
        {
          name: {
            en: 'Physical quantities and SI units',
            si: 'භෞතික රාශි සහ SI ඒකක',
            ta: 'பௌதிகப் பருமன்களும் SI அலகுகளும்',
          },
        },
        { name: { en: 'Dimensions', si: 'මාන', ta: 'பரிமாணங்கள்' } },
        {
          name: {
            en: 'Measuring instruments and errors',
            si: 'මිනුම් උපකරණ සහ දෝෂ',
            ta: 'அளவிடும் கருவிகளும் பிழைகளும்',
          },
        },
        { name: { en: 'Scalars and vectors', si: 'අදිශ සහ දෛශික', ta: 'திசையிலிகளும் காவிகளும்' } },
      ],
    },
    {
      name: { en: 'Mechanics', si: 'යාන්ත්‍ර විද්‍යාව', ta: 'இயங்கியல்' },
      periods: 110,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Kinematics and relative motion',
            si: 'චාලක විද්‍යාව සහ සාපේක්ෂ චලිතය',
            ta: 'இயக்கவியலும் தொடர்பு இயக்கமும்',
          },
        },
        { name: { en: 'Resultant of forces', si: 'බලවල සම්ප්‍රයුක්තය', ta: 'விசைகளின் விளைவு' } },
        {
          name: {
            en: "Newton's laws and moment of a force",
            si: 'නිව්ටන් නියම සහ බලයක ඝූර්ණය',
            ta: 'நியூட்டனின் விதிகளும் விசையின் திருப்புத்திறனும்',
          },
        },
        { name: { en: 'Equilibrium', si: 'සමතුලිතතාව', ta: 'சமநிலை' } },
        {
          name: {
            en: 'Work, energy and power',
            si: 'කාර්ය, ශක්තිය සහ ක්ෂමතාව',
            ta: 'வேலை, சக்தி மற்றும் வலு',
          },
        },
        {
          name: {
            en: 'Rotational and circular motion',
            si: 'භ්‍රමණ සහ වෘත්තාකාර චලිතය',
            ta: 'சுழற்சி மற்றும் வட்ட இயக்கம்',
          },
        },
        { name: { en: 'Hydrostatics', si: 'ද්‍රවස්ථිති විද්‍යාව', ta: 'நீரியல் நிலையியல்' } },
        { name: { en: 'Fluid dynamics', si: 'තරල ගති විද්‍යාව', ta: 'மியங்கியல்' } },
      ],
    },
    {
      name: { en: 'Oscillations and Waves', si: 'දෝලන හා තරංග', ta: 'அலைவுகளும் அலைகளும்' },
      periods: 100,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Oscillations and simple harmonic motion',
            si: 'දෝලන සහ සරල අනුවර්තී චලිතය',
            ta: 'அலைவுகளும் எளிய இசையியக்கமும்',
          },
        },
        { name: { en: 'Mechanical waves', si: 'යාන්ත්‍රික තරංග', ta: 'இயந்திர அலைகள்' } },
        {
          name: {
            en: 'Wave quantities and superposition',
            si: 'තරංග රාශි සහ අධිස්ථාපනය',
            ta: 'அலைப் பருமன்களும் மேற்பொருந்தலும்',
          },
        },
        {
          name: {
            en: 'Stationary waves in strings',
            si: 'තන්තුවල ස්ථාවර තරංග',
            ta: 'நாண்களில் நிலையான அலைகள்',
          },
        },
        { name: { en: 'Waves in gases', si: 'වායුවල තරංග', ta: 'வாயுக்களில் அலைகள்' } },
        { name: { en: 'Doppler effect', si: 'ඩොප්ලර් ප්‍රයෝගය', ta: 'டொப்ளர் விளைவு' } },
        {
          name: {
            en: 'Nature and characteristics of sound',
            si: 'ශබ්දයේ ස්වභාවය සහ ලක්ෂණ',
            ta: 'ஒலியின் தன்மையும் இயல்புகளும்',
          },
        },
        {
          name: {
            en: 'Intensity and threshold of hearing',
            si: 'තීව්‍රතාව සහ ශ්‍රවණ එළිපත්ත',
            ta: 'செறிவும் கேட்கும் வாசலும்',
          },
        },
        { name: { en: 'Geometrical optics', si: 'ජ්‍යාමිතික ප්‍රකාශ විද්‍යාව', ta: 'வடிவவியல் ஒளியியல்' } },
        { name: { en: 'The human eye', si: 'මානව ඇස', ta: 'மனிதக் கண்' } },
        { name: { en: 'Optical instruments', si: 'ප්‍රකාශ උපකරණ', ta: 'ஒளியியல் கருவிகள்' } },
      ],
    },
    {
      name: { en: 'Thermal Physics', si: 'තාප භෞතිකය', ta: 'வெப்பப் பௌதிகவியல்' },
      periods: 60,
      grade: 12,
      topics: [
        { name: { en: 'Temperature', si: 'උෂ්ණත්වය', ta: 'வெப்பநிலை' } },
        { name: { en: 'Thermal expansion', si: 'තාප ප්‍රසාරණය', ta: 'வெப்ப விரிவடைவு' } },
        { name: { en: 'Gas laws', si: 'වායු නියම', ta: 'வாயு விதிகள்' } },
        { name: { en: 'Kinetic theory of gases', si: 'වායුවල චාලක වාදය', ta: 'வாயுக்களின் இயக்கக் கொள்கை' } },
        { name: { en: 'Heat capacity', si: 'තාප ධාරිතාව', ta: 'வெப்பக் கொள்ளளவு' } },
        { name: { en: 'Change of state', si: 'අවස්ථා පරිවර්තනය', ta: 'நிலை மாற்றம்' } },
        { name: { en: 'Vapour and humidity', si: 'වාෂ්ප සහ ආර්ද්‍රතාව', ta: 'ஆவியும் ஈரப்பதனும்' } },
        { name: { en: 'Thermodynamics', si: 'තාප ගති විද්‍යාව', ta: 'வெப்ப இயக்கவியல்' } },
        { name: { en: 'Transfer of heat', si: 'තාප සම්ප්‍රේෂණය', ta: 'வெப்பக் கடத்தல்' } },
      ],
    },
    {
      name: { en: 'Gravitational Field', si: 'ගුරුත්වජ ක්ෂේත්‍රය', ta: 'ஈர்ப்புப் புலம்' },
      periods: 20,
      grade: 13,
      topics: [
        {
          name: {
            en: 'Gravitational force field',
            si: 'ගුරුත්වාකර්ෂණ බල ක්ෂේත්‍රය',
            ta: 'ஈர்ப்பு விசைப் புலம்',
          },
        },
        {
          name: {
            en: "Earth's field, potential and satellites",
            si: 'පෘථිවි ක්ෂේත්‍රය, විභවය සහ චන්ද්‍රිකා',
            ta: 'பூமியின் புலம், ஆற்றல்நிலை மற்றும் செயற்கைக்கோள்கள்',
          },
        },
      ],
    },
    {
      name: { en: 'Electrostatic Field', si: 'ස්ථිති විද්‍යුත් ක්ෂේත්‍රය', ta: 'நிலை மின்புலம்' },
      periods: 60,
      grade: 13,
      topics: [
        {
          name: {
            en: "Electrostatic force and Coulomb's law",
            si: 'ස්ථිති විද්‍යුත් බලය සහ කූලෝම් නියමය',
            ta: 'நிலைமின் விசையும் கூலூம் விதியும்',
          },
        },
        {
          name: {
            en: "Electric flux and Gauss's theorem",
            si: 'විද්‍යුත් ෆ්ලක්ස් සහ ගවුස් ප්‍රමේයය',
            ta: 'மின் ஓட்டமும் காஸ் தேற்றமும்',
          },
        },
        { name: { en: 'Electric potential', si: 'විද්‍යුත් විභවය', ta: 'மின் ஆற்றல்நிலை' } },
        { name: { en: 'Capacitance', si: 'ධාරිතාව', ta: 'மின்தேக்குத்திறன்' } },
      ],
    },
    {
      name: { en: 'Magnetic Field', si: 'චුම්බක ක්ෂේත්‍රය', ta: 'காந்தப் புலம்' },
      periods: 40,
      grade: 13,
      topics: [
        {
          name: {
            en: 'Magnetic force on charges and currents',
            si: 'ආරෝපණ සහ ධාරා මත චුම්බක බලය',
            ta: 'மின்னூட்டங்கள் மற்றும் மின்னோட்டங்கள் மீதான காந்த விசை',
          },
        },
        { name: { en: 'Magnetic force field', si: 'චුම්බක බල ක්ෂේත්‍රය', ta: 'காந்த விசைப் புலம்' } },
        {
          name: {
            en: 'Torque on a current loop',
            si: 'ධාරා පුඩුවක් මත ව්‍යවර්ථය',
            ta: 'மின்னோட்டச் சுருளில் திருப்பு விசை',
          },
        },
      ],
    },
    {
      name: { en: 'Current Electricity', si: 'ධාරා විද්‍යුතය', ta: 'ஓட்ட மின்னியல்' },
      periods: 70,
      grade: 13,
      topics: [
        { name: { en: 'Current and charge', si: 'ධාරාව සහ ආරෝපණය', ta: 'மின்னோட்டமும் மின்னூட்டமும்' } },
        {
          name: {
            en: "Ohm's law and potential divider",
            si: 'ඕම් නියමය සහ විභව බෙදුම්කරය',
            ta: 'ஓம் விதியும் ஆற்றல்நிலைப் பிரிப்பானும்',
          },
        },
        { name: { en: 'Electromotive force', si: 'විද්‍යුත් චාලක බලය', ta: 'மின்னியக்க விசை' } },
        {
          name: {
            en: "Circuits and Kirchhoff's laws",
            si: 'පරිපථ සහ කර්චොෆ් නියම',
            ta: 'சுற்றுகளும் கிர்ச்சொவ் விதிகளும்',
          },
        },
        { name: { en: 'Electrical networks', si: 'විද්‍යුත් ජාල', ta: 'மின் வலையமைப்புகள்' } },
        {
          name: {
            en: 'Electromagnetic induction',
            si: 'විද්‍යුත් චුම්බක ප්‍රේරණය',
            ta: 'மின்காந்தத் தூண்டல்',
          },
        },
      ],
    },
    {
      name: { en: 'Electronics', si: 'ඉලෙක්ට්‍රොනික විද්‍යාව', ta: 'இலத்திரனியல்' },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'Semiconductors', si: 'අර්ධ සන්නායක', ta: 'குறைக்கடத்திகள்' } },
        { name: { en: 'The transistor', si: 'ට්‍රාන්සිස්ටරය', ta: 'திரிதடையம்' } },
        { name: { en: 'Operational amplifier', si: 'ක්‍රියාකාරී වර්ධකය', ta: 'செயற்பாட்டுப் பெருக்கி' } },
        {
          name: {
            en: 'Digital electronics and logic gates',
            si: 'ඩිජිටල් ඉලෙක්ට්‍රොනික සහ තර්ක ද්වාර',
            ta: 'இலக்கமுறை இலத்திரனியலும் தருக்க வாயில்களும்',
          },
        },
      ],
    },
    {
      name: {
        en: 'Mechanical Properties of Matter',
        si: 'පදාර්ථයේ යාන්ත්‍රික ගුණ',
        ta: 'சடத்தின் பொறியியல் இயல்புகள்',
      },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'Elasticity of solids', si: 'ඝන ද්‍රව්‍යවල ප්‍රත්‍යාස්ථතාව', ta: 'திண்மங்களின் மீள்தன்மை' } },
        { name: { en: 'Viscosity', si: 'දුස්ස්‍රාවීතාව', ta: 'பாகுத்தன்மை' } },
        { name: { en: 'Surface tension', si: 'පෘෂ්ඨික ආතතිය', ta: 'பரப்பு இழுவிசை' } },
      ],
    },
    {
      name: { en: 'Matter and Radiation', si: 'පදාර්ථ හා විකිරණ', ta: 'சடமும் கதிர்ப்பும்' },
      periods: 30,
      grade: 13,
      topics: [
        {
          name: {
            en: 'Quantum nature of radiation',
            si: 'විකිරණයේ ක්වොන්ටම් ස්වභාවය',
            ta: 'கதிர்ப்பின் குவாண்டம் தன்மை',
          },
        },
        { name: { en: 'Photoelectric effect', si: 'ප්‍රභා විද්‍යුත් ප්‍රයෝගය', ta: 'ஒளிமின் விளைவு' } },
        {
          name: {
            en: 'Wave nature of matter',
            si: 'පදාර්ථයේ තරංග ස්වභාවය',
            ta: 'சடத்தின் அலைத் தன்மை',
          },
        },
        { name: { en: 'X-rays', si: 'X කිරණ', ta: 'X-கதிர்கள்' } },
        { name: { en: 'Radioactivity', si: 'විකිරණශීලීතාව', ta: 'கதிரியக்கம்' } },
        { name: { en: 'The atomic nucleus', si: 'පරමාණුක න්‍යෂ්ටිය', ta: 'அணுக்கரு' } },
        {
          name: {
            en: 'Introduction to particle physics',
            si: 'අංශු භෞතිකය හැඳින්වීම',
            ta: 'துகள் பௌதிகவியல் அறிமுகம்',
          },
        },
      ],
    },
  ],
});
