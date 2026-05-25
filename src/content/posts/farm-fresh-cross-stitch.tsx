import { ArticleProse, ProseImage } from '@/components/prose';

export default function FarmFreshCrossStitch() {
  return (
    <ArticleProse>
      <p dangerouslySetInnerHTML={{ __html: `Long time no see! I finally finished a cross-stitch project that I've been putting off for a while. I was inspired to do this piece by my garden, and I'm really happy with how it turned out. I used a pattern from <a href="https://www.123stitch.com/item/Country-Cottage-Needleworks-Farm-Fresh-Cross-Stitch-Pattern/12-2208">this site</a>!` }} />
      <h2>The Cross Stitch</h2>
      <ProseImage src="https://blog-images.poppyland.dev/farm-fresh-1.jpeg" alt="Farm Fresh Cross Stitch in progress" />
      <p dangerouslySetInnerHTML={{ __html: `This is the piece in progress. I used 14 count cloth and (mostly) DMC floss. The 14 count cloth is a good size such that I can see the holes, and therefore, where the crosses should go.` }} />
      <p dangerouslySetInnerHTML={{ __html: `I wasn't sure I'd be able to get through the canpoy because it was pretty tedious, but it didn't end up being too bad. I really like the depth that the slight change in shade gives the canopy.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/farm-fresh-3.jpeg" alt="Farm Fresh Cross Stitch" />
      <p dangerouslySetInnerHTML={{ __html: `And here's the finished piece! My favorite part of making this was stitching the vegetables. I feel like doing that part really brought everything together and encouraged me to continue working on it.` }} />
      <h2>Framing</h2>
      <ProseImage src="https://blog-images.poppyland.dev/farm-fresh-4.jpeg" alt="Farm Fresh Cross Stitch framed" />
      <p dangerouslySetInnerHTML={{ __html: `I had this green frame that was perfect for this piece. I found it at <a href="https://humanesocietyofyorkcounty.org/about-hsyc/our-locations/location-pawsibilities-thrift-store.html">Pawsibilities</a>, a thrift store in Fort Mill. I loved the color of this frame, so snagged it for a time when I'd have a project that suits it. I also like the sizing of the frame because of the amount of margin it leaves, and I think the color really makes it pop!` }} />
      <h2>The Final Result</h2>
      <p dangerouslySetInnerHTML={{ __html: `!<a href="https://blog-images.poppyland.dev/farm-fresh-5.jpeg">Farm Fresh Cross Stitch in the dining room</a>` }} />
      <p dangerouslySetInnerHTML={{ __html: `!<a href="https://blog-images.poppyland.dev/farm-fresh-6.jpeg">Farm Fresh Cross Stitch in the dining room</a>` }} />
      <p dangerouslySetInnerHTML={{ __html: `Here's the final result! I hung it up in my dining room 🌸` }} />
      <h2>What I'd Do Differently</h2>
      <ul>
        <li>Make the text smaller so I could include the chickens from the original design.</li>
        <li>Use a darker shade of cloth. I think shade I picked was a little too light, and I would have rather had the clouds pop.</li>
      </ul>
      <h2>Sneak Peek</h2>
      <p dangerouslySetInnerHTML={{ __html: `Here's a sneak peak of my next project. What could it be??` }} />
      <ProseImage src="https://blog-images.poppyland.dev/barnyard-1.jpeg" alt="Farm Fresh Cross Stitch in progress" />
    </ArticleProse>
  );
}
