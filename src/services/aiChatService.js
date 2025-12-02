class AIChatService {
  constructor() {
    this.groqApiUrl = "https://api.groq.com/openai/v1/chat/completions";
    this.audioApiUrl = "https://api.groq.com/openai/v1/audio/transcriptions";
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY;
    this.model = "llama-3.3-70b-versatile";
    this.voiceModel = "whisper-large-v3";
  }

  getFarmContext() {
    return `You are an AI Agronomist assistant for AgroNova farm management platform. You have access to the following farm data:

FARM STATUS TODAY:
- Farm Health Score: 85/100 (Excellent)
- Active Zones: 4 (Zone A-Tomatoes, Zone B-Maize, Zone C-Peppers, Zone D-Beans)
- Irrigation Status: Zone D irrigated 2 hours ago (150L), Zone A scheduled for 2:00 PM
- Water Usage Today: 430L (7% above target)
- Critical Alerts: 2 zones need water (Zone A-35% moisture, Zone D-25% moisture)

LIVESTOCK:
- Total Animals: 47 (Cattle: 4, Poultry: 1, Swine: 1)
- Health Alerts: Charlie (cattle) has slight limp, needs veterinary examination
- Production: Bessie producing 6.5 gal milk daily, Henrietta laying 1 egg daily

RECENT ACTIVITIES:
- Pest scan completed 30 minutes ago - Aphid infestation detected in Zone A tomatoes
- Weather alert: Sunny 32°C today, rain expected tomorrow (15mm)
- Fertilizer application logged 2 hours ago
- Harvest completed in Zone C 4 hours ago

SOIL HEALTH:
- Overall Score: 8.2/10
- Zone A: 35% moisture (low), needs watering
- Zone B: 65% moisture (optimal)
- Zone C: 45% moisture (medium)
- Zone D: 25% moisture (critical)

FINANCIAL:
- Yield this month: 4,250 kg (↑12% vs last month)
- Water efficiency: 87% (Excellent)
- Cost savings: ₦2,340 vs manual irrigation

Answer questions about farm status, irrigation, pest issues, livestock health, soil conditions, weather, and provide actionable farming advice. Keep responses under 50 words and be concise.`;
  }

  async sendMessage(message) {
    try {
      const response = await fetch(this.groqApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.getFarmContext()
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 100
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Chat Service Error:', error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  }

  async transcribeAudio(audioBlob) {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', this.voiceModel);

      const response = await fetch(this.audioApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Audio transcription failed: ${response.status}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Audio Transcription Error:', error);
      throw error;
    }
  }
}

export default new AIChatService();