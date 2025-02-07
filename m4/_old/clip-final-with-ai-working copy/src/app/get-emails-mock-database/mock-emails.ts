import { Email } from "@/app/types/app-types";

export const mockEmails: Email[] = [
  {
    id: "e1",
    fromName: "John Smith",
    fromEmail: "john.smith@bikesmart.com",
    subject: "Complaint about a damaged bike",
    body: `
Hello,

I received the bicycle I ordered last week and it arrived with a bent front wheel and several scratches on the frame. This is extremely disappointing as I was looking forward to using it this weekend. The packaging also appeared to be damaged during transit, which might have contributed to the condition of the bike. I would appreciate it if you could address this issue promptly and let me know the steps for a replacement or repair. Please get back to me as soon as possible, as this was a significant purchase.

Thank you,
John Smith
      `,
    receivedDate: new Date("2024-12-01T10:15:00Z"),
    sentiment: "Angry",
    isHtml: false,
    summary: "",
  },
  {
    id: "e2",
    fromName: "Sarah Lee",
    fromEmail: "sarah.lee@gmail.com",
    subject: "Request for product details",
    body: `
Hi,

I recently came across your new trail running shoes and am very interested in learning more about them. Could you please provide me with detailed information about the material, weight, and available sizes? Additionally, I'd like to know if they are water-resistant and suitable for use in rocky terrains. Any recommendations for complementary gear would also be appreciated. Looking forward to your response.

Best regards,
Sarah Lee
      `,
    receivedDate: new Date("2024-12-02T08:20:00Z"),
    sentiment: "Needy",
    isHtml: false,
    summary: "",
  },
  {
    id: "e3",
    fromName: "Bob Johnson",
    fromEmail: "bob.johnson@outdoorfun.net",
    subject: "Just wanted to say thanks for the great service!",
    body: `
Hello team,

I just wanted to drop a note and say how much I appreciate the excellent service I received. From placing the order to receiving it on time, everything was seamless. The product quality exceeded my expectations, and it’s refreshing to experience such professionalism in customer service. Keep up the great work, and I’ll definitely recommend your company to my friends and family.

Best regards,
Bob Johnson
      `,
    receivedDate: new Date("2024-12-03T09:00:00Z"),
    sentiment: "Complimentary",
    isHtml: false,
    summary: "",
  },
  {
    id: "e4",
    fromName: "Alice Kim",
    fromEmail: "alice.kim@adventurers.io",
    subject: "Confused about warranty terms",
    body: `
Hi,

I’m a bit uncertain about the warranty coverage on the paddle board I purchased last month. The documentation mentions different terms depending on the type of damage, and I’m unsure if accidental tears are covered. Could you clarify this for me? Additionally, do I need to register my product to activate the warranty? Your guidance on this matter would be greatly appreciated.

Thank you,
Alice Kim
      `,
    receivedDate: new Date("2024-12-04T11:10:00Z"),
    sentiment: "Confused",
    isHtml: false,
    summary: "",
  },
  {
    id: "e5",
    fromName: "Mark Green",
    fromEmail: "mark.green@gmail.com",
    subject: "Appreciation for your quick support",
    body: `
Hey there!

Just wanted to say thanks for the super quick response to my last inquiry about the hiking gear. Your team was incredibly helpful in resolving my issue, and I’m impressed with how fast everything was sorted out. It’s not often that you find such responsive customer service these days. Please pass on my thanks to the support team—I really appreciate their efforts.

Cheers,
Mark Green
      `,
    receivedDate: new Date("2024-12-05T14:25:00Z"),
    sentiment: "Appreciative",
    isHtml: false,
    summary: "",
  },
  {
    id: "e6",
    fromName: "Emma Watson",
    fromEmail: "emma.watson@winterstyles.org",
    subject: "Question about pre-order timing",
    body: `
Hello,

I’m interested in pre-ordering your upcoming winter collection, but I’m unclear on the exact release date and delivery timelines. Can you let me know when I should place my order to ensure it arrives before the holidays? Also, are there any exclusive discounts available for pre-orders? I’m excited to hear back and make a purchase soon.

Thanks,
Emma Watson
      `,
    receivedDate: new Date("2024-12-06T12:00:00Z"),
    sentiment: "Needy",
    isHtml: false,
    summary: "",
  },
  {
    id: "e7",
    fromName: "Chris Parker",
    fromEmail: "chris.parker@campingpros.com",
    subject: "Suggestion for product improvement",
    body: `
Hi,

I’ve been using your camping stove for a few weeks now and wanted to share some feedback. While the stove is efficient and compact, I noticed that the fuel canister attachment could be more secure. It’s a bit wobbly when setting up on uneven ground. Perhaps adding a locking mechanism or wider base could improve stability. Just thought I’d share my experience in case you’re working on updates to the design.

Best,
Chris Parker
      `,
    receivedDate: new Date("2024-12-07T13:30:00Z"),
    sentiment: "Pending",
    isHtml: false,
    summary: "",
  },
  {
    id: "e8",
    fromName: "Laura Bennett",
    fromEmail: "laura.bennett@shopsecure.net",
    subject: "Issue with online payment",
    body: `
Hello,

I tried placing an order through your website yesterday, but the payment process failed twice. Both attempts showed a “transaction declined” message, even though my card works fine elsewhere. Could you please check if there’s an issue on your end? I’d really like to complete my purchase, as the items in my cart are limited stock.

Thanks,
Laura Bennett
      `,
    receivedDate: new Date("2024-12-08T15:00:00Z"),
    sentiment: "Confused",
    isHtml: false,
    summary: "",
  },
  {
    id: "e9",
    fromName: "David Turner",
    fromEmail: "david.turner@gmail.com",
    subject: "Follow-up on my previous inquiry",
    body: `
Hi,

I’m following up on my earlier email regarding a replacement part for my lawn mower. It’s been over a week, and I haven’t received any updates. Could you let me know the status of my request? I’m starting to worry that it might have been overlooked. Please confirm if you need any additional details to proceed.

Regards,
David Turner
      `,
    receivedDate: new Date("2024-12-09T16:45:00Z"),
    sentiment: "Pending",
    isHtml: false,
    summary: "",
  },
  {
    id: "e10",
    fromName: "Sophia Harris",
    fromEmail: "sophia.harris@greenpackaging.com",
    subject: "Inquiry about corporate partnerships",
    body: `
Hi,

I’m reaching out to explore potential partnership opportunities with your company. We specialize in eco-friendly packaging solutions and believe our products align well with your sustainability goals. If this sounds like something you’d be interested in, I’d love to set up a call to discuss further. Looking forward to hearing your thoughts.

Best regards,
Sophia Harris
      `,
    receivedDate: new Date("2024-12-10T17:20:00Z"),
    sentiment: "Pending",
    isHtml: false,
    summary: "",
  },
];
