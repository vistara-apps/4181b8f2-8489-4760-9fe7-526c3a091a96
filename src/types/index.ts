// Core data model types based on specifications

export interface User {
  userId: string;
  walletAddress?: string;
  preferredLanguage: 'en' | 'es';
  currentState: string;
  notificationPreferences: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface RightsGuide {
  guideId: string;
  state: string;
  content: {
    title: string;
    sections: RightsSection[];
    lastUpdated: Date;
  };
  language: 'en' | 'es';
  createdAt: Date;
  updatedAt: Date;
}

export interface RightsSection {
  id: string;
  title: string;
  content: string;
  type: 'do' | 'dont' | 'info' | 'script';
  priority: number;
}

export interface Encounter {
  encounterId: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude?: number;
    longitude?: number;
    address?: string;
    state: string;
  };
  audioUrl?: string;
  videoUrl?: string;
  scriptUsed?: string[];
  generatedCardUrl?: string;
  status: 'recording' | 'processing' | 'completed' | 'failed';
  duration?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShareableCard {
  cardId: string;
  encounterId: string;
  content: {
    title: string;
    summary: string;
    timestamp: Date;
    location: string;
    keyPoints: string[];
  };
  imageUrl: string;
  shareUrl: string;
  timestamp: Date;
  isPublic: boolean;
  createdAt: Date;
}

export interface ScriptResponse {
  id: string;
  category: 'traffic_stop' | 'search' | 'arrest' | 'general';
  situation: string;
  response: string;
  language: 'en' | 'es';
  priority: number;
  doSay: boolean; // true for "do say", false for "don't say"
}

// UI Component Props
export interface AppHeaderProps {
  variant?: 'default';
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export interface StateGuideCardProps {
  variant?: 'default' | 'compact';
  guide: RightsGuide;
  onSelect?: (guide: RightsGuide) => void;
}

export interface ScriptButtonProps {
  variant?: 'primary' | 'secondary';
  script: ScriptResponse;
  onSelect?: (script: ScriptResponse) => void;
  disabled?: boolean;
}

export interface RecordButtonProps {
  variant?: 'floating_action';
  isRecording: boolean;
  onToggleRecording: () => void;
  disabled?: boolean;
}

export interface ShareableCardDisplayProps {
  variant?: 'default';
  card: ShareableCard;
  onShare?: (card: ShareableCard) => void;
  onEdit?: (card: ShareableCard) => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface GenerateScriptRequest {
  situation: string;
  language: 'en' | 'es';
  state: string;
  category: ScriptResponse['category'];
}

export interface GenerateCardRequest {
  encounterId: string;
  audioTranscript?: string;
  location: string;
  timestamp: Date;
  duration?: number;
}

// Utility Types
export type Language = 'en' | 'es';
export type RecordingStatus = 'idle' | 'recording' | 'processing' | 'completed' | 'error';
export type AppTheme = 'light' | 'dark' | 'system';

// State Management
export interface AppState {
  user: User | null;
  currentGuide: RightsGuide | null;
  activeEncounter: Encounter | null;
  recordingStatus: RecordingStatus;
  language: Language;
  selectedState: string;
  isLoading: boolean;
  error: string | null;
}

// Form Types
export interface OnboardingForm {
  preferredLanguage: Language;
  currentState: string;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
}

export interface EncounterForm {
  location: string;
  notes?: string;
  isEmergency: boolean;
}

