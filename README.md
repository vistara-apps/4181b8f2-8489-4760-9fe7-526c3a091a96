# KnowYourRights.cards

**Your Pocket Guide to Legal Rights During Encounters**

A production-ready Next.js Base Mini App that provides mobile-optimized, state-specific legal rights information and encounter documentation tools for individuals during police interactions.

## 🚀 Features

### Core Features

1. **State-Specific Know-Your-Rights Guides**
   - Mobile-optimized, one-page guides detailing legal rights and best practices
   - Tailored to specific states with accurate legal information
   - Available in English and Spanish

2. **Scripted Responses & Phrases**
   - Ready-to-use scripts for common police interaction scenarios
   - "What to say" and "what not to say" guidance
   - Multilingual support (English and Spanish initially)

3. **One-Tap Incident Recording & Sharing**
   - Discreet button to quickly start audio/video recording
   - Secure storage on IPFS and Arweave for permanence
   - Automatic generation of shareable summary cards

4. **Auto-Generated Shareable Cards**
   - AI-powered processing of encounter data
   - Creates concise, objective summaries
   - Easy sharing with trusted contacts or legal representatives

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom components
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4 via Vercel AI SDK
- **Storage**: IPFS (Pinata) + Arweave for permanent storage
- **Authentication**: Supabase Auth
- **Payments**: Stripe (for premium features)

## 📱 Design System

### Colors
- **Background**: `hsl(220, 15%, 95%)`
- **Primary**: `hsl(210, 95%, 50%)`
- **Accent**: `hsl(130, 70%, 45%)`
- **Surface**: `hsl(0, 0%, 100%)`
- **Text Primary**: `hsl(220, 15%, 20%)`
- **Text Secondary**: `hsl(220, 15%, 50%)`

### Layout
- **Container**: `px-4 py-6 max-w-sm mx-auto`
- **Grid**: 2-column layout for guides, single column for interactions
- **Motion**: 200ms ease-in-out transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- Pinata account (for IPFS)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd knowyourrights-cards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Pinata (IPFS)
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_API_KEY=your_pinata_secret_api_key

   # Stripe (optional)
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Users
```sql
CREATE TABLE users (
  userId TEXT PRIMARY KEY,
  walletAddress TEXT,
  preferredLanguage TEXT DEFAULT 'en',
  currentState TEXT,
  notificationPreferences JSONB,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Rights Guides
```sql
CREATE TABLE rights_guides (
  guideId TEXT PRIMARY KEY,
  state TEXT NOT NULL,
  content JSONB NOT NULL,
  language TEXT DEFAULT 'en',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Encounters
```sql
CREATE TABLE encounters (
  encounterId TEXT PRIMARY KEY,
  userId TEXT REFERENCES users(userId),
  timestamp TIMESTAMP DEFAULT NOW(),
  location JSONB,
  audioUrl TEXT,
  videoUrl TEXT,
  scriptUsed TEXT[],
  generatedCardUrl TEXT,
  status TEXT DEFAULT 'recording',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Shareable Cards
```sql
CREATE TABLE shareable_cards (
  cardId TEXT PRIMARY KEY,
  encounterId TEXT REFERENCES encounters(encounterId),
  content JSONB NOT NULL,
  imageUrl TEXT,
  shareUrl TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  isPublic BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

## 🔌 API Endpoints

### AI Services
- `POST /api/ai/generate-scripts` - Generate contextual scripts
- `POST /api/ai/generate-card` - Create shareable cards

### Storage Services  
- `POST /api/storage/ipfs` - Upload files to IPFS
- `POST /api/storage/arweave` - Store data permanently

### Encounters
- `GET /api/encounters` - List user encounters
- `POST /api/encounters` - Create new encounter
- `GET /api/encounters/[id]` - Get encounter details
- `PUT /api/encounters/[id]` - Update encounter
- `DELETE /api/encounters/[id]` - Delete encounter

## 🎯 User Flows

### 1. Onboarding & Guide Selection
1. User opens the app
2. App detects user's location (or prompts for state)
3. User is presented with state-specific rights guide
4. Option to save/favorite the guide

### 2. Encounter Documentation
1. User initiates recording via prominent button
2. App starts audio/video recording discreetly
3. User can access scripted responses during recording
4. User ends recording
5. App processes recording and generates shareable card
6. User can review, save, or share the card

### 3. Content Sharing
1. User generates a shareable card
2. User clicks share button
3. App provides multiple sharing options
4. Card can be shared via social media, messaging, etc.

## 🔒 Security & Privacy

- **End-to-end encryption** for sensitive recordings
- **Decentralized storage** on IPFS and Arweave
- **No tracking** of user locations or personal data
- **Open source** for transparency and community review
- **GDPR compliant** data handling

## 🌍 Internationalization

Currently supports:
- **English** (en)
- **Spanish** (es)

Additional languages can be added by:
1. Adding translations to `/src/data/rights-guides.ts`
2. Adding script responses to `/src/data/script-responses.ts`
3. Updating the language selector in components

## 💰 Business Model

**Freemium with Micro-transactions**
- Basic guides and recording: **Free**
- Enhanced features: **$1-5 micro-transactions**
  - Unlimited recording storage
  - Advanced scripting
  - Direct legal connections
  - Premium state guides

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Disclaimer

This app provides general legal information only and is not a substitute for professional legal advice. Laws vary by jurisdiction and change over time. Users should consult with qualified attorneys for specific legal guidance.

## 🆘 Support

- **Documentation**: [docs.knowyourrights.cards](https://docs.knowyourrights.cards)
- **Issues**: [GitHub Issues](https://github.com/your-org/knowyourrights-cards/issues)
- **Community**: [Discord](https://discord.gg/knowyourrights)
- **Email**: support@knowyourrights.cards

---

**Built with ❤️ for civil rights and community safety**

