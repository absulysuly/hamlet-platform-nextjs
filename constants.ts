import { User, UserRole, Post, Event, Article, Debate, GovernorateInfo, Governorate, TeaHouseTopic, TeaHouseMessage, Language, MessageType } from './types.ts';

// --- GOVERNORATE DATA (Single Source of Truth) ---
export const IRAQI_GOVERNORATES_INFO: GovernorateInfo[] = [
  { id: 1, name: 'بغداد', enName: 'Baghdad', slug: 'baghdad', region: 'central' },
  { id: 2, name: 'البصرة', enName: 'Basra', slug: 'basra', region: 'south' },
  { id: 3, name: 'نينوى', enName: 'Nineveh', slug: 'ninawa', region: 'north' },
  { id: 4, name: 'أربيل', enName: 'Erbil', slug: 'erbil', region: 'north' },
  { id: 5, name: 'الأنبار', enName: 'Anbar', slug: 'anbar', region: 'west' },
  { id: 6, name: 'ذي قار', enName: 'Dhi Qar', slug: 'dhiqar', region: 'south' },
  { id: 7, name: 'صلاح الدين', enName: 'Salah al-Din', slug: 'salahaddin', region: 'north' },
  { id: 8, name: 'ديالى', enName: 'Diyala', slug: 'diyala', region: 'central' },
  { id: 9, name: 'كركوك', enName: 'Kirkuk', slug: 'kirkuk', region: 'north' },
  { id: 10, name: 'السليمانية', enName: 'Sulaymaniyah', slug: 'sulaymaniyah', region: 'north' },
  { id: 11, name: 'بابل', enName: 'Babil', slug: 'babel', region: 'central' },
  { id: 12, name: 'واسط', enName: 'Wasit', slug: 'wasit', region: 'central' },
  { id: 13, name: 'ميسان', enName: 'Maysan', slug: 'maysan', region: 'south' },
  { id: 14, name: 'المثنى', enName: 'Muthanna', slug: 'muthanna', region: 'south' },
  { id: 15, name: 'القادسية', enName: 'Qadisiyyah', slug: 'qadisiyah', region: 'south' },
  { id: 16, name: 'النجف', enName: 'Najaf', slug: 'najaf', region: 'central' },
  { id: 17, name: 'كربلاء', enName: 'Karbala', slug: 'karbala', region: 'central' },
  { id: 18, name: 'دهوك', enName: 'Dohuk', slug: 'duhok', region: 'north' }
];

// --- Derived Governorate Constants ---
export const GOVERNORATES = IRAQI_GOVERNORATES_INFO.map(g => g.enName);
export const GOVERNORATE_AR_MAP: Record<Governorate, string> = Object.fromEntries(
    IRAQI_GOVERNORATES_INFO.map(g => [g.enName, g.name])
) as Record<Governorate, string>;
export const GOVERNORATE_SLUG_MAP: Record<Governorate, string> = Object.fromEntries(
    IRAQI_GOVERNORATES_INFO.map(g => [g.enName, g.slug])
) as Record<Governorate, string>;

