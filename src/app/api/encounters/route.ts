import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/supabase';
import { generateId } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.userId || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: userId, location' },
        { status: 400 }
      );
    }

    // Create new encounter
    const encounterData = {
      encounterId: generateId(),
      userId: body.userId,
      timestamp: new Date(),
      location: body.location,
      status: 'recording',
      ...body,
    };

    const encounter = await DatabaseService.createEncounter(encounterData);

    return NextResponse.json({
      success: true,
      data: encounter,
    });
  } catch (error) {
    console.error('Error creating encounter:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create encounter',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId parameter' },
        { status: 400 }
      );
    }

    const encounters = await DatabaseService.getUserEncounters(userId);

    return NextResponse.json({
      success: true,
      data: encounters,
    });
  } catch (error) {
    console.error('Error fetching encounters:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch encounters',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

