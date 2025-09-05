'use client';

import React from 'react';
import { Share2, Download, Edit, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShareableCardDisplayProps } from '@/types';
import { cn, formatDate, shareContent, downloadBlob } from '@/utils';

export function ShareableCardDisplay({ 
  variant = 'default', 
  card, 
  onShare, 
  onEdit 
}: ShareableCardDisplayProps) {
  const [isSharing, setIsSharing] = React.useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const success = await shareContent({
        title: card.content.title,
        text: card.content.summary,
        url: card.shareUrl,
      });
      
      if (success) {
        onShare?.(card);
      }
    } catch (error) {
      console.error('Failed to share card:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(card.imageUrl);
      const blob = await response.blob();
      downloadBlob(blob, `rights-card-${card.cardId}.png`);
    } catch (error) {
      console.error('Failed to download card:', error);
    }
  };

  const handleEdit = () => {
    onEdit?.(card);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{card.content.title}</CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit card</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download card</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share card</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Card Preview */}
        <div className="relative">
          <img
            src={card.imageUrl}
            alt={card.content.title}
            className="w-full h-48 object-cover rounded-md border"
            onError={(e) => {
              // Fallback to generated card if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#f3f4f6"/>
                  <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="#374151">
                    ${card.content.title}
                  </text>
                </svg>
              `)}`;
            }}
          />
          
          {/* Overlay with key info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{card.content.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(card.content.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h4 className="font-medium text-textPrimary">Summary</h4>
          <p className="text-sm text-textSecondary leading-relaxed">
            {card.content.summary}
          </p>
        </div>

        {/* Key Points */}
        {card.content.keyPoints && card.content.keyPoints.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-textPrimary">Key Points</h4>
            <ul className="space-y-1">
              {card.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-textSecondary">
                  <span className="text-accent font-medium">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between pt-4 border-t text-xs text-textSecondary">
          <div className="flex items-center gap-4">
            <span>Created {formatDate(card.createdAt)}</span>
            <span className={cn(
              'px-2 py-1 rounded-full',
              card.isPublic 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            )}>
              {card.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          
          {card.shareUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a 
                href={card.shareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                View
              </a>
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={handleShare}
            disabled={isSharing}
          >
            <Share2 className="h-4 w-4 mr-2" />
            {isSharing ? 'Sharing...' : 'Share Card'}
          </Button>
          <Button 
            variant="accent" 
            className="flex-1" 
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

ShareableCardDisplay.displayName = 'ShareableCardDisplay';

