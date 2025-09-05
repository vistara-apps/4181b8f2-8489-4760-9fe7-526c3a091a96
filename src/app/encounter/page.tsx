'use client';

import React from 'react';
import { Mic, Video, Square, MapPin, Clock, AlertTriangle, Shield } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { RecordButton } from '@/components/features/RecordButton';
import { ScriptButton } from '@/components/features/ScriptButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDoSayScripts, getDontSayScripts } from '@/data/script-responses';
import { getCurrentLocation, getAddressFromCoordinates, formatDuration, cn } from '@/utils';
import { ScriptResponse, RecordingStatus } from '@/types';

export default function EncounterPage() {
  const [recordingStatus, setRecordingStatus] = React.useState<RecordingStatus>('idle');
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [location, setLocation] = React.useState<string>('Getting location...');
  const [quickScripts, setQuickScripts] = React.useState<ScriptResponse[]>([]);
  const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = React.useState<Blob[]>([]);

  const intervalRef = React.useRef<NodeJS.Timeout>();

  // Initialize location and scripts
  React.useEffect(() => {
    const initializeEncounter = async () => {
      try {
        // Get user location
        const position = await getCurrentLocation();
        const address = await getAddressFromCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
        setLocation(address);
      } catch (error) {
        console.error('Failed to get location:', error);
        setLocation('Location unavailable');
      }

      // Load quick access scripts
      const doSayScripts = getDoSayScripts('general', 'en').slice(0, 3);
      const dontSayScripts = getDontSayScripts('general', 'en').slice(0, 2);
      setQuickScripts([...doSayScripts, ...dontSayScripts]);
    };

    initializeEncounter();
  }, []);

  // Handle recording timer
  React.useEffect(() => {
    if (recordingStatus === 'recording') {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (recordingStatus === 'idle') {
        setRecordingTime(0);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [recordingStatus]);

  const startRecording = async () => {
    try {
      setRecordingStatus('recording');
      
      // Request media permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false, // Start with audio only for simplicity
      });

      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        setRecordedChunks(chunks);
        setRecordingStatus('processing');
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Process the recording
        processRecording(chunks);
      };

      recorder.start(1000); // Collect data every second
      setMediaRecorder(recorder);
      
    } catch (error) {
      console.error('Failed to start recording:', error);
      setRecordingStatus('idle');
      alert('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const processRecording = async (chunks: Blob[]) => {
    try {
      // Create blob from recorded chunks
      const recordingBlob = new Blob(chunks, { type: 'audio/webm' });
      
      // In a real app, you would:
      // 1. Upload to IPFS/Arweave
      // 2. Generate transcript using speech-to-text
      // 3. Create shareable card using AI
      // 4. Save encounter to database
      
      console.log('Recording completed:', {
        size: recordingBlob.size,
        duration: recordingTime,
        location,
      });
      
      // Simulate processing delay
      setTimeout(() => {
        setRecordingStatus('completed');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to process recording:', error);
      setRecordingStatus('idle');
    }
  };

  const handleToggleRecording = () => {
    if (recordingStatus === 'idle') {
      startRecording();
    } else if (recordingStatus === 'recording') {
      stopRecording();
    }
  };

  const handleScriptSelect = (script: ScriptResponse) => {
    // In a real app, this could show the script in a modal or copy to clipboard
    console.log('Selected script:', script);
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:911';
  };

  const isRecording = recordingStatus === 'recording';
  const isProcessing = recordingStatus === 'processing';
  const isCompleted = recordingStatus === 'completed';

  return (
    <div className="min-h-screen bg-bg">
      <AppHeader 
        title="Document Encounter"
        showBack={true}
        onBack={() => window.history.back()}
      />
      
      <main className="container space-y-6 pb-24">
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

        {/* Recording Status */}
        <Card className={cn(
          'border-2',
          isRecording && 'border-red-500 bg-red-50',
          isProcessing && 'border-yellow-500 bg-yellow-50',
          isCompleted && 'border-green-500 bg-green-50'
        )}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center">
              {isRecording && (
                <div className="h-4 w-4 bg-red-600 rounded-full animate-pulse mr-2" />
              )}
              <h2 className="text-xl font-semibold">
                {recordingStatus === 'idle' && 'Ready to Record'}
                {recordingStatus === 'recording' && 'Recording in Progress'}
                {recordingStatus === 'processing' && 'Processing Recording'}
                {recordingStatus === 'completed' && 'Recording Complete'}
              </h2>
            </div>
            
            {recordingTime > 0 && (
              <div className="text-2xl font-mono font-bold">
                {formatDuration(recordingTime)}
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-sm text-textSecondary">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {isProcessing && (
              <div className="flex items-center justify-center gap-2">
                <div className="spinner" />
                <span className="text-sm">Processing your recording...</span>
              </div>
            )}

            {isCompleted && (
              <div className="space-y-3">
                <p className="text-green-800">
                  Your encounter has been documented and saved securely.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    View Summary
                  </Button>
                  <Button variant="accent" size="sm">
                    Share Card
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Scripts */}
        {!isCompleted && (
          <div className="space-y-3">
            <h3 className="text-heading text-textPrimary">Quick Scripts</h3>
            <p className="text-sm text-textSecondary">
              Tap any script to use during your encounter
            </p>
            <div className="space-y-3">
              {quickScripts.map((script) => (
                <ScriptButton
                  key={script.id}
                  script={script}
                  variant="secondary"
                  onSelect={handleScriptSelect}
                  disabled={isProcessing}
                />
              ))}
            </div>
            <Button variant="outline" className="w-full">
              View All Scripts
            </Button>
          </div>
        )}

        {/* Recording Instructions */}
        {recordingStatus === 'idle' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Recording Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-textSecondary">
              <p>• Keep your phone in a safe, accessible location</p>
              <p>• Announce that you are recording for safety</p>
              <p>• Stay calm and follow the scripts provided</p>
              <p>• The recording will be saved securely to IPFS</p>
              <p>• A shareable summary card will be generated</p>
            </CardContent>
          </Card>
        )}

        {/* Legal Disclaimer */}
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-textSecondary">
              <strong>Legal Notice:</strong> Recording laws vary by state. 
              This app provides general information only. Consult with a 
              qualified attorney for specific legal advice.
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Floating Record Button */}
      <RecordButton 
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
        disabled={isProcessing || isCompleted}
      />
    </div>
  );
}

