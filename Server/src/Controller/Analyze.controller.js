import model from "../Config/Geminiai.config.js";


const requestCounts = {};
const analyzeCode = async (req, res) => {
 

  const now = Math.floor(Date.now() / 60000); // Get the current minute
  const clientId = req.ip; // Or some other identifier for the user/client

  if (!requestCounts[clientId]) {
    requestCounts[clientId] = {};
  }
  if (!requestCounts[clientId][now]) {
    requestCounts[clientId][now] = 0;
  }

  if (requestCounts[clientId][now] >= 10) { // Example limit - adjust as needed
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  requestCounts[clientId][now]++;
  const { code } = req.body;

  try {
    if(code.length ===0){
      return;
    }
    const prompt = `
Provide a brief summary of the following code.

If the input is code:

* Summarize the code's primary function in one or two short sentences.
* Focus on the code's *outcome* or *purpose*, not the line-by-line execution.
* Use bold text for key actions or results (e.g., **calculates sum**, **displays data**, **updates state**).
* If the code performs a specific action with an important condition, mention the condition using italics (*only if* , *when*, *unless*).
* Keep the summary concise and avoid unnecessary details.

If the input is not code:

* State that the input is not code.
* Provide a brief description of the input.

Input:
\`\`\`
<selection-tag>
${code}
\`\`\`
`;
    const result = await model.generateContent(prompt);

    const summary = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      return res.json({ success: false, message: "Could not get summary" });
    }
    return res.json({ success: true, message: "Got the summary of your code", summary });
  } catch (error) {
    console.log(error);
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: "API quota exceeded. Please try again later." });
    }

    return res.json({ success: false, message: "Failed to get summary" });
  }
};

export default analyzeCode;


