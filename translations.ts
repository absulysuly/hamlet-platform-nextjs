import { Language } from './types.ts';

type Translations = {
    [key in Language]: {
        appName: string;
        social: string;
        serious: string;
        whoToFollow: string;
        platformRules: string;
        rule1: string;
        rule2: string;
        rule3: string;
        rule4: string;
        welcomeToApp: string;
        chooseYourRole: string;
        iAmVoter: string;
        voterDescription: string;
        iAmCandidate: string;
        candidateDescription: string;
        teaHouse: string;
        teaHouseFooter: string;
        register: string;
        fullName: string;
        emailAddress: string;
        createAccount: string;
        registerAsVoter: string;
        registerAsCandidate: string;
        back: string;
        saveDraft: string;
        preview: string;
        privacy: string;
        public: string;
        friends: string;
        private: string;
        notifications: string;
        registerAsCandidateButton: string;
        boostedPost: string;
        home: string;
        feed: string;
        real: string;
        candidates: string;
        whisper: string;
        women: string;
        minorities: string;
        components: string;
        debates: string;
        analytics: string;
        myProfile: string;
        events: string;
        articles: string;
        search: string;
        dashboard: string;
        settings: string;
        backToSocial: string;
        electionPortal: string;
        governorate: string;
        allIraq: string;
        party: string;
        gender: string;
        male: string;
        female: string;
        all: string;
        whatsOnYourMind: string;
        post: string;
        loading: string;
        noPostsFound: string;
        translating: string;
        showOriginal: string;
        showTranslation: string;
        reportPost: string;
        like: string;
        comment: string;
        share: string;
        generating: string;
        portal: string;
        electionCandidates: string;
        electionData: string;
        resources: string;
        signInWithGoogle: string;
        signInWithFacebook: string;
        orContinueWithEmail: string;
        verifyYourEmail: string;
        verificationSentMessage: string;
        didNotReceiveEmail: string;
        resendVerificationEmail: string;
        emailResent: string;
        checkVerification: string;
        continueToApp: string;
        electionCountdownTitle: string;
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
        follow: string;
        following: string;
        shareLinkCopied: string;
        shareNotSupported: string;
        socialLoginFailed: string;
        registrationFailed: string;
        emailNotVerified: string;
        draftSaved: string;
        previewingPost: string;
        speechRecognitionNotSupported: string;
        accessDenied: string;
        downloadQrFailed: string;
        unlink: string;
        link: string;
        myPosts: string;
        loadingPosts: string;
        noPostsYet: string;
        promoTools: string;
        promoToolsDesc: string;
        scanToSee: string;
        downloadQr: string;
        socialConnections: string;
        socialConnectionsDesc: string;
        notACandidate: string;
        noBio: string;
        postsBy: string; 
        noPostsYetCandidate: string;
        loadingReels: string;
        noReelsFound: string;
        filterByCandidate: string;
        clearSelection: string;
        loadingDebates: string;
        noDebatesFound: string;
        joinLiveDebate: string;
        setReminder: string;
        upcomingEvents: string;
        loadingEvents: string;
        noEventsScheduled: string;
        rsvp: string;
        loadingStories: string;
        noStories: string;
        discussionsInLang: string;
        createNewDiscussion: string;
        noDiscussionsFound: string;
        typeAMessage: string;
        createNewDiscussionTitle: string;
        topicTitle: string;
        topicTitlePlaceholder: string;
        category: string;
        mainLanguage: string;
        firstMessage: string;
        firstMessagePlaceholder: string;
        create: string;
        editProfile: string;
        avatarUrl: string;
        avatarUrlPlaceholder: string;
        name: string;
        biography: string;
        cancel: string;
        saveChanges: string;
        myWall: string;
        noPostsYetUser: string;
        noCandidatesToShow: string;
        electionDashboard: string;
        dashboardSubtitle: string;
        iraqiElections: string;
        electionYear: string;
        totalVoters: string;
        approvedCandidates: string;
        expectedTurnout: string;
        governorateStats: string;
        electionTimeline: string;
        timeline: {
            voterRegistration: string;
            candidateDeadline: string;
            campaignPeriod: string;
            electionDay: string;
        };
        table: {
            governorate: string;
            turnout: string;
            status: string;
        };
        status: {
            active: string;
            medium: string;
        };
        integrityHubTitle: string;
        integrityHubDesc: string;
        reportDetails: string;
        reportType: string;
        selectReportType: string;
        reportTypes: {
            buying_votes: string;
            propaganda_violation: string;
            voter_intimidation: string;
            misinformation: string;
            other: string;
        };
        violationDesc: string;
        violationDescPlaceholder: string;
        attachEvidence: string;
        submitReport: string;
        submitting: string;
        confidentialNotice: string;
        submissionSuccess: string;
        trackingId: string;
        submissionThanks: string;
        submitNewReport: string;
        submissionError: string;
        networkError: string;
        intlPortalTitle: string;
        intlPortalDesc: string;
        apiAccess: string;
        apiAccessDesc: string;
        requestApiAccess: string;
        downloadReports: string;
        downloadReportsDesc: string;
        browseReports: string;
        observerResources: string;
        observerResourcesDesc: string;
        registerOrg: string;
        voterRegistrationTitle: string;
        voterRegistrationDesc: string;
        voterInfo: string;
        fullNameNationalId: string;
        nationalId: string;
        nationalIdHint: string;
        dob: string;
        selectGovernorate: string;
        selectYourGovernorate: string;
        registerButton: string;
        registrationSuccess: string;
        confirmationId: string;
        registerAnotherVoter: string;
        simulationNotice: string;
        discoverCandidates: string;
        discoverCandidatesDesc: string;
        loadingCandidates: string;
        noCandidatesFoundQR: string;
        viewProfile: string;
        accessibilityDisplay: string;
        highContrast: string;
        highContrastDesc: string;
        largeText: string;
        largeTextDesc: string;
        tts: string;
        ttsDesc: string;
        colorTheme: string;
        underConstruction: string;
        featureComingSoon: string;
        dataManagement: string;
        dataManagementDesc: string;
        apiConfig: string;
        apiConfigDesc: string;
        dataCollection: string;
        dataCollectionDesc: string;
        contactValidation: string;
        contactValidationDesc: string;
        candidateEnrichment: string;
        candidateEnrichmentDesc: string;
        qualityAnalytics: string;
        qualityAnalyticsDesc: string;
        mainDashboard: string;
        mainDashboardDesc: string;
        voterCenter: string;
        voterCenterDesc: string;
        candidateHub: string;
        candidateHubDesc: string;
        observerHub: string;
        observerHubDesc: string;
        lawCompliance: string;
        lawComplianceDesc: string;
        electionDataBig: string;
        electionDataDesc: string;
        supportResources: string;
        supportResourcesDesc: string;
        loginToVoterPortal: string;
        loginToCandidatePortal: string;
        empoweringWomenInPolitics: string;
    }
}

