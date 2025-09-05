import { ScriptResponse } from '@/types';

// Pre-defined script responses for common police interaction scenarios
export const SAMPLE_SCRIPT_RESPONSES: ScriptResponse[] = [
  // Traffic Stop Scripts - English
  {
    id: 'traffic-stop-greeting-en',
    category: 'traffic_stop',
    situation: 'Officer approaches vehicle',
    response: 'Good [morning/afternoon/evening], officer.',
    language: 'en',
    priority: 1,
    doSay: true,
  },
  {
    id: 'traffic-stop-documents-en',
    category: 'traffic_stop',
    situation: 'Officer asks for documents',
    response: 'I\'m reaching for my license and registration now.',
    language: 'en',
    priority: 2,
    doSay: true,
  },
  {
    id: 'traffic-stop-search-refuse-en',
    category: 'traffic_stop',
    situation: 'Officer asks to search vehicle',
    response: 'I do not consent to any searches.',
    language: 'en',
    priority: 3,
    doSay: true,
  },
  {
    id: 'traffic-stop-questions-en',
    category: 'traffic_stop',
    situation: 'Officer asks questions beyond identification',
    response: 'I\'m exercising my right to remain silent.',
    language: 'en',
    priority: 4,
    doSay: true,
  },
  {
    id: 'traffic-stop-dont-argue-en',
    category: 'traffic_stop',
    situation: 'Disagreeing with officer',
    response: 'Don\'t argue about the ticket or citation at the scene.',
    language: 'en',
    priority: 5,
    doSay: false,
  },
  {
    id: 'traffic-stop-dont-admit-en',
    category: 'traffic_stop',
    situation: 'Officer asks if you know why you were stopped',
    response: 'Don\'t say "I was speeding" or admit to any violations.',
    language: 'en',
    priority: 6,
    doSay: false,
  },

  // Traffic Stop Scripts - Spanish
  {
    id: 'traffic-stop-greeting-es',
    category: 'traffic_stop',
    situation: 'El oficial se acerca al vehículo',
    response: 'Buenos [días/tardes/noches], oficial.',
    language: 'es',
    priority: 1,
    doSay: true,
  },
  {
    id: 'traffic-stop-documents-es',
    category: 'traffic_stop',
    situation: 'El oficial pide documentos',
    response: 'Voy a buscar mi licencia y registro ahora.',
    language: 'es',
    priority: 2,
    doSay: true,
  },
  {
    id: 'traffic-stop-search-refuse-es',
    category: 'traffic_stop',
    situation: 'El oficial pide registrar el vehículo',
    response: 'No consiento a ningún registro.',
    language: 'es',
    priority: 3,
    doSay: true,
  },
  {
    id: 'traffic-stop-questions-es',
    category: 'traffic_stop',
    situation: 'El oficial hace preguntas más allá de la identificación',
    response: 'Estoy ejerciendo mi derecho a permanecer en silencio.',
    language: 'es',
    priority: 4,
    doSay: true,
  },

  // Search Scripts - English
  {
    id: 'search-refuse-en',
    category: 'search',
    situation: 'Officer wants to search you or your property',
    response: 'I do not consent to any searches of my person, belongings, or vehicle.',
    language: 'en',
    priority: 1,
    doSay: true,
  },
  {
    id: 'search-warrant-en',
    category: 'search',
    situation: 'Officer claims they can search without consent',
    response: 'I understand you believe you have the right to search, but I do not consent. Do you have a warrant?',
    language: 'en',
    priority: 2,
    doSay: true,
  },
  {
    id: 'search-dont-resist-en',
    category: 'search',
    situation: 'Officer proceeds with search despite refusal',
    response: 'Don\'t physically resist even if you believe the search is illegal.',
    language: 'en',
    priority: 3,
    doSay: false,
  },
  {
    id: 'search-state-objection-en',
    category: 'search',
    situation: 'During an unwanted search',
    response: 'I am stating clearly that I do not consent to this search.',
    language: 'en',
    priority: 4,
    doSay: true,
  },

  // Arrest Scripts - English
  {
    id: 'arrest-miranda-en',
    category: 'arrest',
    situation: 'Being placed under arrest',
    response: 'I am invoking my right to remain silent and my right to an attorney.',
    language: 'en',
    priority: 1,
    doSay: true,
  },
  {
    id: 'arrest-no-questions-en',
    category: 'arrest',
    situation: 'Officer tries to question you after arrest',
    response: 'I will not answer any questions without my attorney present.',
    language: 'en',
    priority: 2,
    doSay: true,
  },
  {
    id: 'arrest-dont-resist-en',
    category: 'arrest',
    situation: 'Being arrested',
    response: 'Don\'t resist arrest, even if you believe it\'s wrongful.',
    language: 'en',
    priority: 3,
    doSay: false,
  },
  {
    id: 'arrest-emergency-contact-en',
    category: 'arrest',
    situation: 'After being arrested',
    response: 'I would like to make my phone call to contact an attorney.',
    language: 'en',
    priority: 4,
    doSay: true,
  },

  // Arrest Scripts - Spanish
  {
    id: 'arrest-miranda-es',
    category: 'arrest',
    situation: 'Siendo arrestado',
    response: 'Estoy invocando mi derecho a permanecer en silencio y mi derecho a un abogado.',
    language: 'es',
    priority: 1,
    doSay: true,
  },
  {
    id: 'arrest-no-questions-es',
    category: 'arrest',
    situation: 'El oficial trata de interrogarlo después del arresto',
    response: 'No responderé ninguna pregunta sin mi abogado presente.',
    language: 'es',
    priority: 2,
    doSay: true,
  },

  // General Scripts - English
  {
    id: 'general-am-i-free-en',
    category: 'general',
    situation: 'Unclear if you\'re being detained',
    response: 'Am I free to go?',
    language: 'en',
    priority: 1,
    doSay: true,
  },
  {
    id: 'general-recording-en',
    category: 'general',
    situation: 'Starting to record the interaction',
    response: 'I am recording this interaction for my safety and yours.',
    language: 'en',
    priority: 2,
    doSay: true,
  },
  {
    id: 'general-emergency-en',
    category: 'general',
    situation: 'If you feel unsafe',
    response: 'I need medical attention / I need to contact my attorney immediately.',
    language: 'en',
    priority: 3,
    doSay: true,
  },
  {
    id: 'general-dont-volunteer-en',
    category: 'general',
    situation: 'Officer making small talk',
    response: 'Don\'t volunteer information or make small talk.',
    language: 'en',
    priority: 4,
    doSay: false,
  },
  {
    id: 'general-dont-lie-en',
    category: 'general',
    situation: 'Tempted to lie to avoid trouble',
    response: 'Don\'t lie to police officers - it can make things worse.',
    language: 'en',
    priority: 5,
    doSay: false,
  },

  // General Scripts - Spanish
  {
    id: 'general-am-i-free-es',
    category: 'general',
    situation: 'No está claro si está siendo detenido',
    response: '¿Soy libre de irme?',
    language: 'es',
    priority: 1,
    doSay: true,
  },
  {
    id: 'general-recording-es',
    category: 'general',
    situation: 'Comenzando a grabar la interacción',
    response: 'Estoy grabando esta interacción por mi seguridad y la suya.',
    language: 'es',
    priority: 2,
    doSay: true,
  },
];