// --- SLUG MAPPINGS ---
export const PARTY_SLUG_MAP: Record<string, string> = {
    'الحزب الاشتراكي الديمقراطي الكوردستاني': 'kurdistan-socialist-democratic-party',
    'الاتحاد الوطني الكوردستاني': 'patriotic-union-of-kurdistan',
    'تيار الموقف الوطني / هه لويست': 'national-position-current',
    'جبهة شعبنا / به روى گه له مان': 'our-peoples-front',
    'الجبهة التركمانية العراقية': 'iraqi-turkmen-front',
    'الحزب الديمقراطي الكوردستاني': 'kurdistan-democratic-party',
    'الاتحاد الإسلامي الكوردستاني': 'kurdistan-islamic-union',
    'جماعة العدل الكوردستانية / العراق': 'kurdistan-justice-group',
    'حراك الجيل الجديد': 'new-generation-movement',
    'حزب العمران': 'umran-party',
    'تحالف الانبار هويتنا': 'anbar-is-our-identity-alliance',
    'تحالف سيادة الوطني - تشريع': 'national-sovereignty-alliance',
    'الانتشار الوطني': 'national-dissemination',
    'حزب تقدم': 'taqadum-party',
    'تحالف عزم العراق / عزم': 'azm-alliance-iraq',
    'القيادة': 'al-qiyada',
    'تحالف التفوق': 'tafawuq-alliance',
    'الجسم الوطني': 'al-jism-al-watani',
    'تحالف قمم': 'qimam-alliance',
    'حركة الصادقون': 'al-sadiqoun-movement',
    'ائتلاف الاعمار والتنمية': 'reconstruction-and-development-coalition',
    'ائتلاف الأساس العراق': 'al-asas-al-iraqi-coalition',
    'التيار الوطني العشائري في العراق': 'national-tribal-current-of-iraq',
    'تجمع الفاو زاخو': 'fao-zakho-gathering',
    'منظمة بدر': 'badr-organization',
    'ابشر يا عراق': 'absher-ya-iraq',
    'تحالف قوى الدولة الوطنية': 'alliance-of-national-state-forces',
    'ائتلاف دولة القانون': 'state-of-law-coalition',
    'التحالف المدني الديمقراطي': 'civil-democratic-alliance',
    'حزب الداعي': 'al-daie-party',
    'تحالف البديل': 'al-badil-alliance',
    'منقذون': 'munqithun',
    'حركة حقوق': 'huqooq-movement',
    'تحالف تصميم': 'tasmeem-alliance',
    'تحالف خدمات': 'khadamat-alliance',
    'حركة سومريون': 'sumeriyon-movement',
    'اشراقة كانون': 'ishraqat-kanoon',
    'تيار قضيتنا': 'qadhiyatuna-current',
    'Independent': 'independent',
};


// Reverse maps for display purposes on discover page
export const SLUG_PARTY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(PARTY_SLUG_MAP).map(([name, slug]) => [slug, name])
);

export const SLUG_GOVERNORATE_MAP: Record<string, string> = Object.fromEntries(
  IRAQI_GOVERNORATES_INFO.map(g => [g.slug, g.enName])
);

// --- MOCK DATA GENERATION ---
const MOCK_USERS: User[] = [];
const MOCK_POSTS: Post[] = [];
const MOCK_WHISPERS: Post[] = [];
const MOCK_EVENTS: Event[] = [];
const MOCK_ARTICLES: Article[] = [];
const MOCK_DEBATES: Debate[] = [];
const MOCK_TEA_HOUSE_TOPICS: TeaHouseTopic[] = [];
const MOCK_TEA_HOUSE_MESSAGES: { [topicId: string]: TeaHouseMessage[] } = {};

// Helper function to get a random item from an array
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- Data for Generation ---
const maleNames = ['محمد', 'علي', 'أحمد', 'حسن', 'حسين', 'عبدالله', 'عمر', 'مصطفى', 'يوسف', 'خالد'];
const femaleNames = ['فاطمة', 'زينب', 'مريم', 'نور', 'هدى', 'آية', 'سارة', 'إيمان', 'رقية', 'شهد'];
const lastNames = ['الساعدي', 'الجبوري', 'التميمي', 'المالكي', 'الدليمي', 'الشمري', 'العامري', 'الكعبي', 'الزبيدي', 'العبيدي'];
const parties = Object.keys(PARTY_SLUG_MAP);

// --- Content Templates ---
const bioTemplates = [
    "مرشح ملتزم بخدمة مجتمعي. أهدف إلى تحسين البنية التحتية والخدمات العامة.",
    "أعمل من أجل مستقبل أفضل للجميع. تركيزي على التعليم والصحة.",
    "سياسي متمرس يتمتع بخبرة واسعة في الحكم المحلي. أسعى لتحقيق الشفافية والمساءلة.",
    "ناشط مجتمعي متحمس للقضايا الاجتماعية والعدالة. أؤمن بقوة العمل الجماعي.",
    "رجل أعمال ناجح يتطلع إلى تطبيق مبادئ العمل في السياسة لتحقيق الكفاءة والنمو.",
    "أستاذ جامعي متخصص في العلوم السياسية. أرغب في جلب رؤى قائمة على الأدلة إلى حكومتنا.",
    "طبيب مكرس لتحسين نظام الرعاية الصحية في العراق. الصحة أولاً.",
    "محامٍ يدافع عن حقوق المواطنين. أسعى لتعزيز سيادة القانون.",
    "مهندس أهدف إلى إعادة بناء وتحديث البنية التحتية الحيوية في البلاد.",
    "قائد شاب برؤية جديدة للعراق. أركز على تمكين الشباب والابتكار.",
    "أؤمن بأهمية التنمية الاقتصادية المستدامة لخلق فرص عمل جديدة.",
    "أسعى لتعزيز الأمن والاستقرار في جميع أنحاء البلاد.",
];
const femaleBioTemplates = [
    ...bioTemplates,
    "أم ومربية أجيال، أؤمن بأهمية الأسرة في بناء مجتمع قوي ومترابط.",
    "ناشطة في حقوق المرأة، أعمل لتمكين النساء سياسياً واقتصادياً في العراق.",
    "أهدف إلى ضمان وصول جميع الأطفال، وخاصة الفتيات، إلى تعليم جيد وآمن.",
    "سيدة أعمال أسعى لدعم رائدات الأعمال وتوفير بيئة عمل مشجعة للنساء.",
];

