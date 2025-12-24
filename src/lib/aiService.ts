import { aiSettings, aiStatus, aiLastResponse } from './aiStore';
import { get } from 'svelte/store';

export async function askAI(prompt: string) {
  const settings = get(aiSettings);
  aiStatus.set('loading');
  aiLastResponse.set('');
  try {
    const res = await fetch(settings.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: settings.temperature,
        max_tokens: settings.maxTokens
      })
    });
    if (!res.ok) throw new Error('AI API error');
    const data = await res.json();
    console.log('AI API response:', data);
    let answer = undefined;
    if (data && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
      answer = data.choices[0].message.content;
    }
    if (!answer) {
      answer = JSON.stringify(data, null, 2);
    }
    // Enkel filter: ta bort HTML-taggar och |im_end|> mm
    if (typeof answer === 'string') {
      answer = answer.replace(/<[^>]+>/g, '') // ta bort HTML-taggar
                     .replace(/\|im_end\|>/g, '') // ta bort |im_end|>
                     .replace(/\n{3,}/g, '\n\n') // komprimera tomrader
                     .trim();
    }
    aiLastResponse.set(typeof answer === 'string' ? answer : String(answer));
    console.log('AIWidget visar:', answer);
    aiStatus.set('success');
    return answer;
  } catch (e) {
    aiStatus.set('error');
    aiLastResponse.set('Fel vid AI-anrop.');
    return 'Fel vid AI-anrop.';
  }
}
