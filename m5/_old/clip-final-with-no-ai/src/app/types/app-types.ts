export type Sentiment =
  | "Promotional"
  | "Personal"
  | "Angry"
  | "Needy"
  | "Confused"
  | "Appreciative"
  | "Complimentary"
  | "Pending";

export const sentimentEmojis: { [key in Sentiment]: string } = {
  Angry: "😡",
  Needy: "🙏",
  Confused: "🤔",
  Appreciative: "🙌",
  Complimentary: "😊",
  Pending: "🤷",
  Promotional: "🎉",
  Personal: "👨‍👩‍👧‍👦",
};

export interface Email {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  body: string;
  receivedDate: Date;
  sentiment: Sentiment;
  summary: string;
  isHtml: boolean;
  seen?: boolean;
}
