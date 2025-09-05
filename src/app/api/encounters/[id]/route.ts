import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const encounterId = params.id;

    if (!encounterId) {
      return NextResponse.json(
        { success: false, error: 'Missing encounter ID' },
        { status: 400 }
      );
    }

    // In a real implementation, you'd fetch from the database
    // For now, return a mock response
    const mockEncounter = {
      encounterId,
      userId: 'user-123',
      timestamp: new Date(),
      location: {
        address: 'Sample Location',
        state: 'California',
      },
      status: 'completed',
      duration: 300, // 5 minutes
    };

    return NextResponse.json({
      success: true,
      data: mockEncounter,
    });
  } catch (error) {
    console.error('Error fetching encounter:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch encounter',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const encounterId = params.id;
    const updates = await request.json();

    if (!encounterId) {
      return NextResponse.json(
        { success: false, error: 'Missing encounter ID' },
        { status: 400 }
      );
    }

    const updatedEncounter = await DatabaseService.updateEncounter(encounterId, updates);

    return NextResponse.json({
      success: true,
      data: updatedEncounter,
    });
  } catch (error) {
    console.error('Error updating encounter:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update encounter',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const encounterId = params.id;

    if (!encounterId) {
      return NextResponse.json(
        { success: false, error: 'Missing encounter ID' },
        { status: 400 }
      );
    }

    // In a real implementation, you'd delete from the database
    // For now, return a success response
    return NextResponse.json({
      success: true,
      message: 'Encounter deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting encounter:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete encounter',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

