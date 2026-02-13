
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const baseTranslation = {
    nav: { home: 'Home', about: 'About', resources: 'Resources', help: 'Help', login: 'Login' },
    landing: {
        badge: 'Government-grade Legal AI',
        title1: 'Know Your Rights.',
        title2: 'Instantly.',
        subtitle: 'Ask legal questions in simple language. Powered by the latest Indian laws including BNS and BNSS.',
        askButton: 'Ask a Legal Question',
        scanButton: 'Scan a Document',
        legalBasis: 'Based on the Constitution of India, Bharatiya Nyaya Sanhita (BNS), BNSS, and Specialized Acts.',
        disclaimer: 'Disclaimer: Adikar AI provides information for educational purposes only. It is not a substitute for professional legal advice.',
        featuresTitle: 'Empowering Every Citizen',
        featuresSubtitle: "Designed for high accessibility and low digital literacy across India's diverse population.",
        feature1Title: 'Legal Chat Assistant',
        feature1Desc: 'Simple Q&A interface for all your legal needs. No jargon, just clear answers.',
        feature2Title: 'Snap & Simplify',
        feature2Desc: 'Upload a photo of any legal document to get an instant summary in your language.',
        feature3Title: 'Voice Support',
        feature3Desc: 'Speak to the AI in your native dialect. Perfect for hands-free or low-literacy usage.',
        feature4Title: 'Trusted Sources',
        feature4Desc: 'Citations directly from the Constitution, BNS, BNSS, and Consumer Protection laws.',
        howItWorksTitle: 'How It Works',
        step1Title: 'ASK OR SCAN',
        step1Desc: 'Type your query, record your voice, or upload a photo of a document.',
        step2Title: 'AI ANALYZES',
        step2Desc: 'Our neural engine cross-references thousands of Indian legal statutes instantly.',
        step3Title: 'GET GUIDANCE',
        step3Desc: 'Receive simple, actionable advice with links to official sources.',
        laws: { bns: 'BNS 2023', bnss: 'BNSS 2023', consumer: 'Consumer Laws', family: 'Family Law' }
    },
    footer: {
        description: 'Our mission is to democratize legal information across India.',
        quickLinks: 'Quick Links',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        legalDisclaimer: 'Legal Disclaimer',
        contactSupport: 'Contact Support',
        support: 'Support',
        faq: 'FAQ',
        apiAccess: 'API Access',
        community: 'Community',
        reportIssue: 'Report Issue',
        communityTitle: 'Join our legal tech community',
        communityDesc: 'Get the latest updates on legal tech and Indian laws.',
        emailPlaceholder: 'Email address',
        copyright: '© 2024 Adikar AI Technologies Pvt Ltd. All rights reserved.'
    },
    about: {
        title: 'About',
        intro: 'Adikar AI is a mission-driven legal technology platform dedicated to making legal information accessible.',
        missionTitle: 'Our Mission',
        missionDesc: 'We believe that justice begins with awareness. Our mission is to democratize legal knowledge.',
        techTitle: 'Our Tech',
        techDesc: 'Using state-of-the-art RAG and Neural Search to provide accurate citations.',
        coreValues: 'Core Values',
        accuracy: 'Accuracy',
        accuracyDesc: 'Every answer is backed by verified legal documents and citations.',
        accessibility: 'Accessibility',
        accessibilityDesc: 'Designed for both urban and rural users, with multi-language support.',
        privacy: 'Privacy',
        privacyDesc: 'Your legal queries are handled with the highest level of encryption and privacy.'
    },
    resources: {
        title: 'Legal Resources',
        desc: 'Access official legal documents, simplified guides, and downloadable resources.',
        constitution: 'The Constitution of India',
        bns: 'Bharatiya Nyaya Sanhita (BNS) 2023',
        consumer: 'Consumer Protection Act 2019',
        family: 'Family Law Handbook',
        typeDocument: 'Document',
        typeAct: 'Full Act',
        typeGuide: 'Guide',
        typeBrochure: 'Brochure',
        size: 'Size: {{size}}',
        download: 'Download PDF',
        portalsTitle: 'Official Portals',
        portalsDesc: 'Visit these official government websites for comprehensive legal information.'
    },
    help: {
        title: 'How can we Help?',
        searchPlaceholder: 'Search for help articles, FAQs...',
        emailTitle: 'Email Support',
        emailDesc: 'Response within 24 hours',
        chatTitle: 'Live Chat',
        chatDesc: 'Available 10 AM - 6 PM IST',
        chatButton: 'Start Chatting',
        phoneTitle: 'Phone',
        phoneDesc: 'Emergency legal assistance',
        faqTitle: 'Frequently Asked Questions',
        faq1Q: 'Is Adikar AI a replacement for a lawyer?',
        faq1A: 'No. Adikar AI provides educational information only.',
        faq2Q: 'Does Adikar AI support regional languages?',
        faq2A: 'Currently, we support English and Hindi. More coming soon.',
        faq3Q: 'How accurate is the legal information provided?',
        faq3A: 'Adikar AI uses a RAG system and cross-references actual legal documents.',
        faq4Q: 'How do I scan a physical legal document?',
        faq4A: 'Use the "Scan a Document" button on the homepage.'
    },
    auth: {
        appName: 'Adikar AI',
        tagline: 'Access your legal assistant',
        login: 'Login',
        loginWithOtp: 'Login with OTP',
        createAccount: 'Create Account',
        createAccountTitle: 'Create Your Account',
        createAccountSubtitle: 'Get simple explanations of your legal rights',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        mobileNumber: 'Mobile Number',
        mobilePlaceholder: 'Enter mobile number',
        emailAddress: 'Email Address',
        emailOptional: 'Email Address (Optional)',
        emailPlaceholder: 'name@example.com',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot password?',
        or: 'or',
        verificationCode: 'Verification Code',
        resendCode: 'Resend Code',
        userPreferences: 'User Preferences',
        preferredLanguage: 'PREFERRED LANGUAGE',
        voiceAssist: 'Enable voice responses for accessibility',
        agreeTerms: 'I agree to the Terms of Service and Privacy Policy.',
        dataPrivacy: 'We do not share your data with third parties.',
        secureNote: 'Your data is private and secure',
        encryptionActive: 'End-to-end encryption active',
        noAccount: "Don't have an account?",
        haveAccount: 'Already have an account?',
        loginLink: 'Login',
        verifyTitle: 'Verify Your Mobile Number',
        verifySubtitle: "We've sent a 6-digit code.",
        verify: 'Verify',
        resendIn: 'Resend OTP in {{time}}',
        noCode: "Didn't receive the code?",
        contactSupport: 'Contact Support',
        sslNote: 'SSL SECURE - AES-256 DATA PROTECTION',
        languageEnglish: 'English',
        languageHindi: 'Hindi',
        languageChhattisgarhi: 'Chhattisgarhi'
    },
    validation: {
        required: 'This field is required.',
        mobileInvalid: 'Enter a valid mobile number.',
        codeInvalid: 'Enter the 6-digit verification code.',
        passwordMismatch: 'Passwords do not match.',
        termsRequired: 'Please accept the terms and privacy policy.'
    }
};

