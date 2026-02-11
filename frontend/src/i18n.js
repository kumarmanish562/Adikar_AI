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
                step3Desc: 'Receive simple, actionable advice with links to official sources.',
                laws: {
                    bns: 'BNS 2023',
                    bnss: 'BNSS 2023',
                    consumer: 'Consumer Laws',
                    family: 'Family Law'
                }
            },
            footer: {
                description: 'Our mission is to democratize legal information across India, making justice accessible for everyone through the power of artificial intelligence.',
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
                intro: 'Adikar AI is a mission-driven legal technology platform dedicated to making legal information accessible, understandable, and actionable for every citizen of India.',
                missionTitle: 'Our Mission',
                missionDesc: 'We believe that justice begins with awareness. Our mission is to democratize legal knowledge by translating complex legal statutes into simple, everyday language, ensuring that no one is left behind due to a lack of legal literacy.',
                techTitle: 'Our Tech',
                techDesc: 'Using state-of-the-art Retrieval-Augmented Generation (RAG) and Neural Search, Adikar AI cross-references thousands of documents, including the new Bharatiya Nyaya Sanhita (BNS) and BNSS, to provide accurate citations.',
                coreValues: 'Core Values',
                accuracy: 'Accuracy',
                accuracyDesc: 'Every answer is backed by verified legal documents and citations.',
                accessibility: 'Accessibility',
                accessibilityDesc: 'Designed for both urban and rural users, with multi-language support.',
                privacy: 'Privacy',
                privacy: 'Privacy',
                privacyDesc: 'Your legal queries are handled with the highest level of encryption and privacy.'
            },
            resources: {
                title: 'Legal Resources',
                desc: 'Access official legal documents, simplified guides, and downloadable resources to help you understand your rights.',
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
                faq1A: 'No. Adikar AI provides educational information and helps you understand legal statutes. It is not a substitute for professional legal advice from a registered advocate.',
                faq2Q: 'Does Adikar AI support regional languages?',
                faq2A: 'Currently, we support English and Hindi for both queries and document analysis. Support for more regional languages is coming soon.',
                faq3Q: 'How accurate is the legal information provided?',
                faq3A: 'Adikar AI uses a Retrieval-Augmented Generation (RAG) system that cross-references actual legal documents like the BNS, BNSS, and the Constitution. Every answer includes citations to the source document for verification.',
                faq4Q: 'How do I scan a physical legal document?',
                faq4A: 'You can use the "Scan a Document" button on the homepage to upload a photo of your document. Our AI will extract the text and provide a simplified summary.'
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
                step3Desc: 'आधिकारिक स्रोतों के लिंक के साथ सरल, कार्रवाई योग्य सलाह प्राप्त करें।',
                laws: {
                    bns: 'बीएनएस 2023',
                    bnss: 'बीएनएसएस 2023',
                    consumer: 'उपभोक्ता नियम',
                    family: 'पारिवारिक कानून'
                }
            },
            footer: {
                description: 'हमारा मिशन पूरे भारत में कानूनी जानकारी का लोकतंत्रीकरण करना है, जिससे कृत्रिम बुद्धिमत्ता की शक्ति के माध्यम से सभी के लिए न्याय सुलभ हो सके।',
                quickLinks: 'त्वरित लिंक',
                privacyPolicy: 'गोपनीयता नीति',
                termsOfService: 'सेवा की शर्तें',
                legalDisclaimer: 'कानूनी अस्वीकरण',
                contactSupport: 'सहायता से संपर्क करें',
                support: 'सहायता',
                faq: 'अक्सर पूछे जाने वाले प्रश्न',
                apiAccess: 'एपीआई एक्सेस',
                community: 'समुदाय',
                reportIssue: 'मुद्दे की रिपोर्ट करें',
                communityTitle: 'हमारे कानूनी तकनीक समुदाय में शामिल हों',
                communityDesc: 'कानूनी तकनीक और भारतीय कानूनों पर नवीनतम अपडेट प्राप्त करें।',
                emailPlaceholder: 'ईमेल पता',
                copyright: '© 2024 अधिकार एआई टेक्नोलॉजीज प्राइवेट लिमिटेड। सर्वाधिकार सुरक्षित।'
            },
            about: {
                title: 'हमारे बारे में',
                intro: 'अधिकार एआई एक मिशन-संचालित कानूनी तकनीक मंच है जो भारत के हर नागरिक के लिए कानूनी जानकारी को सुलभ, समझने योग्य और कार्रवाई योग्य बनाने के लिए समर्पित है।',
                missionTitle: 'हमारा मिशन',
                missionDesc: 'हमारा मानना है कि न्याय की शुरुआत जागरूकता से होती है। हमारा मिशन जटिल कानूनी कानूनों को सरल, रोजमर्रा की भाषा में अनुवाद करके कानूनी ज्ञान का लोकतंत्रीकरण करना है।',
                techTitle: 'हमारी तकनीक',
                techDesc: 'अत्याधुनिक जनरेटिव एआई का उपयोग करते हुए, अधिकार एआई भारतीय न्याय संहिता (बीएनएस) और बीएनएसएस सहित हजारों दस्तावेजों को क्रॉस-रेफरेंस करता है।',
                coreValues: 'मुख्य विचार',
                accuracy: 'सटीकता',
                accuracyDesc: 'हर उत्तर सत्यापित कानूनी दस्तावेजों और उद्धरणों द्वारा समर्थित है।',
                accessibility: 'सुलभता',
                accessibilityDesc: 'बहु-भाषा समर्थन के साथ, शहरी और ग्रामीण दोनों उपयोगकर्ताओं के लिए डिज़ाइन किया गया।',
                privacy: 'गोपनीयता',
                privacyDesc: 'आपके कानूनी प्रश्नों को एन्क्रिप्शन और गोपनीयता के उच्चतम स्तर के साथ संभाला जाता है।'
            },
            resources: {
                title: 'कानूनी संसाधन',
                desc: 'अपने अधिकारों को समझने में आपकी मदद करने के लिए आधिकारिक कानूनी दस्तावेजों, सरलीकृत गाइडों और डाउनलोड करने योग्य संसाधनों तक पहुंचें।',
                constitution: 'भारत का संविधान',
                bns: 'भारतीय न्याय संहिता (BNS) 2023',
                consumer: 'उपभोक्ता संरक्षण अधिनियम 2019',
                family: 'पारिवारिक कानून पुस्तिका',
                typeDocument: 'दस्तावेज़',
                typeAct: 'पूर्ण अधिनियम',
                typeGuide: 'मार्गदर्शिका',
                typeBrochure: 'विवरणिका',
                size: 'आकार: {{size}}',
                download: 'पीडीएफ डाउनलोड करें',
                portalsTitle: 'आधिकारिक पोर्टल',
                portalsDesc: 'व्यापक कानूनी जानकारी के लिए इन आधिकारिक सरकारी वेबसाइटों पर जाएं।'
            },
            help: {
                title: 'हम आपकी कैसे मदद कर सकते हैं?',
                searchPlaceholder: 'सहायता लेख, अक्सर पूछे जाने वाले प्रश्न खोजें...',
                emailTitle: 'ईमेल सहायता',
                emailDesc: '24 घंटे के भीतर जवाब',
                chatTitle: 'लाइव चैट',
                chatDesc: 'उपलब्ध सुबह 10 बजे - शाम 6 बजे IST',
                chatButton: 'चैट शुरू करें',
                phoneTitle: 'फोन',
                phoneDesc: 'आपातकालीन कानूनी सहायता',
                faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
                faq1Q: 'क्या अधिकार एआई एक वकील का विकल्प है?',
                faq1A: 'नहीं। अधिकार एआई शैक्षिक जानकारी प्रदान करता है और आपको कानूनी कानूनों को समझने में मदद करता है। यह एक योग्य अधिवक्ता से पेशेवर कानूनी सलाह का विकल्प नहीं है।',
                faq2Q: 'क्या अधिकार एआई क्षेत्रीय भाषाओं का समर्थन करता है?',
                faq2A: 'वर्तमान में, हम प्रश्नों और दस्तावेज़ विश्लेषण दोनों के लिए अंग्रेजी और हिंदी का समर्थन करते हैं। अधिक क्षेत्रीय भाषाओं के लिए समर्थन जल्द ही आ रहा है।',
                faq3Q: 'प्रदान की गई कानूनी जानकारी कितनी सटीक है?',
                faq3A: 'अधिकार एआई एक उन्नत प्रणाली का उपयोग करता है जो बीएनएस, बीएनएसएस और संविधान जैसे वास्तविक कानूनी दस्तावेजों को क्रॉस-रेफरेंस करता है। हर जवाब में सत्यापन के लिए स्रोत दस्तावेज का उद्धरण शामिल होता है।',
                faq4Q: 'मैं एक भौतिक कानूनी दस्तावेज को कैसे स्कैन करूँ?',
                faq4A: 'आप अपने दस्तावेज़ की फ़ोटो अपलोड करने के लिए होमपेज पर "दस्तावेज़ स्कैन करें" बटन का उपयोग कर सकते हैं। हमारा एआई टेक्स्ट निकालेगा और एक सरलीकृत सारांश प्रदान करेगा।'
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
                step3Desc: 'सरल भाषा म सलाह पाव।',
                laws: {
                    bns: 'बीएनएस 2023',
                    bnss: 'बीएनएसएस 2023',
                    consumer: 'ग्राहक कानून',
                    family: 'परिवार के कानून'
                }
            },
            footer: {
                description: 'हमर लक्ष्य पूरा भारत म कानूनी जानकारी ल सबो बर सरल बनाना हे, ताकि एआई के मदद ले सबला न्याय मिल सकय।',
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
                missionDesc: 'हमर मानना हे कि जागरूकता ले ही न्याय मिल सकथे। हमर लक्ष्य कानून ल सरल भाषा म सब तक पहुँचाना हे।',
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
                faq1A: 'नई। अधिकार एआई सिरिफ जानकारी देथे। ये ह वकील के सलाह नई ए।',
                faq2Q: 'का अधिकार एआई छत्तीसगढ़ी म काम करथे?',
                faq2A: 'हव, हम छत्तीसगढ़ी अउ हिंदी म मदद करथन।',
                faq3Q: 'जानकारी कतका सही हे?',
                faq3A: 'हम कानून के किताब ले देख के सही जानकारी देथन।',
                faq4Q: 'कागज ल कइसे स्कैन करबो?',
                faq4A: 'फोटो खींच के अपलोड करव, एआई ह ओला सरल भाषा म बता दी।'
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
            nav: {
                home: 'হোম',
                about: 'সম্পর্কে',
                resources: 'সম্পদ',
                help: 'সাহায্য',
                login: 'লগইন'
            },
            landing: {
                badge: 'সরকারি-স্তরের আইনি এআই',
                title1: 'আপনার অধিকার জানুন।',
                title2: 'তৎক্ষণাৎ।',
                subtitle: 'সরল ভাষায় আইনি প্রশ্ন জিজ্ঞাসা করুন। বিএনএস এবং বিএনএসএস সহ সর্বশেষ ভারতীয় আইন দ্বারা চালিত।',
                askButton: 'একটি আইনি প্রশ্ন জিজ্ঞাসা করুন',
                scanButton: 'একটি নথি স্ক্যান করুন',
                legalBasis: 'ভারতের সংবিধান, ভারতীয় ন্যায় সংহিতা (বিএনএস), বিএনএসএস এবং বিশেষ আইনের ওপর ভিত্তি করে।',
                disclaimer: 'দাবিত্যাগ: অধিকার এআই শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে তথ্য প্রদান করে। এটি একজন যোগ্য আইনজীবীর পেশাদার আইনি পরামর্শের বিকল্প নয়।',
                featuresTitle: 'প্রতিটি নাগরিককে ক্ষমতায়ন করা',
                featuresSubtitle: 'ভারতের বৈচিত্র্যময় জনসংখ্যার সহজলভ্যতা এবং নিম্ন ডিজিটাল সাক্ষরতার জন্য ডিজাইন করা হয়েছে।',
                feature1Title: 'আইনি চ্যাট সহকারী',
                feature1Desc: 'আপনার সমস্ত আইনি প্রয়োজনের জন্য সহজ প্রশ্নোত্তর ইন্টারফেস। কোনো জটিল ভাষা নয়, শুধু পরিষ্কার উত্তর।',
                feature2Title: 'ছবি তুলুন এবং সহজ করুন',
                feature2Desc: 'আপনার ভাষায় তাৎক্ষণিক সারাংশ পেতে যেকোনো আইনি নথির একটি ফটো আপলোড করুন।',
                feature3Title: 'ভয়েস সাপোর্ট',
                feature3Desc: 'আপনার মাতৃভাষায় এআই-এর সাথে কথা বলুন। হ্যান্ডস-ফ্রি বা কম-সাক্ষর ব্যবহারের জন্য উপযুক্ত।',
                feature4Title: 'নির্ভরযোগ্য উৎস',
                feature4Desc: 'সরাসরি সংবিধান, বিএনএস, বিএনএসএস এবং ভোক্তা সুরক্ষা আইন থেকে উদ্ধৃতি।',
                howItWorksTitle: 'এটি কিভাবে কাজ করে',
                step1Title: 'জিজ্ঞাসা বা স্ক্যান',
                step1Desc: 'আপনার প্রশ্ন টাইপ করুন, আপনার ভয়েস রেকর্ড করুন বা নথির ফটো আপলোড করুন।',
                step2Title: 'এআই বিশ্লেষণ',
                step2Desc: 'আমাদের ইঞ্জিন তাৎক্ষণিকভাবে হাজার হাজার ভারতীয় আইনি সংবিধি ক্রস-রেফারেন্স করে।',
                step3Title: 'নির্দেশনা পান',
                step3Desc: 'অফিসিয়াল সোর্সের লিঙ্ক সহ সহজ, কার্যকরী পরামর্শ পান।'
            },
            footer: {
                description: 'আমাদের লক্ষ্য হল সমগ্র ভারতে আইনি তথ্যের গণতন্ত্রীকরণ করা, কৃত্রিম বুদ্ধিমত্তার শক্তির মাধ্যমে সবার জন্য ন্যায়বিচার সহজলভ্য করা।',
                quickLinks: 'দ্রুত লিঙ্ক',
                privacyPolicy: 'গোপনীয়তা নীতি',
                termsOfService: 'পরিষেবার শর্তাবলী',
                legalDisclaimer: 'আইনি দাবিত্যাগ',
                contactSupport: 'সহায়তার সাথে যোগাযোগ করুন',
                support: 'সহায়তা',
                faq: 'সাধারণ জিজ্ঞাসা (FAQ)',
                apiAccess: 'এপিআই অ্যাক্সেস',
                community: 'কমিউনিটি',
                reportIssue: 'সমস্যা রিপোর্ট করুন',
                communityTitle: 'আমাদের আইনি প্রযুক্তি কমিউনিটিতে যোগ দিন',
                communityDesc: 'আইনি প্রযুক্তি এবং ভারতীয় আইনের লেটেস্ট আপডেট পান।',
                emailPlaceholder: 'ইমেল ঠিকানা',
                copyright: '© ২০২৪ অধিকার এআই টেকনোলজিস প্রাইভেট লিমিটেড। সর্বস্বত্ব সংরক্ষিত।'
            },
            auth: {
                appName: 'অধিকর এআই',
                tagline: 'আপনার আইনি সহকারী অ্যাক্সেস করুন',
                login: 'লগইন',
                languageEnglish: 'English',
                languageHindi: 'Hindi',
                languageChhattisgarhi: 'Chhattisgarhi'
            }
        }
    },
    te: {
        translation: {
            nav: { home: 'హోమ్', about: 'గురించి', resources: 'వనరులు', help: 'సহాయం', login: 'లాగిన్' },
            landing: {
                badge: 'ప్రభుత్వ స్థాయి లీగల్ AI',
                title1: 'మీ హక్కులను తెలుసుకోండి.',
                title2: 'తక్షణమే.',
                subtitle: 'సాధారణ భాషలో చట్టపరమైన ప్రశ్నలను అడగండి.'
            },
            resources: { title: 'చట్టపరమైన వనరులు' },
            help: { title: 'మేము మీకు ఎలా సహాయం చేయగలము?' }
        }
    },
    mr: {
        translation: {
            nav: { home: 'होम', about: 'बद्दल', resources: 'संसाधने', help: 'मदत', login: 'लॉगिन' },
            landing: {
                badge: 'सरकारी दर्जाचे लीगल AI',
                title1: 'तुमचे अधिकार जाणून घ्या.',
                title2: 'ताबडतोब.',
                subtitle: 'सोप्या भाषेत कायदेशीर प्रश्न विचारा.'
            },
            resources: { title: 'कायदेशीर संसाधने' },
            help: { title: 'आम्ही तुम्हाला कशी मदत करू शकतो?' }
        }
    },
    ta: {
        translation: {
            nav: { home: 'முகப்பு', about: 'பற்றி', resources: 'வளங்கள்', help: 'உதவி', login: 'உள்நுழை' },
            landing: {
                badge: 'அரசு தரத்திலான சட்ட AI',
                title1: 'உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்।',
                title2: 'உடனடியாக।',
                subtitle: 'எளிய மொழியில் சட்டக் கேள்விகளைக் கேளுங்கள்.'
            },
            resources: { title: 'சட்ட வளங்கள்' },
            help: { title: 'நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?' }
        }
    },
    gu: {
        translation: {
            nav: { home: 'હોમ', about: 'વિશે', resources: 'સંસાધનો', help: 'મદદ', login: 'લોગિન' },
            landing: {
                badge: 'સરકારી ગ્રેડ લીગલ AI',
                title1: 'તમારા અધિકારો જાણો।',
                title2: 'તરત જ।',
                subtitle: 'સરળ ભાષામાં કાયદાકીય પ્રશ્ன்கள் પૂછો.'
            },
            resources: { title: 'કાયદાકીય સંસાધનો' },
            help: { title: 'અમે ਤੁહਾਨੂੰ કેવી રીતે મદદ કરી શકીએ?' }
        }
    },
    ur: {
        translation: {
            nav: { home: 'ہوم', about: 'بارے میں', resources: 'وسائل', help: 'مدد', login: 'لاگ ইন' },
            landing: {
                badge: 'سرکاری درجے کا قانونی AI',
                title1: 'اپنے حقوق جانیں۔',
                title2: 'فوری طور پر।',
                subtitle: 'سادہ زبان میں قانونی سوالات پوچھیں۔'
            },
            resources: { title: 'قانونی وسائل' },
            help: { title: 'ہم آپ کی کیسے مدد کر سکتے ہیں؟' }
        }
    },
    kn: {
        translation: {
            nav: { home: 'ಹೋಮ್', about: 'ಬಗ್ಗೆ', resources: 'ಸಂಪನ್ಮೂಲಗಳು', help: 'ಸಹಾಯ', login: 'ಲಾಗಿನ್' },
            landing: {
                badge: 'ಸರ್ಕಾರಿ ದರ್ಜೆಯ ಕಾನೂನು AI',
                title1: 'ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ।',
                title2: 'ತಕ್ಷಣವೇ।',
                subtitle: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.'
            },
            resources: { title: 'ಕಾನೂನು ಸಂಪನ್ಮೂಲಗಳು' },
            help: { title: 'ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?' }
        }
    },
    ml: {
        translation: {
            nav: { home: 'ഹോം', about: 'കുറിച്ച്', resources: 'വിഭവങ്ങൾ', help: 'സഹായം', login: 'ലോഗിൻ' },
            landing: {
                badge: 'സർക്കാർ തലത്തിലുള്ള ലീഗൽ AI',
                title1: 'നിങ്ങളുടെ അവകാശങ്ങൾ അറിയുക।',
                title2: 'ഉടനടി।',
                subtitle: 'ലളിതമായ ഭാഷയിൽ നിയമപരമായ ചോദ്യങ്ങൾ ചോദിക്കുക.'
            },
            resources: { title: 'നിയമപരമായ വിഭവങ്ങൾ' },
            help: { title: 'ഞങ്ങൾക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?' }
        }
    },
    or: {
        translation: {
            nav: { login: 'ଲଗଇନ୍' },
            landing: {
                title1: 'ଆପଣଙ୍କ ଅଧିକାର ଜାଣନ୍ତୁ ।',
                title2: 'ତୁରন্ত ।'
            }
        }
    },
    pa: {
        translation: {
            nav: { home: 'ਹੋਮ', about: 'ਬਾਰੇ', resources: 'ਸਰੋਤ', help: 'ਮਦਦ', login: 'ਲੌਗਇਨ' },
            landing: {
                badge: 'ਸਰਕਾਰੀ ਪੱਧਰ ਦਾ ਕਾਨੂੰਨੀ AI',
                title1: 'ਆਪਣਾ ਅਧਿਕਾਰ ਜਾਣੋ।',
                title2: 'ਤੁਰੰਤ।',
                subtitle: 'ਸਧਾਰਨ ਭਾਸ਼ਾ ਵਿੱਚ ਕਾਨੂੰਨੀ ਸਵਾਲ ਪੁੱਛੋ।'
            },
            resources: { title: 'ਕਾਨੂੰਨੀ ਸਰੋਤ' },
            help: { title: 'ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?' }
        }
    },
    as: {
        translation: {
            nav: { home: 'হোম', about: 'সম্পর্কে', resources: 'সম্পদ', help: 'সহায়', login: 'লগইন' },
            landing: {
                badge: 'চৰকাৰী পৰ্যায়ৰ আইনী AI',
                title1: 'আপোনাৰ অধিকাৰ জানক।',
                title2: 'তৎক্ষণাৎ।',
                subtitle: 'সহজ ভাষাত আইনী প্ৰশ্ন সোধক।'
            },
            resources: { title: 'আইনী সম্পদ' },
            help: { title: 'আমি আপোনাক কেনেকৈ সহায় কৰিব পাৰো?' }
        }
    },
    mai: {
        translation: {
            nav: { home: 'होम', about: 'परिचय', resources: 'संसाधन', help: 'सहायता', login: 'लॉगिन' },
            landing: {
                badge: 'सरकारी स्तरक कानूनी AI',
                title1: 'अपन अधिकार जानू।',
                title2: 'तुरंत।',
                subtitle: 'सरल भाषामे कानूनी प्रश्न पूछू।'
            },
            resources: { title: 'कानूनी संसाधन' },
            help: { title: 'हम अहाँक कते सहायता কऽ सकै छी?' }
        }
    },
    sat: {
        translation: {
            nav: { home: 'ᱦᱳᱢ', about: 'ᱵᱟᱵᱚᱛ', resources: 'ᱥᱚᱢᱯᱚᱫᱽ', help: 'ᱜᱚᱲᱚ', login: 'ᱞᱚᱜᱤᱱ' },
            landing: {
                badge: 'ᱥᱚᱨᱠᱟᱨᱤ ᱞᱮᱵᱮᱞ ᱠᱟᱹᱱᱩᱱᱤ AI',
                title1: 'ᱟᱢᱟᱜ ᱚᱫᱷᱤᱠᱟᱨ ᱵᱟᱰᱟᱭ ᱢᱮ᱾',
                title2: 'ᱞᱚᱜᱚᱱ ᱜᱮ᱾',
                subtitle: 'ᱥᱟᱫᱷᱟᱨᱚᱱ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱠᱟᱹᱱᱩᱱᱤ ᱠᱩᱠլᱤ ᱠᱩᱞᱤ ᱢᱮ᱾'
            },
            resources: { title: 'ᱠᱟᱹᱱᱩᱱᱤ ᱥᱚᱢᱯᱚᱫᱽ' },
            help: { title: 'ᱟᱞᱮ ᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟ ᱞᱮ ᱜᱚᱲᱚ ᱟᱢᱟ?' }
        }
    },
    ks: {
        translation: {
            nav: { home: 'ہوم', about: 'بارے میں', resources: 'وسائل', help: 'مدد', login: 'لاگ اِن' },
            landing: {
                badge: 'سرکاری درجے کا قانونی AI',
                title1: 'پَنُن حق زأنِیو।',
                title2: 'فوراً।',
                subtitle: 'آسان زبان میں قانونی سوالات پوچھیں۔'
            },
            resources: { title: 'قانونی وسائل' },
            help: { title: 'ہم آپ کی کیسے مدد کر سکتے ہیں؟' }
        }
    },
    ne: {
        translation: {
            nav: { home: 'होम', about: 'बारेमा', resources: 'स्रोत', help: 'सहायता', login: 'लगইন' },
            landing: {
                badge: 'सरकारी स्तरको कानूनी AI',
                title1: 'आफ्नो अधिकार जान्नुहोस्।',
                title2: 'तत्काल।',
                subtitle: 'सरल भाषामा कानूनी प्रश्नहरू सोध्नुहोस्।'
            },
            resources: { title: 'कानूनी स्रोतहरू' },
            help: { title: 'हामी तपाईंलाई कसरी मद्दत गर्न सक्छौं?' }
        }
    },
    sd: {
        translation: {
            nav: { home: 'ہوم', about: 'باري ۾', resources: 'وسائل', help: 'مدد', login: 'لاگ ان' },
            landing: {
                badge: 'سرڪاري سطح جو قانوني AI',
                title1: 'پنهنجا حق ڄาڻੋ.',
                title2: 'فوري طور تي.',
                subtitle: 'سادي ٻوليءَ ۾ قانوني سوال پڇو.'
            },
            resources: { title: 'قانوني وسيلا' },
            help: { title: 'اسان توهان جي مدد ڪيئن ڪري سگهون ٿا؟' }
        }
    },
    kok: {
        translation: {
            nav: { home: 'होम', about: 'विशीं', resources: 'साधन', help: 'मदत', login: 'लॉगिन' },
            landing: {
                badge: 'सरकारी पांवड्याचो कायदेशीर AI',
                title1: 'तुमचो अधिकार जाणून घेयात.',
                title2: 'बेगीन.',
                subtitle: 'साध्या भाशेंत कायदेशीर प्रश्न विचारात.'
            },
            resources: { title: 'कायदेशीर साधનાં' },
            help: { title: 'आमी तुमकां कशी मदत करूंक शकतात?' }
        }
    },
    doi: {
        translation: {
            nav: { home: 'होम', about: 'बारे च', resources: 'साधन', help: 'मदद', login: 'लॉगिन' },
            landing: {
                badge: 'सरकारी स्तर दा कानूनी AI',
                title1: 'अपना अधिकार जानो।',
                title2: 'तुरंत।',
                subtitle: 'सरल भाशा च कानूनी सवाल पुच्छो।'
            },
            resources: { title: 'कानूनी साधन' },
            help: { title: 'अस तुंदी कीं मदद करी सकदे आं?' }
        }
    },
    mni: {
        translation: {
            nav: { home: 'হোম', about: 'মরমদা', resources: 'রিসোর্স', help: 'মতেং', login: 'লোগিন' },
            landing: {
                badge: 'সরকারগী থাক্কী লিগেল AI',
                title1: 'অদোমগী হক খঙবীয়ু।',
                title2: 'অথুবা মরমদা।',
                subtitle: 'চাম্বা লোলদা লিগেল ক্বেশ্চনশিং হঙবীয়ু।'
            },
            resources: { title: 'লিগেল রিসোর্সশিং' },
            help: { title: 'আইখোয়না অদোমবু করম্না মতেং পাংগদগে?' }
        }
    },
    brx: {
        translation: {
            nav: { login: 'লগইন' },
            landing: {
                title1: 'गावनि मोनथायखौ मिथिना ला।',
                title2: 'हरखाাব।'
            }
        }
    },
    sa: {
        translation: {
            nav: { home: 'मुख्यपृष्ठम्', about: 'विषये', resources: 'संसाधनानि', help: 'सहायता', login: 'प्रवेशः' },
            landing: {
                badge: 'सर्वकार-स्तरीय न्यायिक AI',
                title1: 'स्वकीयम् अधिकारं जानीत।',
                title2: 'तत्क्षणमेव।',
                subtitle: 'सरलभाषायां न्यायिकप्रश्नान् पृच्छन्तु।'
            },
            resources: { title: 'न्यायिकसंसाधनानि' },
            help: { title: 'वयं भवतां कथं साहाय्यं कर्तुं शक्नुमः?' }
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