export const UI_TEXT: Translations = {
    en: {
        appName: 'Smart Campaign',
        social: 'Social Interaction',
        serious: 'Election Management',
        whoToFollow: 'Who to follow',
        platformRules: 'Platform Rules',
        rule1: 'Be respectful to others.',
        rule2: 'No hate speech or harassment.',
        rule3: 'Verify information before sharing.',
        rule4: 'Engage in constructive dialogue.',
        welcomeToApp: 'Welcome to {appName}',
        chooseYourRole: 'Choose your role to get started.',
        iAmVoter: 'I am a Voter',
        voterDescription: 'Follow candidates, join debates, and stay informed.',
        iAmCandidate: 'I am a Candidate',
        candidateDescription: 'Create posts, share your message, and engage with voters.',
        teaHouse: 'Tea House',
        teaHouseFooter: "People's Diwaniya",
        register: 'Register',
        fullName: 'Full Name',
        emailAddress: 'Email Address',
        createAccount: 'Create Account',
        registerAsVoter: 'Register as a Voter',
        registerAsCandidate: 'Register as a Candidate',
        back: 'Back',
        saveDraft: 'Save Draft',
        preview: 'Preview',
        privacy: 'Privacy',
        public: 'Public',
        friends: 'Friends',
        private: 'Private',
        notifications: 'Notifications',
        registerAsCandidateButton: 'Register as a Candidate',
        boostedPost: 'Boosted Post',
        home: 'Home',
        feed: 'Feed',
        real: 'Real',
        candidates: 'Candidates',
        whisper: 'Whisper',
        women: 'Women',
        minorities: 'Minorities',
        components: 'Components',
        debates: 'Debates',
        analytics: 'Analytics',
        myProfile: 'My Profile',
        events: 'Events',
        articles: 'Articles',
        search: 'Search...',
        dashboard: 'Dashboard',
        settings: 'Settings',
        backToSocial: 'Back to Social',
        electionPortal: 'Election Portal',
        governorate: 'Governorate',
        allIraq: 'All of Iraq',
        party: 'Party',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        all: 'All',
        whatsOnYourMind: "What's on your mind?",
        post: 'Post',
        loading: 'Loading...',
        noPostsFound: 'No posts found for the selected filters.',
        translating: 'Translating...',
        showOriginal: 'Show original',
        showTranslation: 'Show translation',
        reportPost: 'Report Post',
        like: 'Like',
        comment: 'Comment',
        share: 'Share',
        generating: 'Generating...',
        portal: 'Portal',
        electionCandidates: 'Candidates',
        electionData: 'Data',
        resources: 'Resources',
        signInWithGoogle: 'Sign in with Google',
        signInWithFacebook: 'Sign in with Facebook',
        orContinueWithEmail: 'Or continue with email',
        verifyYourEmail: 'Verify Your Email',
        verificationSentMessage: 'A verification link has been sent to your email address. Please click the link to activate your account.',
        didNotReceiveEmail: "Didn't receive the email?",
        resendVerificationEmail: 'Resend verification email',
        emailResent: 'A new verification email has been sent!',
        checkVerification: "I've verified my email",
        continueToApp: 'Continue to App',
        electionCountdownTitle: 'Time until Election',
        days: 'Days',
        hours: 'Hrs',
        minutes: 'Mins',
        seconds: 'Secs',
        follow: 'Follow',
        following: 'Following',
        shareLinkCopied: 'Link to post copied to clipboard!',
        shareNotSupported: 'Sharing is not supported on this browser.',
        socialLoginFailed: 'Social login failed. Please try again.',
        registrationFailed: 'Registration failed. Please try again.',
        emailNotVerified: 'Email not verified yet. Please check your inbox for the verification link.',
        draftSaved: 'Draft saved (simulation)!',
        previewingPost: 'Previewing post',
        speechRecognitionNotSupported: 'Speech recognition is not supported in this browser.',
        accessDenied: 'Access Denied. This page is for candidates only.',
        downloadQrFailed: 'Could not download QR code. Please try again.',
        unlink: 'Unlink',
        link: 'Link',
        myPosts: 'My Posts',
        loadingPosts: 'Loading posts...',
        noPostsYet: 'You have not posted yet.',
        promoTools: 'Promotional Tools',
        promoToolsDesc: 'Use this QR code on posters and flyers to direct voters to a page with all your party’s candidates in this governorate.',
        scanToSee: 'Scan to see your party candidates!',
        downloadQr: 'Download QR Code',
        socialConnections: 'Social Connections',
        socialConnectionsDesc: 'Link your social accounts to auto-share posts when you create content.',
        notACandidate: 'This profile is not a candidate.',
        noBio: 'This candidate has not provided a biography.',
        postsBy: 'Posts by {name}',
        noPostsYetCandidate: 'This candidate has not posted yet.',
        loadingReels: 'Loading Reels...',
        noReelsFound: 'No Reels available for the selected filters.',
        filterByCandidate: 'Filter by specific candidate...',
        clearSelection: 'Clear Selection',
        loadingDebates: 'Loading debates...',
        noDebatesFound: 'No debates found for the selected filters.',
        joinLiveDebate: 'Join Live Debate',
        setReminder: 'Set Reminder',
        upcomingEvents: 'Upcoming Events',
        loadingEvents: 'Loading events...',
        noEventsScheduled: 'No events scheduled for the selected filters.',
        rsvp: 'RSVP',
        loadingStories: 'Loading stories...',
        noStories: 'No stories for this user.',
        discussionsInLang: 'Discussions in your selected language.',
        createNewDiscussion: 'Create New Discussion',
        noDiscussionsFound: 'No discussions found for this language. Why not start one?',
        typeAMessage: 'Type a message...',
        createNewDiscussionTitle: 'Create New Discussion',
        topicTitle: 'Discussion Title',
        topicTitlePlaceholder: 'Example: The electricity crisis in Baghdad',
        category: 'Category',
        mainLanguage: 'Primary Language',
        firstMessage: 'First Message',
        firstMessagePlaceholder: 'Start the conversation here...',
        create: 'Create',
        editProfile: 'Edit Profile',
        avatarUrl: 'Avatar Image URL',
        avatarUrlPlaceholder: 'https://example.com/image.jpg',
        name: 'Name',
        biography: 'Biography',
        cancel: 'Cancel',
        saveChanges: 'Save Changes',
        myWall: 'My Wall',
        noPostsYetUser: "You haven't posted anything yet.",
        noCandidatesToShow: 'No candidates to show.',
        electionDashboard: 'Election Dashboard',
        dashboardSubtitle: 'لوحة بيانات الانتخابات',
        iraqiElections: 'Iraqi Parliamentary Elections',
        electionYear: '2025',
        totalVoters: 'Total Registered Voters',
        approvedCandidates: 'Approved Candidates',
        expectedTurnout: 'Expected Turnout',
        governorateStats: 'Governorate Statistics',
        electionTimeline: 'Election Timeline',
        timeline: {
            voterRegistration: 'Voter Registration Opens',
            candidateDeadline: 'Candidate Filing Deadline',
            campaignPeriod: 'Campaign Period Begins',
            electionDay: 'Election Day',
        },
        table: { governorate: 'Governorate', turnout: 'Expected Turnout', status: 'Status' },
        status: { active: 'Active', medium: 'Medium' },
        integrityHubTitle: 'Election Integrity Hub',
        integrityHubDesc: 'Report electoral violations confidentially and securely. Your voice helps ensure a fair election.',
        reportDetails: 'Report Details',
        reportType: 'Violation Type',
        selectReportType: 'Select violation type...',
        reportTypes: {
            buying_votes: 'Vote Buying',
            propaganda_violation: 'Campaign Propaganda Violation',
            voter_intimidation: 'Voter Intimidation',
            misinformation: 'Dissemination of Misinformation',
            other: 'Other',
        },
        violationDesc: 'Description of Violation',
        violationDescPlaceholder: 'Please provide a detailed description of the violation, including time, place, and people involved if possible.',
        attachEvidence: 'Attach Evidence (Image, Video, Document) - Optional',
        submitReport: 'Submit Report',
        submitting: 'Submitting...',
        confidentialNotice: 'All reports are confidential. Your personal information will not be shared.',
        submissionSuccess: 'Your report has been received successfully!',
        trackingId: 'Your report tracking ID is:',
        submissionThanks: 'Thank you for your contribution to maintaining the integrity of the electoral process. Our team will review the report.',
        submitNewReport: 'Submit a New Report',
        submissionError: 'An error occurred while submitting the report.',
        networkError: 'A network error occurred. Please try again.',
        intlPortalTitle: 'International Observer Portal',
        intlPortalDesc: 'Access real-time data, comprehensive reports, and resources to support electoral transparency and monitoring.',
        apiAccess: 'Real-time Data API',
        apiAccessDesc: 'Access structured, real-time election data including voter turnout, incident reports, and preliminary results.',
        requestApiAccess: 'Request API Access',
        downloadReports: 'Downloadable Reports',
        downloadReportsDesc: 'Download multilingual reports on candidate registration, electoral integrity, and media monitoring.',
        browseReports: 'Browse Reports',
        observerResources: 'Observer Resources & Briefings',
        observerResourcesDesc: 'Access legal frameworks, logistical information, and schedules for observer briefings. Register your organization to receive updates.',
        registerOrg: 'Register Organization',
        voterRegistrationTitle: 'Voter Registration',
        voterRegistrationDesc: 'Your vote matters. Make sure you are registered to participate in the upcoming elections.',
        voterInfo: 'Voter Information',
        fullNameNationalId: 'Full Name (as on National ID)',
        nationalId: 'National ID Number',
        nationalIdHint: 'Must be 12 digits',
        dob: 'Date of Birth',
        selectGovernorate: 'Governorate',
        selectYourGovernorate: 'Select your governorate...',
        registerButton: 'Register',
        registrationSuccess: 'You have been successfully registered!',
        confirmationId: 'Your registration confirmation ID is:',
        registerAnotherVoter: 'Register Another Voter',
        simulationNotice: 'This is a simulation process for demonstration purposes. No real data is stored.',
        discoverCandidates: 'Discover Candidates',
        discoverCandidatesDesc: "Scan a candidate's QR code to see all of their party's candidates running in the same governorate.",
        loadingCandidates: 'Loading candidates...',
        noCandidatesFoundQR: 'No candidates found for this party and governorate combination.',
        viewProfile: 'View Profile',
        accessibilityDisplay: 'Accessibility & Display',
        highContrast: 'High Contrast Mode',
        highContrastDesc: 'Increases text contrast for better readability.',
        largeText: 'Large Text',
        largeTextDesc: 'Increases the font size across the app.',
        tts: 'Text-to-Speech (TTS)',
        ttsDesc: "Enable 'Read Content' button on long posts.",
        colorTheme: 'Color Theme',
        underConstruction: 'Under Construction',
        featureComingSoon: 'This feature will be available here soon!',
        dataManagement: 'Data Management & Collection',
        dataManagementDesc: 'Tools for platform administrators to manage the data collection process and verify its quality.',
        apiConfig: 'API Settings',
        apiConfigDesc: 'Manage and test API connections to social media.',
        dataCollection: 'Data Collection Dashboard',
        dataCollectionDesc: 'Monitor and control the collection of candidate data.',
        contactValidation: 'Contact Validation',
        contactValidationDesc: 'Review the quality of collected contact data.',
        candidateEnrichment: 'Candidate Enrichment',
        candidateEnrichmentDesc: 'View enriched data and analytics for profiles.',
        qualityAnalytics: 'Quality Analytics',
        qualityAnalyticsDesc: 'Visualize data quality metrics across governorates.',
        mainDashboard: 'Main Dashboard',
        mainDashboardDesc: 'Click on any section to explore the available tools and resources.',
        voterCenter: 'Voter Center',
        voterCenterDesc: 'All resources for citizens to participate effectively.',
        candidateHub: 'Candidate Hub',
        candidateHubDesc: 'Tools to manage your digital campaign and submit documents.',
        observerHub: 'Observer Hub',
        observerHubDesc: 'Resources for local and international observers.',
        lawCompliance: 'Law & Compliance',
        lawComplianceDesc: 'Access laws, regulations, and reporting processes.',
        electionDataBig: 'Election Data',
        electionDataDesc: 'Explore live statistics and historical election data.',
        supportResources: 'Support & Resources',
        supportResourcesDesc: 'Find help guides and downloadable materials.',
        loginToVoterPortal: 'Login / Sign Up for Voters',
        loginToCandidatePortal: 'Login / Sign Up for Candidates',
        empoweringWomenInPolitics: 'A dedicated space to discover and support women candidates.',
    },
    ku: {
        appName: 'هەڵمەتی زیرەک',
        social: 'کارلێکی کۆمەڵایەتی',
        serious: 'بەڕێوەبردنی هەڵبژاردن',
        whoToFollow: 'کێ فۆڵۆ بکەیت',
        platformRules: 'ڕێنماییەکان',
        rule1: 'ڕێز لە کەسانی تر بگرە.',
        rule2: 'دووربە لە وتاری ڕق و گێچەڵی ئەلکترۆni.',
        rule3: 'پێش بڵاوکردنەوە، لە ڕاستی زانیارییەکان دڵنیابە.',
        rule4: 'بەشداری بکە لە گفتوگۆی بنیاتنەرانە.',
        welcomeToApp: 'بەخێربێن بۆ {appName}',
        chooseYourRole: 'ڕۆڵی خۆت هەڵبژێرە بۆ دەستپێکردن.',
        iAmVoter: 'من دەنگدەرم',
        voterDescription: 'فۆڵۆی کاندیدەکان بکە، بەشداری لە دیبەیتەکان بکە و ئاگادار بە.',
        iAmCandidate: 'من کاندیدم',
        candidateDescription: 'پۆست دروست بکە، پەیامەکەت بڵاوبکەرەوە و لەگەڵ دەنگدەران بەردەوام بە.',
        teaHouse: 'چایخانە',
        teaHouseFooter: 'دیوەخانی گەل',
        register: 'تۆمارکردن',
        fullName: 'ناوی تەواو',
        emailAddress: 'ئیمەیڵ',
        createAccount: 'هەژمار دروست بکە',
        registerAsVoter: 'تۆمارکردن وەک دەنگدەر',
        registerAsCandidate: 'تۆمارکردن وەک کاندید',
        back: 'گەڕانەوە',
        saveDraft: 'پاشەکەوتکردن وەک ڕەشنووس',
        preview: 'پێشبینین',
        privacy: 'تایبەتمەندی',
        public: 'گشتی',
        friends: 'هاوڕێیان',
        private: 'تایبەت',
        notifications: 'ئاگادارییەکان',
        registerAsCandidateButton: 'تۆمارکردن وەک کاندید',
        boostedPost: 'پۆستی سپۆنسەر',
        home: 'سەرەکی',
        feed: 'فیید',
        real: 'ڕیەڵ',
        candidates: 'کاندیدەکان',
        whisper: 'چرپە',
        women: 'ژنان',
        minorities: 'کەمینەکان',
        components: 'پێکهاتەکان',
        debates: 'گفتوگۆکان',
        analytics: 'شیکاری',
        myProfile: 'پرۆفایلی من',
        events: 'ڕووداوەکان',
        articles: 'وتارەکان',
        search: 'بگەڕێ...',
        dashboard: 'داشبۆرد',
        settings: 'ڕێکخستنەکان',
        backToSocial: 'گەڕانەوە بۆ کۆمەڵایەتی',
        electionPortal: 'پۆرتاڵی هەڵبژاردن',
        governorate: 'پارێزگا',
        allIraq: 'هەموو عێراق',
        party: 'پارت',
        gender: 'ڕەگەز',
        male: 'نێر',
        female: 'مێ',
        all: 'هەموو',
        whatsOnYourMind: 'بیر لە چی دەکەیتەوە؟',
        post: 'پۆست',
        loading: 'بارکردن...',
        noPostsFound: 'هیچ پۆستێک بۆ ئەم فلتەرانە نەدۆزرایەوە.',
        translating: 'وەرگێڕان...',
        showOriginal: 'پیشاندانی ڕەسەن',
        showTranslation: 'پیشاندانی وەرگێڕان',
        reportPost: 'ڕاپۆرتکردنی پۆست',
        like: 'لایك',
        comment: 'کۆمێنت',
        share: 'شەیر',
        generating: 'دروست دەکرێت...',
        portal: 'پۆرتاڵ',
        electionCandidates: 'پاڵێوراوەکان',
        electionData: 'داتا',
        resources: 'سەرچاوەکان',
        signInWithGoogle: 'چوونەژوورەوە لەگەڵ گوگڵ',
        signInWithFacebook: 'چوونەژوورەوە لەگەڵ فەیسبووک',
        orContinueWithEmail: 'یان لەگەڵ ئیمەیڵ بەردەوام بە',
        verifyYourEmail: 'ئیمەیڵەکەت پشتڕاست بکەرەوە',
        verificationSentMessage: 'لینکێکی پشتڕاستکردنەوە بۆ ئیمەیڵەکەت نێردراوە. تکایە کلیک لە لینکەکە بکە بۆ چالاککردنی هەژمارەکەت.',
        didNotReceiveEmail: 'ئیمەیڵەکەت پێنەگەیشت؟',
        resendVerificationEmail: 'دووبارە ناردنەوەی ئیمەیڵی پشتڕاستکردنەوە',
        emailResent: 'ئیمەیڵێکی نوێی پشتڕاستکردنەوە نێردرا!',
        checkVerification: 'پشتڕاستم کردەوە',
        continueToApp: 'بەردەوام بە بۆ ئەپ',
        electionCountdownTitle: 'کاتی ماوە بۆ هەڵبژاردن',
        days: 'ڕۆژ',
        hours: 'کاتژمێر',
        minutes: 'خولەک',
        seconds: 'چرکە',
        follow: "فۆڵۆ بکە",
        following: "فۆڵۆ کراوە",
        shareLinkCopied: "لینکی پۆستەکە کۆپی کرا!",
        shareNotSupported: "شەیرکردن لەم وێبگەڕەدا پشتگیری نەکراوە.",
        socialLoginFailed: "چوونەژوورەوە سەرکەوتوو نەبوو. تکایە دووبارە هەوڵبدەرەوە.",
        registrationFailed: "تۆمارکردن سەرکەوتوو نەبوو. تکایە دووبارە هەوڵبدەرەوە.",
        emailNotVerified: "ئیمەیڵ پشتڕاست نەکراوەتەوە. تکایە سندوقی نامەکانت بپشکنە.",
        draftSaved: "ڕەشنووس پاشەکەوت کرا (نموونە)!",
        previewingPost: "پێشبینینی پۆست",
        speechRecognitionNotSupported: "ناساندنی دەنگ لەم وێبگەڕەدا پشتگیری نەکراوە.",
        accessDenied: "ڕێگەپێنەدراوە. ئەم لاپەڕەیە تەنها بۆ کاندیدەکانە.",
        downloadQrFailed: "داگرتنی کۆدی QR سەرکەوتوو نەبوو. تکایە دووبارە هەوڵبدەرەوە.",
        unlink: "لابردنی بەستن",
        link: "بەستن",
        myPosts: "پۆستەکانی من",
        loadingPosts: "بارکردنی پۆستەکان...",
        noPostsYet: "تۆ هێشتا هیچ پۆستێکت نەکردووە.",
        promoTools: "ئامرازەکانی بانگەشە",
        promoToolsDesc: "ئەم کۆدی QR بەکاربێنە لەسەر پۆستەر و بڵاوکراوەکان بۆ ئاڕاستەکردنی دەنگدەران.",
        scanToSee: "سکانی بکە بۆ بینینی کاندیدەکانی پارتەکەت!",
        downloadQr: "داگرتنی کۆدی QR",
        socialConnections: "پەیوەندییە کۆمەڵایەتییەکان",
        socialConnectionsDesc: "هەژمارە کۆمەڵایەتییەکانت ببەستەرەوە بۆ شەیرکردنی پۆستەکان بە شێوەیەکی ئۆتۆماتیکی.",
        notACandidate: "ئەم پرۆفایلە کاندید نییە.",
        noBio: "ئەم کاندیدە ژیاننامەی نەنووسیوە.",
        postsBy: "پۆستەکانی {name}",
        noPostsYetCandidate: "ئەم کاندیدە هێشتا هیچ پۆستێکی نەکردووە.",
        loadingReels: "بارکردنی ڕیلەکان...",
        noReelsFound: "هیچ ڕیلێک بۆ فلتەرەکان نەدۆزرایەوە.",
        filterByCandidate: "فلتەرکردن بەپێی کاندید...",
        clearSelection: "سڕینەوەی هەڵبژاردن",
        loadingDebates: "بارکردنی گفتوگۆکان...",
        noDebatesFound: "هیچ گفتوگۆیەک بۆ فلتەرەکان نەدۆزرایەوە.",
        joinLiveDebate: "بەشداری گفتوگۆی ڕاستەوخۆ بکە",
        setReminder: "یادخەرەوە دابنێ",
        upcomingEvents: "ڕووداوەکانی داهاتوو",
        loadingEvents: "بارکردنی ڕووداوەکان...",
        noEventsScheduled: "هیچ ڕووداوێک بۆ فلتەرەکان دانەنراوە.",
        rsvp: "RSVP",
        loadingStories: "بارکردنی ستۆرییەکان...",
        noStories: "هیچ ستۆرییەک بۆ ئەم بەکارهێنەرە نییە.",
        discussionsInLang: "گفتوگۆکان بە زمانی هەڵبژێردراوی تۆ.",
        createNewDiscussion: "گفتوگۆیەکی نوێ دروست بکە",
        noDiscussionsFound: "هیچ گفتوگۆیەک بۆ ئەم زمانە نەدۆزرایەوە. بۆ یەکێک دروست ناکەیت؟",
        typeAMessage: "نامەیەک بنووسە...",
        createNewDiscussionTitle: "دروستکردنی گفتوگۆی نوێ",
        topicTitle: "ناونیشانی گفتوگۆ",
        topicTitlePlaceholder: "نموونە: قەیرانی کارەبا لە هەولێر",
        category: "پۆل",
        mainLanguage: "زمانی سەرەکی",
        firstMessage: "یەکەم نامە",
        firstMessagePlaceholder: "لێرەوە دەست بە گفتوگۆ بکە...",
        create: "دروستکردن",
        editProfile: "دەستکاریکردنی پرۆفایل",
        avatarUrl: "URLی وێنەی پرۆفایل",
        avatarUrlPlaceholder: "https://example.com/image.jpg",
        name: "ناو",
        biography: "ژیاننامە",
        cancel: "هەڵوەشاندنەوە",
        saveChanges: "پاشەکەوتکردنی گۆڕانکارییەکان",
        myWall: "دیواری من",
        noPostsYetUser: "تۆ هێشتا هیچت بڵاونەکردۆتەوە.",
        noCandidatesToShow: "هیچ کاندیدێک بۆ پیشاندان نییە.",
        electionDashboard: "داشبۆردی هەڵبژاردن",
        dashboardSubtitle: "داشبۆردی هەڵبژاردن",
        iraqiElections: "هەڵبژاردنەکانی پەرلەمانی عێراق",
        electionYear: "٢٠٢٥",
        totalVoters: "کۆی دەنگدەرانی تۆمارکراو",
        approvedCandidates: "کاندیدە پەسەندکراوەکان",
        expectedTurnout: "ڕێژەی چاوەڕوانکراوی بەشداری",
        governorateStats: "ئاماری پارێزگاکان",
        electionTimeline: "کاتی هەڵبژاردن",
        timeline: {
            voterRegistration: "دەستپێکردنی تۆمارکردنی دەنگدەران",
            candidateDeadline: "کۆتا وادە بۆ پێشکەشکردنی کاندید",
            campaignPeriod: "دەستپێکردنی بانگەشەی هەڵبژاردن",
            electionDay: "ڕۆژی هەڵبژاردن",
        },
        table: { governorate: "پارێزگا", turnout: "بەشداری چاوەڕوانکراو", status: "بارودۆخ" },
        status: { active: "چالاک", medium: "ناوەند" },
        integrityHubTitle: "ناوەندی دەستپاکی هەڵبژاردن",
        integrityHubDesc: "ڕاپۆرتی پێشێلکارییەکانی هەڵبژاردن بدە بە نهێنی و سەلامەتی. دەنگی تۆ یارمەتیدەرە بۆ دڵنیابوون لە هەڵبژاردنێکی پاک.",
        reportDetails: "وردەکارییەکانی ڕاپۆرت",
        reportType: "جۆری پێشێلکاری",
        selectReportType: "جۆری پێشێلکاری هەڵبژێرە...",
        reportTypes: {
            buying_votes: "کڕینی دەنگ",
            propaganda_violation: "پێشێلکاری بانگەشەی هەڵبژاردن",
            voter_intimidation: "ترساندنی دەنگدەران",
            misinformation: "بڵاوکردنەوەی زانیاری هەڵە",
            other: "هیتر",
        },
        violationDesc: "وەسفی پێشێلکاری",
        violationDescPlaceholder: "تکایە وەسفێکی وردی پێشێلکارییەکە بنووسە، لەوانە کات، شوێن، و کەسانی تێوەگلاو ئەگەر بکرێت.",
        attachEvidence: "بەڵگە هاوپێچ بکە (وێنە، ڤیدیۆ، دۆکیومێnt) - هەڵبژاردەیی",
        submitReport: "ناردنی ڕاپۆرت",
        submitting: "ناردن...",
        confidentialNotice: "هەموو ڕاپۆرتەکان نهێنین. زانیارییە کەسییەکانت بڵاوناکرێنەوە.",
        submissionSuccess: "ڕاپۆرتەکەت بە سەرکەوتوویی وەرگیرا!",
        trackingId: "کۆدی بەدواداچوونی ڕاپۆرتەکەت:",
        submissionThanks: "سوپاس بۆ بەشداریت لە پاراستنی دەستپاکی پرۆسەی هەڵبژاردن. تیمەکەمان پێداچوونەوەی بۆ دەکات.",
        submitNewReport: "ڕاپۆرتێکی نوێ پێشکەش بکە",
        submissionError: "هەڵەیەک ڕوویدا لە کاتی ناردنی ڕاپۆرتەکە.",
        networkError: "هەڵەیەکی تۆڕ ڕوویدا. تکایە دووبارە هەوڵبدەرەوە.",
        intlPortalTitle: "پۆرتاڵی چاودێرانی نێودەوڵەتی",
        intlPortalDesc: "دەستت بگات بە داتای ڕاستەوخۆ، ڕاپۆرتی گشتگیر، و سەرچاوەکان بۆ پشتگیریکردنی شەفافیەت و چاودێری هەڵبژاردن.",
        apiAccess: "APIی داتای ڕاستەوخۆ",
        apiAccessDesc: "دەستت بگات بە داتای هەڵبژاردنی ڕێکخراو و ڕاستەوخۆ، لەوانە ئامادەبوونی دەنگدەران و ڕاپۆرتی ڕووداوەکان.",
        requestApiAccess: "داواکردنی دەستگەیشتن بە API",
        downloadReports: "ڕاپۆرتەکان دابگرە",
        downloadReportsDesc: "ڕاپۆرتی فرەزمان دابگرە لەسەر تۆمارکردنی کاندیدەکان، دەستپاکی هەڵبژاردن، و چاودێری میدیا.",
        browseReports: "گەڕان بەدوای ڕاپۆرتەکاندا",
        observerResources: "سەرچاوە و زانیاری بۆ چاودێران",
        observerResourcesDesc: "دەستت بگات بە چوارچێوە یاساییەکان، زانیاری لۆجستی، و خشتەی کاتی کۆبوونەوەکان. ڕێکخراوەکەت تۆمار بکە.",
        registerOrg: "تۆمارکردنی ڕێکخراو",
        voterRegistrationTitle: "تۆمارکردنی دەنگدەران",
        voterRegistrationDesc: "دەنگی تۆ گرنگە. دڵنیابە کە تۆمارکراویت بۆ بەشداریکردن لە هەڵبژاردنەکانی داهاتوو.",
        voterInfo: "زانیاری دەنگدەر",
        fullNameNationalId: "ناوی سیانی (وەک لە کارتی نیشتمانی)",
        nationalId: "ژمارەی کارتی نیشتمانی",
        nationalIdHint: "پێویستە ١٢ ژمارە بێت",
        dob: "ڕێکەوتی لەدایکبوون",
        selectGovernorate: "پارێزگا",
        selectYourGovernorate: "پارێزگاکەت هەڵبژێرە...",
        registerButton: "تۆمارکردن",
        registrationSuccess: "تۆ بە سەرکەوتوویی تۆمار کرایت!",
        confirmationId: "کۆدی پشتڕاستکردنەوەی تۆمارکردنەکەت:",
        registerAnotherVoter: "تۆمارکردنی دەنگدەرێکی تر",
        simulationNotice: "ئەمە پرۆسەیەکی نموونەییە بۆ مەبەستی پیشاندان. هیچ داتایەکی ڕاستەقینە پاشەکەوت ناکرێت.",
        discoverCandidates: "کاندیدەکان بدۆزەرەوە",
        discoverCandidatesDesc: "کۆدی QRی کاندیدێک سکان بکە بۆ بینینی هەموو کاندیدەکانی پارتەکەی لە هەمان پارێزگادا.",
        loadingCandidates: "بارکردنی کاندیدەکان...",
        noCandidatesFoundQR: "هیچ کاندیدێک بۆ ئەم پارت و پارێزگایە نەدۆزرایەوە.",
        viewProfile: "پیشاندانی پرۆفایل",
        accessibilityDisplay: "دەستگەیشتن و پیشاندان",
        highContrast: "دۆخی کۆنتراستی بەرز",
        highContrastDesc: "کۆنتراستی دەق زیاد دەکات بۆ خوێندنەوەی باشتر.",
        largeText: "دەقی گەورە",
        largeTextDesc: "قەبارەی فۆنتی ئەپەکە گەورە دەکات.",
        tts: "دەق-بۆ-قسەکردن",
        ttsDesc: "چالاککردنی دوگمەی 'خوێندنەوەی ناوەڕۆک' لەسەر پۆستە درێژەکان.",
        colorTheme: "ڕەنگی تێما",
        underConstruction: "لەژێر دروستکردندایە",
        featureComingSoon: "ئەم تایبەتمەندییە بەم زووانە لێرە بەردەست دەبێت!",
        dataManagement: "بەڕێوەبردنی داتا و کۆکردنەوە",
        dataManagementDesc: "ئامرازەکان بۆ بەڕێوەبەرانی پلاتفۆرم بۆ بەڕێوەبردنی پرۆسەی کۆکردنەوەی داتا و پشتڕاستکردنەوەی کوالێتییەکەی.",
        apiConfig: "ڕێکخستنەکانی API",
        apiConfigDesc: "بەڕێوەبردن و تاقیکردنەوەی پەیوەندییەکانی API بۆ سۆشیال میدیا.",
        dataCollection: "داشبۆردی کۆکردنەوەی داتا",
        dataCollectionDesc: "چاودێری و کۆنترۆڵکردنی کۆکردنەوەی داتای کاندیدەکان.",
        contactValidation: "پشتڕاستکردنەوەی پەیوەندی",
        contactValidationDesc: "پێداچوونەوەی کوالێتی داتای پەیوەندی کۆکراوە.",
        candidateEnrichment: "دەوڵەمەندکردنی کاندید",
        candidateEnrichmentDesc: "بینینی داتای دەوڵەمەندکراو و شیکاری بۆ پرۆفایلەکان.",
        qualityAnalytics: "شیکاری کوالێتی",
        qualityAnalyticsDesc: "بینینی پێوەرەکانی کوالێتی داتا لەسەر پارێزگاکان.",
        mainDashboard: "داشبۆردی سەرەکی",
        mainDashboardDesc: "کلیک لە هەر بەشێک بکە بۆ گەڕان بەدوای ئامراز و سەرچاوە بەردەستەکاندا.",
        voterCenter: "ناوەندی دەنگدەران",
        voterCenterDesc: "هەموو سەرچاوەکان بۆ هاوڵاتیان بۆ بەشداریکردنی کاریگەر.",
        candidateHub: "ناوەندی کاندید",
        candidateHubDesc: "ئامرازەکان بۆ بەڕێوەبردنی هەڵمەتی دیجیتاڵیت و پێشکەشکردنی دۆکیومێنتەکان.",
        observerHub: "ناوەندی چاودێران",
        observerHubDesc: "سەرچاوەکان بۆ چاودێرانی ناوخۆیی و نێودەوڵەتی.",
        lawCompliance: "یاسا و پابەندبوون",
        lawComplianceDesc: "دەستت بگات بە یاسا و ڕێنماییەکان و پرۆسەکانی ڕاپۆرتکردن.",
        electionDataBig: "داتای هەڵبژاردن",
        electionDataDesc: "گەڕان بەدوای ئاماری ڕاستەوخۆ و داتای هەڵبژاردنی مێژووییدا.",
        supportResources: "پشتگیری و سەرچاوەکان",
        supportResourcesDesc: "ڕێنمایی یارمەتی و کەرەستەی دابەزێنراو بدۆزەرەوە.",
        loginToVoterPortal: "چوونەژوورەوە / تۆمارکردن بۆ دەنگدەران",
        loginToCandidatePortal: "چوونەژوورەوە / تۆمارکردن بۆ کاندیدان",
        empoweringWomenInPolitics: "شوێنێکی تایبەت بۆ دۆزینەوە و پشتگیریکردنی کاندیدە ژنەکان.",
    },
    ar: {
        appName: 'الحملة الذكية',
        social: 'التفاعل الاجتماعي',
        serious: 'إدارة الانتخابات',
        whoToFollow: 'من تتابعه',
        platformRules: 'قواعد المنصة',
        rule1: 'كن محترما للآخرين.',
        rule2: 'لا لخطاب الكراهية أو التحرش.',
        rule3: 'تحقق من المعلومات قبل مشاركتها.',
        rule4: 'انخرط في حوار بناء.',
        welcomeToApp: 'أهلاً بك في {appName}',
        chooseYourRole: 'اختر دورك للبدء.',
        iAmVoter: 'أنا ناخب',
        voterDescription: 'تابع المرشحين، شارك في المناقشات، وابق على اطلاع.',
        iAmCandidate: 'أنا مرشح',
        candidateDescription: 'أنشئ منشورات، شارك رسالتك، وتفاعل مع الناخبين.',
        teaHouse: 'المقهى',
        teaHouseFooter: 'ديوانية الشعب',
        register: 'تسجيل',
        fullName: 'الاسم الكامل',
        emailAddress: 'البريد الإلكتروني',
        createAccount: 'إنشاء حساب',
        registerAsVoter: 'التسجيل كناخب',
        registerAsCandidate: 'التسجيل كمرشح',
        back: 'رجوع',
        saveDraft: 'حفظ كمسودة',
        preview: 'معاينة',
        privacy: 'الخصوصية',
        public: 'عام',
        friends: 'الأصدقاء',
        private: 'خاص',
        notifications: 'الإشعارات',
        registerAsCandidateButton: 'التسجيل كمرشح',
        boostedPost: 'منشور ممول',
        home: 'الرئيسية',
        feed: 'الخلاصة',
        real: 'ريلز',
        candidates: 'المرشحون',
        whisper: 'همسة',
        women: 'النساء',
        minorities: 'الأقليات',
        components: 'المكونات',
        debates: 'المناقشات',
        analytics: 'التحليلات',
        myProfile: 'ملفي الشخصي',
        events: 'الفعاليات',
        articles: 'مقالات',
        search: 'ابحث...',
        dashboard: 'لوحة التحكم',
        settings: 'الإعدادات',
        backToSocial: 'العودة للتواصل الاجتماعي',
        electionPortal: 'بوابة الانتخابات',
        governorate: 'المحافظة',
        allIraq: 'كل العراق',
        party: 'الحزب',
        gender: 'الجنس',
        male: 'ذكر',
        female: 'أنثى',
        all: 'الكل',
        whatsOnYourMind: 'بماذا تفكر؟',
        post: 'انشر',
        loading: 'جاري التحميل...',
        noPostsFound: 'لم يتم العثور على منشورات للفلاتر المحددة.',
        translating: 'جاري الترجمة...',
        showOriginal: 'عرض الأصل',
        showTranslation: 'عرض الترجمة',
        reportPost: 'الإبلاغ عن المنشور',
        like: 'إعجاب',
        comment: 'تعليق',
        share: 'مشاركة',
        generating: 'جاري الإنشاء...',
        portal: 'البوابة',
        electionCandidates: 'المرشحون',
        electionData: 'البيانات',
        resources: 'الموارد',
        signInWithGoogle: 'تسجيل الدخول باستخدام جوجل',
        signInWithFacebook: 'تسجيل الدخول باستخدام فيسبوك',
        orContinueWithEmail: 'أو المتابعة بالبريد الإلكتروني',
        verifyYourEmail: 'تحقق من بريدك الإلكتروني',
        verificationSentMessage: 'تم إرسال رابط التحقق إلى عنوان بريدك الإلكتروني. الرجاء النقر على الرابط لتفعيل حسابك.',
        didNotReceiveEmail: 'لم تستلم البريد الإلكتروني؟',
        resendVerificationEmail: 'إعادة إرسال بريد التحقق',
        emailResent: 'تم إرسال بريد تحقق جديد!',
        checkVerification: 'لقد تحققت من بريدي',
        continueToApp: 'متابعة إلى التطبيق',
        electionCountdownTitle: 'الوقت المتبقي للانتخابات',
        days: 'أيام',
        hours: 'ساعات',
        minutes: 'دقائق',
        seconds: 'ثواني',
        follow: "متابعة",
        following: "تتابعه",
        shareLinkCopied: "تم نسخ رابط المنشور!",
        shareNotSupported: "المشاركة غير مدعومة في هذا المتصفح.",
        socialLoginFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        registrationFailed: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
        emailNotVerified: "البريد الإلكتروني لم يتم التحقق منه بعد. يرجى مراجعة بريدك الوارد.",
        draftSaved: "تم حفظ المسودة (محاكاة)!",
        previewingPost: "معاينة المنشور",
        speechRecognitionNotSupported: "التعرف على الكلام غير مدعوم في هذا المتصفح.",
        accessDenied: "الوصول مرفوض. هذه الصفحة للمرشحين فقط.",
        downloadQrFailed: "لا يمكن تحميل رمز الاستجابة السريعة. يرجى المحاولة مرة أخرى.",
        unlink: "إلغاء الربط",
        link: "ربط",
        myPosts: "منشوراتي",
        loadingPosts: "جاري تحميل المنشورات...",
        noPostsYet: "لم تقم بالنشر بعد.",
        promoTools: "أدوات ترويجية",
        promoToolsDesc: "استخدم رمز الاستجابة السريعة هذا على الملصقات والنشرات لتوجيه الناخبين إلى صفحة بها جميع مرشحي حزبك في هذه المحافظة.",
        scanToSee: "امسح الكود لرؤية مرشحي حزبك!",
        downloadQr: "تحميل رمز QR",
        socialConnections: "ربط الشبكات الاجتماعية",
        socialConnectionsDesc: "اربط حساباتك الاجتماعية لمشاركة منشوراتك تلقائيًا عند إنشائها.",
        notACandidate: "هذا الملف الشخصي ليس لمرشح.",
        noBio: "لم يقدم هذا المرشح سيرة ذاتية.",
        postsBy: "منشورات {name}",
        noPostsYetCandidate: "لم يقم هذا المرشح بالنشر بعد.",
        loadingReels: "جاري تحميل المقاطع...",
        noReelsFound: "لا توجد مقاطع متاحة للفلاتر المحددة.",
        filterByCandidate: "فلترة حسب مرشح معين...",
        clearSelection: "مسح الاختيار",
        loadingDebates: "جاري تحميل المناقشات...",
        noDebatesFound: "لم يتم العثور على مناقشات للفلاتر المحددة.",
        joinLiveDebate: "انضم إلى المناقشة المباشرة",
        setReminder: "ضبط تذكير",
        upcomingEvents: "الفعاليات القادمة",
        loadingEvents: "جاري تحميل الفعاليات...",
        noEventsScheduled: "لا توجد فعاليات مجدولة للفلاتر المحددة.",
        rsvp: "تسجيل حضور",
        loadingStories: "جاري تحميل القصص...",
        noStories: "لا توجد قصص لهذا المستخدم.",
        discussionsInLang: "مناقشات بلغتك المحددة.",
        createNewDiscussion: "إنشاء نقاش جديد",
        noDiscussionsFound: "لم يتم العثور على مناقشات لهذه اللغة. لم لا تبدأ واحدة؟",
        typeAMessage: "اكتب رسالة...",
        createNewDiscussionTitle: "إنشاء نقاش جديد",
        topicTitle: "عنوان النقاش",
        topicTitlePlaceholder: "مثال: أزمة الكهرباء في بغداد",
        category: "الفئة",
        mainLanguage: "اللغة الأساسية",
        firstMessage: "الرسالة الأولى",
        firstMessagePlaceholder: "ابدأ الحوار هنا...",
        create: "إنشاء",
        editProfile: "تعديل الملف الشخصي",
        avatarUrl: "رابط صورة الملف الشخصي",
        avatarUrlPlaceholder: "https://example.com/image.jpg",
        name: "الاسم",
        biography: "السيرة الذاتية",
        cancel: "إلغاء",
        saveChanges: "حفظ التغييرات",
        myWall: "حائطي",
        noPostsYetUser: "لم تنشر أي شيء بعد.",
        noCandidatesToShow: "لا يوجد مرشحون لعرضهم.",
        electionDashboard: "لوحة بيانات الانتخابات",
        dashboardSubtitle: "Election Dashboard",
        iraqiElections: "انتخابات العراق البرلمانية",
        electionYear: "٢٠٢٥",
        totalVoters: "إجمالي الناخبين المسجلين",
        approvedCandidates: "المرشحون المعتمدون",
        expectedTurnout: "المشاركة المتوقعة",
        governorateStats: "إحصائيات المحافظات",
        electionTimeline: "الجدول الزمني للانتخابات",
        timeline: {
            voterRegistration: "بدء تسجيل الناخبين",
            candidateDeadline: "الموعد النهائي لتقديم المرشحين",
            campaignPeriod: "بدء فترة الحملة الانتخابية",
            electionDay: "يوم الانتخابات",
        },
        table: { governorate: "المحافظة", turnout: "المشاركة المتوقعة", status: "الحالة" },
        status: { active: "نشط", medium: "متوسط" },
        integrityHubTitle: "مركز نزاهة الانتخابات",
        integrityHubDesc: "الإبلاغ عن المخالفات الانتخابية بسرية وأمان. صوتك يساهم في ضمان انتخابات نزيهة.",
        reportDetails: "تفاصيل البلاغ",
        reportType: "نوع المخالفة",
        selectReportType: "اختر نوع المخالفة...",
        reportTypes: {
            buying_votes: "شراء أصوات",
            propaganda_violation: "مخالفة دعاية انتخابية",
            voter_intimidation: "ترهيب ناخبين",
            misinformation: "نشر معلومات مضللة",
            other: "أخرى",
        },
        violationDesc: "وصف المخالفة",
        violationDescPlaceholder: "يرجى تقديم وصف تفصيلي للمخالفة، بما في ذلك الزمان والمكان والأشخاص المعنيين إن أمكن.",
        attachEvidence: "إرفاق دليل (صورة، فيديو، مستند) - اختياري",
        submitReport: "إرسال البلاغ",
        submitting: "جاري الإرسال...",
        confidentialNotice: "جميع البلاغات سرية. لن تتم مشاركة معلوماتك الشخصية.",
        submissionSuccess: "تم استلام بلاغك بنجاح!",
        trackingId: "رقم تتبع البلاغ الخاص بك هو:",
        submissionThanks: "شكرًا لمساهمتك في الحفاظ على نزاهة العملية الانتخابية. سيقوم فريقنا بمراجعة البلاغ.",
        submitNewReport: "تقديم بلاغ جديد",
        submissionError: "حدث خطأ أثناء إرسال البلاغ.",
        networkError: "حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
        intlPortalTitle: "بوابة المراقبين الدوليين",
        intlPortalDesc: "الوصول إلى البيانات الفورية والتقارير الشاملة والموارد لدعم شفافية الانتخابات ومراقبتها.",
        apiAccess: "واجهة برمجة تطبيقات البيانات الفورية",
        apiAccessDesc: "الوصول إلى بيانات الانتخابات المنظمة والفورية بما في ذلك نسبة إقبال الناخبين وتقارير الحوادث والنتائج الأولية.",
        requestApiAccess: "طلب الوصول إلى الواجهة",
        downloadReports: "تقارير قابلة للتنزيل",
        downloadReportsDesc: "تنزيل تقارير متعددة اللغات حول تسجيل المرشحين ونزاهة الانتخابات ومراقبة وسائل الإعلام.",
        browseReports: "تصفح التقارير",
        observerResources: "موارد وإحاطات المراقبين",
        observerResourcesDesc: "الوصول إلى الأطر القانونية والمعلومات اللوجستية وجداول إحاطات المراقبين. سجل منظمتك لتلقي التحديثات.",
        registerOrg: "تسجيل المنظمة",
        voterRegistrationTitle: "تسجيل الناخبين",
        voterRegistrationDesc: "صوتك مهم. تأكد من أنك مسجل للمشاركة في الانتخابات القادمة.",
        voterInfo: "معلومات الناخب",
        fullNameNationalId: "الاسم الكامل (حسب البطاقة الوطنية)",
        nationalId: "رقم البطاقة الوطنية",
        nationalIdHint: "يجب أن يتكون من 12 رقماً",
        dob: "تاريخ الميلاد",
        selectGovernorate: "المحافظة",
        selectYourGovernorate: "اختر محافظتك...",
        registerButton: "تسجيل",
        registrationSuccess: "تم تسجيلك بنجاح!",
        confirmationId: "رقم تأكيد التسجيل الخاص بك هو:",
        registerAnotherVoter: "تسجيل ناخب آخر",
        simulationNotice: "هذه عملية محاكاة لأغراض العرض التوضیחי. لا يتم تخزين أي بيانات حقيقية.",
        discoverCandidates: "اكتشف المرشحين",
        discoverCandidatesDesc: "امسح رمز الاستجابة السريعة للمرشح لرؤية جميع مرشحي حزبه الذين يترشحون في نفس المحافظة.",
        loadingCandidates: "جاري تحميل المرشحين...",
        noCandidatesFoundQR: "لم يتم العثور على مرشحين لهذا الحزب وهذه المحافظة.",
        viewProfile: "عرض الملف الشخصي",
        accessibilityDisplay: "الوصول والعرض",
        highContrast: "وضع التباين العالي",
        highContrastDesc: "يزيد من تباين النص لتحسين القراءة.",
        largeText: "نص كبير",
        largeTextDesc: "يزيد من حجم الخط في التطبيق.",
        tts: "تحويل النص إلى كلام",
        ttsDesc: "تمكين زر 'قراءة المحتوى' على المشاركات الطويلة.",
        colorTheme: "سمة اللون",
        underConstruction: "تحت الإنشاء",
        featureComingSoon: "ستكون هذه الميزة متاحة هنا قريبًا!",
        dataManagement: "إدارة وجمع البيانات",
        dataManagementDesc: "أدوات لمشرفي المنصة لإدارة عملية جمع البيانات والتحقق من جودتها.",
        apiConfig: "إعدادات API",
        apiConfigDesc: "إدارة واختبار اتصالات API لوسائل التواصل الاجتماعي.",
        dataCollection: "لوحة جمع البيانات",
        dataCollectionDesc: "مراقبة والتحكم في جمع بيانات المرشحين.",
        contactValidation: "التحقق من جهات الاتصال",
        contactValidationDesc: "مراجعة جودة بيانات الاتصال التي تم جمعها.",
        candidateEnrichment: "إثراء بيانات المرشحين",
        candidateEnrichmentDesc: "عرض البيانات المثرية والتحليلات للملفات الشخصية.",
        qualityAnalytics: "تحليلات الجودة",
        qualityAnalyticsDesc: "تصور مقاييس جودة البيانات عبر المحافظات.",
        mainDashboard: "لوحة التحكم الرئيسية",
        mainDashboardDesc: "انقر على أي قسم لاستكشاف الأدوات والموارد المتاحة.",
        voterCenter: "مركز الناخبين",
        voterCenterDesc: "جميع الموارد للمواطنين للمشاركة بفعالية.",
        candidateHub: "بوابة المرشح",
        candidateHubDesc: "أدوات لإدارة حملتك الرقمية وتقديم المستندات.",
        observerHub: "محور المراقبين",
        observerHubDesc: "موارد للمراقبين المحليين والدوليين.",
        lawCompliance: "القانون والامتثال",
        lawComplianceDesc: "الوصول إلى القوانين واللوائح وعمليات الإبلاغ.",
        electionDataBig: "بيانات الانتخابات",
        electionDataDesc: "استكشف الإحصاءات الحية وبيانات الانتخابات التاريخية.",
        supportResources: "الدعم والموارد",
        supportResourcesDesc: "ابحث عن المساعدة ومعلومات الاتصال والمواد القابلة للتنزيل.",
        loginToVoterPortal: "تسجيل الدخول / إنشاء حساب للناخبين",
        loginToCandidatePortal: "تسجيل الدخول / إنشاء حساب للمرشحين",
        empoweringWomenInPolitics: "مساحة مخصصة لاكتشاف ودعم المرشحات.",
    }
};