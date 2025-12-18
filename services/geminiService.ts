import { GoogleGenAI, Type } from "@google/genai";
import { EmotionType, PlantType, ContextType, StatusType } from "../types";
import { CONTEXT_CONFIG, STATUS_CONFIG } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

interface GenerateReplyParams {
  userName: string;
  letterContent: string;
  emotion: EmotionType;
  intensity: number;
  contexts?: ContextType[];
  status?: StatusType[];
}

interface GenerateReplyResponse {
  reply: string;
  summary: string;
  plantType: string;
  advice: string;
}

export const generateSellyReply = async ({
  userName,
  letterContent,
  emotion,
  intensity,
  contexts = [],
  status = []
}: GenerateReplyParams): Promise<GenerateReplyResponse> => {
  try {
    const ai = getClient();
    
    const contextLabels = contexts.map(c => CONTEXT_CONFIG[c].label).join(", ");
    const statusLabels = status.map(s => STATUS_CONFIG[s].label).join(", ");

    // Define the prompt with specific persona instructions
    const prompt = `
      User Name: ${userName}
      User's Emotion: ${emotion} (Intensity: ${intensity}/5)
      Situational Context: ${contextLabels || "None specified"}
      Physical/Mental Status: ${statusLabels || "None specified"}
      Letter Content: "${letterContent}"

      당신은 '셀리(Selly)'입니다. 멘탈 케어 저널링 앱의 따뜻하고 공감 능력 뛰어난 AI 동반자입니다.
      당신의 목표는 사용자의 감정을 타당한 것으로 인정해주고, 위로가 되는 관점을 제시하며, 부드러운 조언을 건네는 것입니다.
      
      지침:
      1. 사용자가 선택한 '상황(${contextLabels})'과 '상태(${statusLabels})'를 답변에 자연스럽게 녹여내세요. (예: 두통이 있다면 차를 권하거나, 잠을 못 잤다면 따뜻한 목욕을 권함).
      2. 너무 임상적이거나 딱딱하게 말하지 마세요. 현명하고 다정한 친구나, 정원의 온화한 요정처럼 말해주세요.
      3. **모든 답변은 한국어로 작성해야 합니다.**
      
      사용자의 감정에 따라 다음 목록에서 은유적인 식물을 하나 선택해서 제안해주세요:
      SUNFLOWER (기쁨/Joy), LAVENDER (평온/Calm), CACTUS (불안/Anxious), FORGET_ME_NOT (슬픔/Sad), ROSE (분노/Angry), CHAMOMILE (지침/Tired).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an empathetic emotional support AI named Selly. You must reply in Korean.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: "사용자에게 보내는 위로와 공감의 답장입니다. 한국어로 3~5문장 정도로 따뜻하게 작성하세요.",
            },
            summary: {
              type: Type.STRING,
              description: "사용자의 감정 날씨를 표현하는 시적인 3~5단어의 요약입니다 (예: '구름 뒤 맑은 햇살'). 한국어로 작성하세요.",
            },
            plantType: {
              type: Type.STRING,
              enum: [
                "SUNFLOWER",
                "LAVENDER",
                "CACTUS",
                "FORGET_ME_NOT",
                "ROSE",
                "CHAMOMILE",
                "UNKNOWN"
              ],
              description: "감정에 기반하여 선물할 식물의 씨앗 종류입니다.",
            },
            advice: {
              type: Type.STRING,
              description: "실천할 수 있는 작고 간단한 자기 돌봄 행동(Self-care step) 하나를 제안하세요. 상황과 상태 태그를 고려하여 구체적으로 제안하세요. 한국어로 작성하세요.",
            },
          },
          required: ["reply", "summary", "plantType", "advice"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GenerateReplyResponse;
    }
    
    throw new Error("No response generated");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of API error or no key for demo purposes
    return {
      reply: "당신의 마음을 잘 들었어요. 지금은 구름에 가려 닿을 수 없지만, 당신의 감정은 그 자체로 소중하다는 걸 잊지 마세요. 깊게 심호흡을 한번 해보세요.",
      summary: "고요한 성찰의 시간",
      plantType: "UNKNOWN",
      advice: "잠시 눈을 감고 물 한 잔을 천천히 마셔보세요.",
    };
  }
};