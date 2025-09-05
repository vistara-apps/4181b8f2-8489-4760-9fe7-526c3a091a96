'use client';

import React from 'react';
import { ArrowLeft, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppHeaderProps } from '@/types';
import { cn } from '@/utils';

export function AppHeader({ 
  variant = 'default', 
  title = 'KnowYourRights.cards',
  showBack = false,
  onBack 
}: AppHeaderProps) {
  return (
    <header className={cn(
      'sticky top-0 z-40 w-full border-b bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60',
      'px-4 py-3'
    )}>
      <div className="container flex h-14 items-center max-w-sm mx-auto">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Go back</span>
          </Button>
        )}
        
        <div className="flex items-center space-x-2 flex-1">
          <Shield className="h-6 w-6 text-accent" />
          <h1 className="text-lg font-semibold text-textPrimary truncate">
            {title}
          </h1>
        </div>

        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </header>
  );
}

AppHeader.displayName = 'AppHeader';

