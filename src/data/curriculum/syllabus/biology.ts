/**
 * Biology (Department of Examinations subject 09).
 *
 * Unit list, period allocations and grade split follow the National Institute
 * of Education syllabus for Grades 12 and 13, effective from 2017: ten units
 * totalling 600 periods. Sinhala and Tamil unit names come from the NIE Sinhala
 * and Tamil editions of the same syllabus; topic names are the syllabus
 * competency-level headings.
 *
 * Unit 5 (Animal form and function) spans the end of Grade 12 into Grade 13; it
 * is marked grade 12 here because that is where it begins.
 */
import { defineSyllabus } from './define';

export const biologySyllabus = defineSyllabus({
  subjectId: 'biology',
  source: 'NIE G.C.E. (A/L) Biology Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'official',
  units: [
    {
      name: { en: 'Introduction to Biology', si: 'ජීව විද්‍යාව හැඳින්වීම', ta: 'உயிரியலுக்கான அறிமுகம்' },
      periods: 5,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Nature and scope of biology',
            si: 'ජීව විද්‍යාවේ ස්වභාවය සහ විෂය පථය',
            ta: 'உயிரியலின் தன்மையும் நோக்கெல்லையும்',
          },
        },
        {
          name: {
            en: 'Natural resources and the environment',
            si: 'ස්වාභාවික සම්පත් සහ පරිසරය',
            ta: 'இயற்கை வளங்களும் சுற்றாடலும்',
          },
        },
      ],
    },
    {
      name: {
        en: 'Chemical and cellular basis of life',
        si: 'ජීවයේ රසායනික හා සෛලීය පදනම',
        ta: 'உயிரின் இரசாயன மற்றும் கல அடிப்படை',
      },
      periods: 80,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Elemental composition and water',
            si: 'මූලද්‍රව්‍ය සංයුතිය සහ ජලය',
            ta: 'தனிமச் சேர்மானமும் நீரும்',
          },
        },
        { name: { en: 'Organic molecules', si: 'කාබනික අණු', ta: 'கரிம மூலக்கூறுகள்' } },
        {
          name: {
            en: 'Cell structure and organelles',
            si: 'සෛල ව්‍යුහය සහ සෛලාංග',
            ta: 'கல அமைப்பும் கல உறுப்புகளும்',
          },
        },
        {
          name: {
            en: 'Cell cycle, mitosis and meiosis',
            si: 'සෛල චක්‍රය, සමක්ෂ බෙදීම සහ ලූනීය බෙදීම',
            ta: 'கலச் சுழற்சி, சமபகுப்பு மற்றும் ஒடுக்கற்பகுப்பு',
          },
        },
        {
          name: {
            en: 'Enzymes and metabolism',
            si: 'එන්සයිම සහ පරිවෘත්තිය',
            ta: 'நொதியங்களும் வளர்சிதைமாற்றமும்',
          },
        },
        { name: { en: 'Photosynthesis', si: 'ප්‍රභාසංශ්ලේෂණය', ta: 'ஒளிச்சேர்க்கை' } },
        { name: { en: 'Cellular respiration', si: 'සෛලීය ශ්වසනය', ta: 'கல சுவாசம்' } },
      ],
    },
    {
      name: {
        en: 'Evolution and diversity of organisms',
        si: 'ජීවීන්ගේ පරිණාමය සහ විවිධත්වය',
        ta: 'அங்கிகளின் கூர்ப்பும் பல்வகைமையும்',
      },
      periods: 60,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Origin of life and theories of evolution',
            si: 'ජීවයේ ආරම්භය සහ පරිණාම වාද',
            ta: 'உயிரின் தோற்றமும் கூர்ப்புக் கொள்கைகளும்',
          },
        },
        {
          name: {
            en: 'Taxonomy, domains and kingdoms',
            si: 'වර්ගීකරණය, වසම් සහ රාජධානි',
            ta: 'வகைப்பாட்டியல், களங்களும் அரசுகளும்',
          },
        },
        {
          name: {
            en: 'Bacteria, Archaea and Protista',
            si: 'බැක්ටීරියා, ආකියා සහ ප්‍රොටිස්ටා',
            ta: 'பற்றீரியா, ஆர்க்கியா மற்றும் புரொட்டிஸ்டா',
          },
        },
        { name: { en: 'Fungi', si: 'දිලීර', ta: 'பூஞ்சைகள்' } },
        { name: { en: 'Plantae', si: 'ශාක රාජධානිය', ta: 'தாவர அரசு' } },
        { name: { en: 'Animalia', si: 'සත්ත්ව රාජධානිය', ta: 'விலங்கு அரசு' } },
      ],
    },
    {
      name: {
        en: 'Plant form and function',
        si: 'ශාක ආකාරය සහ ක්‍රියාකාරිත්වය',
        ta: 'தாவர அமைப்பும் தொழிலும்',
      },
      periods: 80,
      grade: 12,
      topics: [
        {
          name: {
            en: 'Meristems, tissues and growth',
            si: 'විභජ්‍ය පටක, පටක සහ වර්ධනය',
            ta: 'பிரிவுத் திசுக்கள், திசுக்களும் வளர்ச்சியும்',
          },
        },
        { name: { en: 'Transport in plants', si: 'ශාකවල ප්‍රවහනය', ta: 'தாவரங்களில் கடத்தல்' } },
        { name: { en: 'Plant nutrition', si: 'ශාක පෝෂණය', ta: 'தாவரப் போசணை' } },
        {
          name: {
            en: 'Reproduction and the angiosperm life cycle',
            si: 'ප්‍රජනනය සහ ආවෘතබීජිකයන්ගේ ජීවන චක්‍රය',
            ta: 'இனப்பெருக்கமும் மறைவிதையிகளின் வாழ்க்கைச் சுழற்சியும்',
          },
        },
        {
          name: {
            en: 'Plant responses and hormones',
            si: 'ශාක ප්‍රතිචාර සහ හෝමෝන',
            ta: 'தாவரப் பதிலிறுப்புகளும் ஓமோன்களும்',
          },
        },
      ],
    },
    {
      name: {
        en: 'Animal form and function',
        si: 'සත්ත්ව ආකාරය සහ ක්‍රියාකාරිත්වය',
        ta: 'விலங்கு அமைப்பும் தொழிலும்',
      },
      periods: 195,
      grade: 12,
      topics: [
        { name: { en: 'Animal tissues', si: 'සත්ත්ව පටක', ta: 'விலங்குத் திசுக்கள்' } },
        { name: { en: 'Nutrition and digestion', si: 'පෝෂණය සහ ජීර්ණය', ta: 'போசணையும் செரிமானமும்' } },
        {
          name: {
            en: 'Circulation and respiration',
            si: 'රුධිර සංසරණය සහ ශ්වසනය',
            ta: 'சுற்றோட்டமும் சுவாசமும்',
          },
        },
        { name: { en: 'Immunity', si: 'ප්‍රතිශක්තිය', ta: 'நோய் எதிர்ப்பாற்றல்' } },
        {
          name: {
            en: 'Osmoregulation and excretion',
            si: 'ආස්මෝටික නියාමනය සහ විසර්ජනය',
            ta: 'சவ்வூடுபரவல் ஒழுங்குபடுத்தலும் கழிவகற்றலும்',
          },
        },
        {
          name: {
            en: 'Nervous coordination and senses',
            si: 'ස්නායු සම්බන්ධීකරණය සහ ඉන්ද්‍රියයන්',
            ta: 'நரம்பு ஒருங்கிணைப்பும் புலன்களும்',
          },
        },
        {
          name: {
            en: 'Endocrine system and homeostasis',
            si: 'අන්තරාසර්ග පද්ධතිය සහ සමස්ථිතිය',
            ta: 'அகஞ்சுரப்பி மண்டலமும் சமநிலைப் பேணுகையும்',
          },
        },
        {
          name: {
            en: 'Reproduction and development',
            si: 'ප්‍රජනනය සහ වර්ධනය',
            ta: 'இனப்பெருக்கமும் வளர்ச்சியும்',
          },
        },
        {
          name: {
            en: 'Skeleton and locomotion',
            si: 'අස්ථි පඤ්ජරය සහ චලනය',
            ta: 'எலும்புக்கூடும் இயங்குகையும்',
          },
        },
      ],
    },
    {
      name: { en: 'Genetics', si: 'ප්‍රවේණිය', ta: 'பிறப்புரிமையியல்' },
      periods: 25,
      grade: 13,
      topics: [
        { name: { en: 'Mendelian inheritance', si: 'මෙන්ඩලීය අනුප්‍රාප්තිය', ta: 'மென்டலிய மரபுரிமை' } },
        { name: { en: 'Human Mendelian traits', si: 'මානව මෙන්ඩලීය ලක්ෂණ', ta: 'மனித மென்டலியப் பண்புகள்' } },
        {
          name: {
            en: 'Non-Mendelian inheritance',
            si: 'මෙන්ඩලීය නොවන අනුප්‍රාප්තිය',
            ta: 'மென்டலியமற்ற மரபுரிமை',
          },
        },
        {
          name: {
            en: 'Population genetics',
            si: 'ගහන ප්‍රවේණි විද්‍යාව',
            ta: 'சனத்தொகைப் பிறப்புரிமையியல்',
          },
        },
        {
          name: {
            en: 'Evolutionary genetics',
            si: 'පරිණාමීය ප්‍රවේණි විද්‍යාව',
            ta: 'கூர்ப்புப் பிறப்புரிமையியல்',
          },
        },
      ],
    },
    {
      name: {
        en: 'Molecular Biology and Recombinant DNA Technology',
        si: 'අණුක ජීව විද්‍යාව හා ප්‍රතිසංයෝජිත DNA තාක්ෂණය',
        ta: 'மூலக்கூற்று உயிரியலும் மீளச்சேர்க்கைக்குரிய தொழில்நுட்பமும்',
      },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'DNA and RNA structure', si: 'DNA හා RNA ව්‍යුහය', ta: 'DNA மற்றும் RNA அமைப்பு' } },
        {
          name: {
            en: 'Replication, transcription and translation',
            si: 'ප්‍රතිවර්තනය, අනුලේඛනය සහ පරිවර්තනය',
            ta: 'இரட்டிப்பாக்கம், படியாக்கம் மற்றும் மொழிபெயர்ப்பு',
          },
        },
        {
          name: {
            en: 'Recombinant DNA technology and applications',
            si: 'ප්‍රතිසංයෝජිත DNA තාක්ෂණය සහ එහි යෙදුම්',
            ta: 'மீளச்சேர்க்கை DNA தொழில்நுட்பமும் அதன் பிரயோகங்களும்',
          },
        },
      ],
    },
    {
      name: { en: 'Environmental Biology', si: 'පාරිසරික ජීව විද්‍යාව', ta: 'சுற்றாடல் உயிரியல்' },
      periods: 40,
      grade: 13,
      topics: [
        {
          name: {
            en: 'Ecosystem structure and function',
            si: 'පරිසර පද්ධතියේ ව්‍යුහය සහ ක්‍රියාකාරිත්වය',
            ta: 'சூழற்றொகுதியின் அமைப்பும் தொழிற்பாடும்',
          },
        },
        {
          name: {
            en: 'Biomes and Sri Lankan ecosystems',
            si: 'ජෛවෝම සහ ශ්‍රී ලංකාවේ පරිසර පද්ධති',
            ta: 'உயிர்மங்களும் இலங்கையின் சூழற்றொகுதிகளும்',
          },
        },
        { name: { en: 'Biodiversity', si: 'ජෛව විවිධත්වය', ta: 'உயிர்ப் பல்வகைமை' } },
        {
          name: {
            en: 'Global environmental issues',
            si: 'ගෝලීය පාරිසරික ගැටලු',
            ta: 'உலகளாவிய சுற்றாடல் பிரச்சினைகள்',
          },
        },
        { name: { en: 'Conservation', si: 'සංරක්ෂණය', ta: 'சேமபாதுகாப்பு' } },
      ],
    },
    {
      name: { en: 'Microbiology', si: 'ක්ෂුද්‍රජීව විද්‍යාව', ta: 'நுண்ணுயிரினவியல்' },
      periods: 50,
      grade: 13,
      topics: [
        {
          name: {
            en: 'Diversity of microorganisms',
            si: 'ක්ෂුද්‍රජීවීන්ගේ විවිධත්වය',
            ta: 'நுண்ணங்கிகளின் பல்வகைமை',
          },
        },
        {
          name: {
            en: 'Microbes in the environment and industry',
            si: 'පරිසරයේ හා කර්මාන්තයේ ක්ෂුද්‍රජීවීන්',
            ta: 'சுற்றாடலிலும் தொழிற்துறையிலும் நுண்ணங்கிகள்',
          },
        },
        { name: { en: 'Microbial diseases', si: 'ක්ෂුද්‍රජීවී රෝග', ta: 'நுண்ணங்கி நோய்கள்' } },
        {
          name: {
            en: 'Water and waste contamination',
            si: 'ජල හා අපද්‍රව්‍ය දූෂණය',
            ta: 'நீர் மற்றும் கழிவு மாசடைவு',
          },
        },
        {
          name: {
            en: 'Solid waste management',
            si: 'ඝන අපද්‍රව්‍ය කළමනාකරණය',
            ta: 'திண்மக் கழிவு முகாமைத்துவம்',
          },
        },
      ],
    },
    {
      name: { en: 'Applied Biology', si: 'ව්‍යවහාරික ජීව විද්‍යාව', ta: 'பிரயோக உயிரியல்' },
      periods: 25,
      grade: 13,
      topics: [
        { name: { en: 'Aquaculture', si: 'ජලජීවී වගාව', ta: 'நீர்வளர்ப்பு' } },
        { name: { en: 'Environmental impact', si: 'පාරිසරික බලපෑම', ta: 'சுற்றாடல் தாக்கம்' } },
        {
          name: {
            en: 'Dengue and filaria control',
            si: 'ඩෙංගු සහ පිලේරියා පාලනය',
            ta: 'டெங்கு மற்றும் யானைக்கால் நோய்க் கட்டுப்பாடு',
          },
        },
        { name: { en: 'Infections', si: 'ආසාදන', ta: 'தொற்றுநோய்கள்' } },
        {
          name: {
            en: 'Nanotechnology and modern applications',
            si: 'නැනෝ තාක්ෂණය සහ නවීන යෙදුම්',
            ta: 'நானோ தொழில்நுட்பமும் நவீன பிரயோகங்களும்',
          },
        },
      ],
    },
  ],
});