const postTemplates = {
    Post: [
        "قمت اليوم بزيارة {location} لمناقشة احتياجات المجتمع المحلي. الحوار المفتوح هو مفتاح التقدم.",
        "نعمل بجد على مشروع {project} لتعزيز الخدمات في {governorate}. التفاصيل قريباً!",
        "التقيت بمجموعة من الشباب الواعدين اليوم. طاقاتهم وأفكارهم هي أمل العراق.",
        "يجب أن تكون أولويتنا هي {priority}. لا يمكننا بناء مستقبل قوي بدون أساس متين.",
        "أشكر كل من حضر لقاءنا الجماهيري في {location}. دعمكم هو الدافع لنا للاستمرار.",
        "تم افتتاح {project} الجديد اليوم، وهو خطوة مهمة نحو تحسين حياة المواطنين.",
        "تحدثت اليوم عن أهمية {topic} في بناء اقتصاد قوي ومستدام.",
        "التعليم هو حجر الزاوية لمستقبلنا. يجب أن نستثمر في مدارسنا وجامعاتنا.",
        "الرعاية الصحية حق للجميع. سنعمل على تطوير المستشفيات والمراكز الصحية.",
        "معالجة أزمة الكهرباء تتطلب حلولاً جذرية ومستدامة. لدينا خطة واضحة لذلك.",
    ],
    Reel: [
        "لقطات من جولتنا اليوم في سوق {location}. الناس هم مصدر إلهامنا.",
        "رسالة سريعة حول خططنا لـ {topic}. معاً يمكننا تحقيق التغيير.",
        "أبرز مقتطفات من كلمتي في مؤتمر {event}. #العراق_أولاً",
        "شاهدوا تقدم العمل في مشروع {project}. نعدكم بالإنجاز.",
    ],
};
const whisperTemplates = [
    "Just concluded a successful meeting with local business owners. Their insights are invaluable for our economic recovery plan.",
    "The youth are the future. We must invest in education and provide them with opportunities to thrive.",
    "Transparency and accountability are not just slogans; they are the pillars of good governance.",
    "Attending the provincial council session today. Key items on the agenda: infrastructure and public services.",
    "A quick thought: true progress is measured by the well-being of the most vulnerable in our society."
];
const placeholders = {
    location: ['سوق الشورجة', 'شارع المتنبي', 'مستشفى اليرموك', 'جامعة بغداد', 'مول المنصور'],
    project: ['تأهيل شبكة الكهرباء', 'بناء مدرسة جديدة', 'تطوير المركز الصحي', 'تعبيد الطرق الرئيسية'],
    governorate: GOVERNORATES,
    priority: ['مكافحة الفساد', 'توفير فرص العمل', 'تحسين الخدمات العامة', 'تعزيز الأمن'],
    topic: ['الإصلاح الاقتصادي', 'السياسة الخارجية', 'قطاع الطاقة', 'الزراعة'],
    event: ['الشباب', 'التنمية المستدامة', 'المرأة العراقية']
};