// Function to get scripts by category and language
export function getScriptsByCategory(
  category: ScriptResponse['category'],
  language: 'en' | 'es' = 'en'
): ScriptResponse[] {
  return SAMPLE_SCRIPT_RESPONSES.filter(
    script => script.category === category && script.language === language
  ).sort((a, b) => a.priority - b.priority);
}

// Function to get "do say" scripts
export function getDoSayScripts(
  category?: ScriptResponse['category'],
  language: 'en' | 'es' = 'en'
): ScriptResponse[] {
  return SAMPLE_SCRIPT_RESPONSES.filter(
    script => 
      script.doSay && 
      script.language === language &&
      (!category || script.category === category)
  ).sort((a, b) => a.priority - b.priority);
}

// Function to get "don't say" scripts
export function getDontSayScripts(
  category?: ScriptResponse['category'],
  language: 'en' | 'es' = 'en'
): ScriptResponse[] {
  return SAMPLE_SCRIPT_RESPONSES.filter(
    script => 
      !script.doSay && 
      script.language === language &&
      (!category || script.category === category)
  ).sort((a, b) => a.priority - b.priority);
}

// Function to get all scripts for a language
export function getAllScripts(language: 'en' | 'es' = 'en'): ScriptResponse[] {
  return SAMPLE_SCRIPT_RESPONSES.filter(
    script => script.language === language
  ).sort((a, b) => a.priority - b.priority);
}

// Function to search scripts by situation
export function searchScripts(
  query: string,
  language: 'en' | 'es' = 'en'
): ScriptResponse[] {
  const lowercaseQuery = query.toLowerCase();
  return SAMPLE_SCRIPT_RESPONSES.filter(
    script => 
      script.language === language &&
      (script.situation.toLowerCase().includes(lowercaseQuery) ||
       script.response.toLowerCase().includes(lowercaseQuery))
  ).sort((a, b) => a.priority - b.priority);
}

