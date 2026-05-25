import { ArticleProse, ProseImage } from '@/components/prose';

export default function FramingEmbroidery() {
  return (
    <ArticleProse>
      <p dangerouslySetInnerHTML={{ __html: `I was in the mood to do some watercolor ribbon embroidery, so I made a couple of pieces. It was hard to choose the right frame for each, so I went thrifting and found some!` }} />
      <h2>Watercoloring</h2>
      <p dangerouslySetInnerHTML={{ __html: `I first embroidered with white ribbon.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_2.jpg" alt="White Ribbon" />
      <p dangerouslySetInnerHTML={{ __html: `Then, I watercolored each flower. Below is just getting started on the tulips.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_1.jpg" alt="Watercolored Tulips" />
      <h2>Framing</h2>
      <p dangerouslySetInnerHTML={{ __html: `It was hard to choose a frame, but I was able to find some for cheap at my favorite local thrift store, <a href="https://humanesocietyofyorkcounty.org/about-hsyc/our-locations/location-pawsibilities-thrift-store.html">Pawsabilities</a>.` }} />
      <p dangerouslySetInnerHTML={{ __html: `This is the original frame I used for the tulip piece.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_10.jpg" alt="Original Frame" />
      <p dangerouslySetInnerHTML={{ __html: `I decided this frame was too simple for it, so I went with something a bit more ornate for the final look:` }} />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_9.jpg" alt="Framed Tulips" />
      <p dangerouslySetInnerHTML={{ __html: `For the lily piece, I found a simple frame that I thought was pretty enough.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_8.jpg" alt="Original Frame" />
      <h2>Finishing</h2>
      <p dangerouslySetInnerHTML={{ __html: `To finish each piece, I cut out a piece of cardboard to fit the frame and sewed it in place.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_3.jpg" alt="Cardboard" />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_4.jpg" alt="Finished" />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_5.jpg" alt="Finished" />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_6.jpg" alt="Finished" />
      <ProseImage src="https://blog-images.poppyland.dev/watercolor_ribbon_7.jpg" alt="Finished" />
      <h2>Conclusion</h2>
      <p dangerouslySetInnerHTML={{ __html: `That's all I have for now! I'm going to keep working on my watercolor ribbon embroidery and see where it takes me. I'm also going to keep thrifting for frames and see what I can find.` }} />
      <p dangerouslySetInnerHTML={{ __html: `These pieces will eventually be for sale at my local coffee shop, <a href="https://www.humblecupcoffeeco.com/">Humble Cup Coffee</a>. I've got a cherry blossom piece for sale there now, so head on over check it out.` }} />
      <p dangerouslySetInnerHTML={{ __html: `If you liked these pieces or this article, give me a ❤️ below. Please leave any questions or comments below! 🌸` }} />
    </ArticleProse>
  );
}
