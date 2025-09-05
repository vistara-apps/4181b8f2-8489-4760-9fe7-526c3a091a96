import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/openai';
import { GenerateCardRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateCardRequest = await request.json();
    
    // Validate required fields
    if (!body.encounterId || !body.location || !body.timestamp) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate shareable card content using OpenAI
    const cardContent = await AIService.generateShareableCard(body);

    return NextResponse.json({
      success: true,
      data: cardContent,
    });
  } catch (error) {
    console.error('Error generating shareable card:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate shareable card',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to generate cards.' 
    },
    { status: 405 }
  );
}