const resources = {
    en: { translation: baseTranslation },
    hi: {
        translation: {
            ...baseTranslation,
            nav: { home: 'होम', about: 'परिचय', resources: 'संसाधन', help: 'सहायता', login: 'लॉगिन' },
            landing: {
                ...baseTranslation.landing,
                badge: 'सरकारी स्तर की एआई',
                title1: 'अपने अधिकार जानें।',
                title2: 'तुरंत।',
                subtitle: 'सरल भाषा में कानूनी प्रश्न पूछें।',
                askButton: 'कानूनी प्रश्न पूछें',
                scanButton: 'दस्तावेज़ स्कैन करें',
                howItWorksTitle: 'यह कैसे काम करता है',
                featuresTitle: 'हर नागरिक को सशक्त बनाना',
                featuresSubtitle: 'भारत की विविध आबादी के लिए डिज़ाइन किया गया।',
                feature1Title: 'कानूनी चैट सहायक',
                feature1Desc: 'आपकी सभी कानूनी जरूरतों के लिए सरल प्रश्न-उत्तर इंटरफ़ेस।',
                feature2Title: 'स्नैप और सरल करें',
                feature2Desc: 'दस्तावेज़ की फोटो अपलोड करें और तुरंत सारांश प्राप्त करें।',
                feature3Title: 'आवाज समर्थन',
                feature3Desc: 'अपनी भाषा में बोलें। हैंड्स-फ्री उपयोग के लिए उत्तम।',
                feature4Title: 'विश्वसनीय स्रोत',
                feature4Desc: 'सीधे संविधान और बीएनएस से उद्धरण।',
                steps: 'चरण'
            },
            auth: { ...baseTranslation.auth, login: 'लॉगिन', createAccount: 'खाता बनाएं' }
        }
    },
    bn: {
        translation: {
            ...baseTranslation,
            nav: { home: 'হোম', about: 'সম্পর্কে', resources: 'রিসোর্স', help: 'সাহায্য', login: 'লগইন' },
            landing: {
                ...baseTranslation.landing,
                badge: 'সরকারি মানের এআই',
                title1: 'আপনার অধিকার জানুন।',
                title2: 'তৎক্ষণাৎ।',
                subtitle: 'সহজ ভাষায় আইনি প্রশ্ন জিজ্ঞাসা করুন।',
                askButton: 'প্রশ্ন জিজ্ঞাসা করুন',
                scanButton: 'ডকুমেন্ট স্ক্যান করুন',
                howItWorksTitle: 'কিভাবে কাজ করে',
                featuresTitle: 'সকলের জন্য ক্ষমতায়ন',
                featuresSubtitle: 'ভারতের বৈচিত্র্যময় জনসংখ্যার জন্য তৈরি।',
                feature1Title: 'আইনি চ্যাট সহকারী',
                feature1Desc: 'সহজ প্রশ্নোত্তর ইন্টারফেস। কোনো জটিল শব্দ নেই।',
                feature2Title: 'ছবি এবং সরলীকরণ',
                feature2Desc: 'নথির ছবি আপলোড করুন এবং তাৎক্ষণিক সারাংশ পান।',
                feature3Title: 'ভয়েস সাপোর্ট',
                feature3Desc: 'নিজের ভাষায় কথা বলুন।',
                feature4Title: 'বিশ্বস্ত সূত্র',
                feature4Desc: 'সরাসরি সংবিধান থেকে উদ্ধৃতি।'
            },
            auth: { ...baseTranslation.auth, login: 'লগইন', createAccount: 'অ্যাকাউন্ট তৈরি করুন' }
        }
    },
    te: {
        translation: {
            ...baseTranslation,
            nav: { home: 'హోమ్', about: 'గురించి', resources: 'వనరులు', help: 'సహాయం', login: 'లాగిన్' },
            landing: {
                ...baseTranslation.landing,
                badge: 'ప్రభుత్వ స్థాయి AI',
                title1: 'మీ హక్కులను తెలుసుకోండి.',
                title2: 'వెంటనే.',
                subtitle: 'సరళమైన భాషలో చట్టపరమైన ప్రశ్నలను అడగండి.',
                askButton: 'ప్రశ్న అడగండి',
                scanButton: 'పత్రాన్ని స్కాన్ చేయండి',
                howItWorksTitle: 'ఇది ఎలా పనిచేస్తుంది',
                featuresTitle: 'ప్రతి పౌరుడిని శక్తివంతం చేయడం',
                featuresSubtitle: 'అందరి కోసం రూపొందించబడింది.',
                feature1Title: 'లీగల్ చాట్ అసిస్టెంట్',
                feature1Desc: 'మీ అన్ని చట్టపరమైన అవసరాలకు సరళమైన Q&A.',
                feature2Title: 'స్నాప్ & సింప్లిఫై',
                feature2Desc: 'ఏదైనా చట్టపరమైన పత్రం యొక్క ఫోటోను అప్‌లోడ్ చేయండి.',
                feature3Title: 'వాయిస్ సపోర్ట్',
                feature3Desc: 'AIతో మాట్లాడండి.',
                feature4Title: 'నమ్మదగిన మూలాలు',
                feature4Desc: 'రాజ్యాంగం నుండి నేరుగా ఉల్లేఖనాలు.'
            },
            auth: { ...baseTranslation.auth, login: 'లాగిన్', createAccount: 'ఖాతా సృష్టించండి' }
        }
    },
    mr: {
        translation: {
            ...baseTranslation,
            nav: { home: 'होम', about: 'बद्दल', resources: 'संसाधने', help: 'मदत', login: 'लॉगिन' },
            landing: {
                ...baseTranslation.landing,
                badge: 'सरकारी दर्जाचे AI',
                title1: 'आपले अधिकार जाणून घ्या.',
                title2: 'ताबडतोब.',
                subtitle: 'सोप्या भाषेत कायदेशीर प्रश्न विचारा.',
                askButton: 'प्रश्न विचारा',
                scanButton: 'दस्तऐवज स्कॅन करा',
                howItWorksTitle: 'हे कसे कार्य करते',
                featuresTitle: 'प्रत्येक नागरिकाला सक्षम करणे',
                featuresSubtitle: 'भारताच्या विविध लोकसंख्येसाठी डिझाइन केलेले.',
                feature1Title: 'कायदेशीर चॅट असिस्टंट',
                feature1Desc: 'तुमच्या सर्व कायदेशीर गरजांसाठी सोपा प्रश्न-उत्तर इंटरफेस.',
                feature2Title: 'स्नॅप आणि सोपे करा',
                feature2Desc: 'कोणत्याही कायदेशीर कागदपत्राचा फोटो अपलोड करा.',
                feature3Title: 'आवाज समर्थन',
                feature3Desc: 'एआयशी बोला.',
                feature4Title: 'विश्वसनीय स्रोत',
                feature4Desc: 'थेट संविधानातून.'
            },
            auth: { ...baseTranslation.auth, login: 'लॉगिन', createAccount: 'खाते तयार करा' }
        }
    },
    ta: {
        translation: {
            ...baseTranslation,
            nav: { home: 'முகப்பு', about: 'பற்றி', resources: 'வளங்கள்', help: 'உதவி', login: 'உள்நுழை' },
            landing: {
                ...baseTranslation.landing,
                badge: 'அரசு தரத்திலான AI',
                title1: 'உங்கள் உரிமைகளை அறியவும்.',
                title2: 'உடனடியாக.',
                subtitle: 'சட்ட கேள்விகளை எளிய மொழியில் கேளுங்கள்.',
                askButton: 'கேள்வி கேள்',
                scanButton: 'ஆவணத்தை ஸ்கேன் செய்',
                howItWorksTitle: 'எப்படி வேலை செய்கிறது',
                featuresTitle: 'ஒவ்வொரு குடிமகனையும் மேம்படுத்துதல்',
                featuresSubtitle: 'அனைவருக்கும் வடிவமைக்கப்பட்டது.',
                feature1Title: 'சட்ட அரட்டை உதவியாளர்',
                feature1Desc: 'உங்கள் அனைத்து சட்டத் தேவைகளுக்கும் எளிய கேள்வி-பதில்.',
                feature2Title: 'படம் எடுத்து எளிமையாக்கு',
                feature2Desc: 'எந்தவொரு சட்ட ஆவணத்தின் புகைப்படத்தையும் பதிவேற்றவும்.',
                feature3Title: 'குரல் ஆதரவு',
                feature3Desc: 'AI உடன் பேசுங்கள்.',
                feature4Title: 'நம்பகமான ஆதாரங்கள்',
                feature4Desc: 'அரசியலமைப்பிலிருந்து நேரடியாக.'
            },
            auth: { ...baseTranslation.auth, login: 'உள்நுழை', createAccount: 'கணக்கை உருவாக்கு' }
        }
    },
    gu: {
        translation: {
            ...baseTranslation,
            nav: { home: 'હોમ', about: 'વિશે', resources: 'સંસાધનો', help: 'મદદ', login: 'લોગિન' },
            landing: {
                ...baseTranslation.landing,
                badge: 'સરકારી કક્ષાનું AI',
                title1: 'તમારા અધિકારો જાણો.',
                title2: 'તરત જ.',
                subtitle: 'સરળ ભાષામાં કાયદાકીય પ્રશ્નો પૂછો.',
                askButton: 'પ્રશ્ન પૂછો',
                scanButton: 'દસ્તાવેજ સ્કેન કરો',
                howItWorksTitle: 'તે કેવી રીતે કામ કરે છે',
                featuresTitle: 'દરેક નાગરિકને સશક્ત બનાવવું',
                featuresSubtitle: 'ભારતની વિવિધ વસ્તી માટે રચાયેલ.',
                feature1Title: 'કાનૂની ચેટ સહાયક',
                feature1Desc: 'તમારી બધી કાનૂની જરૂરિયાતો માટે સરળ પ્રશ્ન-જવાબ.',
                feature2Title: 'ફોટો અને સરળ',
                feature2Desc: 'કોઈપણ કાનૂની દસ્તાવેજનો ફોટો અપલોડ કરો.',
                feature3Title: 'અવાજ આધાર',
                feature3Desc: 'AI સાથે વાત કરો.',
                feature4Title: 'વિશ્વસનીય સ્ત્રોતો',
                feature4Desc: 'સીધા બંધારણમાંથી.'
            },
            auth: { ...baseTranslation.auth, login: 'લોગિન', createAccount: 'ખાતું બનાવો' }
        }
    },
    ur: {
        translation: {
            ...baseTranslation,
            nav: { home: 'گھر', about: 'کے بارے میں', resources: 'وسائل', help: 'مدد', login: 'لاگ ان کریں' },
            landing: {
                ...baseTranslation.landing,
                badge: 'سرکاری سطح کا AI',
                title1: 'اپنے حقوق جانیں۔',
                title2: 'فوری طور پر۔',
                subtitle: 'آسان زبان میں قانونی سوالات پوچھیں۔',
                askButton: 'سوال پوچھیں',
                scanButton: 'دستاویز اسکین کریں',
                howItWorksTitle: 'یہ کیسے کام کرتا ہے',
                featuresTitle: 'ہر شہری کو بااختیار بنانا',
                featuresSubtitle: 'بھارت کی متنوع آبادی کے لیے ڈیزائن کیا گیا۔',
                feature1Title: 'قانونی چیٹ اسسٹنٹ',
                feature1Desc: 'آپ کی تمام قانونی ضروریات کے لیے آسان سوال و جواب۔',
                feature2Title: 'تصویر لیں اور آسان بنائیں',
                feature2Desc: 'کسی بھی قانونی دستاویز کی تصویر اپ لوڈ کریں۔',
                feature3Title: 'آواز کی حمایت',
                feature3Desc: 'AI سے بات کریں۔',
                feature4Title: 'قابل اعتماد ذرائع',
                feature4Desc: 'براہ راست آئین سے۔'
            },
            auth: { ...baseTranslation.auth, login: 'لاگ ان کریں', createAccount: 'اکاؤنٹ بنائیں' }
        }
    },
    kn: {
        translation: {
            ...baseTranslation,
            nav: { home: 'ಮುಖಪುಟ', about: 'ನಮ್ಮ ಬಗ್ಗೆ', resources: 'ಸಂಪನ್ಮೂಲಗಳು', help: 'ಸಹಾಯ', login: 'ಲಾಗಿನ್' },
            landing: {
                ...baseTranslation.landing,
                badge: 'ಸರ್ಕಾರಿ ಮಟ್ಟದ AI',
                title1: 'ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ.',
                title2: 'ತಕ್ಷಣವೇ.',
                subtitle: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.',
                askButton: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
                scanButton: 'ದಾಖಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
                howItWorksTitle: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
                featuresTitle: 'ಪ್ರತಿಯೊಬ್ಬ ಪ್ರಜೆಯನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು',
                featuresSubtitle: 'ಎಲ್ಲರಿಗೂ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
                feature1Title: 'ಕಾನೂನು ಚಾಟ್ ಸಹಾಯಕ',
                feature1Desc: 'ಸರಳ ಪ್ರಶ್ನೋತ್ತರ ಅಂತರಸಂಪರ್ಕ.',
                feature2Title: 'ಫೋಟೋ ಮತ್ತು ಸರಳೀಕರಣ',
                feature2Desc: 'ಯಾವುದೇ ಕಾನೂನು ದಾಖಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
                feature3Title: 'ದನಿ ಬೆಂಬಲ',
                feature3Desc: 'AI ನೊಂದಿಗೆ ಮಾತನಾಡಿ.',
                feature4Title: 'ವಿಶ್ವಾಸಾರ್ಹ ಮೂಲಗಳು',
                feature4Desc: 'ನೇರವಾಗಿ ಸಂವಿಧಾನದಿಂದ.'
            },
            auth: { ...baseTranslation.auth, login: 'ಲಾಗಿನ್', createAccount: 'ಖಾತೆ ತೆರೆಯಿರಿ' }
        }
    },
    ml: {
        translation: {
            ...baseTranslation,
            nav: { home: 'ഹോം', about: 'കുറിച്ച്', resources: 'വിഭവങ്ങൾ', help: 'സഹായം', login: 'ലോഗിൻ' },
            landing: {
                ...baseTranslation.landing,
                badge: 'സർക്കാർ തലത്തിലുള്ള AI',
                title1: 'നിങ്ങളുടെ അവകാശങ്ങൾ അറിയുക.',
                title2: 'ഉടനടി.',
                subtitle: 'ലളിതമായ ഭാഷയിൽ നിയമപരമായ ചോദ്യങ്ങൾ ചോദിക്കുക.',
                askButton: 'ചോദ്യം ചോദിക്കുക',
                scanButton: 'രേഖ സ്കാൻ ചെയ്യുക',
                howItWorksTitle: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
                featuresTitle: 'ഓരോ പൗരനെയും ശാക്തീകരിക്കുന്നു',
                featuresSubtitle: 'എല്ലാവർക്കുമായി രൂപകൽപ്പന ചെയ്തിരിക്കുന്നത്.',
                feature1Title: 'നിയമ ചാറ്റ് അസിസ്റ്റന്റ്',
                feature1Desc: 'ലളിതമായ ചോദ്യോത്തര ഇന്റർഫേസ്.',
                feature2Title: 'ഫോട്ടോയും ലളിതവൽക്കരണവും',
                feature2Desc: 'ഏതെങ്കിലും നിയമരേഖയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.',
                feature3Title: 'വോയ്സ് സപ്പോർട്ട്',
                feature3Desc: 'AI-യോട് സംസാരിക്കുക.',
                feature4Title: 'വിശ്വസനീയമായ ഉറവിടങ്ങൾ',
                feature4Desc: 'ഭരണഘടനയിൽ നിന്ന് നേരിട്ട്.'
            },
            auth: { ...baseTranslation.auth, login: 'ലോഗിൻ', createAccount: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക' }
        }
    },
    or: {
        translation: {
            ...baseTranslation,
            nav: { home: 'ମୂଳପୃଷ୍ଠା', about: 'ଆମ ବିଷୟରେ', resources: 'ସମ୍ବଳ', help: 'ସାହାଯ୍ୟ', login: 'ଲଗ୍ ଇନ୍' },
            landing: {
                ...baseTranslation.landing,
                badge: 'ସରକାରୀ ସ୍ତରୀୟ AI',
                title1: 'ଆପଣଙ୍କ ଅଧିକାର ଜାଣନ୍ତୁ।',
                title2: 'ତୁରନ୍ତ।',
                subtitle: 'ସରଳ ଭାଷାରେ ଆଇନଗତ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।',
                askButton: 'ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ',
                scanButton: 'ଦସ୍ତାବିଜ୍ ସ୍କାନ୍ କରନ୍ତୁ',
                howItWorksTitle: 'ଏହା କିପରି କାର୍ଯ୍ୟ କରେ',
                featuresTitle: 'ପ୍ରତ୍ୟେକ ନାଗରିକଙ୍କୁ ସଶକ୍ତ କରିବା',
                featuresSubtitle: 'ସମସ୍ତଙ୍କ ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଛି।',
                feature1Title: 'ଆଇନଗତ ଚାଟ୍ ସହାୟକ',
                feature1Desc: 'ସରଳ ପ୍ରଶ୍ନୋତ୍ତର ଇଣ୍ଟରଫେସ୍।',
                feature2Title: 'ଫଟୋ ଏବଂ ସରଳୀକରଣ',
                feature2Desc: 'ଯେକୌଣସି ଆଇନଗତ ଦସ୍ତାବିଜର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ।',
                feature3Title: 'ସ୍ୱର ସହାୟତା',
                feature3Desc: 'AI ସହିତ କଥାବାର୍ତ୍ତା କରନ୍ତୁ।',
                feature4Title: 'ବିଶ୍ୱସ୍ତ ଉତ୍ସ',
                feature4Desc: 'ସିଧାସଳଖ ସମ୍ବିଧାନରୁ।'
            },
            auth: { ...baseTranslation.auth, login: 'ଲଗ୍ ଇନ୍', createAccount: 'ଆକାଉଣ୍ଟ୍ ଖୋଲନ୍ତୁ' }
        }
    },
    pa: {
        translation: {
            ...baseTranslation,
            nav: { home: 'ਘਰ', about: 'ਬਾਰੇ', resources: 'ਸਰੋਤ', help: 'ਮਦਦ', login: 'ਲਾਗਇਨ' },
            landing: {
                ...baseTranslation.landing,
                badge: 'ਸਰਕਾਰੀ ਪੱਧਰ ਦੀ AI',
                title1: 'ਆਪਣੇ ਅਧਿਕਾਰ ਜਾਣੋ।',
                title2: 'ਤੁਰੰਤ।',
                subtitle: 'ਸਧਾਰਨ ਭਾਸ਼ਾ ਵਿੱਚ ਕਾਨੂੰਨੀ ਸਵਾਲ ਪੁੱਛੋ।',
                askButton: 'ਸਵਾਲ ਪੁੱਛੋ',
                scanButton: 'ਦਸਤਾਵੇਜ਼ ਸਕੈਨ ਕਰੋ',
                howItWorksTitle: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
                featuresTitle: 'ਹਰ ਨਾਗਰਿਕ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ',
                featuresSubtitle: 'ਭਾਰਤ ਦੀ ਵੱਖ-ਵੱਖ ਆਬਾਦੀ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ।',
                feature1Title: 'ਕਾਨੂੰਨੀ ਚੈਟ ਸਹਾਇਕ',
                feature1Desc: 'ਤੁਹਾਡੀਆਂ ਸਾਰੀਆਂ ਕਾਨੂੰਨੀ ਜ਼ਰੂਰਤਾਂ ਲਈ ਸਧਾਰਨ ਸਵਾਲ-ਜਵਾਬ।',
                feature2Title: 'ਫੋਟੋ ਅਤੇ ਸਰਲ',
                feature2Desc: 'ਕਿਸੇ ਵੀ ਕਾਨੂੰਨੀ ਦਸਤਾਵੇਜ਼ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ।',
                feature3Title: 'ਆਵਾਜ਼ ਸਹਾਇਤਾ',
                feature3Desc: 'AI ਨਾਲ ਗੱਲ ਕਰੋ।',
                feature4Title: 'ਭਰੋਸੇਯੋਗ ਸਰੋਤ',
                feature4Desc: 'ਸਿੱਧੇ ਸੰਵਿਧਾਨ ਤੋਂ।'
            },
            auth: { ...baseTranslation.auth, login: 'ਲਾਗਇਨ', createAccount: 'ਖਾਤਾ ਬਣਾਓ' }
        }
    },
    as: {
        translation: {
            ...baseTranslation,
            nav: { home: 'গৃহ', about: 'বিষয়ে', resources: 'সম্পদ', help: 'সহায়', login: 'লগইন' },
            landing: {
                ...baseTranslation.landing,
                badge: 'চৰকাৰী স্তৰৰ AI',
                title1: 'আপোনাৰ অধিকাৰ জানক।',
                title2: 'তৎক্ষণাৎ।',
                subtitle: 'সহজ ভাষাত আইনী প্ৰশ্ন সোধক।',
                askButton: 'প্ৰশ্ন সোধক',
                scanButton: 'নথি স্কেন কৰক',
                howItWorksTitle: 'এয়া কেনেকৈ কাম কৰে',
                featuresTitle: 'প্ৰতিজন নাগৰিকক শক্তিশালী কৰা',
                featuresSubtitle: 'সকলোৰে বাবে ডিজাইন কৰা হৈছে।',
                feature1Title: 'আইনী চাট সহায়ক',
                feature1Desc: 'সহজ প্ৰশ্নোত্তৰ।',
                feature2Title: 'ফটো আৰু সৰলীক',
                feature2Desc: 'যিকোনো আইনী নথিৰ ফটো আপলোড কৰক।',
                feature3Title: 'কণ্ঠ সহায়',
                feature3Desc: 'AI ৰ সৈতে কথা পাতক।',
                feature4Title: 'বিশ্বস্ত উৎস',
                feature4Desc: 'পোনপটীয়াভাৱে সংবিধানৰ পৰা।'
            },
            auth: { ...baseTranslation.auth, login: 'লগইন', createAccount: 'একাউণ্ট খোলক' }
        }
    },
    mai: {
        translation: {
            ...baseTranslation,
            nav: { home: 'होम', about: 'परिचय', resources: 'संसाधन', help: 'मदद', login: 'लॉगिन' },
            landing: {
                ...baseTranslation.landing,
                badge: 'सरकारी स्तरक AI',
                title1: 'अपन अधिकार जानू।',
                title2: 'तुरंत।',
                subtitle: 'सरल भाषामे कानूनी प्रश्न पूछू।',
                askButton: 'प्रश्न पूछू',
                scanButton: 'दस्तावेज स्कैन करू',
                howItWorksTitle: 'ई कोना काज करैत अछि',
                featuresTitle: 'सब नागरिक के सशक्त बनेबाक लेल',
                featuresSubtitle: 'सब लेल डिजाइन कएल गेल अछि।',
                feature1Title: 'कानूनी चैट सहायक',
                feature1Desc: 'सरल प्रश्न-उत्तर।',
                feature2Title: 'फोटो लेल आ सरल',
                feature2Desc: 'कोनो कानूनी कागजक फोटो अपलोड करू।',
                feature3Title: 'आवाज समर्थन',
                feature3Desc: 'AI सँ गप करू।',
                feature4Title: 'विश्वसनीय स्रोत',
                feature4Desc: 'सीधे संविधान सँ।'
            },
            auth: { ...baseTranslation.auth, login: 'लॉगिन', createAccount: 'खाता बनाउ' }
        }
    },
    sat: {
        translation: {
            ...baseTranslation,
            nav: { home: 'ᱚᱲᱟᱜ', about: 'ᱵᱟᱵᱚᱛ', resources: 'ᱥᱚᱢᱯᱚᱫ', help: 'ᱜᱚᱲᱚ', login: 'ᱞᱚᱜᱤᱱ' },
            landing: {
                ...baseTranslation.landing,
                badge: 'ᱥᱚᱨᱠᱟᱨᱤ ᱛᱷᱟᱠ ᱨᱮᱱᱟᱜ AI',
                title1: 'ᱟᱢᱟᱜ ᱚᱫᱷᱤᱠᱟᱨ ᱵᱟᱰᱟᱭ ᱢᱮ᱾',
                title2: 'ᱞᱚᱜᱚᱱ ᱜᱮ᱾',
                subtitle: 'ᱥᱚᱡᱷᱮ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱟᱹᱱᱟᱹᱨᱤ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤ ᱢᱮ᱾',
                askButton: 'ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤ ᱢᱮ',
                scanButton: 'ᱫᱚᱞᱤᱞ ᱥᱠᱮᱱ ᱢᱮ',
                howItWorksTitle: 'ᱱᱚᱣᱟ ᱪᱮᱫ ᱞᱮᱠᱟ ᱠᱟᱹᱢᱤᱭᱟ',
                featuresTitle: 'ᱡᱚᱛᱚ ᱱᱟᱜᱟᱹᱨᱤᱭᱟᱹ ᱠᱚ ᱫᱟᱲᱮ ᱮᱢ ᱞᱟᱹᱜᱤᱫ',
                featuresSubtitle: 'ᱥᱟᱱᱟᱢ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱱᱟ᱾',
                feature1Title: 'ᱟᱹᱱᱟᱹᱨᱤ ᱪᱮᱴ ᱜᱚᱲᱚ',
                feature1Desc: 'ᱟᱞᱜᱟ ᱠᱩᱠᱞᱤ-ᱞᱟᱹᱱᱟᱹᱭ᱾',
                feature2Title: 'ᱪᱤᱛᱟᱹᱨ ᱟᱨ ᱟᱞᱜᱟ',
                feature2Desc: 'ᱡᱟᱦᱟᱸ ᱟᱹᱱᱟᱹᱨᱤ ᱫᱚᱞᱤᱞ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱞᱟᱫᱮ ᱢᱮ᱾',
                feature3Title: 'ᱟᱲᱟᱝ ᱜᱚᱲᱚ',
                feature3Desc: 'AI ᱥᱟᱶ ᱨᱚᱲ ᱢᱮ᱾',
                feature4Title: 'ᱯᱟᱹᱛᱭᱟᱹᱣ ᱟᱱ ᱯᱷᱮᱰᱟᱛ',
                feature4Desc: 'ᱥᱚᱢᱵᱤᱫᱷᱟᱱ ᱠᱷᱚᱱ ᱥᱚᱡᱷᱮ᱾'
            },
            auth: { ...baseTranslation.auth, login: 'ᱞᱚᱜᱤᱱ', createAccount: 'ᱮᱠᱟᱣᱩᱱᱴ ᱵᱮᱱᱟᱣ ᱢᱮ' }
        }
    },
    ks: {
        translation: {
            ...baseTranslation,
            nav: { home: 'گھر', about: 'متعلق', resources: 'ذرائع', help: 'مدد', login: 'لاگ ان' },
            landing: {
                ...baseTranslation.landing,
                badge: 'سرکاری سطحُک AI',
                title1: 'پَنُن حق زأنِیو۔',
                title2: 'فورا۔',
                subtitle: 'آسان زبان منز قانونی سوال پُچھِیو۔',
                askButton: 'سوال پُچھِیو',
                scanButton: 'کاغذات اسکین کریو',
                howItWorksTitle: 'یہِ چھُ کتھِ کنِ کأم کران',
                featuresTitle: 'ہر شہری سُنٛد بااختیار بناوُن',
                featuresSubtitle: 'تمام لوکن ہنز خاطر۔',
                feature1Title: 'قانونی چیٹ اسسٹنٹ',
                feature1Desc: 'آسان سوال و جواب۔',
                feature2Title: 'تصویر تَلو تِ آسان بَنأو',
                feature2Desc: 'کانہہ تہِ قانونی کاغذچ تصویر کریو اپ لوڈ۔',
                feature3Title: 'آوازچ مدد',
                feature3Desc: 'AI ستھ کریو کتھ۔',
                feature4Title: 'قابل اعتماد ذرائع',
                feature4Desc: 'آئین پیٹھ براہ راست۔'
            },
            auth: { ...baseTranslation.auth, login: 'لاگ ان', createAccount: 'اکاؤنٹ بناو' }
        }
    },
    ne: {
        translation: {
            ...baseTranslation,
            nav: { home: 'गृहपृष्ठ', about: 'हाम्रो बारेमा', resources: 'स्रोतहरू', help: 'सहयोग', login: 'लगइन' },
            landing: {
                ...baseTranslation.landing,
                badge: 'सरकारी स्तरको AI',
                title1: 'आफ्नो अधिकार जान्नुहोस्।',
                title2: 'तत्काल।',
                subtitle: 'सरल भाषामा कानूनी प्रश्नहरू सोध्नुहोस्।',
                askButton: 'प्रश्न सोध्नुहोस्',
                scanButton: 'कागजात स्क्यान गर्नुहोस्',
                howItWorksTitle: 'यसले कसरी काम गर्छ',
                featuresTitle: 'हरेक नागरिकलाई सशक्त बनाउँदै',
                featuresSubtitle: 'सबैका लागि डिजाइन गरिएको।',
                feature1Title: 'कानूनी च्याट सहायक',
                feature1Desc: 'सरल प्रश्नोत्तर इन्टरफेस।',
                feature2Title: 'तस्बिर र सरलीकरण',
                feature2Desc: 'कुनै पनि कानूनी कागजातको फोटो अपलोड गर्नुहोस्।',
                feature3Title: 'आवाज सहयोग',
                feature3Desc: 'AI सँग कुरा गर्नुहोस्।',
                feature4Title: 'विश्वसनीय स्रोतहरू',
                feature4Desc: 'सिधै संविधानबाट।'
            },
            auth: { ...baseTranslation.auth, login: 'लगइन', createAccount: 'खाता खोल्नुहोस्' }
        }
    },
    sd: {
        translation: {
            ...baseTranslation,
            nav: { home: 'گھر', about: 'بابت', resources: 'وسيلا', help: 'مدد', login: 'لاگ ان' },
            landing: {
                ...baseTranslation.landing,
                badge: 'سرڪاري سطح جو AI',
                title1: 'پنهنجا حق ڄاڻو.',
                title2: 'فوري طور تي.',
                subtitle: 'سادي زبان ۾ قانوني سوال پڇو.',
                askButton: 'سوال پڇو',
                scanButton: 'دستاويز اسڪين ڪريو',
                howItWorksTitle: 'هي ڪيئن ڪم ڪري ٿو',
                featuresTitle: 'هر شهري کي بااختيار بڻائڻ',
                featuresSubtitle: 'سڀني لاء ٺهيل.',
                feature1Title: 'قانوني چيٽ اسسٽنٽ',
                feature1Desc: 'آسان سوال ۽ جواب.',
                feature2Title: 'تصوير ۽ سادو',
                feature2Desc: 'ڪنهن به قانوني دستاويز جي تصوير اپ لوڊ ڪريو.',
                feature3Title: 'آواز جي مدد',
                feature3Desc: 'AI سان ڳالهايو.',
                feature4Title: 'قابل اعتماد ذريعا',
                feature4Desc: 'آئين مان سڌو.'
            },
            auth: { ...baseTranslation.auth, login: 'لاگ ان', createAccount: 'کاتو ٺاهيو' }
        }
    },
    kok: {
        translation: {
            ...baseTranslation,
            nav: { home: 'घर', about: 'विशीं', resources: 'संसाधनां', help: 'मदत', login: 'लॉगिन' },
            landing: {
                ...baseTranslation.landing,
                badge: 'सरकारी पांवड्याचो AI',
                title1: 'तुमचे अधिकार जाणा.',
                title2: 'रोखडेंच.',
                subtitle: 'सादे भाशेंत कायदेशीर प्रस्न विचारात.',
                askButton: 'प्रस्न विचार',
                scanButton: 'दस्तावेज स्कॅन करा',
                howItWorksTitle: 'हें कशें काम करता',
                featuresTitle: 'दरेक नागरिकाक बळिश्ट करप',
                featuresSubtitle: 'सगळ्यां खातीर तयार केल्ले.',
                feature1Title: 'कायदेशीर चॅट मदतनीस',
                feature1Desc: 'सोपे प्रस्न-जाप इंटरफेस.',
                feature2Title: 'फोटो आनी सोपें',
                feature2Desc: 'खंयच्याय कायदेशीर दस्तावेजाचो फोटो अपलोड करात.',
                feature3Title: 'आवाज मदत',
                feature3Desc: 'AI कडेन उलय.',
                feature4Title: 'विस्वासाचे स्त्रोत',
                feature4Desc: 'सरळ संविधानांतल्यान.'
            },
            auth: { ...baseTranslation.auth, login: 'लॉगिन', createAccount: 'खातें तयार करात' }
        }
    },
    doi: {
        translation: {
            ...baseTranslation,
            nav: { home: 'काऱ', about: 'बारै च', resources: 'वसीले', help: 'मदद', login: 'लॉगिन' },
            landing: {
                ...baseTranslation.landing,
                badge: 'सरकारी स्तर दा AI',
                title1: 'अपनें अधिकारें गी जानो।',
                title2: 'फौरन।',
                subtitle: 'सादी भाशा च कानूनी सवाल पुच्छो।',
                askButton: 'सवाल पुच्छो',
                scanButton: 'कागज स्कैन करो',
                howItWorksTitle: 'एह् किन्‌यां कम्म करदा ऐ',
                featuresTitle: 'हर्‌यक नागरिक गी शक्‌त बनाना',
                featuresSubtitle: 'सबनें आस्तै बनाए दा।',
                feature1Title: 'कानूनी चैट सहायक',
                feature1Desc: 'सादा सवाल-जवाब।',
                feature2Title: 'फोटो ते सरल',
                feature2Desc: 'कुसै बी कानूनी कागज दी फोटो पाओ।',
                feature3Title: 'आवाज मदद',
                feature3Desc: 'AI कन्नै गल्ल करो।',
                feature4Title: 'भरोसेमंद जरिया',
                feature4Desc: 'सिद्धै संविधान थमां।'
            },
            auth: { ...baseTranslation.auth, login: 'लॉगिन', createAccount: 'खाता बनाओ' }
        }
    },
    mni: {
        translation: {
            ...baseTranslation,
            nav: { home: 'হোম', about: 'মরমদা', resources: 'রিসোর্স', help: 'মতেং', login: 'লোগিন' },
            landing: {
                ...baseTranslation.landing,
                badge: 'সরকারগী থাক্কী AI',
                title1: 'নহাক্কী হকশিং খঙবীয়ু।',
                title2: 'খুদক্তা।',
                subtitle: 'চাম্বা লোলদা আইনি ৱাহংশিং হংবীয়ু।',
                askButton: 'ৱাহং হংবীয়ু',
                scanButton: 'চে-চাং স্কেন তৌবীয়ু',
                howItWorksTitle: 'অসি করম্না থবক তৌবগে',
                featuresTitle: 'মীয়াম পুম্নমকপু শক্তি পীবা',
                featuresSubtitle: 'মিয়াম পুম্নমক্কীদমক শেম-শাবা।',
                feature1Title: 'আইনি চ্যাট মতেং',
                feature1Desc: 'চাম্বা ৱাহং-পাউখুম।',
                feature2Title: 'ফোটো অমসুং লাইথোকহনবা',
                feature2Desc: 'আইনি চে-চাং অমা হাপকৎপীয়ু।',
                feature3Title: 'খোনজেল মতেং',
                feature3Desc: 'AI গা ৱারী শাবীয়ু।',
                feature4Title: 'থাজবা য়াবা মফম',
                feature4Desc: 'সংবিধানদগী হকথেংননা।'
            },
            auth: { ...baseTranslation.auth, login: 'লোগিন', createAccount: 'একাউন্ট শেমগৎপীয়ু' }
        }
    },
    brx: {
        translation: {
            ...baseTranslation,
            nav: { home: 'न', about: 'सोमोन्दै', resources: 'बिलाइ', help: 'मदद', login: 'लगीन' },
            landing: {
                ...baseTranslation.landing,
                badge: 'सरकार थाकनि AI',
                title1: 'गावनि मोनथायखौ मिथि।',
                title2: 'गोख्रै।',
                subtitle: 'गोरलै रावराव आइनि सोंथि सों।',
                askButton: 'सोंथि सों',
                scanButton: 'बिलाइ स्कान खालाम',
                howItWorksTitle: 'बेयो माबोरै खामानि मावो',
                featuresTitle: 'साफ्रोम सुबुंखौ गोहो गोनां खालामनाय',
                featuresSubtitle: 'गासैरावनिबो थाखाय बानायनाय।',
                feature1Title: 'आइनि साट मददगिरि',
                feature1Desc: 'गोरलै सोंनाय फिननाय।',
                feature2Title: 'फोटो आरो गोरलै',
                feature2Desc: 'जेबो आइनि बिलाइनि फोटो अपलोड खालाम।',
                feature3Title: 'राव मदद',
                feature3Desc: 'AI जों रायलाय।',
                feature4Title: 'फोथायथाव',
                feature4Desc: 'थोंजों संबिधान निफ्राय।'
            },
            auth: { ...baseTranslation.auth, login: 'लगीन', createAccount: 'एकाउन्ट बानाय' }
        }
    },
    sa: {
        translation: {
            ...baseTranslation,
            nav: { home: 'गृहम्', about: 'विषये', resources: 'सम्पदः', help: 'साहाय्यम्', login: 'प्रवेशः' },
            landing: {
                ...baseTranslation.landing,
                badge: 'शासकीय-स्तरीयः AI',
                title1: 'स्व-अधिकारान् जानन्तु।',
                title2: 'सद्यः एव।',
                subtitle: 'सरलभाषायां विधि-प्रश्नान् पृच्छन्तु।',
                askButton: 'प्रश्नं पृच्छन्तु',
                scanButton: 'प्रपत्रं वीक्षन्ताम्',
                howItWorksTitle: 'एतत् कथं कार्यं करोति',
                featuresTitle: 'प्रत्येकं नागरिकं सशक्तिकरणम्',
                featuresSubtitle: 'सर्वेषां कृते निर्मितम्।',
                feature1Title: 'विधि-सम्भाषण-सहायकः',
                feature1Desc: 'सरल-प्रश्नोत्तरी-अन्तरफलकम्।',
                feature2Title: 'चित्रं स्वीकुरुत',
                feature2Desc: 'विधिपत्रस्य चित्रं प्रेषयन्तु।',
                feature3Title: 'ध्वनि-साहाय्यम्',
                feature3Desc: 'AI सह वदन्तु।',
                feature4Title: 'विश्वसनीयाः स्रोतः',
                feature4Desc: 'संविधानात् साक्षात्।'
            },
            auth: { ...baseTranslation.auth, login: 'प्रवेशः', createAccount: 'लेखां रचयन्तु' }
        }
    }
};
// Add full text for Chhattisgarhi and tweak
resources.cg = {
    translation: {
        nav: { home: 'होम', about: 'परिचय', resources: 'संसाधन', help: 'सहायता', login: 'लॉगिन' },
        landing: {
            ...baseTranslation.landing,
            badge: 'सरकारी स्तर के कानूनी एआई',
            title1: 'अपन अधिकार ल जानव।',
            title2: 'तुरंत।',
            subtitle: 'सरल भाषा म कानूनी प्रश्न पूछव।',
            askButton: 'कानूनी सवाल पूछव',
            scanButton: 'दस्तावेज़ स्कैन करव',
            legalBasis: 'भारत के संविधान, भारतीय न्याय संहिता (BNS), BNSS अउ विशेष अधिनियम मन पर आधारित।',
            disclaimer: 'अस्वीकरण: अधिकार एआई केवल शिक्षा के काम बर जानकारी देथे।',
            featuresTitle: 'मनखे मन ला सशक्त बनाबो',
            featuresSubtitle: 'भारत के हर आदमी बर बनाए गे हे।',
            feature1Title: 'कानूनी चैट',
            feature1Desc: 'जेन चो मन म हे सवाल पूछव।',
            feature2Title: 'फोटो खिंचव',
            feature2Desc: 'कागज के फोटो खिंचव अउ अपन भाषा म जानव।',
            feature3Title: 'गोठिया के पूछव',
            feature3Desc: 'एआई ले अपन बोली म गोठियाव।',
            feature4Title: 'सही जानकारी',
            feature4Desc: 'संविधान अउ कानून ले सही जानकारी।',
            howItWorksTitle: 'ये ह कइसे काम करथे',
            step1Title: 'पूछव या स्कैन करव',
            step1Desc: 'अपन सवाल लिखव या बोलव।',
            step2Title: 'एआई जांचथे',
            step2Desc: 'हजारों कानून ल देख के जांचथे।',
            step3Title: 'सलाह पाव',
            step3Desc: 'सरल भाषा म सलाह पाव।',
            laws: {
                bns: 'बीएनएस 2023',
                bnss: 'बीएनएसएस 2023',
                consumer: 'ग्राहक कानून',
                family: 'परिवार के कानून'
            }
        },
        footer: {
            description: 'हमर लक्ष्य पूरा भारत म कानूनी जानकारी ल सबो बर सरल बनाना हे।',
            quickLinks: 'जरूरी लिंक',
            privacyPolicy: 'गोपनीयता नीति',
            termsOfService: 'सेवा के शर्त',
            legalDisclaimer: 'कानूनी अस्वीकरण',
            contactSupport: 'सहायता ले संपर्क करव',
            support: 'सहायता',
            faq: 'सवाल-जवाब',
            apiAccess: 'एपीआई एक्सेस',
            community: 'समाज',
            reportIssue: 'शिकायत करव',
            communityTitle: 'हमर कानूनी टेक समाज म जुड़व',
            communityDesc: 'कानून अउ टेक के नवा जानकारी पाव।',
            emailPlaceholder: 'ईमेल पता',
            copyright: '© 2024 अधिकार एआई टेक्नोलॉजीज प्राइवेट लिमिटेड। सबो अधिकार सुरक्षित।'
        },
        about: {
            title: 'हमर बारे म',
            intro: 'अधिकार एआई भारत के सबो मनखे बर कानूनी जानकारी ल सरल बनाए बर समर्पित हे।',
            missionTitle: 'हमर लक्ष्य',
            missionDesc: 'हमर मानना हे कि जागरूकता ले ही न्याय मिल सकथे।',
            techTitle: 'हमर तकनीक',
            techDesc: 'नवा तकनीक के मदद ले अधिकार एआई बीएनएस अउ बीएनएसएस सहित सबो कानून ल जांचथे।',
            coreValues: 'हमर सिद्धांत',
            accuracy: 'सच्चाई',
            accuracyDesc: 'सबो जवाब कानून के किताब ले जांच के दे जाथे।',
            accessibility: 'सबो बर',
            accessibilityDesc: 'गाँव अउ शहर के सबो मनखे बर अपन भाषा म उपलब्ध।',
            privacy: 'गोपनीयता',
            privacyDesc: 'तोर जानकारी ल पूरा सुरक्षित रखे जाथे।'
        },
        resources: {
            title: 'कानूनी जानकारी',
            desc: 'अपन हक ल जानव - कानून के किताब अउ सरल जानकारी ल डाउनलोड करव।',
            constitution: 'भारत के संविधान',
            bns: 'भारतीय न्याय संहिता (BNS) 2023',
            consumer: 'ग्राहक कानून 2019',
            family: 'परिवार कानून जानकारी',
            typeDocument: 'कागज',
            typeAct: 'पूरा कानून',
            typeGuide: 'सलाह',
            typeBrochure: 'जानकारी',
            size: 'साइज: {{size}}',
            download: 'पीडीएफ पाव',
            portalsTitle: 'सरकारी पोर्टल',
            portalsDesc: 'सरकारी वेबसाइट म जाके कानून के जानकारी पाव।'
        },
        help: {
            title: 'हम तोर कइसे मदद कर सकथन?',
            searchPlaceholder: 'मदद बर खोजव...',
            emailTitle: 'ईमेल मदद',
            emailDesc: '24 घंटा म जवाब पाव',
            chatTitle: 'लाइव चैट',
            chatDesc: 'बिहनिया 10 ले संझा 6 बजे तक',
            chatButton: 'गोठियाव',
            phoneTitle: 'फोन',
            phoneDesc: 'जरुरी कानूनी मदद बर',
            faqTitle: 'जरुरी सवाल-जवाब',
            faq1Q: 'का अधिकार एआई वकील के जगह ले सकथे?',
            faq1A: 'नई। अधिकार एआई सिरिफ जानकारी देथे।',
            faq2Q: 'का अधिकार एआई छत्तीसगढ़ी म काम करथे?',
            faq2A: 'हव, हम छत्तीसगढ़ी अउ हिंदी म मदद करथन।',
            faq3Q: 'जानकारी कतका सही हे?',
            faq3A: 'हम कानून के किताब ले देख के सही जानकारी देथन।',
            faq4Q: 'कागज ल कइसे स्कैन करबो?',
            faq4A: 'फोटो खींच के अपलोड करव।'
        },
        auth: {
            appName: 'अधिकार AI',
            tagline: 'तुम्हर कानूनी सहायक',
            login: 'लॉगिन',
            loginWithOtp: 'OTP ले लॉगिन करव',
            createAccount: 'खाता बनाव',
            createAccountTitle: 'अपन खाता बनाव',
            createAccountSubtitle: 'अपने कानूनी अधिकार सरल भाषा म जानव',
            fullName: 'पूरा नाम',
            fullNamePlaceholder: 'अपन पूरा नाम लिखव',
            mobileNumber: 'मोबाइल नंबर',
            mobilePlaceholder: 'मोबाइल नंबर लिखव',
            emailAddress: 'ईमेल पता',
            emailOptional: 'ईमेल पता (वैकल्पिक)',
            emailPlaceholder: 'name@example.com',
            password: 'पासवर्ड',
            confirmPassword: 'पासवर्ड फिर ले',
            forgotPassword: 'पासवर्ड भूल गए?',
            or: 'या',
            verificationCode: 'सत्यापन कोड',
            resendCode: 'कोड फिर ले भेजव',
            userPreferences: 'यूजर पसंद',
            preferredLanguage: 'पसंदीदा भाषा',
            voiceAssist: 'सुलभता बर वॉयस जवाब चालू करव',
            agreeTerms: 'मैं सेवा शर्त अउ गोपनीयता नीति ले सहमत हवं।',
            dataPrivacy: 'हम तोर डेटा ला तिसर पक्ष संग साझा नइ करन।',
            secureNote: 'तोर डेटा सुरक्षित हे',
            encryptionActive: 'एंड-टू-एंड एन्क्रिप्शन चालू हे',
            noAccount: 'खाता नइ हे?',
            haveAccount: 'पहिले ले खाता हे?',
            loginLink: 'लॉगिन',
            verifyTitle: 'अपन मोबाइल नंबर सत्यापित करव',
            verifySubtitle: 'हम +91 98765 43210 म 6 अंक के कोड भेजे हवन',
            verify: 'सत्यापित करव',
            resendIn: '{{time}} म OTP फिर ले भेजव',
            noCode: 'कोड नइ मिलिस?',
            contactSupport: 'सहायता ले संपर्क करव',
            sslNote: 'SSL सुरक्षित - AES-256 डेटा सुरक्षा',
            languageEnglish: 'English',
            languageHindi: 'हिंदी',
            languageChhattisgarhi: 'छत्तीसगढ़ी'
        },
        validation: {
            required: 'ये फ़ील्ड जरूरी हे।',
            mobileInvalid: 'सही मोबाइल number लिखव।',
            codeInvalid: '6 अंक के कोड लिखव।',
            passwordMismatch: 'पासवर्ड मिलत नइ हे।',
            termsRequired: 'कृपया शर्त अउ गोपनीयता नीति स्वीकार करव।'
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
