export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { prompt, size = '1024x1024', password } = req.body || {};
    const gate = process.env.GATE_PASSWORD || '';
    if (gate && password !== gate) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const r = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        size,
        response_format: 'b64_json'
      })
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({ error: `OpenAI error: ${errText}` });
    }

    const data = await r.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return res.status(500).json({ error: 'No image returned' });

    return res.status(200).json({ dataUrl: `data:image/png;base64,${b64}` });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
