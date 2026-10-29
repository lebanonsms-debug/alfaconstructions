import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// ============================================
// CONTACT FORM HANDLER
// ============================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Load environment variables (server-side only)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Validate input
    const { name, company, email, phone, subject, message, privacyConsent } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!privacyConsent) {
      return res.status(400).json({ error: 'Privacy consent required' });
    }

    // Save to database
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        company: company || null,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'Nouveau',
        source_ip: req.headers['x-forwarded-for'] || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save message' });
    }

    // Send email notification if configured
    const emailConfigured = process.env.EMAIL_PROVIDER;
    if (emailConfigured) {
      try {
        // In production, integrate with Resend, SendGrid, or similar
        // await sendEmail({
        //   to: process.env.CONTACT_EMAIL,
        //   subject: `Contact: ${subject}`,
        //   text: `Nouveau message de contact:\n\n${name}\n${email}\n${phone || ''}\n\n${message}`,
        // });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Log failure but don't fail the request
      }
    }

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès. Nous vous répondrons sous 24-48h.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
