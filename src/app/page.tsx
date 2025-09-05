'use client';

import React from 'react';
import { MapPin, MessageSquare, Video, Share2, Settings, Shield, AlertTriangle } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { StateGuideCard } from '@/components/features/StateGuideCard';
import { RecordButton } from '@/components/features/RecordButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SAMPLE_RIGHTS_GUIDES, getRightsGuide } from '@/data/rights-guides';
import { getCurrentLocation, getStateFromCoordinates, getBrowserLanguage } from '@/utils';
import { RightsGuide, Language } from '@/types';

export default function HomePage() {
  const [currentState, setCurrentState] = React.useState<string>('California');
  const [language, setLanguage] = React.useState<Language>('en');
  const [currentGuide, setCurrentGuide] = React.useState<RightsGuide | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize app on mount
  React.useEffect(() => {
    const initializeApp = async () => {
      try {
        // Set browser language
        const browserLang = getBrowserLanguage();
        setLanguage(browserLang);

        // Try to get user's location
        try {
          const position = await getCurrentLocation();
          const state = await getStateFromCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          if (state && state !== 'Unknown') {
            setCurrentState(state);
          }
        } catch (error) {
          console.log('Location access denied or failed, using default state');
        }

        // Load initial guide
        const guide = getRightsGuide(currentState, browserLang);
        setCurrentGuide(guide);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Update guide when state or language changes
  React.useEffect(() => {
    const guide = getRightsGuide(currentState, language);
    setCurrentGuide(guide);
  }, [currentState, language]);

  const handleGuideSelect = (guide: RightsGuide) => {
    setCurrentGuide(guide);
    // Navigate to guide detail page (would be implemented with Next.js router)
    console.log('Navigate to guide:', guide.guideId);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // Recording logic would be implemented here
    console.log('Toggle recording:', !isRecording);
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:911';
  };

  const handleScriptsAccess = () => {
    // Navigate to scripts page
    console.log('Navigate to scripts');
  };

  const handleHistoryAccess = () => {
    // Navigate to encounter history
    console.log('Navigate to history');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <Shield className="h-12 w-12 text-accent mx-auto animate-pulse" />
          <p className="text-textSecondary">Loading your rights guide...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <AppHeader />
      
      <main className="container space-y-6 pb-24">
        {/* Welcome Section */}
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-display text-textPrimary">
            Know Your Rights
          </h1>
          <p className="text-body text-textSecondary">
            Stay informed and protected during police encounters
          </p>
        </div>

        {/* Emergency Alert */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900">Emergency?</h3>
                <p className="text-sm text-red-700 mt-1">
                  If you're in immediate danger, call 911 first.
                </p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleEmergencyCall}
                >
                  Call 911
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current State Guide */}
        {currentGuide && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-heading text-textPrimary">Your State Guide</h2>
              <div className="flex items-center gap-2 text-sm text-textSecondary">
                <MapPin className="h-4 w-4" />
                <span>{currentState}</span>
              </div>
            </div>
            <StateGuideCard 
              guide={currentGuide} 
              onSelect={handleGuideSelect}
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-heading text-textPrimary">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleScriptsAccess}>
              <CardContent className="p-4 text-center space-y-2">
                <MessageSquare className="h-8 w-8 text-accent mx-auto" />
                <h3 className="font-medium text-textPrimary">Scripts</h3>
                <p className="text-sm text-textSecondary">What to say & not say</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleHistoryAccess}>
              <CardContent className="p-4 text-center space-y-2">
                <Video className="h-8 w-8 text-accent mx-auto" />
                <h3 className="font-medium text-textPrimary">History</h3>
                <p className="text-sm text-textSecondary">Past encounters</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Guides */}
        <div className="space-y-3">
          <h2 className="text-heading text-textPrimary">Other State Guides</h2>
          <div className="space-y-3">
            {SAMPLE_RIGHTS_GUIDES
              .filter(guide => guide.state !== currentState && guide.language === language)
              .slice(0, 3)
              .map((guide) => (
                <StateGuideCard 
                  key={guide.guideId}
                  variant="compact"
                  guide={guide} 
                  onSelect={handleGuideSelect}
                />
              ))}
          </div>
          
          {SAMPLE_RIGHTS_GUIDES.filter(guide => guide.language === language).length > 4 && (
            <Button variant="outline" className="w-full">
              View All States
            </Button>
          )}
        </div>

        {/* Language Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-textPrimary">Language</h3>
                <p className="text-sm text-textSecondary">
                  {language === 'en' ? 'English' : 'Español'}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              >
                {language === 'en' ? 'Español' : 'English'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-4 text-center space-y-2">
            <Shield className="h-8 w-8 text-accent mx-auto" />
            <h3 className="font-medium text-textPrimary">Stay Protected</h3>
            <p className="text-sm text-textSecondary">
              This app provides general legal information. For specific legal advice, 
              consult with a qualified attorney.
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Floating Record Button */}
      <RecordButton 
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
      />
    </div>
  );
}

