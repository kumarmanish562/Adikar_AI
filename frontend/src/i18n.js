import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            nav: {
                home: 'Home',
                about: 'About',
                resources: 'Resources',
                help: 'Help',
                login: 'Login'
            },
            landing: {
                badge: 'Government-grade Legal AI',
                title1: 'Know Your Rights.',
                title2: 'Instantly.',
                subtitle: 'Ask legal questions in simple language. Powered by the latest Indian laws including BNS and BNSS.',
                askButton: 'Ask a Legal Question',
                scanButton: 'Scan a Document',
                legalBasis: 'Based on the Constitution of India, Bharatiya Nyaya Sanhita (BNS), BNSS, and Specialized Acts.',
                disclaimer: 'Disclaimer: Adikar AI provides information for educational purposes only. It is not a substitute for professional legal advice from a qualified advocate. Please consult with a registered legal practitioner for specific cases.',
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
                step3Desc: 'Receive simple, actionable advice with links to official sources.'
            },
            auth: {
                appName: 'ADIKAR AI',
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
                agreeTerms: 'I agree to the Terms of Service and Privacy Policy. We explain your rights in simple language.',
                dataPrivacy: 'We do not share your data with third parties.',
                secureNote: 'Your data is private and secure',
                encryptionActive: 'End-to-end encryption active',
                noAccount: "Don't have an account?",
                haveAccount: 'Already have an account?',
                loginLink: 'Login',
                verifyTitle: 'Verify Your Mobile Number',
                verifySubtitle: "We've sent a 6-digit code to +91 98765 43210",
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
        }
    },
    hi: {
        translation: {
            nav: {
                home: 'होम',
                about: 'परिचय',
                resources: 'संसाधन',
                help: 'सहायता',
                login: 'लॉगिन'
            },
            landing: {
                badge: 'सरकारी स्तर की कानूनी एआई',
                title1: 'अपने अधिकारों को जानें।',
                title2: 'तुरंत।',
                subtitle: 'सरल भाषा में कानूनी प्रश्न पूछें। बीएनएस और बीएनएसएस सहित नवीनतम भारतीय कानूनों द्वारा संचालित।',
                askButton: 'कानूनी प्रश्न पूछें',
                scanButton: 'दस्तावेज़ स्कैन करें',
                legalBasis: 'भारत के संविधान, भारतीय न्याय संहिता (BNS), BNSS और विशेष अधिनियमों पर आधारित।',
                disclaimer: 'अस्वीकरण: अधिकार एआई केवल शैक्षिक उद्देश्यों के लिए जानकारी प्रदान करता है। यह एक योग्य अधिवक्ता से पेशेवर कानूनी सलाह का विकल्प नहीं है। कृपया विशिष्ट मामलों के लिए एक पंजीकृत कानूनी व्यवसायी से परामर्श लें।',
                featuresTitle: 'हर नागरिक को सशक्त बनाना',
                featuresSubtitle: "भारत की विविध आबादी में उच्च पहुंच और कम डिजिटल साक्षरता के लिए डिज़ाइन किया गया।",
                feature1Title: 'कानूनी चैट सहायक',
                feature1Desc: 'आपकी सभी कानूनी जरूरतों के लिए सरल प्रश्नोत्तर इंटरफेस। कोई जटिल भाषा नहीं, बस स्पष्ट उत्तर।',
                feature2Title: 'तस्वीर लें और सरल करें',
                feature2Desc: 'किसी भी कानूनी दस्तावेज़ की तस्वीर अपलोड करें और अपनी भाषा में तुरंत सारांश प्राप्त करें।',
                feature3Title: 'आवाज समर्थन',
                feature3Desc: 'एआई से अपनी मूल बोली में बात करें। हैंड्स-फ्री या कम साक्षरता वाले उपयोग के लिए बिल्कुल सही।',
                feature4Title: 'विश्वसनीय स्रोत',
                feature4Desc: 'सीधे संविधान, बीएनएस, बीएनएसएस और उपभोक्ता संरक्षण कानूनों से उद्धरण।',
                howItWorksTitle: 'यह कैसे काम करता है',
                step1Title: 'पूछें या स्कैन करें',
                step1Desc: 'अपना प्रश्न टाइप करें, अपनी आवाज़ रिकॉर्ड करें, या दस्तावेज़ की फ़ोटो अपलोड करें।',
                step2Title: 'एआई विश्लेषण करता है',
                step2Desc: 'हमारा इंजन हजारों भारतीय कानूनी कानूनों को तुरंत क्रॉस-रेफरेंस करता है।',
                step3Title: 'मार्गदर्शन प्राप्त करें',
                step3Desc: 'आधिकारिक स्रोतों के लिंक के साथ सरल, कार्रवाई योग्य सलाह प्राप्त करें।'
            },
            auth: {
                appName: 'अधिकार AI',
                tagline: 'आपका कानूनी सहायक',
                login: 'लॉगिन',
                loginWithOtp: 'OTP से लॉगिन करें',
                createAccount: 'खाता बनाएं',
                createAccountTitle: 'अपना खाता बनाएं',
                createAccountSubtitle: 'अपने कानूनी अधिकार सरल भाषा में जानें',
                fullName: 'पूरा नाम',
                fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
                mobileNumber: 'मोबाइल नंबर',
                mobilePlaceholder: 'मोबाइल नंबर दर्ज करें',
                emailAddress: 'ईमेल पता',
                emailOptional: 'ईमेल पता (वैकल्पिक)',
                emailPlaceholder: 'name@example.com',
                password: 'पासवर्ड',
                confirmPassword: 'पासवर्ड की पुष्टि करें',
                forgotPassword: 'पासवर्ड भूल गए?',
                or: 'या',
                verificationCode: 'सत्यापन कोड',
                resendCode: 'कोड फिर से भेजें',
                userPreferences: 'यूजर प्राथमिकताएं',
                preferredLanguage: 'पसंदीदा भाषा',
                voiceAssist: 'सुलभता के लिए वॉयस जवाब चालू करें',
                agreeTerms: 'मैं सेवा शर्तों और गोपनीयता नीति से सहमत हूं। हम आपके अधिकार सरल भाषा में समझाते हैं।',
                dataPrivacy: 'हम आपका डेटा किसी तीसरे पक्ष के साथ साझा नहीं करते।',
                secureNote: 'आपका डेटा सुरक्षित है',
                encryptionActive: 'एंड-टू-एंड एन्क्रिप्शन सक्रिय है',
                noAccount: 'खाता नहीं है?',
                haveAccount: 'पहले से खाता है?',
                loginLink: 'लॉगिन',
                verifyTitle: 'अपना मोबाइल नंबर सत्यापित करें',
                verifySubtitle: 'हमने +91 98765 43210 पर 6 अंकों का कोड भेजा है',
                verify: 'सत्यापित करें',
                resendIn: '{{time}} में OTP फिर से भेजें',
                noCode: 'कोड नहीं मिला?',
                contactSupport: 'सहायता से संपर्क करें',
                sslNote: 'SSL सुरक्षित - AES-256 डेटा सुरक्षा',
                languageEnglish: 'English',
                languageHindi: 'हिंदी',
                languageChhattisgarhi: 'छत्तीसगढ़ी'
            },
            validation: {
                required: 'यह फ़ील्ड आवश्यक है।',
                mobileInvalid: 'मान्य मोबाइल नंबर दर्ज करें।',
                codeInvalid: '6 अंकों का सत्यापन कोड दर्ज करें।',
                passwordMismatch: 'पासवर्ड मेल नहीं खा रहे हैं।',
                termsRequired: 'कृपया शर्तें और गोपनीयता नीति स्वीकार करें।'
            }
        }
    },
    cg: {
        translation: {
            nav: {
                home: 'होम',
                about: 'परिचय',
                resources: 'संसाधन',
                help: 'सहायता',
                login: 'लॉगिन'
            },
            landing: {
                badge: 'सरकारी स्तर के कानूनी एआई',
                title1: 'अपन अधिकार ल जानव।',
                title2: 'तुरंत।',
                subtitle: 'सरल भाषा म कानूनी प्रश्न पूछव। बीएनएस अउ बीएनएसएस सहित नवा भारतीय कानून मन ले संचालित।',
                askButton: 'कानूनी सवाल पूछव',
                scanButton: 'दस्तावेज़ स्कैन करव',
                legalBasis: 'भारत के संविधान, भारतीय न्याय संहिता (BNS), BNSS अउ विशेष अधिनियम मन पर आधारित।',
                disclaimer: 'अस्वीकरण: अधिकार एआई केवल शिक्षा के काम बर जानकारी देथे। ये ह वकील के सलाह के जगह नइ ले सकय।',
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
                step3Desc: 'सरल भाषा म सलाह पाव।'
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
                agreeTerms: 'मैं सेवा शर्त अउ गोपनीयता नीति ले सहमत हवं। हम तोर अधिकार सरल भाषा म समझाथन।',
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
    },
    bn: {
        translation: {
            nav: { login: 'লগইন' },
            landing: {
                title1: 'আপনার অধিকার জানুন।',
                title2: 'তৎক্ষণাৎ।',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    te: {
        translation: {
            nav: { login: 'లాగిన్' },
            landing: {
                title1: 'మీ హక్కులను తెలుసుకోండి.',
                title2: 'తక్షణమే.',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    mr: {
        translation: {
            nav: { login: 'लॉगिन' },
            landing: {
                title1: 'तुमचे अधिकार जाणून घ्या.',
                title2: 'ताबडतोब.',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    ta: {
        translation: {
            nav: { login: 'உள்நுழை' },
            landing: {
                title1: 'உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்।',
                title2: 'உடனடியாக।',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    gu: {
        translation: {
            nav: { login: 'લોગિન' },
            landing: {
                title1: 'તમારા અધિકારો જાણો।',
                title2: 'તરત જ।',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    ur: {
        translation: {
            nav: { login: 'لاگ ان' },
            landing: {
                title1: 'اپنے حقوق جانیں۔',
                title2: 'فوری طور پر۔',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    kn: {
        translation: {
            nav: { login: 'ಲಾಗಿನ್' },
            landing: {
                title1: 'ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ।',
                title2: 'ತಕ್ಷಣವೇ।',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    ml: {
        translation: {
            nav: { login: 'ലോഗിൻ' },
            landing: {
                title1: 'നിങ്ങളുടെ അവകാശങ്ങൾ അറിയുക।',
                title2: 'ഉടനടി।',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
        }
    },
    or: {
        translation: {
            nav: { login: 'ଲଗଇନ୍' },
            landing: {
                title1: 'ଆପଣଙ୍କ ଅଧିକାର ଜାଣନ୍ତୁ ।',
                title2: 'ତୁରନ୍ତ ।',
                featuresTitle: '',
                featuresSubtitle: '',
                feature1Title: '',
                feature1Desc: '',
                feature2Title: '',
                feature2Desc: '',
                feature3Title: '',
                feature3Desc: '',
                feature4Title: '',
                feature4Desc: '',
                howItWorksTitle: '',
                step1Title: '',
                step1Desc: '',
                step2Title: '',
                step2Desc: '',
                step3Title: '',
                step3Desc: ''
            }
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
