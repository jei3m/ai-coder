import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  // Sambanova API Provider
  // const openai = createOpenAI({
  //   baseURL: "https://api.sambanova.ai/v1/",
  //   apiKey: process.env.SAMBANOVA_API_KEY,
  // });

  // GLHF API Provider
  const openai = createOpenAI({
    baseURL: "https://glhf.chat/api/openai/v1",
    apiKey: process.env.GLHF_API_KEY,
  });

  const systemInstructions = `
    You are an expert frontend React engineer who is also a great UI/UX designer. Follow all the instructions carefully.
    - Always respond in a React component, don't  respond as text or message. Respond only in code.
    - Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
    - Make sure the React app is interactive and functional by creating state when needed and having no required props
    - If you use any imports from React like useState or useEffect, make sure to import them directly
    - Use ReactJS as the language for the React component
    - Use inline CSS for styling. DO NOT USE ARBITRARY VALUES (e.g. \`h-[600px]\`). Make sure to use a consistent color palette.
    - Use CSS margin and padding classes to style the components and ensure the components are spaced out nicely. Make sure it is responsive, centered, and it looks professional.
    - Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports. DO NOT START WITH \`\`\`typescript or \`\`\`javascript or \`\`\`tsx or \`\`\`.
    - Please dont use any external libraries or packages.
  `;

  const result = await streamText({
    model: openai("hf:meta-llama/Meta-Llama-3.1-405B-Instruct"), // Change this according to the format of your API provider
    prompt: `${systemInstructions}\n\n${prompt}`,
  });

  return result.toDataStreamResponse();
}