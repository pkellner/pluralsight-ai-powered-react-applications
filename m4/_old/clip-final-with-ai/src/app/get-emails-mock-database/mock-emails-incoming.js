// this is to simulate the incoming emails to the sporting goods store.

const mockEmailsIncoming = [
  {
    id: "1",
    fromName: "Lisa Turner",
    fromEmail: "lisa.turner@tennismaven.net",
    subject: "Broken tennis racket",
    body: `
Hello,

I purchased a tennis racket from your store two weeks ago, and it broke during my first game. This is unacceptable for a high-end product. I demand a full refund or a replacement immediately. Let me know how this can be resolved promptly.

Regards,
Lisa Turner
    `,
    receivedDate: new Date(2024, 11, 22),
    summary:
      "Customer upset about broken tennis racket and demanding resolution.",
    isHtml: false,
  },
  {
    id: "2",
    fromName: "George Peters",
    fromEmail: "george.peters@gmail.com",
    subject: "Loved the new hiking boots!",
    body: `
Hi there,

Just wanted to drop a note to say how much I love the new hiking boots I bought last month. They are incredibly comfortable and durable. Keep up the great work with your products!

Best regards,
George Peters
    `,
    receivedDate: new Date(2024, 11, 21),
    summary: "Customer shares positive feedback about hiking boots.",
    isHtml: false,
  },
  {
    id: "3",
    fromName: "Samantha Green",
    fromEmail: "samantha.green@sizedetails.com",
    subject: "Confused about size charts",
    body: `
Hello,

I was browsing your website and noticed the size charts for jackets and pants are different from what I expected. Could you explain how to interpret the sizing? I want to ensure I order the right size.

Thank you,
Samantha Green
    `,
    receivedDate: new Date(2024, 11, 20),
    summary: "Customer seeks clarification on size charts.",
    isHtml: false,
  },
  {
    id: "4",
    fromName: "David Carter",
    fromEmail: "david.carter@adventuregear.co",
    subject: "Thanks for the prompt delivery!",
    body: `
Hi,

I received my order of camping gear yesterday, and I was thrilled with how fast it arrived. The items are exactly as described, and I can’t wait to use them this weekend. Great service!

Cheers,
David Carter
    `,
    receivedDate: new Date(2024, 11, 18),
    summary: "Customer thanks the company for fast delivery of camping gear.",
    isHtml: false,
  },
  {
    id: "5",
    fromName: "Jessica Allen",
    fromEmail: "jessica.allen@gmail.com",
    subject: "Defective fitness tracker",
    body: `
Hello,

The fitness tracker I bought from your store doesn’t track steps accurately. It constantly resets, which makes it unusable. I want a replacement or a refund. Please resolve this issue as soon as possible.

Thank you,
Jessica Allen
    `,
    receivedDate: new Date(2024, 11, 17),
    summary:
      "Customer complains about defective fitness tracker and requests resolution.",
    isHtml: false,
  },
  {
    id: "6",
    fromName: "Tom Wilson",
    fromEmail: "tom.wilson@fitgearhub.net",
    subject: "Discount request for bulk purchase",
    body: `
Hello,

I am interested in buying 20 yoga mats for my fitness studio. Do you offer any discounts for bulk purchases? Please let me know if there are special rates or promotions for large orders.

Thanks,
Tom Wilson
    `,
    receivedDate: new Date(2024, 11, 16),
    summary: "Customer inquiring about bulk purchase discounts for yoga mats.",
    isHtml: false,
  },
  {
    id: "7",
    fromName: "Rachel Scott",
    fromEmail: "rachel.scott@gmail.com",
    subject: "Promo code not working",
    body: `
Hi,

I tried using the promo code WINTER25 during checkout, but it’s not applying the discount. Can you check if there’s an issue with the code?

Regards,
Rachel Scott
    `,
    receivedDate: new Date(2024, 11, 15),
    summary: "Customer reports issue with applying promo code.",
    isHtml: false,
  },
  {
    id: "8",
    fromName: "Kevin Brown",
    fromEmail: "kevin.brown@customerheroes.org",
    subject: "Amazing customer service",
    body: `
Hi there,

I just wanted to say that your customer service team is fantastic. They helped me resolve an issue with my order quickly and efficiently. Please pass on my thanks to the team!

Cheers,
Kevin Brown
    `,
    receivedDate: new Date(2024, 11, 14),
    summary:
      "Customer praises the customer service team for resolving an issue.",
    isHtml: false,
  },
  {
    id: "9",
    fromName: "Hannah Lee",
    fromEmail: "hannah.lee@gmail.com",
    subject: "Order arrived damaged",
    body: `
Hello,

The ski poles I ordered arrived with scratches and dents. This is very disappointing. I need these replaced or refunded immediately. How do we proceed?

Regards,
Hannah Lee
    `,
    receivedDate: new Date(2024, 11, 13),
    summary: "Customer complains about damaged ski poles and seeks resolution.",
    isHtml: false,
  },
  {
    id: "10",
    fromName: "Daniel Lopez",
    fromEmail: "daniel.lopez@promogearzone.net",
    subject: "Love the promotional offers",
    body: `
Hi,

I wanted to say that your promotional offers on running gear are excellent. I’ve been able to stock up on quality items for my marathon training. Keep the deals coming!

Best regards,
Daniel Lopez
    `,
    receivedDate: new Date(2024, 11, 12),
    summary: "Customer appreciates promotional offers on running gear.",
    isHtml: false,
  },

  {
    id: "d2c7af02-bd20-42c8-b5e8-5ef5c8fd0464",
    fromName: "Jane Doe",
    fromEmail: "jane.doe@example.com",
    subject: "Request for refund",
    body: `Hi,

I really hate this product. I want a refund immediately. Please let me know the timeline and next steps to process the refund. Just to clarify, I've already contacted your support team but haven't received a response yet.

Thanks,
Jane Doe`,
    receivedDate: new Date(2024, 11, 22),
    summary: "User wants clarification on refund timeline and next steps.",
    isHtml: false,
  },
  {
    id: "e8f7e6a4-889d-4b74-bc3d-9dc64c5b3e51",
    fromName: "Tom Smith",
    fromEmail: "tom.smith@example.com",
    subject: "Defective basketball",
    body: `Hello,

I purchased a basketball from your store last week, but it keeps deflating after a few hours. I'm extremely frustrated with this experience. Please either replace it or issue a refund.

Regards,
Tom`,
    receivedDate: new Date(2024, 11, 21),
    summary:
      "Customer complains about a defective basketball and requests action.",
    isHtml: false,
  },
  {
    id: "c6f4f8b7-a6ab-4e55-b820-1c93e01b6d2e",
    fromName: "Laura Green",
    fromEmail: "laura.green@example.com",
    subject: "Product Inquiry: Running Shoes",
    body: `Hi there,

I'm interested in purchasing a pair of running shoes from your store but need more details about sizing and material. Could you provide some recommendations?

Best,
Laura`,
    receivedDate: new Date(2024, 11, 21),
    summary:
      "Customer inquires about running shoes details and recommendations.",
    isHtml: false,
  },
  {
    id: "d6a4bf4a-843f-4456-b22d-2c74a8f0d362",
    fromName: "Karen Wilson",
    fromEmail: "karen.wilson@example.com",
    subject: "Shipping Delay",
    body: `Hello,

I placed an order for a tennis racket two weeks ago and still haven't received it. This delay is unacceptable. Please provide an update immediately.

Thanks,
Karen`,
    receivedDate: new Date(2024, 11, 20),
    summary: "Customer complains about shipping delay for a tennis racket.",
    isHtml: false,
  },
  {
    id: "b2c7ac92-83b2-4f08-a53c-6f582a6d0b43",
    fromName: "Henry Adams",
    fromEmail: "henry.adams@example.com",
    subject: "Thank you for the discount",
    body: `Hi,

I just wanted to say thank you for the discount code I received last week. It was a nice surprise, and I used it to purchase a new hiking backpack. Keep up the great work!

Cheers,
Henry`,
    receivedDate: new Date(2024, 11, 19),
    summary: "Customer expresses appreciation for a discount code.",
    isHtml: false,
  },
  {
    id: "e4f6c8d3-5d67-4918-9208-c71d18d578af",
    fromName: "Nancy Blake",
    fromEmail: "nancy.blake@example.com",
    subject: "Treadmill instructions",
    body: `Hello,

I recently purchased a treadmill from your store, but the instructions are missing from the box. Could you send me a digital copy?

Thank you,
Nancy`,
    receivedDate: new Date(2024, 11, 18),
    summary: "Customer requests a copy of missing treadmill instructions.",
    isHtml: false,
  },
  {
    id: "c3a5e2b7-948f-41e5-b1a8-9d3d1c1c22d7",
    fromName: "Michael Brown",
    fromEmail: "michael.brown@example.com",
    subject: "Unhelpful support experience",
    body: `Hi,

I reached out to your support team last week about a damaged bicycle I received, and the experience was awful. I need this issue resolved now. Please escalate my request.

Michael`,
    receivedDate: new Date(2024, 11, 18),
    summary:
      "Customer expresses dissatisfaction with support and demands escalation.",
    isHtml: false,
  },
  {
    id: "a9f4e6b8-6d24-4bfa-a3e7-6d8a9b9c3d8f",
    fromName: "Emily Carter",
    fromEmail: "emily.carter@example.com",
    subject: "Great customer service",
    body: `Hi,

I recently visited your store and had a fantastic experience with your sales associate. They were so helpful in finding the right ski equipment for me. Kudos to your team!

Best,
Emily`,
    receivedDate: new Date(2024, 11, 17),
    summary: "Customer compliments store staff for excellent service.",
    isHtml: false,
  },
  {
    id: "d7a9e6b8-65d4-47c2-b1d6-7c3d5e9c4f7a",
    fromName: "Brian Cooper",
    fromEmail: "brian.cooper@example.com",
    subject: "Pending refund status",
    body: `Hello,

I'm still waiting for the refund you promised last month. Can you confirm when it will be processed? This delay is quite frustrating.

Regards,
Brian`,
    receivedDate: new Date(2024, 11, 16),
    summary: "Customer follows up on a pending refund request.",
    isHtml: false,
  },
  {
    id: "b5a2e3c4-7f65-491a-918d-8d9c5f7a2e6b",
    fromName: "Sophia Turner",
    fromEmail: "sophia.turner@example.com",
    subject: "Promo code inquiry",
    body: `Hi,

I received a promotional email about a discount code for outdoor gear but can't seem to apply it during checkout. Could you help?

Thanks,
Sophia`,
    receivedDate: new Date(2024, 11, 15),
    summary: "Customer asks for help with a promotional discount code.",
    isHtml: false,
  },
  {
    id: "d2c7af02-bd20-42c8-b5e8-5ef5c8fd0464",
    fromName: "Jane Doe",
    fromEmail: "jane.doe@refundhelp.org",
    subject: "Request for refund",
    body: `Hi,

I really hate this product. I want a refund immediately. Please let me know the timeline and next steps to process the refund. Just to clarify, I've already contacted your support team but haven't received a response yet.

Thanks,
Jane Doe`,
    receivedDate: new Date(2024, 11, 22),
    summary: "User wants clarification on refund timeline and next steps.",
    isHtml: false,
  },
  {
    id: "e8f7e6a4-889d-4b74-bc3d-9dc64c5b3e51",
    fromName: "Tom Smith",
    fromEmail: "tom.smith@gmail.com",
    subject: "Defective basketball",
    body: `Hello,

I purchased a basketball from your store last week, but it keeps deflating after a few hours. I'm extremely frustrated with this experience. Please either replace it or issue a refund.

Regards,
Tom`,
    receivedDate: new Date(2024, 11, 21),
    summary:
      "Customer complains about a defective basketball and requests action.",
    isHtml: false,
  },
  {
    id: "c6f4f8b7-a6ab-4e55-b820-1c93e01b6d2e",
    fromName: "Laura Green",
    fromEmail: "laura.green@runningshoes.co",
    subject: "Product Inquiry: Running Shoes",
    body: `Hi there,

I'm interested in purchasing a pair of running shoes from your store but need more details about sizing and material. Could you provide some recommendations?

Best,
Laura`,
    receivedDate: new Date(2024, 11, 21),
    summary:
      "Customer inquires about running shoes details and recommendations.",
    isHtml: false,
  },
  {
    id: "d6a4bf4a-843f-4456-b22d-2c74a8f0d362",
    fromName: "Karen Wilson",
    fromEmail: "karen.wilson@gmail.com",
    subject: "Shipping Delay",
    body: `Hello,

I placed an order for a tennis racket two weeks ago and still haven't received it. This delay is unacceptable. Please provide an update immediately.

Thanks,
Karen`,
    receivedDate: new Date(2024, 11, 20),
    summary: "Customer complains about shipping delay for a tennis racket.",
    isHtml: false,
  },
  {
    id: "b2c7ac92-83b2-4f08-a53c-6f582a6d0b43",
    fromName: "Henry Adams",
    fromEmail: "henry.adams@discountlovers.com",
    subject: "Thank you for the discount",
    body: `Hi,

I just wanted to say thank you for the discount code I received last week. It was a nice surprise, and I used it to purchase a new hiking backpack. Keep up the great work!

Cheers,
Henry`,
    receivedDate: new Date(2024, 11, 19),
    summary: "Customer expresses appreciation for a discount code.",
    isHtml: false,
  },
  {
    id: "e4f6c8d3-5d67-4918-9208-c71d18d578af",
    fromName: "Nancy Blake",
    fromEmail: "nancy.blake@treadmillinstructions.com",
    subject: "Treadmill instructions",
    body: `Hello,

I recently purchased a treadmill from your store, but the instructions are missing from the box. Could you send me a digital copy?

Thank you,
Nancy`,
    receivedDate: new Date(2024, 11, 18),
    summary: "Customer requests a copy of missing treadmill instructions.",
    isHtml: false,
  },
  {
    id: "c3a5e2b7-948f-41e5-b1a8-9d3d1c1c22d7",
    fromName: "Michael Brown",
    fromEmail: "michael.brown@gmail.com",
    subject: "Unhelpful support experience",
    body: `Hi,

I reached out to your support team last week about a damaged bicycle I received, and the experience was awful. I need this issue resolved now. Please escalate my request.

Michael`,
    receivedDate: new Date(2024, 11, 18),
    summary:
      "Customer expresses dissatisfaction with support and demands escalation.",
    isHtml: false,
  },
  {
    id: "a9f4e6b8-6d24-4bfa-a3e7-6d8a9b9c3d8f",
    fromName: "Emily Carter",
    fromEmail: "emily.carter@skiadventures.org",
    subject: "Great customer service",
    body: `Hi,

I recently visited your store and had a fantastic experience with your sales associate. They were so helpful in finding the right ski equipment for me. Kudos to your team!

Best,
Emily`,
    receivedDate: new Date(2024, 11, 17),
    summary: "Customer compliments store staff for excellent service.",
    isHtml: false,
  },
  {
    id: "d7a9e6b8-65d4-47c2-b1d6-7c3d5e9c4f7a",
    fromName: "Brian Cooper",
    fromEmail: "brian.cooper@refundrequests.net",
    subject: "Pending refund status",
    body: `Hello,

I'm still waiting for the refund you promised last month. Can you confirm when it will be processed? This delay is quite frustrating.

Regards,
Brian`,
    receivedDate: new Date(2024, 11, 16),
    summary: "Customer follows up on a pending refund request.",
    isHtml: false,
  },
  {
    id: "b5a2e3c4-7f65-491a-918d-8d9c5f7a2e6b",
    fromName: "Sophia Turner",
    fromEmail: "sophia.turner@gmail.com",
    subject: "Promo code inquiry",
    body: `Hi,

I received a promotional email about a discount code for outdoor gear but can't seem to apply it during checkout. Could you help?

Thanks,
Sophia`,
    receivedDate: new Date(2024, 11, 15),
    summary: "Customer asks for help with a promotional discount code.",
    isHtml: false,
  },
];

module.exports = mockEmailsIncoming;

/* prompt for adding more:
add 15 more mockEmails instead of just the one that are here. Make them all as if they are emails coming into a sporting goods store. make twice as many "Angry" as any other category, but otherwise, evenly spread the others across this list of emotions.  export const SentimentSchema = z.enum([
  "Promotional",
  "Personal",
  "Angry",
  "Needy",
  "Confused",
  "Appreciative",
  "Complimentary",
  "Pending",
]);
here is the list to replace with 25 new emails.  keep the emails all between 100 and 200 words and vary the length.
const mockEmailsIncoming = [
  {
    id: "d2c7af02-bd20-42c8-b5e8-5ef5c8fd0464",
    fromName: "Jane Doe",
    fromEmail: "jane.doe@example.com",
    subject: "Request for refund",
    body:
Hi,

I really hate this product. I want a refund immediately. Please let me know the timeline and next steps to process the refund. Just to clarify, I've already contacted your support team but haven't received a response yet.
Thanks,
Jane Doe
    ,
    receivedDate: new Date(2024, 11, 22),
    summary: "User wants clarification on refund timeline and next steps.",
    isHtml: false,
  },
 */
