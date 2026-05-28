import { ArticleProse, HaulImage, ProseImage } from '@/components/prose';
import {
  articleImageObjectPath,
  getArticleImagePublicUrl,
} from '@/lib/supabase/storage';

/** Also set `hero_image` in Supabase to `april-2026-antiquing-haul/hero.jpg` (storage path, not full URL). */
const SLUG = 'april-2026-antiquing-haul';

const images = {
  hero: getArticleImagePublicUrl(articleImageObjectPath(SLUG, 'hero.jpg')),
  // Haul images from IMG_1367 to IMG_1406
  ...Object.fromEntries(
    Array.from({ length: 40 }, (_, i) => {
      const num = 1367 + i;
      return [
        `haul${i + 1}`,
        getArticleImagePublicUrl(articleImageObjectPath(SLUG, `IMG_${num}.jpeg`)),
      ];
    })
  ),
} as const;

export default function April2026AntiquingHaul() {
  return (
    <ArticleProse>
      <p>
        In April, I made a trip to Mississippi to visit family and go antiquing. Then, in a quick shotgun trip to Bristol, TN, I was able to find some more treasures. Below are my finds!
      </p>

      <h2>Haul pictures</h2>

      <h3 className="mt-8">Fire King</h3>
      <p>Apparently, I was obsessed with the Fire King Peach Lustre pattern this month! I was able to find a few great pieces of this pattern, as well as some Jadeite.</p>
      <HaulImage
        src={images['haul2']}
        alt="Placeholder find 2"
        caption="Placeholder — upload haul-2.jpg to article-images"
      />
            <HaulImage
        src={images['haul6']}
        alt="Peach Lustre swirl bowl"
        caption="Peach Lustre swirl bowl"
      />
      <HaulImage
        src={images['haul7']}
        alt="Peach Lustre swirl mixing bowl"
        caption="Peach Lustre swirl mixing bowl"
      />
      <HaulImage
        src={images['haul11']}
        alt="Peach Lustre sugar and creamer set"
        caption="Peach Lustre sugar and creamer set"
      />
      <HaulImage
        src={images['haul12']}
        alt="Placeholder find 12"
        caption="Placeholder — upload haul-12.jpg to article-images"
      />
      <HaulImage
        src={images['haul15']}
        alt="Placeholder find 15"
        caption="Placeholder — upload haul-15.jpg to article-images"
      />
      <HaulImage
        src={images['haul17']}
        alt="Placeholder find 17"
        caption="Placeholder — upload haul-17.jpg to article-images"
      />
      <HaulImage
        src={images['haul18']}
        alt="Placeholder find 18"
        caption="Placeholder — upload haul-18.jpg to article-images"
      />
      <HaulImage
        src={images['haul35']}
        alt="Placeholder find 35"
        caption="Placeholder — upload haul-35.jpg to article-images"
      />
      <HaulImage
        src={images['haul8']}
        alt="Placeholder find 8"
        caption="Placeholder — upload haul-8.jpg to article-images"
      />

      <h3 className="mt-8">Corning</h3>
      <p>My favorite thing to collect, and I found a pattern I've never seen before!</p>
      <HaulImage
        src={images['haul20']}
        alt="Placeholder find 20"
        caption="Placeholder — upload haul-20.jpg to article-images"
      />
      <HaulImage
        src={images['haul34']}
        alt="Placeholder find 34"
        caption="Placeholder — upload haul-34.jpg to article-images"
      />

      <h3 className="mt-8">Pyrex</h3>
      <p>I don't collect too much Pyrex, but my Memaw gave me this one from her collection! I am very fond of the orange and florals.</p>
      <HaulImage
        src={images['haul1']}
        alt="Placeholder find 1"
        caption="Placeholder — upload haul-1.jpg to article-images"
      />

      <h3 className="mt-8">McCoy</h3>
      <p>Again, something I haven't seen before! If they had all four of these and they were a little cheaper, I would have bought the whole set.</p>
      <HaulImage
        src={images['haul22']}
        alt="Placeholder find 22"
        caption="Placeholder — upload haul-22.jpg to article-images"
      />

      <h3 className="mt-8">Other Strawberries</h3>
      <HaulImage
        src={images['haul33']}
        alt="Placeholder find 33"
        caption="Placeholder — upload haul-33.jpg to article-images"
      />
      <HaulImage
        src={images['haul37']}
        alt="Placeholder find 37"
        caption="Placeholder — upload haul-37.jpg to article-images"
      />

      <h3 className="mt-8">Ducks</h3>
      <p>Some good finds here. Duck-themed items that fit into my other collections.</p>
      <HaulImage
        src={images['haul5']}
        alt="Placeholder find 5"
        caption="Placeholder — upload haul-5.jpg to article-images"
      />
      <HaulImage
        src={images['haul19']}
        alt="Placeholder find 19"
        caption="Placeholder — upload haul-19.jpg to article-images"
      />
      <HaulImage
        src={images['haul21']}
        alt="Placeholder find 21"
        caption="Placeholder — upload haul-21.jpg to article-images"
      />
      <HaulImage
        src={images['haul23']}
        alt="Placeholder find 23"
        caption="Placeholder — upload haul-23.jpg to article-images"
      />
      <HaulImage
        src={images['haul40']}
        alt="Placeholder find 40"
        caption="Placeholder — upload haul-40.jpg to article-images"
      />

      <h3 className="mt-8">Copper Molds</h3>
      <p>I don't buy these very often, but this one reminds me of my time in New England!</p>
      <HaulImage
        src={images['haul3']}
        alt="Placeholder find 3"
        caption="Placeholder — upload haul-3.jpg to article-images"
      />

      <h3 className="mt-8">Carnival Glass</h3>
      <p>Carnival glass is not something I've ever bought, but I was obsessed with this grape pattern in an irridescent orange color.</p>
      <HaulImage
        src={images['haul13']}
        alt="Placeholder find 13"
        caption="Placeholder — upload haul-13.jpg to article-images"
      />

      <h3 className="mt-8">Depression Glass</h3>
      <p>Also not something I usually buy, I couldn't resist the pink floral creamer!</p>
      <HaulImage
        src={images['haul16']}
        alt="Placeholder find 16"
        caption="Placeholder — upload haul-16.jpg to article-images"
      />
      <HaulImage
        src={images['haul28']}
        alt="Placeholder find 28"
        caption="Placeholder — upload haul-28.jpg to article-images"
      />

      <h3 className="mt-8">Milk Glass</h3>
      <p>Apparently I was in a pitcher mood when I was in Bristol.</p>
      <HaulImage
        src={images['haul36']}
        alt="Placeholder find 36"
        caption="Placeholder — upload haul-36.jpg to article-images"
      />

      <h3 className="mt-8">Longaberger</h3>
      <p>I had been looking for a small Longaberger, and how could I pass up a Longaberger clock?</p>
      <HaulImage
        src={images['haul39']}
        alt="Placeholder find 39"
        caption="Placeholder — upload haul-39.jpg to article-images"
      />

      <h3 className="mt-8">Salt & Pepper Shakers</h3>
      <HaulImage
        src={images['haul29']}
        alt="Placeholder find 29"
        caption="Placeholder — upload haul-29.jpg to article-images"
      />
      <HaulImage
        src={images['haul30']}
        alt="Placeholder find 30"
        caption="Placeholder — upload haul-30.jpg to article-images"
      />

      <h3 className="mt-8">Juice Glasses</h3>
      <p>Some cute finds here!</p>
      <HaulImage
        src={images['haul32']}
        alt="Placeholder find 32"
        caption="Placeholder — upload haul-32.jpg to article-images"
      />
      <HaulImage
        src={images['haul14']}
        alt="Placeholder find 14"
        caption="Placeholder — upload haul-14.jpg to article-images"
      />

      <h3 className="mt-8">Other</h3>
      <p></p>
      <HaulImage
        src={images['haul4']}
        alt="Placeholder find 4"
        caption="Placeholder — upload haul-4.jpg to article-images"
      />
      <HaulImage
        src={images['haul9']}
        alt="Placeholder find 9"
        caption="Placeholder — upload haul-9.jpg to article-images"
      />
      <HaulImage
        src={images['haul24']}
        alt="Placeholder find 24"
        caption="Placeholder — upload haul-24.jpg to article-images"
      />
      <HaulImage
        src={images['haul25']}
        alt="Placeholder find 25"
        caption="Placeholder — upload haul-25.jpg to article-images"
      />
      <HaulImage
        src={images['haul26']}
        alt="Placeholder find 26"
        caption="Placeholder — upload haul-26.jpg to article-images"
      />
      <HaulImage
        src={images['haul27']}
        alt="Placeholder find 27"
        caption="Placeholder — upload haul-27.jpg to article-images"
      />
      <HaulImage
        src={images['haul31']}
        alt="Placeholder find 31"
        caption="Placeholder — upload haul-31.jpg to article-images"
      />
      <HaulImage
        src={images['haul38']}
        alt="Placeholder find 38"
        caption="Placeholder — upload haul-38.jpg to article-images"
      />
      <p>What was your favorite find this month? Share in the comments below.</p>
    </ArticleProse>
  );
}

export { images as april2026AntiquingHaulImages };
