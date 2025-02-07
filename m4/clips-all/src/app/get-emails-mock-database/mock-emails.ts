import { Email } from "@/app/types/app-types";

export const mockEmails: Email[] = [
  {
    id: "e1",
    fromName: "Sarah Lee",
    fromEmail: "sarah.lee@gmail.com",
    subject: "Request for product details",
    body: `
Hi,

I recently came across your new trail running shoes and am very interested in learning more about them. As an avid trail runner preparing for an ultramarathon, I need to ensure I'm making the right choice for my training. Could you please provide me with detailed information about the material composition, precise weight measurements, and the full range of available sizes?

I'm particularly concerned about the durability and water resistance features. My training routes often involve crossing streams and dealing with varying weather conditions. Could you explain the specific technologies used in the waterproofing system? Additionally, I'd love to know how these shoes perform on technical terrain - specifically rocky paths and steep inclines. Any test data or customer feedback from similar conditions would be extremely helpful.

The stack height and drop specifications are also crucial for my decision. Could you share these measurements, along with any research or testing data that demonstrates their impact on running performance? I'm especially interested in how these metrics compare to other leading trail running shoes in the market.

I would also greatly appreciate any recommendations for complementary gear that would work well with these shoes. Are there specific socks or gaiters that you've found to enhance the performance of these particular shoes? Information about any care products or maintenance routines that help extend the life of the shoes would be valuable as well.

Best regards,
Sarah Lee
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    sentiment: "Needy",
    isHtml: false,
    summary: "",
  },
  {
    id: "e2",
    fromName: "Bob Johnson",
    fromEmail: "bob.johnson@outdoorfun.net",
    subject: "Just wanted to say thanks for the great service!",
    body: `
Hello team,

I just wanted to drop a note and say how much I appreciate the exceptional service I received during my recent purchase. From the moment I started browsing your website to the final delivery of my order, every interaction with your company has been nothing short of outstanding. The intuitive website design made finding exactly what I needed incredibly easy, and the checkout process was smooth and efficient.

The level of communication throughout the entire process was particularly impressive. I received timely updates about my order status, and when I had a question about one of the items, your customer service team responded within hours with detailed, helpful information. This kind of attentiveness to customer needs is increasingly rare in today's retail environment.

The product quality has far exceeded my expectations. Everything arrived perfectly packaged, and it's clear that great care was taken in selecting and shipping each item. The attention to detail, from the product descriptions online to the included care instructions, shows a real commitment to customer satisfaction.

I've already recommended your company to several friends who are looking for similar products. It's refreshing to experience such professionalism and dedication to customer service. You've definitely earned a loyal customer, and I look forward to making many more purchases in the future.

Best regards,
Bob Johnson
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    sentiment: "Complimentary",
    isHtml: false,
    summary: "",
  },
  {
    id: "e3",
    fromName: "Alice Kim",
    fromEmail: "alice.kim@adventurers.io",
    subject: "Confused about warranty terms",
    body: `
Hi,

I'm writing to seek clarification about the warranty coverage for the paddle board I purchased from your store last month. After reviewing the documentation, I'm finding several points quite confusing, particularly regarding the different terms for various types of damage. The warranty booklet seems to have some overlapping categories that I'm struggling to understand.

One of my main concerns is about the coverage for accidental damage. The documentation mentions both "normal wear and tear" and "accidental damage" but doesn't clearly define the distinction between these categories. For instance, if a scratch occurs during regular transport to the beach, would this fall under normal wear and tear, or would it be considered accidental damage? Additionally, there's mention of "manufacturing defects," but the description seems to overlap with other categories.

The warranty registration process is another area where I need clarification. I noticed there are multiple ways to register - through the included warranty card, your website, and a mobile app. Do I need to complete all of these registrations, or is one method sufficient? The documentation isn't clear about whether using multiple registration methods provides any additional benefits or coverage.

I also noticed that different sections of the warranty document mention varying coverage periods. One section references a "limited lifetime warranty," while another specifies a "12-month coverage period." Could you please explain how these different timeframes apply to my purchase? Understanding this distinction is crucial for me to properly maintain my coverage.

Thank you,
Alice Kim
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    sentiment: "Confused",
    isHtml: false,
    summary: "",
  },
  {
    id: "e4",
    fromName: "Mark Green",
    fromEmail: "mark.green@gmail.com",
    subject: "Appreciation for your quick support",
    body: `
Hey there!

I wanted to take a moment to express my sincere appreciation for the incredibly quick and efficient response I received regarding my recent inquiry about hiking gear. Your team's handling of my questions was exemplary, and I'm thoroughly impressed with the level of service provided. The speed and accuracy of your response really stood out, especially given the technical nature of my questions.

What particularly impressed me was the comprehensive nature of the information provided. Your support team didn't just answer my direct questions; they went above and beyond by offering additional insights and recommendations that I hadn't even thought to ask about. This proactive approach to customer service demonstrated a real understanding of hikers' needs and concerns.

The follow-up information about gear maintenance and optimal usage patterns was especially helpful. These additional tips show that your team truly cares about ensuring customers get the most out of their purchases. It's refreshing to encounter a company that values customer education as much as sales.

Please pass on my thanks to your support team - they've definitely earned my loyalty as a customer. This kind of responsive and knowledgeable service is increasingly rare, and it makes a real difference to outdoor enthusiasts like myself who rely on accurate information for our adventures.

Cheers,
Mark Green
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 150), // 2.5 hours ago
    sentiment: "Appreciative",
    isHtml: false,
    summary: "",
  },
  {
    id: "e5",
    fromName: "John Smith",
    fromEmail: "john.smith@bikesmart.com",
    subject: "Serious issues with delivered bicycle",
    body: `
Hello,

I am writing regarding the bicycle I recently received from your store. Upon delivery last week, I noticed several concerning issues that need immediate attention. The packaging showed clear signs of mishandling during transit, which appears to have resulted in significant damage to the bicycle.

Upon careful inspection, I discovered that the front wheel is severely bent, making it impossible to rotate properly. Additionally, there are multiple deep scratches and scuff marks across the frame, particularly on the down tube and chain stays. This level of damage is completely unacceptable for a new bicycle, especially one marketed as a premium product.

What makes this situation even more frustrating is that I specifically chose your company based on your reputation for quality and careful shipping practices. I'm now faced with a completely unusable bicycle just days before a major cycling event I've been training months for. The timing of this couldn't be worse, and I'm extremely disappointed in both the product condition and quality control.

This is absolutely unacceptable for a bicycle in this price range. I demand immediate action to resolve this situation. I expect either a complete replacement with expedited shipping or a full refund, including all shipping costs. I have thoroughly documented all damage with photographs and videos, which I can provide if necessary.

I expect a response within 24 hours detailing exactly how you plan to address this issue. Any delay in resolution will further impact my training schedule and potentially force me to withdraw from upcoming events.

Regards,
John Smith
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 210), // 3.5 hours ago
    sentiment: "Angry",
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

I'm writing to inquire about the upcoming winter collection pre-orders. I'm extremely excited about the new line and want to ensure I don't miss out on securing my items. Could you please provide specific information about when the pre-order window opens and what the expected delivery timeline would be? I'm particularly concerned about having everything arrive before the holiday season.

I've noticed that last year's collection sold out very quickly during the pre-order phase. Could you let me know if there will be any early access opportunities or special programs for loyal customers? I'm also very interested in understanding the full range of products that will be available for pre-order, as I'm hoping to coordinate several pieces for a winter sports trip I have planned.

The timing of delivery is crucial for my planning. Could you provide detailed information about the various shipping options that will be available for pre-orders? I'd also love to know about any exclusive discounts or special offers that might be available during the pre-order period. Additionally, what is your policy regarding making changes to pre-orders after they've been placed?

I would greatly appreciate any information about the pre-order process itself. For instance, will there be a limit on the number of items that can be pre-ordered? Also, is there a way to get notified when the pre-order period begins? I'm hoping to avoid any disappointment of missing out on key pieces.

Thanks,
Emma Watson
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 270), // 4.5 hours ago
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

I'm writing to share some detailed feedback about your camping stove after using it extensively over the past few weeks. While I'm generally impressed with the overall design and efficiency of the product, I've identified several areas where I believe improvements could significantly enhance the user experience and safety features.

The primary concern I've noticed relates to the fuel canister attachment mechanism. When setting up the stove on uneven terrain, which is quite common in real-world camping situations, the connection between the stove and fuel canister feels notably unstable. This instability becomes more pronounced as the fuel canister empties, creating potential safety concerns during cooking. I've observed this issue particularly when preparing larger meals that require frequent stirring or adjustment of cookware.

Based on my experience with similar products, I have several specific suggestions for improvement. First, implementing a wider base design could help distribute weight more evenly and improve stability across various surfaces. Additionally, adding a locking mechanism similar to what I've seen on some premium competitors' models could provide users with more confidence in the connection. These modifications would likely require minimal changes to the current design while significantly enhancing safety and user experience.

I'm sharing this feedback because I genuinely believe in your product's potential and want to help make it even better. Your camping stove has many excellent features, and these suggested improvements could help it become the industry standard. I would be happy to provide more detailed observations or discuss this further if you're interested.

Best,
Chris Parker
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 330), // 5.5 hours ago
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

I'm writing to report ongoing issues with your website's payment processing system. Yesterday, I attempted to place an order multiple times, but each attempt resulted in a "transaction declined" message. I've verified with my bank that there are no issues with my card, and I've successfully used it for other online purchases today.

This situation is particularly concerning because several items in my cart are marked as limited stock, and I'm worried about losing the opportunity to purchase them. I've taken all the usual troubleshooting steps - clearing my browser cache, trying different browsers, and even attempting the purchase as both a logged-in user and guest. Unfortunately, none of these attempts have been successful.

The error messages provided are quite vague and don't give any specific information about why the transactions are being declined. I've double-checked all my payment information, including billing address and security code, but everything appears to be correct. I would greatly appreciate if you could investigate what might be causing these payment failures.

Could you please look into this issue and let me know what steps I need to take to complete my purchase? I'm happy to provide any additional information that might help resolve this problem. Time is somewhat critical given the limited stock situation.

Thanks,
Laura Bennett
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 390), // 6.5 hours ago
    sentiment: "Confused",
    isHtml: false,
    summary: "",
  },
  {
    id: "e9",
    fromName: "David Turner",
    fromEmail: "david.turner@gmail.com",
    subject: "Unacceptable delay in response to warranty claim",
    body: `
Hi,

I am writing to express my growing frustration regarding my previous email about a replacement part for my lawn mower. It has now been over a week since my initial inquiry, and I have yet to receive any form of acknowledgment or response. This complete lack of communication is both unprofessional and unacceptable.

When I purchased this equipment from your store, I was assured of excellent customer service and prompt warranty support. However, my experience has been anything but satisfactory. I have checked my spam folder multiple times and confirmed that my original email was sent correctly, yet there has been absolutely no response from your team.

The lack of communication is particularly frustrating because this isn't a minor issue - the part in question is essential for the basic operation of the mower. Every day that passes without a response means another day that I cannot maintain my property. This situation is becoming increasingly problematic as the grass continues to grow.

I expect an immediate response to this email with a clear explanation for the delay and a concrete timeline for resolving my warranty claim. If I don't receive a satisfactory response within 24 hours, I will be forced to escalate this matter through other channels.

Regards,
David Turner
      `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 450), // 7.5 hours ago
    sentiment: "Angry",
    isHtml: false,
    summary: "",
  },
];
