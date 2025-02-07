const mockEmailsIncoming = [
  {
    id: "1",
    fromName: "Lisa Turner",
    fromEmail: "lisa.turner@tennismaven.net",
    subject: "Broken tennis racket - Immediate attention needed",
    body: `
Hello,

I am writing regarding the premium tennis racket I purchased from your store two weeks ago. During my first competitive match yesterday, the racket developed a significant crack in the frame after what was honestly a routine serve. As someone who plays tennis professionally, this kind of equipment failure is not just disappointing – it's potentially damaging to my training schedule and competition preparation.

The racket in question was advertised as being tournament-grade and specifically designed for professional players. Given the price point and marketed quality, this kind of failure is completely unacceptable. I've been playing tennis for over 15 years and have never experienced such a premature equipment failure.

I demand either an immediate replacement with a higher-grade racket or a full refund, including the shipping costs I incurred. Additionally, I believe I should be compensated for the tournament fees I lost due to having to withdraw after the equipment failure. This needs to be resolved within the next 24 hours as I have another tournament coming up this weekend.

Let me know immediately how you plan to address this situation. I have documented the damage with photos and videos, which I can provide if necessary.

Regards,
Lisa Turner
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    summary: "Customer upset about broken tennis racket and demanding resolution.",
    isHtml: false,
    sentiment: "Angry"
  },
  {
    id: "2",
    fromName: "George Peters",
    fromEmail: "george.peters@gmail.com",
    subject: "Incredible experience with your hiking boots!",
    body: `
Hi there,

I just had to write to share my amazing experience with the hiking boots I purchased from your store last month. I've just completed a challenging 50-mile trek through varied terrain, and these boots performed beyond my wildest expectations. The comfort level is extraordinary – no blisters or hot spots, even after 12-hour hiking days.

The waterproofing feature really proved its worth when we encountered unexpected stream crossings and rain. My feet stayed completely dry while others in my group weren't so fortunate. The grip on rocky surfaces was particularly impressive, giving me complete confidence on some rather treacherous sections of the trail.

I especially appreciate the thoughtful design elements, like the reinforced toe cap that protected my feet from rocky impacts and the quick-lacing system that made adjustments easy even with cold hands. Keep up the fantastic work with your products – you've earned a customer for life!

Best regards,
George Peters
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    summary: "Customer shares positive feedback about hiking boots.",
    isHtml: false,
    sentiment: "Complimentary"
  },
  {
    id: "3",
    fromName: "Samantha Green",
    fromEmail: "samantha.green@sizedetails.com",
    subject: "Need clarification on size charts",
    body: `
Hello,

I've been spending considerable time on your website looking at your winter collection, particularly the performance jackets and ski pants. However, I'm finding myself quite confused about the sizing system you use. The measurements seem to differ significantly from other athletic brands I'm familiar with.

Could you please explain how your sizing system works? I notice that the jacket measurements are listed in both European and US sizes, but they don't seem to align with the conversion charts I'm used to. Additionally, the pants sizes seem to use a completely different system altogether.

I'm typically a medium in most athletic wear, but according to your chart, I might be anywhere from a small to a large depending on which measurement I prioritize. Is there a specific measurement that's most crucial for a good fit in your garments? Also, do your items tend to run true to size, or should I size up/down?

Thank you for any guidance you can provide,
Samantha Green
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    summary: "Customer seeks clarification on size charts.",
    isHtml: false,
    sentiment: "Confused"
  },
  {
    id: "4",
    fromName: "David Carter",
    fromEmail: "david.carter@adventuregear.co",
    subject: "Exceptional delivery service!",
    body: `
Hi,

I just received my order of camping gear yesterday, and I had to write to express how impressed I am with your delivery service! Not only did everything arrive well ahead of the estimated delivery date, but the packaging was absolutely top-notch. Each item was carefully protected, and the organization of the package made unpacking a breeze.

The tracking updates were frequent and accurate, which really helped me plan for the delivery. I particularly appreciated the text notifications as the package made its way to my address. This level of service is exactly what outdoor enthusiasts need when planning their adventures.

I can't wait to test out all the gear this weekend on my camping trip. Based on the quality of service alone, you've earned yourself a repeat customer!

Cheers,
David Carter
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 150), // 2.5 hours ago
    summary: "Customer thanks the company for fast delivery of camping gear.",
    isHtml: false,
    sentiment: "Appreciative"
  },
  {
    id: "5",
    fromName: "Jessica Allen",
    fromEmail: "jessica.allen@gmail.com",
    subject: "Defective fitness tracker - Immediate resolution needed",
    body: `
Hello,

I am writing regarding the fitness tracker I purchased from your store last week. What was supposed to be a premium fitness tracking device has turned out to be completely unreliable and essentially useless. The step counter randomly resets multiple times throughout the day, and the distance tracking is wildly inaccurate, showing that I've run marathons when I've only walked to my mailbox.

I've already tried all the troubleshooting steps listed in your manual – resetting the device, updating the firmware, and reinstalling the app. Nothing has resolved these issues. This is especially frustrating as I'm training for an upcoming event and need accurate tracking of my progress.

Given that this device was marketed as a professional-grade fitness tracker, its performance is absolutely unacceptable. I require either a replacement with a properly functioning unit or a complete refund, including shipping costs. Please address this issue immediately as it's affecting my training schedule.

Thank you,
Jessica Allen
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 210), // 3.5 hours ago
    summary: "Customer complains about defective fitness tracker and requests resolution.",
    isHtml: false,
    sentiment: "Angry"
  },
  {
    id: "6",
    fromName: "Tom Wilson",
    fromEmail: "tom.wilson@fitgearhub.net",
    subject: "Bulk purchase inquiry for yoga studio",
    body: `
Hello,

I am reaching out regarding a potential bulk purchase for my expanding fitness studio. We're interested in ordering 20 premium yoga mats for our new hot yoga program. Given the quantity, I'm hoping we might be able to discuss some sort of volume pricing or special rate.

Could you please provide information about any bulk purchase programs you offer? I'm particularly interested in your professional-grade mats with enhanced grip and durability features. We would also need to know about your warranty policies for bulk orders and any available maintenance or cleaning recommendations for commercial use.

Additionally, do you offer any special payment terms for business accounts? We're planning to make regular bulk purchases as we continue to expand our studio network.

Thanks,
Tom Wilson
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 270), // 4.5 hours ago
    summary: "Customer inquiring about bulk purchase discounts for yoga mats.",
    isHtml: false,
    sentiment: "Needy"
  },
  {
    id: "7",
    fromName: "Rachel Scott",
    fromEmail: "rachel.scott@gmail.com",
    subject: "Issues with promotional code",
    body: `
Hi,

I'm trying to complete a purchase on your website using the promotional code WINTER25 that was sent in your latest newsletter. However, I'm encountering some issues with the code application. When I enter it at checkout, the system either shows an error message or simply doesn't apply the discount.

I've tried using the code multiple times, both logged into my account and as a guest user. I've also cleared my browser cache and tried using a different browser, but the issue persists. The promotion is supposed to be valid until the end of this month, according to your email.

Could you please verify if there are any specific conditions for using this code that I might have missed, or if there's perhaps a technical issue that needs to be addressed?

Regards,
Rachel Scott
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 330), // 5.5 hours ago
    summary: "Customer reports issue with applying promo code.",
    isHtml: false,
    sentiment: "Confused"
  },
  {
    id: "8",
    fromName: "Kevin Brown",
    fromEmail: "kevin.brown@customerheroes.org",
    subject: "Outstanding customer service experience",
    body: `
Hi there,

I wanted to take a moment to commend your customer service team, particularly Sarah, who assisted me last week with a rather complicated order issue. Her professionalism and dedication to finding a solution were truly exemplary. The level of personal attention and care she showed in resolving my problem was remarkable.

What impressed me most was how she proactively followed up with additional information and suggestions that helped prevent similar issues in the future. This kind of thoughtful, comprehensive service is increasingly rare these days, and it deserves recognition.

Please pass on my sincere thanks to Sarah and your entire customer service team. You've earned yourself a loyal customer who will definitely be recommending your store to others in the sports community.

Cheers,
Kevin Brown
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 390), // 6.5 hours ago
    summary: "Customer praises the customer service team for resolving an issue.",
    isHtml: false,
    sentiment: "Complimentary"
  },
  {
    id: "9",
    fromName: "Hannah Lee",
    fromEmail: "hannah.lee@gmail.com",
    subject: "Damaged ski poles - Immediate attention required",
    body: `
Hello,

I am writing to express my extreme disappointment with the condition of the ski poles I recently received from your store. These were supposed to be brand new, premium equipment, but they arrived looking like they'd been used as hockey sticks. There are multiple deep scratches and concerning dents that absolutely affect their structural integrity.

This is completely unacceptable, especially considering these were purchased for an upcoming skiing trip that's now just days away. The poles were not cheap, and I specifically chose your store based on your reputation for quality equipment. This experience has been nothing short of disappointing.

I need these replaced or refunded immediately. Given the time-sensitive nature of my situation, I expect a response within 24 hours with a concrete solution. I have photos documenting all the damage, which I can provide if needed.

Regards,
Hannah Lee
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 450), // 7.5 hours ago
    summary: "Customer complains about damaged ski poles and seeks resolution.",
    isHtml: false,
    sentiment: "Angry"
  },
  {
    id: "10",
    fromName: "Daniel Lopez",
    fromEmail: "daniel.lopez@promogearzone.net",
    subject: "Fantastic running gear promotions",
    body: `
Hi,

I wanted to reach out and express my appreciation for your recent promotional offers on running gear. As someone training for their first marathon, I've been able to build up my essential gear collection without breaking the bank. The quality-to-price ratio of your promotional items has been exceptional.

I particularly appreciated how your deals are thoughtfully structured – offering complementary items together makes it really easy to build a complete training kit. The graduated compression socks that were on sale last week pair perfectly with the running shoes I bought during your previous promotion.

Keep these amazing deals coming! I've already recommended your store to my entire running club based on these fantastic offers.

Best regards,
Daniel Lopez
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 510), // 8.5 hours ago
    summary: "Customer appreciates promotional offers on running gear.",
    isHtml: false,
    sentiment: "Appreciative"
  },
  {
    id: "11",
    fromName: "Jane Doe",
    fromEmail: "jane.doe@refundhelp.org",
    subject: "Completely dissatisfied with product quality",
    body: `
Hello,

I am writing regarding the home gym equipment I purchased last month. Initially, I tried to be patient and work through the issues, but after multiple attempts to use this equipment safely, I am beyond frustrated. The weight plates don't fit properly on the bars, the cable system makes alarming noises during use, and the bench wobbles even on a perfectly level floor.

I have already reached out to your support team twice about these issues, but have received nothing but automated responses. This complete lack of real customer service is infuriating. I spent a significant amount of money on what was advertised as professional-grade equipment, but what I received is dangerous to use.

I demand an immediate refund for this entire set. I've documented all the defects with videos and photos, which clearly show the equipment is not up to any reasonable standard of quality. I expect a response within 24 hours with concrete steps for returning this hazardous equipment and receiving my refund.

I will be sharing my experience on all relevant review platforms if this is not resolved promptly.

Regards,
Jane Doe
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 570), // 9.5 hours ago
    summary: "Customer demands refund for defective home gym equipment.",
    isHtml: false,
    sentiment: "Angry"
  },
  {
    id: "12",
    fromName: "Tom Smith",
    fromEmail: "tom.smith@gmail.com",
    subject: "Defective basketball needs attention",
    body: `
Hello,

I purchased what was advertised as a professional-grade basketball from your store last week, but I'm experiencing serious issues with it. The ball loses air pressure significantly after minimal use – we're talking about deflating to an unusable state within just a few hours of play. This is not what I expect from a ball marketed for competitive play.

I've already tried using different air pumps and checked that the valve isn't defective, but the problem persists. As someone who coaches youth basketball, having reliable equipment is crucial for my practices. This situation is severely disrupting my training sessions.

I would like either a replacement with a properly tested ball or a complete refund. Please let me know how we can resolve this as soon as possible, as I have daily practice sessions that are being affected.

Regards,
Tom
    `,
    receivedDate: new Date(Date.now() - 1000 * 60 * 630), // 10.5 hours ago
    summary: "Customer complains about a defective basketball and requests action.",
    isHtml: false,
    sentiment: "Angry"
  }
];

module.exports = mockEmailsIncoming;