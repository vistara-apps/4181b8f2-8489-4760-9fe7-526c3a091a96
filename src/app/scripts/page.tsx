'use client';

import React from 'react';
import { Search, Filter, MessageSquare, ArrowLeft } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { ScriptButton } from '@/components/features/ScriptButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  getScriptsByCategory, 
  getDoSayScripts, 
  getDontSayScripts,
  searchScripts 
} from '@/data/script-responses';
import { ScriptResponse, Language } from '@/types';
import { cn } from '@/utils';

type ScriptCategory = 'all' | 'traffic_stop' | 'search' | 'arrest' | 'general';
type ScriptFilter = 'all' | 'do_say' | 'dont_say';

export default function ScriptsPage() {
  const [language, setLanguage] = React.useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = React.useState<ScriptCategory>('all');
  const [selectedFilter, setSelectedFilter] = React.useState<ScriptFilter>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [scripts, setScripts] = React.useState<ScriptResponse[]>([]);

  // Load scripts based on filters
  React.useEffect(() => {
    let filteredScripts: ScriptResponse[] = [];

    if (searchQuery.trim()) {
      filteredScripts = searchScripts(searchQuery, language);
    } else if (selectedFilter === 'do_say') {
      filteredScripts = getDoSayScripts(
        selectedCategory === 'all' ? undefined : selectedCategory,
        language
      );
    } else if (selectedFilter === 'dont_say') {
      filteredScripts = getDontSayScripts(
        selectedCategory === 'all' ? undefined : selectedCategory,
        language
      );
    } else if (selectedCategory !== 'all') {
      filteredScripts = getScriptsByCategory(selectedCategory, language);
    } else {
      // Get all scripts for the language
      const allCategories: ScriptCategory[] = ['traffic_stop', 'search', 'arrest', 'general'];
      filteredScripts = allCategories.flatMap(category => 
        getScriptsByCategory(category, language)
      );
    }

    setScripts(filteredScripts);
  }, [language, selectedCategory, selectedFilter, searchQuery]);

  const handleScriptSelect = (script: ScriptResponse) => {
    console.log('Selected script:', script);
    // Could implement copy to clipboard or other actions
  };

  const categories = [
    { id: 'all', label: 'All Situations', icon: MessageSquare },
    { id: 'traffic_stop', label: 'Traffic Stops', icon: MessageSquare },
    { id: 'search', label: 'Searches', icon: MessageSquare },
    { id: 'arrest', label: 'Arrests', icon: MessageSquare },
    { id: 'general', label: 'General', icon: MessageSquare },
  ] as const;

  const filters = [
    { id: 'all', label: 'All Scripts', color: 'bg-gray-100 text-gray-800' },
    { id: 'do_say', label: 'Do Say', color: 'bg-green-100 text-green-800' },
    { id: 'dont_say', label: 'Don\'t Say', color: 'bg-red-100 text-red-800' },
  ] as const;

  return (
    <div className="min-h-screen bg-bg">
      <AppHeader 
        title="Scripts & Responses"
        showBack={true}
        onBack={() => window.history.back()}
      />
      
      <main className="container space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-display text-textPrimary">
            What to Say & Not Say
          </h1>
          <p className="text-body text-textSecondary">
            Pre-written responses for common police interactions
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center">
          <div className="flex bg-surface rounded-lg p-1 border">
            <Button
              variant={language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              English
            </Button>
            <Button
              variant={language === 'es' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('es')}
            >
              Español
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textSecondary" />
          <input
            type="text"
            placeholder="Search scripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <h3 className="font-medium text-textPrimary">Situation Type</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id as ScriptCategory)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div className="space-y-3">
          <h3 className="font-medium text-textPrimary">Script Type</h3>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter.id as ScriptFilter)}
                className={cn(
                  selectedFilter === filter.id && filter.id !== 'all' && filter.color
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-textSecondary">
            {scripts.length} script{scripts.length !== 1 ? 's' : ''} found
          </p>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </Button>
          )}
        </div>

        {/* Scripts List */}
        <div className="space-y-4">
          {scripts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-textSecondary mx-auto mb-4" />
                <h3 className="font-medium text-textPrimary mb-2">No scripts found</h3>
                <p className="text-sm text-textSecondary">
                  Try adjusting your filters or search terms.
                </p>
              </CardContent>
            </Card>
          ) : (
            scripts.map((script) => (
              <ScriptButton
                key={script.id}
                script={script}
                onSelect={handleScriptSelect}
                variant="primary"
              />
            ))
          )}
        </div>

        {/* Help Section */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              How to Use Scripts
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            <p className="text-sm">
              • <strong>Green scripts</strong> show what you should say
            </p>
            <p className="text-sm">
              • <strong>Red scripts</strong> show what to avoid saying
            </p>
            <p className="text-sm">
              • Tap any script to copy it to your clipboard
            </p>
            <p className="text-sm">
              • Practice these responses before you need them
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

