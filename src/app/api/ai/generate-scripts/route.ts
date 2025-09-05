import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/openai';
import { GenerateScriptRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateScriptRequest = await request.json();
    
    // Validate required fields
    if (!body.situation || !body.language || !body.state || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate scripts using OpenAI
    const scripts = await AIService.generateScripts(body);

    return NextResponse.json({
      success: true,
      data: scripts,
    });
  } catch (error) {
    console.error('Error generating scripts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate scripts',
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
      error: 'Method not allowed. Use POST to generate scripts.' 
    },
    { status: 405 }
  );
}

