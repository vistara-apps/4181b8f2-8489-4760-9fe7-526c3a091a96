'use client';

import React from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StateGuideCardProps } from '@/types';
import { cn, formatDate } from '@/utils';

export function StateGuideCard({ 
  variant = 'default', 
  guide, 
  onSelect 
}: StateGuideCardProps) {
  const isCompact = variant === 'compact';

  const handleSelect = () => {
    onSelect?.(guide);
  };

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]',
        'border-l-4 border-l-accent',
        isCompact && 'p-4'
      )}
      onClick={handleSelect}
    >
      <CardHeader className={cn(isCompact && 'p-0 pb-2')}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={cn(
              'flex items-center gap-2',
              isCompact ? 'text-lg' : 'text-xl'
            )}>
              <MapPin className="h-5 w-5 text-accent" />
              {guide.content.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-textSecondary">
              <Clock className="h-4 w-4" />
              <span>Updated {formatDate(guide.content.lastUpdated)}</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-textSecondary" />
        </div>
      </CardHeader>

      {!isCompact && (
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {guide.content.sections.slice(0, 3).map((section) => (
                <span
                  key={section.id}
                  className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    section.type === 'do' && 'bg-green-100 text-green-800',
                    section.type === 'dont' && 'bg-red-100 text-red-800',
                    section.type === 'info' && 'bg-blue-100 text-blue-800',
                    section.type === 'script' && 'bg-purple-100 text-purple-800'
                  )}
                >
                  {section.type === 'do' && '✓'}
                  {section.type === 'dont' && '✗'}
                  {section.type === 'info' && 'ℹ'}
                  {section.type === 'script' && '💬'}
                  <span className="ml-1">{section.title}</span>
                </span>
              ))}
              {guide.content.sections.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{guide.content.sections.length - 3} more
                </span>
              )}
            </div>

            <p className="text-sm text-textSecondary line-clamp-2">
              {guide.content.sections[0]?.content || 'Comprehensive legal rights guide for police encounters.'}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-textSecondary">
                  {guide.content.sections.length} sections
                </span>
                <span className="text-xs text-textSecondary">•</span>
                <span className="text-xs text-textSecondary">
                  {guide.language === 'en' ? 'English' : 'Español'}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSelect}>
                View Guide
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

StateGuideCard.displayName = 'StateGuideCard';

