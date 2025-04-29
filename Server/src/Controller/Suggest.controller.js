import model from "../Config/Geminiai.config.js";


const requestCounts = {};
const suggestCode = async (req, res) => {


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
    Provide code suggestions related to the following input.
    
    If the input is code:
    
    * Analyze the code for potential improvements in terms of efficiency, readability, or best practices.
    * Suggest alternative code snippets that achieve the same functionality, if applicable, and if the alternative is significantly different.
    * Focus on providing code in the same programming language as the input.
    * Explain the reasoning behind each suggestion, highlighting the advantages of the proposed changes.
    * Use bold text for suggested code elements (e.g., **replace with**, **consider using**).
    * If no improvements or alternatives are readily apparent, state that the code appears to be satisfactory.
    
    If the input is not code:
    
    * State that the input is not code.
    * Provide general suggestions.
    
    Input:
    \`\`\`
    <selection-tag>
    ${code}
    \`\`\`
    `;
    const result = await model.generateContent(prompt);

    const suggestion = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!suggestion) {
      return res.json({ success: false, message: "Could not get suggestion" });
    }
    return res.json({ success: true, message: "Got the suggestion of your code", suggestion });
  } catch (error) {
    console.log(error);
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: "API quota exceeded. Please try again later." });
    } 

    return res.json({ success: false, message: "Failed to get suggestion" });
  }
};

export default suggestCode;


