import OpenAI from 'openai';
import { GenerateScriptRequest, GenerateCardRequest, ScriptResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  /**
   * Generate contextual scripts for police interactions
   */
  static async generateScripts(request: GenerateScriptRequest): Promise<ScriptResponse[]> {
    const { situation, language, state, category } = request;
    
    const systemPrompt = `You are a legal rights advisor helping people navigate police interactions safely. 
    Generate appropriate responses for the situation: "${situation}" in ${state}.
    
    Provide both "DO SAY" and "DON'T SAY" examples.
    Keep responses calm, respectful, and legally sound.
    Language: ${language === 'es' ? 'Spanish' : 'English'}
    
    Return a JSON array of responses with this structure:
    {
      "id": "unique_id",
      "category": "${category}",
      "situation": "${situation}",
      "response": "the actual response text",
      "language": "${language}",
      "priority": 1-10,
      "doSay": true/false
    }`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 6-8 responses for: ${situation}` }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating scripts:', error);
      throw new Error('Failed to generate scripts');
    }
  }

  /**
   * Generate shareable card content from encounter data
   */
  static async generateShareableCard(request: GenerateCardRequest) {
    const { encounterId, audioTranscript, location, timestamp, duration } = request;
    
    const systemPrompt = `You are creating a concise, objective summary of a police encounter for documentation purposes.
    
    Create a professional summary that includes:
    - Key events in chronological order
    - Important details mentioned
    - Duration and location
    - Objective tone, no opinions
    
    Return JSON with this structure:
    {
      "title": "Brief title for the encounter",
      "summary": "2-3 sentence objective summary",
      "keyPoints": ["point1", "point2", "point3"],
      "timestamp": "${timestamp}",
      "location": "${location}"
    }`;

    const userPrompt = `
    Encounter Details:
    - Location: ${location}
    - Time: ${timestamp}
    - Duration: ${duration ? `${duration} seconds` : 'Unknown'}
    ${audioTranscript ? `- Transcript: ${audioTranscript}` : '- No transcript available'}
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 800,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating shareable card:', error);
      throw new Error('Failed to generate shareable card');
    }
  }

  /**
   * Analyze audio transcript for key information
   */
  static async analyzeEncounterTranscript(transcript: string, state: string) {
    const systemPrompt = `You are analyzing a police encounter transcript to extract key information.
    
    Focus on:
    - Rights that were mentioned or should have been mentioned
    - Any concerning statements or actions
    - Compliance with ${state} state laws
    - Suggestions for improvement
    
    Return JSON with:
    {
      "rightsViolations": ["list of potential violations"],
      "positiveActions": ["things that went well"],
      "suggestions": ["recommendations for future encounters"],
      "legalConcerns": ["items that may need legal review"],
      "overallAssessment": "brief overall assessment"
    }`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this transcript: ${transcript}` }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error analyzing transcript:', error);
      throw new Error('Failed to analyze transcript');
    }
  }

  /**
   * Generate state-specific rights information
   */
  static async generateRightsGuide(state: string, language: 'en' | 'es' = 'en') {
    const systemPrompt = `You are a legal expert creating a comprehensive "Know Your Rights" guide for police encounters in ${state}.
    
    Include:
    - Traffic stops
    - Search and seizure
    - Arrest procedures
    - Miranda rights
    - State-specific laws and procedures
    
    Language: ${language === 'es' ? 'Spanish' : 'English'}
    
    Return JSON with:
    {
      "title": "Know Your Rights in ${state}",
      "sections": [
        {
          "id": "unique_id",
          "title": "section title",
          "content": "detailed content",
          "type": "do|dont|info|script",
          "priority": 1-10
        }
      ],
      "lastUpdated": "current date"
    }`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Create a comprehensive rights guide for ${state}` }
        ],
        temperature: 0.3,
        max_tokens: 2500,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating rights guide:', error);
      throw new Error('Failed to generate rights guide');
    }
  }
}

