import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const metadata = formData.get('pinataMetadata');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Prepare form data for Pinata
    const pinataFormData = new FormData();
    pinataFormData.append('file', file);
    
    if (metadata) {
      pinataFormData.append('pinataMetadata', metadata);
    }

    // Upload to Pinata IPFS
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_API_KEY}`,
      },
      body: pinataFormData,
    });

    if (!response.ok) {
      throw new Error(`Pinata API error: ${response.statusText}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      data: {
        ipfsHash: result.IpfsHash,
        pinSize: result.PinSize,
        timestamp: result.Timestamp,
        url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      },
    });
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload to IPFS',
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
      error: 'Method not allowed. Use POST to upload files.' 
    },
    { status: 405 }
  );
}

