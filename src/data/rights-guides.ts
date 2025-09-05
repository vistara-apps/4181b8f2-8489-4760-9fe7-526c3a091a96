import { RightsGuide, RightsSection } from '@/types';

// Sample rights guides for different states
export const SAMPLE_RIGHTS_GUIDES: RightsGuide[] = [
  {
    guideId: 'california-en',
    state: 'California',
    language: 'en',
    content: {
      title: 'Know Your Rights in California',
      lastUpdated: new Date('2024-01-01'),
      sections: [
        {
          id: 'traffic-stop-do',
          title: 'During a Traffic Stop - DO',
          content: 'Pull over safely, turn off engine, keep hands visible, provide license and registration when asked, remain calm and polite.',
          type: 'do',
          priority: 1,
        },
        {
          id: 'traffic-stop-dont',
          title: 'During a Traffic Stop - DON\'T',
          content: 'Don\'t reach for documents until asked, don\'t argue or resist, don\'t consent to searches, don\'t answer questions beyond identification.',
          type: 'dont',
          priority: 2,
        },
        {
          id: 'search-rights',
          title: 'Search and Seizure Rights',
          content: 'You have the right to refuse consent to search your vehicle, home, or person. Police need a warrant, probable cause, or your consent to search.',
          type: 'info',
          priority: 3,
        },
        {
          id: 'arrest-rights',
          title: 'If You Are Arrested',
          content: 'You have the right to remain silent, the right to an attorney, and the right to have an attorney present during questioning.',
          type: 'info',
          priority: 4,
        },
        {
          id: 'miranda-script',
          title: 'Invoking Your Rights',
          content: 'I am invoking my right to remain silent. I want to speak to a lawyer. I do not consent to any searches.',
          type: 'script',
          priority: 5,
        },
        {
          id: 'recording-rights',
          title: 'Recording Police',
          content: 'In California, you have the right to record police officers performing their duties in public, as long as you don\'t interfere.',
          type: 'info',
          priority: 6,
        },
      ],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    guideId: 'california-es',
    state: 'California',
    language: 'es',
    content: {
      title: 'Conozca Sus Derechos en California',
      lastUpdated: new Date('2024-01-01'),
      sections: [
        {
          id: 'traffic-stop-do',
          title: 'Durante una Parada de Tráfico - HAGA',
          content: 'Deténgase de manera segura, apague el motor, mantenga las manos visibles, proporcione licencia y registro cuando se lo pidan, manténgase calmado y cortés.',
          type: 'do',
          priority: 1,
        },
        {
          id: 'traffic-stop-dont',
          title: 'Durante una Parada de Tráfico - NO HAGA',
          content: 'No busque documentos hasta que se lo pidan, no discuta o resista, no consienta a registros, no responda preguntas más allá de la identificación.',
          type: 'dont',
          priority: 2,
        },
        {
          id: 'search-rights',
          title: 'Derechos de Registro y Confiscación',
          content: 'Tiene derecho a rechazar el consentimiento para registrar su vehículo, hogar o persona. La policía necesita una orden, causa probable o su consentimiento.',
          type: 'info',
          priority: 3,
        },
        {
          id: 'arrest-rights',
          title: 'Si Es Arrestado',
          content: 'Tiene derecho a permanecer en silencio, derecho a un abogado, y derecho a tener un abogado presente durante el interrogatorio.',
          type: 'info',
          priority: 4,
        },
        {
          id: 'miranda-script',
          title: 'Invocando Sus Derechos',
          content: 'Estoy invocando mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento a ningún registro.',
          type: 'script',
          priority: 5,
        },
      ],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    guideId: 'texas-en',
    state: 'Texas',
    language: 'en',
    content: {
      title: 'Know Your Rights in Texas',
      lastUpdated: new Date('2024-01-01'),
      sections: [
        {
          id: 'traffic-stop-do',
          title: 'During a Traffic Stop - DO',
          content: 'Pull over safely, turn off engine, keep hands on steering wheel, provide license and registration when requested.',
          type: 'do',
          priority: 1,
        },
        {
          id: 'traffic-stop-dont',
          title: 'During a Traffic Stop - DON\'T',
          content: 'Don\'t make sudden movements, don\'t argue with the officer, don\'t consent to vehicle searches without a warrant.',
          type: 'dont',
          priority: 2,
        },
        {
          id: 'identification-law',
          title: 'Texas Identification Law',
          content: 'Texas has a "stop and identify" law. You must provide your name if lawfully arrested, but not during a simple detention.',
          type: 'info',
          priority: 3,
        },
        {
          id: 'concealed-carry',
          title: 'Concealed Carry Disclosure',
          content: 'If you have a concealed carry license, you must present it along with your driver\'s license when asked.',
          type: 'info',
          priority: 4,
        },
        {
          id: 'recording-rights',
          title: 'Recording Police in Texas',
          content: 'You have the right to record police officers in public spaces, but must not interfere with their duties.',
          type: 'info',
          priority: 5,
        },
      ],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    guideId: 'new-york-en',
    state: 'New York',
    language: 'en',
    content: {
      title: 'Know Your Rights in New York',
      lastUpdated: new Date('2024-01-01'),
      sections: [
        {
          id: 'stop-and-frisk',
          title: 'Stop and Frisk Laws',
          content: 'Police can stop you if they have reasonable suspicion of criminal activity. They can frisk you only if they suspect you\'re armed.',
          type: 'info',
          priority: 1,
        },
        {
          id: 'subway-rights',
          title: 'Rights on Public Transportation',
          content: 'Police can ask to search your bags on the subway, but you can refuse and leave the station instead.',
          type: 'info',
          priority: 2,
        },
        {
          id: 'housing-rights',
          title: 'Rights in Public Housing',
          content: 'Police need a warrant to enter your apartment, even in public housing, unless there are emergency circumstances.',
          type: 'info',
          priority: 3,
        },
        {
          id: 'protest-rights',
          title: 'Protest and Assembly Rights',
          content: 'You have the right to peaceful protest in public spaces, but must follow lawful police orders about time, place, and manner.',
          type: 'info',
          priority: 4,
        },
      ],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Function to get rights guide by state and language
export function getRightsGuide(state: string, language: 'en' | 'es' = 'en'): RightsGuide | null {
  return SAMPLE_RIGHTS_GUIDES.find(
    guide => guide.state.toLowerCase() === state.toLowerCase() && guide.language === language
  ) || null;
}

// Function to get all available states
export function getAvailableStates(): string[] {
  return [...new Set(SAMPLE_RIGHTS_GUIDES.map(guide => guide.state))];
}

// Function to check if a state has guides in a specific language
export function hasLanguageSupport(state: string, language: 'en' | 'es'): boolean {
  return SAMPLE_RIGHTS_GUIDES.some(
    guide => guide.state.toLowerCase() === state.toLowerCase() && guide.language === language
  );
}

