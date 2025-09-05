'use client';

import React from 'react';
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecordButtonProps } from '@/types';
import { cn } from '@/utils';

export function RecordButton({ 
  variant = 'floating_action', 
  isRecording, 
  onToggleRecording, 
  disabled = false 
}: RecordButtonProps) {
  const [recordingTime, setRecordingTime] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (variant === 'floating_action') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            REC {formatTime(recordingTime)}
          </div>
        )}
        
        <Button
          size="icon"
          onClick={onToggleRecording}
          disabled={disabled}
          className={cn(
            'h-16 w-16 rounded-full shadow-lg transition-all duration-200',
            isRecording 
              ? 'bg-red-600 hover:bg-red-700 animate-pulse-accent' 
              : 'bg-accent hover:bg-accent/90',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isRecording ? (
            <Square className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
          <span className="sr-only">
            {isRecording ? 'Stop recording' : 'Start recording'}
          </span>
        </Button>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="flex items-center gap-4">
      <Button
        variant={isRecording ? 'destructive' : 'accent'}
        size="lg"
        onClick={onToggleRecording}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 min-w-[140px]',
          isRecording && 'animate-pulse'
        )}
      >
        {isRecording ? (
          <>
            <Square className="h-5 w-5" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" />
            Start Recording
          </>
        )}
      </Button>

      {isRecording && (
        <div className="flex items-center gap-2 text-red-600">
          <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse" />
          <span className="font-mono text-sm font-medium">
            {formatTime(recordingTime)}
          </span>
        </div>
      )}
    </div>
  );
}

RecordButton.displayName = 'RecordButton';