// --- Generator Functions ---
const generateCandidates = (count: number) => {
    for (let i = 0; i < count; i++) {
        const gender: 'Male' | 'Female' = Math.random() > 0.3 ? 'Male' : 'Female';
        const firstName = getRandom(gender === 'Male' ? maleNames : femaleNames);
        const name = `${firstName} ${getRandom(lastNames)}`;
        const governorate = getRandom(GOVERNORATES);
        const party = getRandom(parties);
        const id = `user-${MOCK_USERS.length + 1}`;
        MOCK_USERS.push({
            id,
            name,
            role: UserRole.Candidate,
            avatarUrl: `https://i.pravatar.cc/150?u=${id}`,
            verified: Math.random() > 0.3,
            party,
            governorate,
            isElected: Math.random() > 0.9 ? true : false,
            bio: getRandom(gender === 'Female' ? femaleBioTemplates : bioTemplates),
            partySlug: PARTY_SLUG_MAP[party],
            governorateSlug: GOVERNORATE_SLUG_MAP[governorate],
            gender,
        });
    }
};

const generatePosts = (count: number) => {
    const candidates = MOCK_USERS.filter(u => u.role === UserRole.Candidate);
    if (candidates.length === 0) return;

    for (let i = 0; i < count; i++) {
        const author = getRandom(candidates);
        const type: Post['type'] = getRandom(['Post', 'Post', 'Post', 'Reel']);
        let contentTemplate = getRandom(postTemplates[type]);
        
        Object.keys(placeholders).forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            // @ts-ignore
            contentTemplate = contentTemplate.replace(regex, () => getRandom(placeholders[key]));
        });

        let mediaUrl: string | undefined;
        const hasMedia = Math.random() > 0.4;

        if (hasMedia) {
            switch (type) {
                case 'Post':
                    mediaUrl = `https://picsum.photos/seed/${i}/600/400`;
                    break;
                case 'Reel':
                    // Using a common public domain video for mock reels
                    mediaUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                    break;
                default:
                    mediaUrl = undefined;
            }
        }

        MOCK_POSTS.push({
            id: `post-${i + 1}`,
            author,
            content: contentTemplate,
            timestamp: `${Math.floor(Math.random() * 24)}h ago`,
            likes: Math.floor(Math.random() * 2000),
            comments: Math.floor(Math.random() * 300),
            shares: Math.floor(Math.random() * 150),
            type,
            mediaUrl,
            isSponsored: Math.random() > 0.9 ? true : false,
        });
    }
};

const generateWhispers = (count: number) => {
    const users = MOCK_USERS.slice(0, 20); // Use a variety of users
    for(let i = 0; i < count; i++) {
        MOCK_WHISPERS.push({
            id: `whisper-${i+1}`,
            author: getRandom(users),
            content: getRandom(whisperTemplates),
            timestamp: `${Math.floor(Math.random() * 10) + 1}h ago`,
            likes: Math.floor(Math.random() * 500),
            comments: Math.floor(Math.random() * 50),
            shares: Math.floor(Math.random() * 20),
            type: 'Post', // Reusing Post type, the key is no mediaUrl
        });
    }
}

const generateEvents = (count: number) => {
    const candidates = MOCK_USERS.filter(u => u.role === UserRole.Candidate);
    if (candidates.length === 0) return;

    const eventTitles = ['لقاء جماهيري', 'ندوة حول الاقتصاد', 'افتتاح مشروع خدمي', 'اجتماع مع شيوخ العشائر', 'حملة توعية صحية'];
    for (let i = 0; i < count; i++) {
        const organizer = getRandom(candidates);
        MOCK_EVENTS.push({
            id: `event-${i + 1}`,
            title: getRandom(eventTitles),
            date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            location: `${getRandom(placeholders.location)}, ${organizer.governorate}`,
            organizer,
        });
    }
};

const generateArticles = (count: number) => {
    const sources = ['وكالة الأنباء العراقية', 'جريدة الصباح', 'قناة الشرقية', 'قناة السومرية'];
    const articleTitles = [
        'تحليل: مستقبل الطاقة في العراق بعد الاكتشافات الجديدة',
        'البرلمان يناقش ميزانية 2025 وسط تحديات اقتصادية',
        'خبراء يدعون إلى إصلاحات هيكلية في النظام المصرفي',
        'تقرير يسلط الضوء على التقدم في إعادة إعمار المناطق المحررة',
    ];
    for (let i = 0; i < count; i++) {
        MOCK_ARTICLES.push({
            id: `article-${i + 1}`,
            title: getRandom(articleTitles),
            source: getRandom(sources),
            timestamp: `${i + 1}d ago`,
            authorName: getRandom(maleNames) + ' ' + getRandom(lastNames),
            contentSnippet: 'هذا النص هو مقتطف من المقال الكامل الذي يناقش التطورات الأخيرة وتأثيرها على المشهد السياسي والاقتصادي في البلاد...',
            url: '#',
        });
    }
};

