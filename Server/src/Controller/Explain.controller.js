import model from "../Config/Geminiai.config.js";


const requestCounts = {};
const explainCode = async (req, res) => {


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
Provide a clear and concise explanation of the following input.

If the input is code:

* Explain its purpose and key functionality in simple terms.
* Adjust the explanation's length to the code's complexity.
* Use bold text for important terms (e.g., **function**, **variable**, **loop**).
* Use italics or emojis for emphasis (e.g., *crucial*, ⚠️ *important*).
* Structure the explanation for readability (short paragraphs, bullet points if suitable).
* Include a brief summary of the code's expected outcome.

If the input is not code:

* State that the input is not code.
* Provide a brief explanation of the input.

Input:
\`\`\`
<selection-tag>
${code}
\`\`\`
`;
    const result = await model.generateContent(prompt);

    const explanation = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!explanation) {
      return res.json({ success: false, message: "Could not get explanation" });
    }
    return res.json({ success: true, message: "Got the explanation of your code", explanation });
  } catch (error) {
    console.log(error);
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: "API quota exceeded. Please try again later." });
    }

    return res.json({ success: false, message: "Failed to get explanation" });
  }
};

export default explainCode;