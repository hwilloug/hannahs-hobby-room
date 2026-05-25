export type CategorySlug = 'crafts' | 'gardening' | 'coding' | 'books' | 'antiquing';

export const categoryMeta: Record<
  CategorySlug,
  { name: string; description: string; background?: string }
> = {
  crafts: {
    name: 'Crafts',
    description:
      "Welcome to the crafts section of my blog! Here, I do a bunch of random things, from cross stitch to woodworking. I really like making home accents, especially wall art. I also enjoy building things outside for my garden!",
    background:
      "My crafting journey began in childhood, creating alongside my mom and joining my elementary school's knitting club. While I took a break during my early teens, rediscovering knitting in high school opened up a whole new world of possibilities. What started with simple projects evolved into creating intricate purses, cozy afghans, and even wearable pieces like sweaters. To expand my fiber arts repertoire, I taught myself crochet, which complemented my knitting skills perfectly. During the 2020 lockdown, I embraced needlework, learning embroidery and falling in love with the timeless charm of cross stitch. Most recently, I've ventured into woodworking under my dad's guidance, combining this skill with my needle arts by creating custom frames for my pieces and building functional structures for my garden. Each craft I learn builds upon the others, creating a rich tapestry of skills that allow me to bring my creative visions to life.",
  },
  gardening: {
    name: 'Gardening',
    description:
      'Welcome to the gardening section of my blog! Here, I plant flowers to create a more vibrant space, grow fruits and vegetables using companion planting techniques, and slowly improve the sustainability of my garden.',
    background:
      'My gardening journey began in Boston, where I transformed a sunny apartment balcony into a thriving container garden. Using fabric planters, I experimented with everything from leafy greens to root vegetables, learning valuable lessons about urban gardening along the way. I became particularly fascinated with companion planting - strategically grouping plants that benefit each other. What started as a modest balcony garden has now evolved into several raised beds, where I continue to apply and expand upon the knowledge I gained from those early container gardening days. Each season brings new challenges and discoveries as I work to create a more sustainable and productive garden space.',
  },
  coding: {
    name: 'Coding',
    description:
      'Welcome to the coding section of my blog! Here, I share my coding projects and tutorials.',
    background:
      "My coding journey began on Neopets.com, where I first discovered web development through customizing my profile page with HTML and CSS. This early exposure sparked a lifelong interest in programming, though it would be years before I pursued it seriously. In 2019, I committed to learning modern web development, diving deep into JavaScript, React, and full-stack development. I built several projects to develop my skills, including the first version of this blog. That portfolio piece, along with other projects, helped me land my first role as a full-stack software engineer in 2021. Since then, I've continued expanding my knowledge, exploring everything from game development to IoT projects with Raspberry Pi. Each new technology I learn reinforces my passion for coding and problem-solving. Currently, I am working as a DevOps Engineer, a more specialized role from my previous full-stack role.",
  },
  books: {
    name: 'Books',
    description:
      "Welcome to the books section of my blog! Here, I post my thoughts about the books I read. This section isn't super active, but it's here just in case.",
  },
  antiquing: {
    name: 'Antiquing',
    description:
      "Welcome to the antiquing section of my blog! Here, I collect my favorite things and show how I decorate my home. There's not much content yet here, but be prepared for some new articles soon!",
  },
};

export const categorySlugs = Object.keys(categoryMeta) as CategorySlug[];
