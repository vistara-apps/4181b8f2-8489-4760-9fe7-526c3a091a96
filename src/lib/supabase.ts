import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database table names
export const TABLES = {
  USERS: 'users',
  RIGHTS_GUIDES: 'rights_guides',
  ENCOUNTERS: 'encounters',
  SHAREABLE_CARDS: 'shareable_cards',
  SCRIPT_RESPONSES: 'script_responses',
} as const;

// Helper functions for database operations
export class DatabaseService {
  // User operations
  static async createUser(userData: any) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserById(userId: string) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('userId', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async updateUser(userId: string, updates: any) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .update(updates)
      .eq('userId', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Rights Guide operations
  static async getRightsGuideByState(state: string, language: 'en' | 'es' = 'en') {
    const { data, error } = await supabase
      .from(TABLES.RIGHTS_GUIDES)
      .select('*')
      .eq('state', state)
      .eq('language', language)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async getAllRightsGuides(language: 'en' | 'es' = 'en') {
    const { data, error } = await supabase
      .from(TABLES.RIGHTS_GUIDES)
      .select('*')
      .eq('language', language)
      .order('state');
    
    if (error) throw error;
    return data || [];
  }

  // Encounter operations
  static async createEncounter(encounterData: any) {
    const { data, error } = await supabase
      .from(TABLES.ENCOUNTERS)
      .insert([encounterData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateEncounter(encounterId: string, updates: any) {
    const { data, error } = await supabase
      .from(TABLES.ENCOUNTERS)
      .update(updates)
      .eq('encounterId', encounterId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserEncounters(userId: string) {
    const { data, error } = await supabase
      .from(TABLES.ENCOUNTERS)
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  // Shareable Card operations
  static async createShareableCard(cardData: any) {
    const { data, error } = await supabase
      .from(TABLES.SHAREABLE_CARDS)
      .insert([cardData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getShareableCard(cardId: string) {
    const { data, error } = await supabase
      .from(TABLES.SHAREABLE_CARDS)
      .select('*')
      .eq('cardId', cardId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Script Response operations
  static async getScriptResponses(category?: string, language: 'en' | 'es' = 'en') {
    let query = supabase
      .from(TABLES.SCRIPT_RESPONSES)
      .select('*')
      .eq('language', language);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('priority');
    
    if (error) throw error;
    return data || [];
  }
}

// Real-time subscriptions
export const subscribeToEncounterUpdates = (
  encounterId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`encounter-${encounterId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: TABLES.ENCOUNTERS,
        filter: `encounterId=eq.${encounterId}`,
      },
      callback
    )
    .subscribe();
};

export const subscribeToUserUpdates = (
  userId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`user-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: TABLES.USERS,
        filter: `userId=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};

