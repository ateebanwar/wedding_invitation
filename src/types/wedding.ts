export interface CouplePerson {
  name: string;
  urduName: string;
  relation: string;
  urduRelation: string;
  parentName: string;
  urduParentName: string;
  designation?: string;
}

export interface CoupleConnector {
  english: string;
  urdu: string;
}

export interface CoupleData {
  groom: CouplePerson;
  bride: CouplePerson;
  connector: CoupleConnector;
}

export interface InvocationData {
  arabic: string;
  english: string;
  urdu: string;
}

export interface WeddingDateData {
  date: string;
  day: string;
  urduDay: string;
  displayDate: string;
  urduDisplayDate: string;
  time: string | null;
  timeDescription: string;
  urduTimeDescription: string;
  timezone: string;
  countdownTarget: string;
}

export interface VenueData {
  name: string;
  urduName: string;
  area: string;
  urduArea: string;
  fullAddress: string;
  urduFullAddress: string;
  googleMapsUrl: string;
  latitude: number | null;
  longitude: number | null;
  coordinatesDMS?: string;
}

export interface FamilyData {
  inviteHeader: string;
  urduInviteHeader: string;
  invitePerson: string;
  urduInvitePerson: string;
  inviteRelation: string;
  urduInviteRelation: string;
  residenceHeader: string;
  urduResidenceHeader: string;
  residenceAddress: string;
  urduResidenceAddress: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  urduTitle: string;
  badge?: string;
  date: string | null;
  day: string;
  urduDay: string;
  timeDescription: string;
  urduTimeDescription: string;
  venue: string;
  urduVenue: string;
  location: string;
  urduLocation: string;
  description: string;
  urduDescription: string;
  visible: boolean;
}

export interface SectionContent {
  envelope: {
    tapInstruction: string;
    sealText: string;
    audioPrompt: string;
  };
  openingCard?: {
    tagline: string;
    bismillahArabic: string;
    bismillahEnglish: string;
    connector: string;
    scrollPrompt: string;
  };
  hero?: {
    tagline: string;
    groomName: string;
    ampersand: string;
    brideName: string;
    scrollText: string;
  };
  invitation: {
    cardTitle: string;
    nikahHeading: string;
    urduNikahHeading: string;
  };
  scratch: {
    heading: string;
    subtitle: string;
    unrevealedText: string;
    revealedHeading: string;
    buttonLabel: string;
    revealedNotice: string;
    thresholdPercent: number;
  };
  countdown: {
    heading: string;
    subtitle: string;
    labels: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    completedMessage: string;
  };
  celebrations: {
    heading: string;
    title: string;
    subtitle: string;
  };
  ceremony: {
    heading: string;
    title: string;
    subtitle: string;
    englishTabLabel: string;
    urduTabLabel: string;
    copyAddressLabel: string;
    openMapsLabel: string;
    copiedToast: string;
  };
  familySection: {
    heading: string;
    title: string;
    subtitle: string;
    blessingsFromLabel: string;
    withLoveLabel: string;
  };
  closing: {
    heading: string;
    arabicGreeting: string;
    message: string;
    urduMessage: string;
    salutation: string;
    coupleSign: string;
    duas: string;
  };
}

export interface AssetData {
  invitationCardImage?: string;
  envelopeBackground: string;
  heroBackground?: string;
  cardTexture: string;
  music: string;
}

export interface AnimationConfig {
  envelopeOpenDuration: number;
  floralPathGlowDuration: number;
  textRevealStagger: number;
  heroZoomDuration: number;
}

export interface BackgroundGradientConfig {
  angle?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  stops?: string[];
}

export interface WeddingTheme {
  backgroundGradient?: BackgroundGradientConfig;
}

export interface WeddingContent {
  version: string;
  site: {
    title: string;
    metaDescription: string;
    defaultLanguage: 'en' | 'ur';
    supportedLanguages: string[];
    mobileFirst: boolean;
  };
  couple: CoupleData;
  invocation: InvocationData;
  wedding: WeddingDateData;
  venue: VenueData;
  family: FamilyData;
  sections: SectionContent;
  events: WeddingEvent[];
  assets: AssetData;
  animation: AnimationConfig;
  theme?: WeddingTheme;
}
