'use client';

import React from 'react';
import { MessageSquare, Copy, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScriptButtonProps } from '@/types';
import { cn, copyToClipboard } from '@/utils';

export function ScriptButton({ 
  variant = 'primary', 
  script, 
  onSelect, 
  disabled = false 
}: ScriptButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const isPrimary = variant === 'primary';
  const isDoSay = script.doSay;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(script.response);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelect = () => {
    if (!disabled) {
      onSelect?.(script);
    }
  };

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200',
        !disabled && 'hover:shadow-md hover:scale-[1.01]',
        disabled && 'opacity-50 cursor-not-allowed',
        isDoSay ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500',
        isPrimary && 'bg-accent/5'
      )}
      onClick={handleSelect}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {isDoSay ? (
                <div className="flex items-center gap-1 text-green-700">
                  <Check className="h-4 w-4" />
                  <span className="text-xs font-medium">DO SAY</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-700">
                  <X className="h-4 w-4" />
                  <span className="text-xs font-medium">DON'T SAY</span>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              disabled={disabled}
              className="h-8 w-8"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy script</span>
            </Button>
          </div>

          {/* Situation */}
          <div className="space-y-1">
            <p className="text-xs text-textSecondary font-medium uppercase tracking-wide">
              Situation
            </p>
            <p className="text-sm text-textPrimary">
              {script.situation}
            </p>
          </div>

          {/* Response */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-accent" />
              <p className="text-xs text-textSecondary font-medium uppercase tracking-wide">
                {isDoSay ? 'Recommended Response' : 'Avoid Saying'}
              </p>
            </div>
            <div className={cn(
              'p-3 rounded-md text-sm',
              isDoSay ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            )}>
              <p className={cn(
                'font-medium',
                isDoSay ? 'text-green-800' : 'text-red-800'
              )}>
                "{script.response}"
              </p>
            </div>
          </div>

          {/* Category Badge */}
          <div className="flex items-center justify-between pt-2">
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              script.category === 'traffic_stop' && 'bg-blue-100 text-blue-800',
              script.category === 'search' && 'bg-purple-100 text-purple-800',
              script.category === 'arrest' && 'bg-orange-100 text-orange-800',
              script.category === 'general' && 'bg-gray-100 text-gray-800'
            )}>
              {script.category.replace('_', ' ').toUpperCase()}
            </span>
            
            {isPrimary && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSelect}
                disabled={disabled}
              >
                Use Script
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

ScriptButton.displayName = 'ScriptButton';

