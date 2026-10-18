import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { generateChatResponse, generateCustomSafetyPlan, generateComplaintDraft } from './server/geminiService';
import { VERIFIED_RESOURCES, PECA_LEGAL_PROVISIONS, HIFAZAT_ABOUT } from './src/data/knowledgeBase';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '1mb' }));

  // Health and config status endpoint
  app.get('/api/health', (req, res) => {
    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      status: 'ok',
      hasApiKey,
      appName: 'HIFAZAT',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // Verified resources endpoint
  app.get('/api/resources', (req, res) => {
    res.json({
      resources: VERIFIED_RESOURCES,
      legalProvisions: PECA_LEGAL_PROVISIONS,
      about: HIFAZAT_ABOUT,
      lastAudit: 'October 2026',
    });
  });

  // AI Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, language, context } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      // Input sanitization: ensure no massive payloads
      const sanitizedMessages: Array<{ role: 'assistant' | 'user'; content: string }> = messages.slice(-15).map((m: any) => ({
        role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
        content: String(m.content || '').slice(0, 3000),
      }));

      const result = await generateChatResponse(sanitizedMessages, language || 'en', context);
      res.json(result);
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      res.status(500).json({
        error: 'Failed to process chat message',
        fallback: 'Please contact the DRF helpline at 0800-39393 for urgent guidance.',
      });
    }
  });

  // Generate Personalized Safety Plan endpoint
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const { category, urgency, platform, description, hasPreservedEvidence, isPerpetratorKnown, hasDemandedMoney, language } = req.body;

      const plan = await generateCustomSafetyPlan({
        category: category || 'blackmail',
        urgency: urgency || 'moderate',
        platform: platform || 'Social Media',
        description: String(description || '').slice(0, 2000),
        hasPreservedEvidence: Boolean(hasPreservedEvidence),
        isPerpetratorKnown: isPerpetratorKnown || 'unknown',
        hasDemandedMoney: Boolean(hasDemandedMoney),
        language: language || 'en',
      });

      res.json(plan);
    } catch (err: any) {
      console.error('Plan generator endpoint error:', err);
      res.status(500).json({ error: 'Failed to generate safety plan' });
    }
  });

  // Generate Formal Complaint Draft endpoint
  app.post('/api/generate-complaint', async (req, res) => {
    try {
      const {
        complainantName,
        contactPhone,
        contactEmail,
        city,
        incidentCategory,
        incidentStartDate,
        incidentPlatform,
        perpetratorIdentifier,
        summaryOfFacts,
        financialExtortionDetails,
        evidenceList,
        applicablePecaSections,
      } = req.body;

      if (!summaryOfFacts || summaryOfFacts.trim() === '') {
        return res.status(400).json({ error: 'Summary of facts is required to draft complaint' });
      }

      const result = await generateComplaintDraft({
        complainantName: complainantName ? String(complainantName).slice(0, 100) : undefined,
        contactPhone: contactPhone ? String(contactPhone).slice(0, 50) : undefined,
        contactEmail: contactEmail ? String(contactEmail).slice(0, 100) : undefined,
        city: city ? String(city).slice(0, 50) : undefined,
        incidentCategory: incidentCategory || 'blackmail',
        incidentStartDate: incidentStartDate ? String(incidentStartDate).slice(0, 50) : 'Recent',
        incidentPlatform: incidentPlatform ? String(incidentPlatform).slice(0, 100) : 'Internet',
        perpetratorIdentifier: perpetratorIdentifier ? String(perpetratorIdentifier).slice(0, 200) : 'Unknown',
        summaryOfFacts: String(summaryOfFacts).slice(0, 3000),
        financialExtortionDetails: financialExtortionDetails ? String(financialExtortionDetails).slice(0, 1000) : undefined,
        evidenceList: Array.isArray(evidenceList) ? evidenceList.map((e) => String(e).slice(0, 200)) : [],
        applicablePecaSections: Array.isArray(applicablePecaSections) ? applicablePecaSections : [],
      });

      res.json(result);
    } catch (err: any) {
      console.error('Complaint draft error:', err);
      res.status(500).json({ error: 'Failed to generate complaint draft' });
    }
  });

  // In development, hook Vite middleware
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HIFAZAT] Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[HIFAZAT] Failed to start server:', err);
  process.exit(1);
});
