import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  try {
    const { question, language } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      language === "hi"
        ? `कृपया इस प्रश्न का उत्तर हिंदी में दें:\n${question}`
        : `Answer in English:\n${question}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.status(200).json({ answer: reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gemini API error" });
  }
}
