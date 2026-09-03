/**
 * Agricultural Science (Department of Examinations subject 08).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 19 competencies and allocates 250 periods in each
 * grade rather than the 300 most subjects use. Those competencies are the units
 * below, with their long competency statements shortened to titles that fit a
 * phone screen. Sinhala and Tamil names are translations rather than the
 * official wording: the NIE Sinhala and Tamil editions are published with
 * legacy non-Unicode fonts.
 */
import { defineSyllabus } from './define';

export const agriculturalScienceSyllabus = defineSyllabus({
  subjectId: 'agricultural-science',
  source: 'NIE G.C.E. (A/L) Agricultural Science Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: { en: 'Agriculture in Sri Lanka', si: 'ශ්‍රී ලංකාවේ කෘෂිකර්මය', ta: 'இலங்கையில் விவசாயம்' },
      periods: 17,
      grade: 12,
      topics: [
        { name: { en: 'Background of agriculture', si: 'කෘෂිකර්මයේ පසුබිම', ta: 'விவசாயத்தின் பின்னணி' } },
        { name: { en: 'Role of the agriculture sector', si: 'කෘෂිකාර්මික අංශයේ කාර්යභාරය', ta: 'விவசாயத் துறையின் பங்கு' } },
        { name: { en: 'Contribution to the economy', si: 'ආර්ථිකයට දායකත්වය', ta: 'பொருளாதாரத்திற்கான பங்களிப்பு' } },
        { name: { en: 'Agro-based industries', si: 'කෘෂි පදනම් කර්මාන්ත', ta: 'விவசாய அடிப்படைத் தொழில்கள்' } },
        { name: { en: 'Institutional structure', si: 'ආයතනික ව්‍යුහය', ta: 'நிறுவனக் கட்டமைப்பு' } },
      ],
    },
    {
      name: { en: 'Climate and crop production', si: 'දේශගුණය සහ බෝග නිෂ්පාදනය', ta: 'காலநிலையும் பயிர் உற்பத்தியும்' },
      periods: 16,
      grade: 12,
      topics: [
        { name: { en: 'Agro-climatic zones', si: 'කෘෂි දේශගුණික කලාප', ta: 'விவசாய காலநிலை வலயங்கள்' } },
        { name: { en: 'Impact of climatic factors', si: 'දේශගුණික සාධකවල බලපෑම', ta: 'காலநிலைக் காரணிகளின் தாக்கம்' } },
        { name: { en: 'Collecting weather data', si: 'කාලගුණ දත්ත රැස් කිරීම', ta: 'வானிலைத் தரவு சேகரிப்பு' } },
      ],
    },
    {
      name: { en: 'Soil management', si: 'පාංශු කළමනාකරණය', ta: 'மண் முகாமைத்துவம்' },
      periods: 39,
      grade: 12,
      topics: [
        { name: { en: 'Soil composition', si: 'පසෙහි සංයුතිය', ta: 'மண்ணின் கூட்டமைவு' } },
        { name: { en: 'Soil forming factors', si: 'පස සෑදෙන සාධක', ta: 'மண் உருவாக்கும் காரணிகள்' } },
        { name: { en: 'Physical properties of soil', si: 'පසෙහි භෞතික ගුණ', ta: 'மண்ணின் பௌதிக இயல்புகள்' } },
        { name: { en: 'Chemical properties of soil', si: 'පසෙහි රසායනික ගුණ', ta: 'மண்ணின் இரசாயன இயல்புகள்' } },
        { name: { en: 'Soil biology', si: 'පසෙහි ජීව විද්‍යාව', ta: 'மண் உயிரியல்' } },
        { name: { en: 'Soil degradation', si: 'පස් හායනය', ta: 'மண் சீரழிவு' } },
        { name: { en: 'Soil improvement', si: 'පස් වැඩිදියුණු කිරීම', ta: 'மண் மேம்பாடு' } },
        { name: { en: 'Soil groups of Sri Lanka', si: 'ශ්‍රී ලංකාවේ පාංශු කාණ්ඩ', ta: 'இலங்கையின் மண் வகைகள்' } },
      ],
    },
    {
      name: { en: 'Nutrient management', si: 'පෝෂක කළමනාකරණය', ta: 'ஊட்டச்சத்து முகாமைத்துவம்' },
      periods: 27,
      grade: 12,
      topics: [
        { name: { en: 'Plant nutrients', si: 'ශාක පෝෂක', ta: 'தாவர ஊட்டச்சத்துக்கள்' } },
        { name: { en: 'Soil reaction and nutrient availability', si: 'පසෙහි ප්‍රතික්‍රියාව සහ පෝෂක ලබා ගැනීම', ta: 'மண் வினைத்திறனும் ஊட்டச்சத்து கிடைப்பும்' } },
        { name: { en: 'Types of fertilizer', si: 'පොහොර වර්ග', ta: 'உரங்களின் வகைகள்' } },
        { name: { en: 'Fertilizer application methods', si: 'පොහොර යෙදීමේ ක්‍රම', ta: 'உரமிடும் முறைகள்' } },
        { name: { en: 'Organic fertilizer', si: 'කාබනික පොහොර', ta: 'சேதன உரம்' } },
        { name: { en: 'Nutrient management plans', si: 'පෝෂක කළමනාකරණ සැලසුම්', ta: 'ஊட்டச்சத்து முகாமைத்துவத் திட்டங்கள்' } },
      ],
    },
    {
      name: {
        en: 'Land preparation and crop establishment',
        si: 'ඉඩම් සකස් කිරීම සහ බෝග පිහිටුවීම',
        ta: 'நிலம் தயாரித்தலும் பயிர் நிலைநிறுத்தலும்',
      },
      periods: 24,
      grade: 12,
      topics: [
        { name: { en: 'Need for land preparation', si: 'ඉඩම් සකස් කිරීමේ අවශ්‍යතාව', ta: 'நிலம் தயாரிப்பின் தேவை' } },
        { name: { en: 'Steps of land preparation', si: 'ඉඩම් සකස් කිරීමේ පියවර', ta: 'நிலம் தயாரிக்கும் படிகள்' } },
        { name: { en: 'Equipment used', si: 'භාවිත උපකරණ', ta: 'பயன்படும் உபகரணங்கள்' } },
        { name: { en: 'Crop establishment methods', si: 'බෝග පිහිටුවීමේ ක්‍රම', ta: 'பயிர் நிலைநிறுத்தும் முறைகள்' } },
      ],
    },
    {
      name: { en: 'Irrigation and drainage', si: 'වාරිමාර්ග සහ ජල බැහැර කිරීම', ta: 'நீர்ப்பாசனமும் வடிகாலமைப்பும்' },
      periods: 27,
      grade: 12,
      topics: [
        { name: { en: 'Water sources', si: 'ජල ප්‍රභව', ta: 'நீர் மூலங்கள்' } },
        { name: { en: 'Water quality', si: 'ජලයේ ගුණාත්මකභාවය', ta: 'நீரின் தரம்' } },
        { name: { en: 'Water requirement of crops', si: 'බෝගවල ජල අවශ්‍යතාව', ta: 'பயிர்களின் நீர்த் தேவை' } },
        { name: { en: 'Irrigation methods', si: 'වාරිමාර්ග ක්‍රම', ta: 'நீர்ப்பாசன முறைகள்' } },
        { name: { en: 'Minimizing water loss', si: 'ජල හානිය අවම කිරීම', ta: 'நீர் இழப்பைக் குறைத்தல்' } },
        { name: { en: 'Drainage', si: 'ජල බැහැර කිරීම', ta: 'வடிகாலமைப்பு' } },
      ],
    },
    {
      name: { en: 'Plant physiology for yield', si: 'අස්වැන්න සඳහා ශාක කායික විද්‍යාව', ta: 'விளைச்சலுக்கான தாவர உடலியல்' },
      periods: 20,
      grade: 12,
      topics: [
        { name: { en: 'Photosynthesis', si: 'ප්‍රභාසංශ්ලේෂණය', ta: 'ஒளிச்சேர்க்கை' } },
        { name: { en: 'Respiration', si: 'ශ්වසනය', ta: 'சுவாசம்' } },
        { name: { en: 'Water relations', si: 'ජල සම්බන්ධතා', ta: 'நீர் உறவுகள்' } },
        { name: { en: 'Plant growth regulators', si: 'ශාක වර්ධන නියාමක', ta: 'தாவர வளர்ச்சி ஒழுங்குபடுத்திகள்' } },
        { name: { en: 'Stages of plant development', si: 'ශාක වර්ධන අවස්ථා', ta: 'தாவர வளர்ச்சி நிலைகள்' } },
      ],
    },
    {
      name: { en: 'Plant propagation', si: 'ශාක ප්‍රචාරණය', ta: 'தாவரப் பரம்பல்' },
      periods: 48,
      grade: 12,
      topics: [
        { name: { en: 'Methods of propagation', si: 'ප්‍රචාරණ ක්‍රම', ta: 'பரம்பல் முறைகள்' } },
        { name: { en: 'Seed development', si: 'බීජ වර්ධනය', ta: 'விதை வளர்ச்சி' } },
        { name: { en: 'Seed quality and testing', si: 'බීජ ගුණාත්මකභාවය සහ පරීක්ෂාව', ta: 'விதைத் தரமும் சோதனையும்' } },
        { name: { en: 'Seed production and storage', si: 'බීජ නිෂ්පාදනය සහ ගබඩා කිරීම', ta: 'விதை உற்பத்தியும் சேமிப்பும்' } },
        { name: { en: 'Cuttings and layering', si: 'කැබලි සහ පස් යෙදීම', ta: 'வெட்டுத்தண்டும் அடுக்குதலும்' } },
        { name: { en: 'Grafting and budding', si: 'බද්ධ කිරීම සහ අංකුර බද්ධය', ta: 'ஒட்டுதலும் மொட்டு ஒட்டுதலும்' } },
        { name: { en: 'Tissue culture', si: 'පටක රෝපණය', ta: 'திசு வளர்ப்பு' } },
      ],
    },
    {
      name: {
        en: 'Plant breeding and genetic resources',
        si: 'ශාක අභිජනනය සහ ප්‍රවේණික සම්පත්',
        ta: 'தாவர இனப்பெருக்கமும் மரபணு வளங்களும்',
      },
      periods: 12,
      grade: 12,
      topics: [
        { name: { en: 'Basis of plant breeding', si: 'ශාක අභිජනනයේ පදනම', ta: 'தாவர இனப்பெருக்கத்தின் அடிப்படை' } },
        { name: { en: 'Breeding methods', si: 'අභිජනන ක්‍රම', ta: 'இனப்பெருக்க முறைகள்' } },
        { name: { en: 'Conservation of genetic resources', si: 'ප්‍රවේණික සම්පත් සංරක්ෂණය', ta: 'மரபணு வளப் பாதுகாப்பு' } },
      ],
    },
    {
      name: { en: 'Protected agriculture', si: 'ආරක්ෂිත කෘෂිකර්මය', ta: 'பாதுகாக்கப்பட்ட விவசாயம்' },
      periods: 8,
      grade: 12,
      topics: [
        { name: { en: 'Importance of protected agriculture', si: 'ආරක්ෂිත කෘෂිකර්මයේ වැදගත්කම', ta: 'பாதுகாக்கப்பட்ட விவசாயத்தின் முக்கியத்துவம்' } },
        { name: { en: 'Selecting protected structures', si: 'ආරක්ෂිත ව්‍යුහ තෝරා ගැනීම', ta: 'பாதுகாப்பு அமைப்புகளைத் தெரிவு செய்தல்' } },
      ],
    },
    {
      name: { en: 'Soilless culture', si: 'පස් රහිත වගාව', ta: 'மண்ணற்ற சாகுபடி' },
      periods: 12,
      grade: 12,
      topics: [
        { name: { en: 'Soilless culture methods', si: 'පස් රහිත වගා ක්‍රම', ta: 'மண்ணற்ற சாகுபடி முறைகள்' } },
        { name: { en: 'Hydroponics', si: 'ජල වගාව', ta: 'நீர்ச் சாகுபடி' } },
        { name: { en: 'Soilless culture in Sri Lanka', si: 'ශ්‍රී ලංකාවේ පස් රහිත වගාව', ta: 'இலங்கையில் மண்ணற்ற சாகுபடி' } },
      ],
    },
    {
      name: { en: 'Pest management', si: 'පළිබෝධ කළමනාකරණය', ta: 'பீடை முகாமைத்துவம்' },
      periods: 53,
      grade: 13,
      topics: [
        { name: { en: 'Impact of pests', si: 'පළිබෝධවල බලපෑම', ta: 'பீடைகளின் தாக்கம்' } },
        { name: { en: 'Animal pests', si: 'සත්ත්ව පළිබෝධ', ta: 'விலங்குப் பீடைகள்' } },
        { name: { en: 'Weeds', si: 'වල් පැළෑටි', ta: 'களைகள்' } },
        { name: { en: 'Disease-causing agents', si: 'රෝග කාරක', ta: 'நோய் உண்டாக்கிகள்' } },
        { name: { en: 'Integrated pest management', si: 'ඒකාබද්ධ පළිබෝධ කළමනාකරණය', ta: 'ஒருங்கிணைந்த பீடை முகாமைத்துவம்' } },
        { name: { en: 'Selecting pesticides', si: 'පළිබෝධනාශක තෝරා ගැනීම', ta: 'பீடைநாசினிகளைத் தெரிவு செய்தல்' } },
        { name: { en: 'Application methods and equipment', si: 'යෙදීමේ ක්‍රම සහ උපකරණ', ta: 'பயன்படுத்தும் முறைகளும் உபகரணங்களும்' } },
      ],
    },
    {
      name: { en: 'Food and nutrition', si: 'ආහාර සහ පෝෂණය', ta: 'உணவும் ஊட்டச்சத்தும்' },
      periods: 24,
      grade: 13,
      topics: [
        { name: { en: 'Food constituents', si: 'ආහාර සංඝටක', ta: 'உணவுக் கூறுகள்' } },
        { name: { en: 'Nutrition problems', si: 'පෝෂණ ගැටලු', ta: 'ஊட்டச்சத்துப் பிரச்சினைகள்' } },
        { name: { en: 'Factors affecting food quality', si: 'ආහාර ගුණාත්මකභාවයට බලපාන සාධක', ta: 'உணவுத் தரத்தைப் பாதிக்கும் காரணிகள்' } },
        { name: { en: 'Food preservation', si: 'ආහාර සංරක්ෂණය', ta: 'உணவுப் பாதுகாப்பு' } },
        { name: { en: 'Food standards', si: 'ආහාර ප්‍රමිති', ta: 'உணவுத் தரங்கள்' } },
        { name: { en: 'Food processing methods', si: 'ආහාර සැකසීමේ ක්‍රම', ta: 'உணவுப் பதனிடும் முறைகள்' } },
      ],
    },
    {
      name: {
        en: 'Pre- and post-harvest technology',
        si: 'අස්වනු පෙර සහ පසු තාක්ෂණය',
        ta: 'அறுவடைக்கு முன் பின் தொழினுட்பம்',
      },
      periods: 22,
      grade: 13,
      topics: [
        { name: { en: 'Harvesting practices', si: 'අස්වනු නෙළීමේ ක්‍රම', ta: 'அறுவடை நடைமுறைகள்' } },
        { name: { en: 'Causes of post-harvest losses', si: 'අස්වනු පසු හානිවලට හේතු', ta: 'அறுவடைப் பின் இழப்புக்கான காரணங்கள்' } },
        { name: { en: 'Post-harvest handling', si: 'අස්වනු පසු හැසිරවීම', ta: 'அறுவடைப் பின் கையாளுகை' } },
      ],
    },
    {
      name: { en: 'Animal husbandry', si: 'සත්ත්ව පාලනය', ta: 'கால்நடை வளர்ப்பு' },
      periods: 69,
      grade: 13,
      topics: [
        { name: { en: 'Animal production systems', si: 'සත්ත්ව නිෂ්පාදන පද්ධති', ta: 'கால்நடை உற்பத்தி முறைமைகள்' } },
        { name: { en: 'Animal feed and feeding', si: 'සත්ත්ව ආහාර සහ පෝෂණය', ta: 'கால்நடைத் தீவனமும் ஊட்டலும்' } },
        { name: { en: 'Anatomy and physiology', si: 'ව්‍යුහ විද්‍යාව සහ කායික විද්‍යාව', ta: 'உடற்கூறும் உடலியலும்' } },
        { name: { en: 'Dairy cattle management', si: 'කිරි ගවපාලනය', ta: 'பால் மாட்டு முகாமைத்துவம்' } },
        { name: { en: 'Cattle breeding', si: 'ගව අභිජනනය', ta: 'மாட்டு இனப்பெருக்கம்' } },
        { name: { en: 'Animal diseases', si: 'සත්ත්ව රෝග', ta: 'கால்நடை நோய்கள்' } },
        { name: { en: 'Poultry production', si: 'කුකුළු පාලනය', ta: 'கோழி வளர்ப்பு' } },
        { name: { en: 'Other livestock', si: 'වෙනත් සත්ත්ව පාලනය', ta: 'ஏனைய கால்நடைகள்' } },
      ],
    },
    {
      name: {
        en: 'Agricultural economics and farm management',
        si: 'කෘෂි ආර්ථික විද්‍යාව සහ ගොවිපොළ කළමනාකරණය',
        ta: 'விவசாயப் பொருளியலும் பண்ணை முகாமைத்துவமும்',
      },
      periods: 48,
      grade: 13,
      topics: [
        { name: { en: 'Efficient use of resources', si: 'සම්පත් කාර්යක්ෂම භාවිතය', ta: 'வளங்களின் திறன்மிக்க பயன்பாடு' } },
        { name: { en: 'Production and decision principles', si: 'නිෂ්පාදන සහ තීරණ මූලධර්ම', ta: 'உற்பத்தி மற்றும் முடிவுக் கோட்பாடுகள்' } },
        { name: { en: 'Farm planning and records', si: 'ගොවිපොළ සැලසුම් සහ වාර්තා', ta: 'பண்ணைத் திட்டமிடலும் பதிவுகளும்' } },
        { name: { en: 'Agricultural marketing', si: 'කෘෂි අලෙවිකරණය', ta: 'விவசாய சந்தைப்படுத்தல்' } },
        { name: { en: 'Agri-business opportunities', si: 'කෘෂි ව්‍යාපාර අවස්ථා', ta: 'விவசாய வணிக வாய்ப்புகள்' } },
      ],
    },
    {
      name: { en: 'Sustainable agriculture', si: 'තිරසාර කෘෂිකර්මය', ta: 'நிலைபேறான விவசாயம்' },
      periods: 19,
      grade: 13,
      topics: [
        { name: { en: 'Need for sustainable agriculture', si: 'තිරසාර කෘෂිකර්මයේ අවශ්‍යතාව', ta: 'நிலைபேறான விவசாயத்தின் தேவை' } },
        { name: { en: 'Organic and conservation farming', si: 'කාබනික සහ සංරක්ෂණ ගොවිතැන', ta: 'சேதன மற்றும் பாதுகாப்பு விவசாயம்' } },
      ],
    },
    {
      name: {
        en: 'Health and safety in agriculture',
        si: 'කෘෂිකර්මයේ සෞඛ්‍යය සහ ආරක්ෂාව',
        ta: 'விவசாயத்தில் சுகாதாரமும் பாதுகாப்பும்',
      },
      periods: 6,
      grade: 13,
      topics: [
        { name: { en: 'Hazards in agriculture', si: 'කෘෂිකර්මයේ අනතුරු', ta: 'விவசாயத்தில் அபாயங்கள்' } },
        { name: { en: 'Health and safety practices', si: 'සෞඛ්‍ය හා ආරක්ෂණ ක්‍රම', ta: 'சுகாதார பாதுகாப்பு நடைமுறைகள்' } },
      ],
    },
    {
      name: { en: 'Challenges in agriculture', si: 'කෘෂිකර්මයේ අභියෝග', ta: 'விவசாயத்தில் சவால்கள்' },
      periods: 9,
      grade: 13,
      topics: [
        { name: { en: 'Climate change impacts', si: 'දේශගුණ විපර්යාසවල බලපෑම', ta: 'காலநிலை மாற்றத் தாக்கங்கள்' } },
        { name: { en: 'Protecting pollinators', si: 'පරාගණකයන් ආරක්ෂා කිරීම', ta: 'மகரந்தச் சேர்க்கையாளர் பாதுகாப்பு' } },
        { name: { en: 'Avoiding harmful technology', si: 'හානිකර තාක්ෂණය වැළැක්වීම', ta: 'தீங்கான தொழினுட்பத்தைத் தவிர்த்தல்' } },
      ],
    },
  ],
});
