import { ArticleProse, ProseImage } from '@/components/prose';

export default function HowToFinishANeedlepointProject() {
  return (
    <ArticleProse>
      <p dangerouslySetInnerHTML={{ __html: `Inspired by the coffee shop I go to nearly every morning, <a href="https://humblecupcoffeeco.com/">Humble Cup Coffee Co</a>, I began a vintage-looking sampler with a coffee theme! I used a couple patterns to make this, and they are available <a href="https://www.everythingcrossstitch.com/coffee-and-eggs-mrp-p95257.aspx?k2=e1">here</a> and <a href="https://www.everythingcrossstitch.com/coffee-relax-enjoy-button-twill-tape-included-mrp-p82936.aspx?k2=e1">here</a>. Read on for tips on finishing an embroidery project, as well as some in progress pictures of working this piece.` }} />
      <h2>Finishing a Needlework Piece for a Frame</h2>
      <p dangerouslySetInnerHTML={{ __html: `The process for finishing a needlework piece for a frame is just two two simple steps:` }} />
      <ol>
        <li>Block</li>
        <li>Sew to back panel</li>
      </ol>
      <p dangerouslySetInnerHTML={{ __html: `First, I blocked the piece by soaking it in water and pinning it to one of those foam kids' playmats with T-pins, then letting it dry. This process does a few things: it gets all the wrinkles and creases out from using an embroidery hoop, evens out the stitching, and gets rid of any erroneous holes you may have poked in the fabric.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_6.jpeg" alt="Blocked embroidery" />
      <p dangerouslySetInnerHTML={{ __html: `Then, I sewed it together using embroidery thread. I centered the piece on the backboard of the frame, then tied a knot at the end of the thread and weaved the two long edges together around the backboard. This doesn't need to look the prettiest since it's the back, but you want to make sure that it's nice and tight so the front is completely flat.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_7.jpeg" alt="Sewed embroidery" />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_8.jpeg" alt="Sewed embroidery" />
      <p dangerouslySetInnerHTML={{ __html: `I repeated the same process for the short edges, this time folding the corners in a bit so they don't show from the front.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_10.jpeg" alt="Sewed embroidery" />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_11.jpeg" alt="Sewed embroidery" />
      <h2>In Progress Pictures</h2>
      <p dangerouslySetInnerHTML={{ __html: `I mostly worked on this piece while travelling. Here are some pictures along the way.` }} />
      <p dangerouslySetInnerHTML={{ __html: `On the plane.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_1.jpeg" alt="In progress embroidery" />
      <p dangerouslySetInnerHTML={{ __html: `At a coffee shop in Prague.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_3.jpeg" alt="In progress embroidery" />
      <p dangerouslySetInnerHTML={{ __html: `Sitting on the balcony at our Airbnb in Prague.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_4.jpeg" alt="In progress embroidery" />
      <h2>The Finished Piece</h2>
      <ProseImage src="https://blog-images.poppyland.dev/coffee_cross_stitch_9.jpeg" alt="Finished embroidery" />
      <p dangerouslySetInnerHTML={{ __html: `I'm planning on giving this cross stitch to Humble Cup!` }} />
      <h2>What I Will Do Differently Next Time</h2>
      <ul>
        <li>Put the T-pins a little larger than the size of the frame so that the holes don't show.</li>
        <li>Fix spacing issues when I notice them while working the piece.</li>
        <li>Practice lettering before putting it on the final piece.</li>
      </ul>
      <p dangerouslySetInnerHTML={{ __html: `Be sure to give this post a like, and post any comments or questions below! 🌸` }} />
    </ArticleProse>
  );
}
