/**
 * API utility for communicating with the LM Studio medical bot
 */

export const fetchMedicalBotResponse = async (message: string): Promise<string> => {
  const res = await fetch('http://localhost:1234/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "mradermacher/Bio-Medical-MultiModal-Llama-3-8B-V1-i1-GGUF/Bio-Medical-MultiModal-Llama-3-8B-V1.i1-Q5_K_M.gguf:2",
      "messages": [
        { "role": "system", "content": "You are an Indian doctor expert in general medicine." },
        { "role": "user", "content": message }
      ],
    }),
  });
  
  const data = await res.json();
  return data.reply || data.choices?.[0]?.message?.content || "No response from model.";
};