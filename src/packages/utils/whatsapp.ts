// ============================================================================
// whatsapp.ts — shared helper for building wa.me deep links.
// Keeps message-encoding logic in one place instead of duplicated per component.
// ============================================================================

export function buildWhatsAppUrl(phoneIntl: string, message: string): string {
  return `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;
}

export type EnquiryPayload = {
  name: string;
  city: string;
  mood: string;
  date: string;
  group: string;
};

export function buildEnquiryMessage(
  plannerName: string,
  data: EnquiryPayload,
): string {
  return [
    `Hi ${plannerName}! I'd like a trip plan.`,
    "",
    `Name: ${data.name}`,
    `Pickup city: ${data.city}`,
    `Feeling I want: ${data.mood}`,
    `Travel date: ${data.date}`,
    `Group size: ${data.group}`,
  ].join("\n");
}
