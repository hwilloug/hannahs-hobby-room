import { ArticleProse, ProseImage, HaulImage } from '@/components/prose';

export default function ElizabethtonAntiqueHaulMay2024() {
  return (
    <ArticleProse>
      <p dangerouslySetInnerHTML={{ __html: `Danny and I were looking to get away this weekend, so we went up to my aunt's cabin in Roan Mountain, Tennessee. As you all know, my favorite pastime is antiquing, and there's tons of places around Roan Mountain to do so. Danny found an antique store called Duck Crossing Antique Mall in the neighboring town Elizabethton, and naturally we had to go! There were a ton of other stores nearby as well, and I was able to find treasures at Picket Fence Antiques & Gifts, the Eagle Center, and the Vintage Elk. Below are my finds!` }} />
      <h2>Haul Pictures</h2>
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_1.jpeg" alt="A small milk glass oil lamp" caption={`A small milk glass oil lamp`} />
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_2.jpeg" alt="A cast iron pig wall hook" caption={`A cast iron pig wall hook`} />
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_3.jpeg" alt="Jadeite salt and pepper shakers" caption={`Jadeite salt and pepper shakers, tulip pattern. These are definitely a reproduction, but they were so cute, I couldn't resist!`} />
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_4.jpeg" alt="A basket copper mold" caption={`A basket copper mold`} />
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_5.jpeg" alt="Left: Sheffield strawberries & cream crock; Right: McCoy strawberries mug" caption={`Left: Sheffield strawberries & cream crock; Right: McCoy strawberries mug`} />
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_6.jpeg" alt="A small milk glass oil lamp" caption={`A duck jam jar`} />
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_7.jpeg" alt="A floral espresso cup and saucer" caption={`A floral espresso cup and saucer`} />
      <HaulImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_6.jpeg" alt="A floral lamp base" caption={`A floral lamp base. This came with a shade that I didn't really like, so I'll be looking for a replacement.`} />
      <ProseImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_9.jpeg" alt="Haul picture" />
      <h2>Bonus Pics from a Hike to Laurel Falls</h2>
      <ProseImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_11.jpeg" alt="Hike to Laurel Falls" />
      <ProseImage src="https://blog-images.poppyland.dev/roan_mtn_antiquing_10.jpeg" alt="Waterfall at Laurel Falls" />
      <p dangerouslySetInnerHTML={{ __html: `So, what do you think? What's your favorite antique from this haul? Post in the comments below! 🌸` }} />
    </ArticleProse>
  );
}
