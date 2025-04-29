import model from "../Config/Geminiai.config.js";


const requestCounts = {};
const trimCode = async (req, res) => {
 

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
Provide the shortest possible version of the following code.

If the input is code:

* Return the code with all unnecessary elements removed, focusing on core functionality.
* Remove any comments, extra whitespace, or verbose syntax.
* If the code cannot be shortened without altering its functionality, state: "Code cannot be shortened."
* Do not provide any explanations or additional text.  Only return code or the stated message.

If the input is not code:

* State: "Input is not code."

Input:
\`\`\`
<selection-tag>
${code}
\`\`\`
`;
    const result = await model.generateContent(prompt);

    const trimmed = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!trimmed) {
      return res.json({ success: false, message: "Could not get trimmed" });
    }
    return res.json({ success: true, message: "Got the trimmed of your code", trimmed });
  } catch (error) {
    console.log(error);
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: "API quota exceeded. Please try again later." });
    }

    return res.json({ success: false, message: "Failed to get trimmed" });
  }
};

export default trimCode;


