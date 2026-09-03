/**
 * Combined Mathematics (Department of Examinations subject 10).
 *
 * The National Institute of Education syllabus for Grades 12 and 13, effective
 * from 2017, is organised as 27 Combined Mathematics I (Pure) competencies and
 * 5 Combined Mathematics II (Applied) competencies rather than numbered units,
 * together with an official term-wise topic table. The units below group those
 * competencies into the conventional Pure and Applied divisions used in class;
 * the topics are the official term-wise topics, and each topic's weight is the
 * number of competency levels it carries. Sinhala and Tamil topic names come
 * from the NIE Sinhala and Tamil editions of the same syllabus. Per-topic
 * period allocations are not recoverable from the official PDF layout, so the
 * units below carry no period count.
 */
import { defineSyllabus } from './define';

export const combinedMathematicsSyllabus = defineSyllabus({
  subjectId: 'combined-mathematics',
  source: 'NIE G.C.E. (A/L) Combined Mathematics Syllabus, Grades 12–13 (2017)',
  syllabusRevision: 2017,
  nameSource: 'official',
  units: [
    {
      name: { en: 'Algebra and Functions', si: 'වීජ ගණිතය සහ ශ්‍රිත', ta: 'அட்சரகணிதமும் சார்புகளும்' },
      grade: 12,
      topics: [
        { name: { en: 'Real numbers', si: 'තාත්ත්වික සංඛ්‍යා', ta: 'மெய்யெண்கள்' }, weight: 2 },
        { name: { en: 'Functions', si: 'ශ්‍රිත', ta: 'சார்புகள்' }, weight: 2 },
        { name: { en: 'Polynomials', si: 'බහුපද', ta: 'பல்லுறுப்பிகள்' }, weight: 3 },
        { name: { en: 'Rational functions', si: 'පරිමේය ශ්‍රිත', ta: 'விகிதமுறு சார்புகள்' }, weight: 1 },
        {
          name: {
            en: 'Index and logarithmic laws',
            si: 'දර්ශක හා ලඝුගණක නියම',
            ta: 'சுட்டிவிதிகளும் மடக்கை விதிகளும்',
          },
          weight: 1,
        },
        { name: { en: 'Inequalities', si: 'අසමානතා', ta: 'சமனிலிகள்' }, weight: 3 },
        {
          name: {
            en: 'Quadratic functions and equations',
            si: 'වර්ගජ ශ්‍රිත සහ වර්ගජ සමීකරණ',
            ta: 'இருபடிச் சார்புகளும் சமன்பாடுகளும்',
          },
          weight: 2,
        },
      ],
    },
    {
      name: { en: 'Trigonometry', si: 'ත්‍රිකෝණමිතිය', ta: 'திரிகோணகணிதம்' },
      grade: 12,
      topics: [
        { name: { en: 'Angular measurements', si: 'කෝණ මිනුම්', ta: 'கோண அளவீடு' }, weight: 2 },
        { name: { en: 'Circular functions', si: 'වෘත්ත ශ්‍රිත', ta: 'வட்டச் சார்புகள்' }, weight: 4 },
        {
          name: {
            en: 'Trigonometric identities',
            si: 'ත්‍රිකෝණමිතික සර්වසාම්‍ය',
            ta: 'திரிகோண கணித சர்வ சமன்பாடுகள்',
          },
          weight: 4,
        },
        {
          name: {
            en: 'Solving trigonometric equations',
            si: 'ත්‍රිකෝණමිතික සමීකරණ විසඳීම',
            ta: 'திரிகோண கணித சமன்பாடுகளின் தீர்வுகள்',
          },
          weight: 1,
        },
        {
          name: {
            en: 'Sine rule and cosine rule',
            si: 'සයින් නීතිය සහ කොසයින් නීතිය',
            ta: 'சைன் விதியும் கோசைன் விதியும்',
          },
          weight: 2,
        },
        {
          name: {
            en: 'Inverse trigonometric functions',
            si: 'ප්‍රතිලෝම ත්‍රිකෝණමිතික ශ්‍රිත',
            ta: 'நேர்மாறு திரிகோண கணிதச் சார்புகள்',
          },
          weight: 3,
        },
      ],
    },
    {
      name: { en: 'Calculus', si: 'කලනය', ta: 'நுண்கணிதம்' },
      topics: [
        { name: { en: 'Limits', si: 'සීමා', ta: 'எல்லைகள்' }, weight: 8 },
        { name: { en: 'Derivatives', si: 'ව්‍යුත්පන්න', ta: 'பெறுதிகள்' }, weight: 8 },
        {
          name: { en: 'Applications of derivatives', si: 'ව්‍යුත්පන්නවල භාවිත', ta: 'பெறுதியின் பிரயோகங்கள்' },
          weight: 4,
        },
        { name: { en: 'Integration', si: 'අනුකලනය', ta: 'தொகையீடு' }, weight: 9 },
      ],
    },
    {
      name: { en: 'Coordinate Geometry', si: 'ඛණ්ඩාංක ජ්‍යාමිතිය', ta: 'ஆள்கூற்று வடிவகணிதம்' },
      topics: [
        {
          name: {
            en: 'Rectangular Cartesian system',
            si: 'සෘජුකෝණාශ්‍ර කාටිසීය පද්ධතිය',
            ta: 'செவ்வகத் தெக்காட்டுத் தொகுதி',
          },
          weight: 2,
        },
        { name: { en: 'The straight line', si: 'සරල රේඛාව', ta: 'நேர்கோடு' }, weight: 5 },
        { name: { en: 'The circle', si: 'වෘත්තය', ta: 'வட்டம்' }, weight: 6 },
      ],
    },
    {
      name: {
        en: 'Series, Counting and Complex Numbers',
        si: 'ශ්‍රේණි, ගණන් කිරීම සහ සංකීර්ණ සංඛ්‍යා',
        ta: 'தொடர்கள், எண்ணல் மற்றும் சிக்கலெண்கள்',
      },
      grade: 13,
      topics: [
        {
          name: { en: 'Mathematical induction', si: 'ගණිත අභ්‍යුහන මූලධර්මය', ta: 'கணிதத் தொகுத்தறிமுறை' },
          weight: 1,
        },
        { name: { en: 'Series', si: 'ශ්‍රේණි', ta: 'தொடர்கள்' }, weight: 4 },
        {
          name: {
            en: 'Permutations and combinations',
            si: 'සංකරණ හා සංයෝජන',
            ta: 'வரிசை மாற்றமும் சேர்மானமும்',
          },
          weight: 5,
        },
        { name: { en: 'Binomial expansion', si: 'ද්විපද ප්‍රසාරණය', ta: 'ஈருறுப்பு விரிவு' }, weight: 3 },
        { name: { en: 'Complex numbers', si: 'සංකීර්ණ සංඛ්‍යා', ta: 'சிக்கலெண்கள்' }, weight: 7 },
        { name: { en: 'Matrices', si: 'න්‍යාස', ta: 'தாயங்கள்' }, weight: 4 },
      ],
    },
    {
      name: { en: 'Vectors and Statics', si: 'දෛශික සහ ස්ථිති විද්‍යාව', ta: 'காவிகளும் நிலையியலும்' },
      topics: [
        { name: { en: 'Vectors', si: 'දෛශික', ta: 'காவிகள்' }, weight: 4 },
        {
          name: {
            en: 'Coplanar forces acting at a point',
            si: 'ලක්ෂ්‍යයක දී ක්‍රියා කරන ඒකතල බල',
            ta: 'புள்ளியொன்றில் தாக்கும் ஒரு தள விசைகள்',
          },
          weight: 3,
        },
        {
          name: {
            en: 'Coplanar forces on a rigid body',
            si: 'දෘඪ වස්තුවක් මත ක්‍රියා කරන ඒකතල බල',
            ta: 'விறைப்பான உடலில் தாக்கும் ஒரு தள விசைகள்',
          },
          weight: 4,
        },
        {
          name: {
            en: 'Equilibrium of three coplanar forces',
            si: 'ඒකතල බල තුනක සමතුලිතතාව',
            ta: 'மூன்று ஒரு தள விசைகளின் சமநிலை',
          },
          weight: 1,
        },
        { name: { en: 'Friction', si: 'ඝර්ෂණය', ta: 'உராய்வு' }, weight: 1 },
        { name: { en: 'Jointed rods', si: 'සන්ධි කළ දඬු', ta: 'மூட்டிய கோல்கள்' }, weight: 1 },
        { name: { en: 'Frameworks', si: 'රාමුසැකිලි', ta: 'சட்டப்படல்கள்' }, weight: 1 },
        { name: { en: 'Centre of mass', si: 'ස්කන්ධ කේන්ද්‍රය', ta: 'திணிவு மையம்' }, weight: 6 },
      ],
    },
    {
      name: { en: 'Dynamics', si: 'ගති විද්‍යාව', ta: 'இயங்கியல்' },
      topics: [
        {
          name: { en: 'Motion in a straight line', si: 'සරල රේඛාවක් ඔස්සේ චලිතය', ta: 'நேர்கோட்டு இயக்கம்' },
          weight: 3,
        },
        { name: { en: 'Relative motion', si: 'සාපේක්ෂ චලිතය', ta: 'சார்பு இயக்கம்' }, weight: 3 },
        { name: { en: 'Projectiles', si: 'ප්‍රක්ෂිප්ත', ta: 'எறியம்' }, weight: 1 },
        {
          name: {
            en: "Newton's laws of motion",
            si: 'චලිතය පිළිබඳ නිව්ටන් නියම',
            ta: 'நியூட்டனின் இயக்க விதிகள்',
          },
          weight: 1,
        },
        {
          name: { en: 'Work, power and energy', si: 'කාර්ය, ක්ෂමතාව සහ ශක්තිය', ta: 'வேலை, வலு மற்றும் சக்தி' },
          weight: 2,
        },
        {
          name: { en: 'Impulse and collisions', si: 'ආවේගය සහ ගැටුම්', ta: 'கணத்தாக்கலும் மோதல்களும்' },
          weight: 3,
        },
        { name: { en: 'Circular motion', si: 'වෘත්ත චලිතය', ta: 'வட்ட இயக்கம்' }, weight: 3 },
        {
          name: { en: 'Simple harmonic motion', si: 'සරල අනුවර්තී චලිතය', ta: 'எளிய இசையியக்கம்' },
          weight: 3,
        },
      ],
    },
    {
      name: { en: 'Probability and Statistics', si: 'සම්භාවිතාව සහ සංඛ්‍යානය', ta: 'நிகழ்தகவும் புள்ளிவிபரவியலும்' },
      grade: 13,
      topics: [
        { name: { en: 'Probability', si: 'සම්භාවිතාව', ta: 'நிகழ்தகவு' }, weight: 5 },
        { name: { en: 'Statistics', si: 'සංඛ්‍යානය', ta: 'புள்ளிவிபரவியல்' }, weight: 9 },
      ],
    },
  ],
});
