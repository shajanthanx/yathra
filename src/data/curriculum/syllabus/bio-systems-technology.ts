/**
 * Bio Systems Technology (Department of Examinations subject 66).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 19 competencies with 300 periods in each grade.
 * Those competencies are the units below, with their long competency
 * statements shortened to titles that fit a phone screen. Sinhala and Tamil
 * names are translations rather than the official wording: the NIE Sinhala and
 * Tamil editions are published with legacy non-Unicode fonts.
 */
import { defineSyllabus } from './define';

export const bioSystemsTechnologySyllabus = defineSyllabus({
  subjectId: 'bio-systems-technology',
  source: 'NIE G.C.E. (A/L) Biosystems Technology Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'translated',
  units: [
    {
      name: {
        en: 'Weather and biological systems',
        si: 'කාලගුණය සහ ජෛව පද්ධති',
        ta: 'வானிலையும் உயிரியல் முறைமைகளும்',
      },
      periods: 12,
      grade: 12,
      topics: [
        { name: { en: 'Climatic factors', si: 'දේශගුණික සාධක', ta: 'காலநிலைக் காரணிகள்' } },
        { name: { en: 'Meteorological stations', si: 'කාලගුණ මධ්‍යස්ථාන', ta: 'வானிலை நிலையங்கள்' } },
      ],
    },
    {
      name: { en: 'Soil in biological systems', si: 'ජෛව පද්ධතිවල පස', ta: 'உயிரியல் முறைமைகளில் மண்' },
      periods: 30,
      grade: 12,
      topics: [
        { name: { en: 'Characteristics of soil', si: 'පසෙහි ලක්ෂණ', ta: 'மண்ணின் இயல்புகள்' } },
        { name: { en: 'Physical and chemical properties', si: 'භෞතික සහ රසායනික ගුණ', ta: 'பௌதிக இரசாயன இயல்புகள்' } },
        { name: { en: 'Biological properties of soil', si: 'පසෙහි ජීව විද්‍යාත්මක ගුණ', ta: 'மண்ணின் உயிரியல் இயல்புகள்' } },
      ],
    },
    {
      name: { en: 'Surveying and levelling', si: 'මිනුම් හා මට්ටම් ගැනීම', ta: 'நில அளவையும் மட்டமாக்கலும்' },
      periods: 50,
      grade: 12,
      topics: [
        { name: { en: 'Fundamentals of surveying', si: 'මිනුම්කරණයේ මූලික කරුණු', ta: 'நில அளவையின் அடிப்படைகள்' } },
        { name: { en: 'Surveying techniques', si: 'මිනුම් ශිල්පීය ක්‍රම', ta: 'நில அளவை நுட்பங்கள்' } },
        { name: { en: 'Plane-table surveying', si: 'තල මේස මිනුම්', ta: 'தள மேசை அளவை' } },
        { name: { en: 'Chain surveying', si: 'දම්වැල් මිනුම්', ta: 'சங்கிலி அளவை' } },
        { name: { en: 'Levelling', si: 'මට්ටම් ගැනීම', ta: 'மட்டமாக்கல்' } },
        { name: { en: 'Contour mapping', si: 'සමෝච්ඡ සිතියම්කරණය', ta: 'சமவுயரக் கோட்டு வரைபடம்' } },
      ],
    },
    {
      name: { en: 'Water resources', si: 'ජල සම්පත්', ta: 'நீர் வளங்கள்' },
      periods: 8,
      grade: 12,
      topics: [
        { name: { en: 'Water resources', si: 'ජල සම්පත්', ta: 'நீர் வளங்கள்' } },
        { name: { en: 'Ground water', si: 'භූගත ජලය', ta: 'நிலத்தடி நீர்' } },
      ],
    },
    {
      name: { en: 'Water quality', si: 'ජලයේ ගුණාත්මකභාවය', ta: 'நீரின் தரம்' },
      periods: 22,
      grade: 12,
      topics: [
        { name: { en: 'Evaluating water quality', si: 'ජල ගුණාත්මකභාවය ඇගයීම', ta: 'நீரின் தரத்தை மதிப்பிடல்' } },
        { name: { en: 'Impact of polluted water', si: 'දූෂිත ජලයේ බලපෑම', ta: 'மாசடைந்த நீரின் தாக்கம்' } },
        { name: { en: 'Waste-water treatment', si: 'අපජල පිරිපහදුව', ta: 'கழிவுநீர் சுத்திகரிப்பு' } },
      ],
    },
    {
      name: {
        en: 'Commercial plant production',
        si: 'වාණිජ ශාක නිෂ්පාදනය',
        ta: 'வர்த்தக ரீதியான தாவர உற்பத்தி',
      },
      periods: 18,
      grade: 12,
      topics: [
        { name: { en: 'Plant propagation methods', si: 'ශාක ප්‍රචාරණ ක්‍රම', ta: 'தாவரப் பரம்பல் முறைகள்' } },
        { name: { en: 'Plant nurseries', si: 'ශාක තවාන්', ta: 'தாவர நாற்றுமேடைகள்' } },
      ],
    },
    {
      name: { en: 'Aquaculture', si: 'ජලජ වගාව', ta: 'நீர்வள வளர்ப்பு' },
      periods: 22,
      grade: 12,
      topics: [
        { name: { en: 'Ornamental fish', si: 'අලංකාර මසුන්', ta: 'அலங்கார மீன்கள்' } },
        { name: { en: 'Fresh-water fish culture', si: 'මිරිදිය මත්ස්‍ය වගාව', ta: 'நன்னீர் மீன் வளர்ப்பு' } },
        { name: { en: 'Ornamental aquatic plants', si: 'අලංකාර ජලජ ශාක', ta: 'அலங்கார நீர்வாழ் தாவரங்கள்' } },
      ],
    },
    {
      name: {
        en: 'Animal production technology',
        si: 'සත්ත්ව නිෂ්පාදන තාක්ෂණය',
        ta: 'கால்நடை உற்பத்தி தொழினுட்பம்',
      },
      periods: 38,
      grade: 12,
      topics: [
        { name: { en: 'Technologies in animal production', si: 'සත්ත්ව නිෂ්පාදනයේ තාක්ෂණ', ta: 'கால்நடை உற்பத்தித் தொழினுட்பங்கள்' } },
        { name: { en: 'Commercial milk industry', si: 'වාණිජ කිරි කර්මාන්තය', ta: 'வர்த்தகப் பால் கைத்தொழில்' } },
        { name: { en: 'Broiler meat production', si: 'බ්‍රොයිලර් මස් නිෂ්පාදනය', ta: 'இறைச்சிக் கோழி உற்பத்தி' } },
        { name: { en: 'Egg and egg-product industry', si: 'බිත්තර සහ බිත්තර නිෂ්පාදන කර්මාන්තය', ta: 'முட்டை மற்றும் முட்டைப் பொருள் கைத்தொழில்' } },
      ],
    },
    {
      name: { en: 'Quality food production', si: 'ගුණාත්මක ආහාර නිෂ්පාදනය', ta: 'தரமான உணவு உற்பத்தி' },
      periods: 65,
      grade: 12,
      topics: [
        { name: { en: 'Factors affecting food quality', si: 'ආහාර ගුණාත්මකභාවයට බලපාන සාධක', ta: 'உணவுத் தரத்தைப் பாதிக்கும் காரணிகள்' } },
        { name: { en: 'Food preservation', si: 'ආහාර සංරක්ෂණය', ta: 'உணவுப் பாதுகாப்பு' } },
        { name: { en: 'New product development', si: 'නව නිෂ්පාදන සංවර්ධනය', ta: 'புதிய பொருள் அபிவிருத்தி' } },
        { name: { en: 'Packaging and labelling', si: 'ඇසුරුම්කරණය සහ ලේබල් කිරීම', ta: 'பொதியிடலும் லேபிளிடலும்' } },
        { name: { en: 'Food safety', si: 'ආහාර ආරක්ෂාව', ta: 'உணவுப் பாதுகாப்பு' } },
        { name: { en: 'Food adulteration', si: 'ආහාර දූෂණය', ta: 'உணவுக் கலப்படம்' } },
        { name: { en: 'Quality certification and regulations', si: 'ගුණාත්මක සහතික සහ නීති', ta: 'தரச் சான்றிதழும் ஒழுங்குவிதிகளும்' } },
      ],
    },
    {
      name: { en: 'Post-harvest technology', si: 'අස්වනු පසු තාක්ෂණය', ta: 'அறுவடைப் பின் தொழினுட்பம்' },
      periods: 15,
      grade: 12,
      topics: [
        { name: { en: 'Post-harvest losses', si: 'අස්වනු පසු හානි', ta: 'அறுவடைப் பின் இழப்புகள்' } },
        { name: { en: 'Maturity index', si: 'මේරීමේ දර්ශකය', ta: 'முதிர்ச்சிக் குறியீடு' } },
        { name: { en: 'Handling fish harvest', si: 'මත්ස්‍ය අස්වැන්න හැසිරවීම', ta: 'மீன் அறுவடை கையாளுகை' } },
      ],
    },
    {
      name: {
        en: 'Controlled-environment crop production',
        si: 'පාලිත පරිසර බෝග නිෂ්පාදනය',
        ta: 'கட்டுப்படுத்தப்பட்ட சூழல் பயிர் உற்பத்தி',
      },
      periods: 20,
      grade: 12,
      topics: [
        { name: { en: 'Importance of protected agriculture', si: 'ආරක්ෂිත කෘෂිකර්මයේ වැදගත්කම', ta: 'பாதுகாக்கப்பட்ட விவசாயத்தின் முக்கியத்துவம்' } },
        { name: { en: 'Constructing protective structures', si: 'ආරක්ෂිත ව්‍යුහ ඉදිකිරීම', ta: 'பாதுகாப்பு அமைப்புகளை நிர்மாணித்தல்' } },
        { name: { en: 'Measuring environmental factors', si: 'පාරිසරික සාධක මැනීම', ta: 'சூழல் காரணிகளை அளத்தல்' } },
        { name: { en: 'Soilless culture', si: 'පස් රහිත වගාව', ta: 'மண்ணற்ற சாகுபடி' } },
      ],
    },
    {
      name: { en: 'Mechanization', si: 'යාන්ත්‍රීකරණය', ta: 'இயந்திரமயமாக்கல்' },
      periods: 74,
      grade: 13,
      topics: [
        { name: { en: 'Farm mechanization', si: 'ගොවිපොළ යාන්ත්‍රීකරණය', ta: 'பண்ணை இயந்திரமயமாக்கல்' } },
        { name: { en: 'Drip and sprinkler irrigation', si: 'බිංදු සහ ඉසින වාරිමාර්ග', ta: 'சொட்டு மற்றும் தெளிப்பு நீர்ப்பாசனம்' } },
        { name: { en: 'Land preparation machinery', si: 'ඉඩම් සකස් කිරීමේ යන්ත්‍ර', ta: 'நிலம் தயாரிக்கும் இயந்திரங்கள்' } },
        { name: { en: 'Small engines', si: 'කුඩා එන්ජින්', ta: 'சிறிய எஞ்சின்கள்' } },
        { name: { en: 'Plant-protection equipment', si: 'ශාක ආරක්ෂණ උපකරණ', ta: 'தாவரப் பாதுகாப்பு உபகரணங்கள்' } },
      ],
    },
    {
      name: {
        en: 'Timber and non-timber products',
        si: 'දැව සහ දැව නොවන නිෂ්පාදන',
        ta: 'மரம் மற்றும் மரமல்லாத பொருட்கள்',
      },
      periods: 26,
      grade: 13,
      topics: [
        { name: { en: 'Economically important timber', si: 'ආර්ථික වශයෙන් වැදගත් දැව', ta: 'பொருளாதார முக்கியத்துவமுள்ள மரம்' } },
        { name: { en: 'Timber seasoning and grading', si: 'දැව වියළීම සහ ශ්‍රේණිගත කිරීම', ta: 'மரம் பதப்படுத்தலும் தரப்படுத்தலும்' } },
        { name: { en: 'Forest mensuration', si: 'වන මිනුම්කරණය', ta: 'வன அளவையியல்' } },
        { name: { en: 'Non-timber forest products', si: 'දැව නොවන වන නිෂ්පාදන', ta: 'மரமல்லாத வனப் பொருட்கள்' } },
      ],
    },
    {
      name: {
        en: 'Plantation and export crop products',
        si: 'වතු සහ අපනයන බෝග නිෂ්පාදන',
        ta: 'பெருந்தோட்ட மற்றும் ஏற்றுமதிப் பயிர்ப் பொருட்கள்',
      },
      periods: 20,
      grade: 13,
      topics: [
        { name: { en: 'Tea, rubber and coconut products', si: 'තේ, රබර් සහ පොල් නිෂ්පාදන', ta: 'தேயிலை, இறப்பர், தென்னைப் பொருட்கள்' } },
        { name: { en: 'Minor export crop products', si: 'සුළු අපනයන බෝග නිෂ්පාදන', ta: 'சிறு ஏற்றுமதிப் பயிர்ப் பொருட்கள்' } },
      ],
    },
    {
      name: {
        en: 'Process control and automation',
        si: 'ක්‍රියාවලි පාලනය සහ ස්වයංක්‍රීයකරණය',
        ta: 'செயன்முறைக் கட்டுப்பாடும் தன்னியக்கமாக்கலும்',
      },
      periods: 72,
      grade: 13,
      topics: [
        { name: { en: 'Basic electricity and electronics', si: 'මූලික විද්‍යුතය සහ ඉලෙක්ට්‍රොනික', ta: 'அடிப்படை மின்னியலும் இலத்திரனியலும்' } },
        { name: { en: 'Assembling simple circuits', si: 'සරල පරිපථ එකලස් කිරීම', ta: 'எளிய சுற்றுகளை அமைத்தல்' } },
        { name: { en: 'Electrical power calculations', si: 'විද්‍යුත් ජව ගණනය', ta: 'மின் வலுக் கணிப்பீடுகள்' } },
        { name: { en: 'Microcontrollers', si: 'ක්ෂුද්‍ර පාලක', ta: 'நுண்கட்டுப்படுத்திகள்' } },
        { name: { en: 'Fabricating automated systems', si: 'ස්වයංක්‍රීය පද්ධති නිර්මාණය', ta: 'தன்னியக்க முறைமைகளை உருவாக்கல்' } },
      ],
    },
    {
      name: {
        en: 'Occupational safety and health',
        si: 'වෘත්තීය ආරක්ෂාව සහ සෞඛ්‍යය',
        ta: 'தொழில்சார் பாதுகாப்பும் சுகாதாரமும்',
      },
      periods: 8,
      grade: 13,
      topics: [
        { name: { en: 'Occupational hazards', si: 'වෘත්තීය අනතුරු', ta: 'தொழில்சார் அபாயங்கள்' } },
        { name: { en: 'Safety standards and regulations', si: 'ආරක්ෂණ ප්‍රමිති සහ නීති', ta: 'பாதுகாப்புத் தரங்களும் ஒழுங்குவிதிகளும்' } },
      ],
    },
    {
      name: { en: 'Horticulture', si: 'උද්‍යාන කර්මාන්තය', ta: 'தோட்டக்கலை' },
      periods: 40,
      grade: 13,
      topics: [
        { name: { en: 'Cut-flower and foliage production', si: 'කැපූ මල් සහ පත්‍ර නිෂ්පාදනය', ta: 'வெட்டுப் பூ மற்றும் இலை உற்பத்தி' } },
        { name: { en: 'Market presentation', si: 'වෙළඳපොළ ඉදිරිපත් කිරීම', ta: 'சந்தை முன்வைப்பு' } },
        { name: { en: 'Landscape elements and principles', si: 'භූමි අලංකරණ අංග සහ මූලධර්ම', ta: 'நிலத்தோற்றக் கூறுகளும் கோட்பாடுகளும்' } },
        { name: { en: 'Landscape design and maintenance', si: 'භූමි අලංකරණ නිර්මාණය සහ නඩත්තුව', ta: 'நிலத்தோற்ற வடிவமைப்பும் பராமரிப்பும்' } },
      ],
    },
    {
      name: {
        en: 'Environment-friendly strategies',
        si: 'පරිසර හිතකාමී උපාය මාර්ග',
        ta: 'சூழல் நேய உபாயங்கள்',
      },
      periods: 45,
      grade: 13,
      topics: [
        { name: { en: 'Minimizing environmental impact', si: 'පාරිසරික බලපෑම අවම කිරීම', ta: 'சூழல் தாக்கத்தைக் குறைத்தல்' } },
        { name: { en: 'Renewable energy and biogas', si: 'පුනර්ජනනීය බලශක්තිය සහ ජෛව වායුව', ta: 'புதுப்பிக்கத்தக்க சக்தியும் உயிர்வாயுவும்' } },
        { name: { en: 'Environment-friendly techniques', si: 'පරිසර හිතකාමී ක්‍රම', ta: 'சூழல் நேய நுட்பங்கள்' } },
      ],
    },
    {
      name: {
        en: 'Enterprise and product development',
        si: 'ව්‍යවසාය සහ නිෂ්පාදන සංවර්ධනය',
        ta: 'தொழில்முயற்சி மற்றும் பொருள் அபிவிருத்தி',
      },
      periods: 15,
      grade: 13,
      topics: [
        { name: { en: 'Entrepreneurship', si: 'ව්‍යවසායකත්වය', ta: 'தொழில்முனைவு' } },
        { name: { en: 'Business opportunities', si: 'ව්‍යාපාර අවස්ථා', ta: 'வணிக வாய்ப்புகள்' } },
        { name: { en: 'Infrastructure for a business', si: 'ව්‍යාපාරයක් සඳහා යටිතල පහසුකම්', ta: 'வணிகத்திற்கான உட்கட்டமைப்பு' } },
      ],
    },
  ],
});