const generateDebates = (count: number) => {
    const candidates = MOCK_USERS.filter(u => u.role === UserRole.Candidate);
    if (candidates.length < 2) return;
    const debateTopics = ['مستقبل العلاقات الخارجية للعراق', 'استراتيجيات مكافحة البطالة', 'أزمة المياه والحلول الممكنة', 'إصلاح قطاع التعليم'];
    for (let i = 0; i < count; i++) {
        const participants = [getRandom(candidates), getRandom(candidates.filter(c => c.id !== candidates[0].id))];
        MOCK_DEBATES.push({
            id: `debate-${i+1}`,
            title: `مناظرة حول ${getRandom(debateTopics)}`,
            topic: getRandom(debateTopics),
            scheduledTime: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
            isLive: Math.random() > 0.8,
            participants,
            reactions: { justice: 0, idea: 0, warning: 0 }
        });
    }
};

const generateTeaHouseTopicsAndMessages = () => {
  const topics: TeaHouseTopic[] = [
    { id: '1', title: 'أزمة الكهرباء في بغداد', lastMessage: 'نحتاج إلى حلول جذرية...', participants: 125, lastActivity: '5m ago', language: 'ar' },
    { id: '2', 'title': 'فرص العمل للشباب في البصرة', lastMessage: 'يجب على الشركات المحلية توظيف المزيد...', participants: 88, lastActivity: '22m ago', language: 'ar' },
    { id: '3', 'title': 'Kêşeya avê li Hewlêrê', lastMessage: 'Divê em çareseriyên nûjen bibînin...', participants: 45, lastActivity: '1h ago', language: 'ku' },
    { id: '4', 'title': 'Reforming the education system', lastMessage: 'We need to focus on teacher training.', participants: 32, lastActivity: '3h ago', language: 'en' },
  ];
  MOCK_TEA_HOUSE_TOPICS.push(...topics);

  const voter = { id: 'voter-1', name: 'ناخب عراقي', role: UserRole.Voter, avatarUrl: 'https://i.pravatar.cc/150?u=voter-1', verified: false, party: 'Independent', governorate: 'Baghdad' as Governorate };
  if (!MOCK_USERS.some(u => u.id === voter.id)) {
      MOCK_USERS.push(voter);
  }

  MOCK_TEA_HOUSE_MESSAGES['1'] = [
    { id: 'm1-1', author: getRandom(MOCK_USERS.filter(u => u.role === UserRole.Candidate)), type: 'text', content: 'أهلاً بالجميع. أزمة الكهرباء هي أولويتنا القصوى.', timestamp: '1h ago' },
    { id: 'm1-2', author: voter, type: 'text', content: 'سمعنا هذا الكلام كثيراً. ما هي خطتكم الفعلية؟', timestamp: '58m ago' },
  ];
  MOCK_TEA_HOUSE_MESSAGES['2'] = [
      { id: 'm2-1', author: getRandom(MOCK_USERS.filter(u => u.role === UserRole.Candidate)), type: 'text', content: 'يجب دعم المشاريع الصغيرة لخلق فرص عمل.', timestamp: '30m ago' },
  ];
};

// --- Initial Data Population ---
if (MOCK_USERS.length === 0) {
    // Add a default voter user
    MOCK_USERS.push({ id: 'user-0', name: 'Ali Ahmed', role: UserRole.Voter, avatarUrl: 'https://i.pravatar.cc/150?u=user-0', verified: false, party: 'Independent', governorate: 'Baghdad', gender: 'Male' });
    generateCandidates(100);
    generatePosts(200);
    generateEvents(20);
    generateArticles(15);
    generateDebates(10);
    generateTeaHouseTopicsAndMessages();
    generateWhispers(50);
}

export { MOCK_USERS, MOCK_POSTS, MOCK_WHISPERS, MOCK_EVENTS, MOCK_ARTICLES, MOCK_DEBATES, MOCK_TEA_HOUSE_TOPICS, MOCK_TEA_HOUSE_MESSAGES };