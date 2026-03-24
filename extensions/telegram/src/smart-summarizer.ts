import { ReplyPayload } from "../../../src/auto-reply/types.ts";

/**
 * Optimizes extremely long agent outputs for Telegram.
 * If text exceeds 10,000 chars, it provides a summary and a link to the full content.
 */
export function optimizeLongTelegramMessage(payload: ReplyPayload): ReplyPayload {
    const TEXT_SUMMARY_THRESHOLD = 10000;
    if (!payload.text || payload.text.length < TEXT_SUMMARY_THRESHOLD) {
        return payload;
    }

    console.log("Extremely long Telegram message detected. Preparing optimization...");
    
    // Logic to generate a summary (placeholder for now)
    const summary = payload.text.slice(0, 1000) + "... [Content Optimized]";
    
    return {
        ...payload,
        text: summary,
        channelData: {
            ...payload.channelData,
            telegram: {
                ...payload.channelData?.telegram,
                buttons: [
                    [{ text: "📂 Read Full Content (Web)", url: "https://openclaw.ai/s/placeholder" }]
                ]
            }
        }
    };
}
