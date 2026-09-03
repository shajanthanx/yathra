/**
 * Economics (Department of Examinations subject 21).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 12 competencies with 300 periods in each grade.
 * Those competencies are the units below, with their long competency
 * statements shortened to titles that fit a phone screen. Sinhala and Tamil
 * names are translations rather than the official wording: the NIE Sinhala and
 * Tamil editions are published with legacy non-Unicode fonts.
 */
import { defineSyllabus } from './define';

export const economicsSyllabus = defineSyllabus({
  subjectId: 'economics',
  source: 'NIE G.C.E. (A/L) Economics Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: {
        en: 'Basic economic problems and economic systems',
        si: 'මූලික ආර්ථික ගැටලු සහ ආර්ථික පද්ධති',
        ta: 'அடிப்படைப் பொருளாதாரப் பிரச்சினைகளும் பொருளாதார முறைமைகளும்',
      },
      periods: 50,
      grade: 12,
      topics: [
        { name: { en: 'Economics as a social science', si: 'සමාජ විද්‍යාවක් ලෙස ආර්ථික විද්‍යාව', ta: 'சமூக விஞ்ஞானமாக பொருளியல்' } },
        { name: { en: 'Needs, wants and resources', si: 'අවශ්‍යතා, වුවමනා සහ සම්පත්', ta: 'தேவைகள், விருப்புகள், வளங்கள்' } },
        { name: { en: 'Factors of production', si: 'නිෂ්පාදන සාධක', ta: 'உற்பத்திக் காரணிகள்' } },
        { name: { en: 'Scarcity, choice and opportunity cost', si: 'හිඟකම, තේරීම සහ අවස්ථා පිරිවැය', ta: 'பற்றாக்குறை, தெரிவு, வாய்ப்புச் செலவு' } },
        { name: { en: 'Production possibility curve', si: 'නිෂ්පාදන හැකියා වක්‍රය', ta: 'உற்பத்திச் சாத்தியக் கோடு' } },
        { name: { en: 'Economic systems', si: 'ආර්ථික පද්ධති', ta: 'பொருளாதார முறைமைகள்' } },
      ],
    },
    {
      name: {
        en: 'Demand, supply and market equilibrium',
        si: 'ඉල්ලුම, සැපයුම සහ වෙළඳපොළ සමතුලිතතාව',
        ta: 'கேள்வி, அளிப்பு மற்றும் சந்தைச் சமநிலை',
      },
      periods: 80,
      grade: 12,
      topics: [
        { name: { en: 'Theory of demand', si: 'ඉල්ලුම් න්‍යාය', ta: 'கேள்விக் கோட்பாடு' } },
        { name: { en: 'Utility and indifference analysis', si: 'ප්‍රයෝජනතාව සහ උදාසීනතා විශ්ලේෂණය', ta: 'பயன்பாடும் அலட்சியப் பகுப்பாய்வும்' } },
        { name: { en: 'Theory of supply', si: 'සැපයුම් න්‍යාය', ta: 'அளிப்புக் கோட்பாடு' } },
        { name: { en: 'Movements and shifts', si: 'චලනය සහ මාරුවීම්', ta: 'நகர்வுகளும் இடப்பெயர்வுகளும்' } },
        { name: { en: 'Market equilibrium', si: 'වෙළඳපොළ සමතුලිතතාව', ta: 'சந்தைச் சமநிலை' } },
        { name: { en: 'Elasticity of demand and supply', si: 'ඉල්ලුමේ සහ සැපයුමේ ප්‍රත්‍යාස්ථතාව', ta: 'கேள்வி அளிப்பு நெகிழ்ச்சி' } },
        { name: { en: 'Changes in market equilibrium', si: 'වෙළඳපොළ සමතුලිතතාවේ වෙනස්වීම්', ta: 'சந்தைச் சமநிலையில் மாற்றங்கள்' } },
      ],
    },
    {
      name: {
        en: 'Government intervention in markets',
        si: 'වෙළඳපොළට රජයේ මැදිහත්වීම',
        ta: 'சந்தைகளில் அரசாங்கத் தலையீடு',
      },
      periods: 30,
      grade: 12,
      topics: [
        { name: { en: 'Ways of intervention', si: 'මැදිහත්වීමේ ක්‍රම', ta: 'தலையீட்டு முறைகள்' } },
        { name: { en: 'Taxes and subsidies', si: 'බදු සහ සහනාධාර', ta: 'வரிகளும் மானியங்களும்' } },
        { name: { en: 'Incidence of taxation', si: 'බදු බර පැවරීම', ta: 'வரிச்சுமை விழுகை' } },
        { name: { en: 'Price ceilings and price floors', si: 'උපරිම හා අවම මිල පාලනය', ta: 'விலை உச்சவரம்பும் அடிவரம்பும்' } },
      ],
    },
    {
      name: {
        en: 'Production and costs of the firm',
        si: 'ආයතනයේ නිෂ්පාදනය සහ පිරිවැය',
        ta: 'நிறுவனத்தின் உற்பத்தியும் செலவும்',
      },
      periods: 50,
      grade: 12,
      topics: [
        { name: { en: 'Short-run and long-run production', si: 'කෙටිකාලීන සහ දිගුකාලීන නිෂ්පාදනය', ta: 'குறுங்கால நீண்டகால உற்பத்தி' } },
        { name: { en: 'Basic cost concepts', si: 'මූලික පිරිවැය සංකල්ප', ta: 'அடிப்படைச் செலவு எண்ணக்கருக்கள்' } },
        { name: { en: 'Behaviour of costs', si: 'පිරිවැයේ හැසිරීම', ta: 'செலவுகளின் நடத்தை' } },
        { name: { en: 'Market structures', si: 'වෙළඳපොළ ව්‍යුහ', ta: 'சந்தைக் கட்டமைப்புகள்' } },
        { name: { en: 'The firm under perfect competition', si: 'පූර්ණ තරගකාරිත්වය යටතේ ආයතනය', ta: 'முழுப் போட்டியில் நிறுவனம்' } },
        { name: { en: 'Factor markets', si: 'සාධක වෙළඳපොළ', ta: 'காரணிச் சந்தைகள்' } },
      ],
    },
    {
      name: { en: 'National accounting', si: 'ජාතික ගිණුම්කරණය', ta: 'தேசியக் கணக்கீடு' },
      periods: 55,
      grade: 12,
      topics: [
        { name: { en: 'Macroeconomic objectives', si: 'සාර්ව ආර්ථික අරමුණු', ta: 'பேரண்டப் பொருளாதார நோக்கங்கள்' } },
        { name: { en: 'The circular flow of income', si: 'ආදායමේ චක්‍රීය ප්‍රවාහය', ta: 'வருமானத்தின் சுற்றுப் பாய்வு' } },
        { name: { en: 'GDP by production', si: 'නිෂ්පාදන ක්‍රමයෙන් දදේනි', ta: 'உற்பத்தி முறையில் மொ.உ.உ' } },
        { name: { en: 'GDP by expenditure', si: 'වියදම් ක්‍රමයෙන් දදේනි', ta: 'செலவு முறையில் மொ.உ.உ' } },
        { name: { en: 'GDP by income', si: 'ආදායම් ක්‍රමයෙන් දදේනි', ta: 'வருமான முறையில் மொ.உ.உ' } },
        { name: { en: 'Uses and limitations of national accounts', si: 'ජාතික ගිණුම්වල භාවිතය සහ සීමා', ta: 'தேசியக் கணக்குகளின் பயன்பாடும் எல்லைகளும்' } },
      ],
    },
    {
      name: { en: 'Macroeconomic equilibrium', si: 'සාර්ව ආර්ථික සමතුලිතතාව', ta: 'பேரண்டப் பொருளாதாரச் சமநிலை' },
      periods: 35,
      grade: 12,
      topics: [
        { name: { en: 'Aggregate demand and supply', si: 'සමස්ත ඉල්ලුම සහ සැපයුම', ta: 'மொத்தக் கேள்வியும் அளிப்பும்' } },
        { name: { en: 'Components of aggregate demand', si: 'සමස්ත ඉල්ලුමේ අංග', ta: 'மொத்தக் கேள்வியின் கூறுகள்' } },
        { name: { en: 'Equilibrium level of output', si: 'නිමැවුමේ සමතුලිත මට්ටම', ta: 'உற்பத்தியின் சமநிலை மட்டம்' } },
        { name: { en: 'Changes in macroeconomic equilibrium', si: 'සාර්ව ආර්ථික සමතුලිතතාවේ වෙනස්වීම්', ta: 'பேரண்டச் சமநிலையில் மாற்றங்கள்' } },
      ],
    },
    {
      name: { en: 'Money, price level and banking', si: 'මුදල්, මිල මට්ටම සහ බැංකුකරණය', ta: 'பணம், விலை மட்டம், வங்கியியல்' },
      periods: 60,
      grade: 13,
      topics: [
        { name: { en: 'Functions and types of money', si: 'මුදලේ කාර්ය සහ වර්ග', ta: 'பணத்தின் தொழிற்பாடுகளும் வகைகளும்' } },
        { name: { en: 'Money supply', si: 'මුදල් සැපයුම', ta: 'பண அளிப்பு' } },
        { name: { en: 'Price level and inflation', si: 'මිල මට්ටම සහ උද්ධමනය', ta: 'விலை மட்டமும் பணவீக்கமும்' } },
        { name: { en: 'Financial institutions', si: 'මූල්‍ය ආයතන', ta: 'நிதி நிறுவனங்கள்' } },
        { name: { en: 'Objectives and functions of the Central Bank', si: 'මහ බැංකුවේ අරමුණු සහ කාර්ය', ta: 'மத்திய வங்கியின் நோக்கங்களும் தொழிற்பாடுகளும்' } },
        { name: { en: 'Commercial banks', si: 'වාණිජ බැංකු', ta: 'வர்த்தக வங்கிகள்' } },
      ],
    },
    {
      name: {
        en: 'Government and macroeconomic objectives',
        si: 'රජය සහ සාර්ව ආර්ථික අරමුණු',
        ta: 'அரசாங்கமும் பேரண்டப் பொருளாதார நோக்கங்களும்',
      },
      periods: 65,
      grade: 13,
      topics: [
        { name: { en: 'Market failure', si: 'වෙළඳපොළ අසාර්ථකත්වය', ta: 'சந்தைத் தோல்வி' } },
        { name: { en: 'Public finance', si: 'රාජ්‍ය මූල්‍ය', ta: 'பொது நிதி' } },
        { name: { en: 'Government revenue in Sri Lanka', si: 'ශ්‍රී ලංකාවේ රාජ්‍ය ආදායම', ta: 'இலங்கையின் அரச வருமானம்' } },
        { name: { en: 'Government expenditure', si: 'රාජ්‍ය වියදම', ta: 'அரச செலவினம்' } },
        { name: { en: 'Budget deficit and public debt', si: 'අයවැය හිඟය සහ රාජ්‍ය ණය', ta: 'வரவுசெலவுப் பற்றாக்குறையும் பொதுக் கடனும்' } },
        { name: { en: 'Fiscal and monetary policy', si: 'රාජ්‍ය මූල්‍ය සහ මූල්‍යමය ප්‍රතිපත්ති', ta: 'நிதிக் கொள்கையும் நாணயக் கொள்கையும்' } },
      ],
    },
    {
      name: { en: 'International trade', si: 'ජාත්‍යන්තර වෙළඳාම', ta: 'சர்வதேச வர்த்தகம்' },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'Basis of international trade', si: 'ජාත්‍යන්තර වෙළඳාමේ පදනම', ta: 'சர்வதேச வர்த்தகத்தின் அடிப்படை' } },
        { name: { en: 'Absolute and comparative advantage', si: 'නිරපේක්ෂ සහ සාපේක්ෂ වාසිය', ta: 'தனிப்பட்ட மற்றும் ஒப்பீட்டு நன்மை' } },
        { name: { en: 'Changing patterns of trade', si: 'වෙළඳ රටාවල වෙනස්වීම්', ta: 'வர்த்தக முறைகளின் மாற்றம்' } },
        { name: { en: 'Globalization and trade blocs', si: 'ගෝලීයකරණය සහ වෙළඳ කලාප', ta: 'உலகமயமாதலும் வர்த்தகக் கூட்டங்களும்' } },
        { name: { en: "Sri Lanka's foreign trade", si: 'ශ්‍රී ලංකාවේ විදේශ වෙළඳාම', ta: 'இலங்கையின் வெளிநாட்டு வர்த்தகம்' } },
      ],
    },
    {
      name: {
        en: 'Foreign finance and the balance of payments',
        si: 'විදේශ මූල්‍ය සහ ගෙවුම් ශේෂය',
        ta: 'வெளிநாட்டு நிதியும் கொடுப்பனவுச் சமநிலையும்',
      },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Balance of payments', si: 'ගෙවුම් ශේෂය', ta: 'கொடுப்பனவுச் சமநிலை' } },
        { name: { en: 'Balance of payments problems', si: 'ගෙවුම් ශේෂ ගැටලු', ta: 'கொடுப்பனவுச் சமநிலைப் பிரச்சினைகள்' } },
        { name: { en: 'Foreign resource gap', si: 'විදේශ සම්පත් හිඟය', ta: 'வெளிநாட்டு வள இடைவெளி' } },
        { name: { en: 'Foreign investment', si: 'විදේශ ආයෝජන', ta: 'வெளிநாட்டு முதலீடு' } },
        { name: { en: 'Exchange rate determination', si: 'විනිමය අනුපාත නිර්ණය', ta: 'செலாவணி வீத நிர்ணயம்' } },
        { name: { en: 'Multilateral financial institutions', si: 'බහුපාර්ශ්වික මූල්‍ය ආයතන', ta: 'பன்முக நிதி நிறுவனங்கள்' } },
      ],
    },
    {
      name: {
        en: 'Economic growth, development and sustainability',
        si: 'ආර්ථික වර්ධනය, සංවර්ධනය සහ තිරසාරත්වය',
        ta: 'பொருளாதார வளர்ச்சி, அபிவிருத்தி, நிலைபேறு',
      },
      periods: 70,
      grade: 13,
      topics: [
        { name: { en: 'Factors of economic growth', si: 'ආර්ථික වර්ධන සාධක', ta: 'பொருளாதார வளர்ச்சிக் காரணிகள்' } },
        { name: { en: 'Development concepts and indicators', si: 'සංවර්ධන සංකල්ප සහ දර්ශක', ta: 'அபிவிருத்தி எண்ணக்கருக்களும் குறிகாட்டிகளும்' } },
        { name: { en: 'Measuring poverty', si: 'දරිද්‍රතාව මැනීම', ta: 'வறுமையை அளத்தல்' } },
        { name: { en: 'Poverty in Sri Lanka', si: 'ශ්‍රී ලංකාවේ දරිද්‍රතාව', ta: 'இலங்கையில் வறுமை' } },
        { name: { en: 'The labour force', si: 'ශ්‍රම බලකාය', ta: 'தொழிற்படை' } },
        { name: { en: 'Sustainable development', si: 'තිරසාර සංවර්ධනය', ta: 'நிலைபேறான அபிவிருத்தி' } },
      ],
    },
    {
      name: {
        en: 'Sri Lankan economic structure and policies',
        si: 'ශ්‍රී ලංකා ආර්ථික ව්‍යුහය සහ ප්‍රතිපත්ති',
        ta: 'இலங்கைப் பொருளாதாரக் கட்டமைப்பும் கொள்கைகளும்',
      },
      periods: 20,
      grade: 13,
      topics: [
        { name: { en: 'Structural change since independence', si: 'නිදහසින් පසු ව්‍යුහාත්මක වෙනස්වීම්', ta: 'சுதந்திரத்தின் பின்னரான கட்டமைப்பு மாற்றம்' } },
        { name: { en: 'Current trends and policy regimes', si: 'වත්මන් ප්‍රවණතා සහ ප්‍රතිපත්ති', ta: 'நடப்புப் போக்குகளும் கொள்கைகளும்' } },
      ],
    },
  ],
});
