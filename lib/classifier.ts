import type { ClassifierInput, ClassifierOutput } from "./schemas";
import { mockClassify } from "./mock-classifier";

/**
 * Classifies a community request into a structured output.
 *
 * Defaults to mock mode — no API key required.
 * To enable AI classification, set ANTHROPIC_API_KEY in .env.local
 * and swap `mockClassify` for a real LLM call.
 */
export async function classifyRequest(input: ClassifierInput): Promise<ClassifierOutput> {
  return mockClassify(input);
}
