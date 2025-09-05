// IPFS and Arweave storage services for permanent data storage

export class StorageService {
  /**
   * Upload file to IPFS via Pinata
   */
  static async uploadToIPFS(file: File | Blob, metadata?: any): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata) {
      formData.append('pinataMetadata', JSON.stringify(metadata));
    }

    try {
      const response = await fetch('/api/storage/ipfs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload to IPFS');
      }

      const data = await response.json();
      return data.ipfsHash;
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  /**
   * Upload JSON data to IPFS
   */
  static async uploadJSONToIPFS(jsonData: any, filename: string): Promise<string> {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    
    return this.uploadToIPFS(blob, {
      name: filename,
      keyvalues: {
        type: 'json',
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Pin data to Arweave for permanent storage
   */
  static async uploadToArweave(data: any): Promise<string> {
    try {
      const response = await fetch('/api/storage/arweave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to upload to Arweave');
      }

      const result = await response.json();
      return result.transactionId;
    } catch (error) {
      console.error('Arweave upload error:', error);
      throw new Error('Failed to upload to Arweave');
    }
  }

  /**
   * Create a shareable card image and upload it
   */
  static async createAndUploadCardImage(cardData: any): Promise<string> {
    try {
      const response = await fetch('/api/generate/card-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate card image');
      }

      const blob = await response.blob();
      return this.uploadToIPFS(blob, {
        name: `card-${cardData.cardId}.png`,
        keyvalues: {
          type: 'shareable-card',
          cardId: cardData.cardId,
        },
      });
    } catch (error) {
      console.error('Card image creation error:', error);
      throw new Error('Failed to create and upload card image');
    }
  }

  /**
   * Upload audio recording
   */
  static async uploadAudioRecording(audioBlob: Blob, encounterId: string): Promise<string> {
    return this.uploadToIPFS(audioBlob, {
      name: `encounter-audio-${encounterId}.webm`,
      keyvalues: {
        type: 'audio-recording',
        encounterId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Upload video recording
   */
  static async uploadVideoRecording(videoBlob: Blob, encounterId: string): Promise<string> {
    return this.uploadToIPFS(videoBlob, {
      name: `encounter-video-${encounterId}.webm`,
      keyvalues: {
        type: 'video-recording',
        encounterId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Get IPFS URL for a hash
   */
  static getIPFSUrl(hash: string): string {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }

  /**
   * Get Arweave URL for a transaction ID
   */
  static getArweaveUrl(transactionId: string): string {
    return `https://arweave.net/${transactionId}`;
  }

  /**
   * Create backup of critical data to both IPFS and Arweave
   */
  static async createBackup(data: any, type: string): Promise<{ ipfsHash: string; arweaveId: string }> {
    const [ipfsHash, arweaveId] = await Promise.all([
      this.uploadJSONToIPFS(data, `backup-${type}-${Date.now()}.json`),
      this.uploadToArweave(data),
    ]);

    return { ipfsHash, arweaveId };
  }
}

// Local storage utilities for offline functionality
export class LocalStorageService {
  private static prefix = 'knowyourrights_';

  static set(key: string, value: any): void {
    try {
      localStorage.setItem(
        this.prefix + key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  }

  static get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return defaultValue || null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('LocalStorage remove error:', error);
    }
  }

  static clear(): void {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('LocalStorage clear error:', error);
    }
  }

  // Specific storage methods
  static saveUserPreferences(preferences: any): void {
    this.set('user_preferences', preferences);
  }

  static getUserPreferences(): any {
    return this.get('user_preferences', {
      language: 'en',
      state: '',
      notifications: true,
    });
  }

  static saveDraftEncounter(encounter: any): void {
    this.set('draft_encounter', encounter);
  }

  static getDraftEncounter(): any {
    return this.get('draft_encounter');
  }

  static clearDraftEncounter(): void {
    this.remove('draft_encounter');
  }

  static saveOfflineData(data: any): void {
    this.set('offline_data', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  static getOfflineData(): any {
    return this.get('offline_data');
  }
}

