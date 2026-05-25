import { ArticleProse, ProseImage } from '@/components/prose';

export default function AHandmadeFrameForASpringCrossStitch() {
  return (
    <ArticleProse>
      <p dangerouslySetInnerHTML={{ __html: `After cross stitching a spring sampler for my mom, I realized the dimensions of the piece were quite odd, making it difficult for me to find a suitable frame in which to hang it. So, I decided to build my own frame!` }} />
      <h2>Building the Frame</h2>
      <p dangerouslySetInnerHTML={{ __html: `The frame's construction was very simple. I somewhat followed the first part of this tutorial: <a href="https://www.youtube.com/watch?v=pYapIIF0FtU">How to Make a Picture Frame 3 Ways | DIY Woodworking</a>, except that I didn't attach any guides to my chop saw. Below are the steps I followed to build this frame:` }} />
      <ol>
        <li><strong>Pick out the frame lumber and the back panel plywood.</strong> Pick out the frame lumber and the back panel plywood. I went with select pine because it was cheap, but you can choose whatever you'd like.</li>
      </ol>
      <ol>
        <li><strong>Use a router to bevel the outer and inner edges.</strong> If you don't know what a router is, basically it's a power tool that carves or hollows out the wood to create a nice bevel or indention. It's easy to use once you figure out the bits and pieces.</li>
      </ol>
      <ol>
        <li><strong>Cut pieces to length using a chop saw set to 45 degrees.</strong> I measured along the inner edge of the back indention made in step 2, and then used a square to draw a 45 degree angled line.</li>
      </ol>
      <ProseImage src="https://blog-images.poppyland.dev/frame_4.jpeg" alt="Measuring the length of the pieces" />
      <p dangerouslySetInnerHTML={{ __html: `I bought two 1x4s so I could lay them on top of each other to ensure equal sizes of the opposing sides. Ensure the ends are flush, and clamp together to make two cuts at the same time.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/frame_3.jpeg" alt="Flush ends" />
      <ProseImage src="https://blog-images.poppyland.dev/frame_2.jpeg" alt="Clamping the pieces together" />
      <p dangerouslySetInnerHTML={{ __html: `For the first cut and for after cutting the first two sides, I flipped the 1x4s and cut again so that the shorter side is the inner edge and the longer side is the outer edge.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/frame_1.jpeg" alt="Cutting and flipping" />
      <ol>
        <li><strong>Glue pieces together using wood glue.</strong> Tape to hold joints together tightly.</li>
      </ol>
      <ProseImage src="https://blog-images.poppyland.dev/frame_glue.jpeg" alt="Glue" />
      <ProseImage src="https://blog-images.poppyland.dev/frame_in_progress.jpeg" alt="Tape" />
      <ol>
        <li><strong>Hammer in joint fasteners.</strong></li>
      </ol>
      <ProseImage src="https://blog-images.poppyland.dev/frame_6.jpeg" alt="Joint fasteners" />
      <ol>
        <li><strong>Sand.</strong> I just used 220 grit to soften the edges, then 120 to finish.</li>
      </ol>
      <ol>
        <li><strong>Stain.</strong> I used Minwax Early American 230 stain and applied it with a tack cloth.</li>
      </ol>
      <ProseImage src="https://blog-images.poppyland.dev/frame_5.jpeg" alt="Stain" />
      <ProseImage src="https://blog-images.poppyland.dev/handmade_frame.jpeg" alt="Stained frame" />
      <ol>
        <li><strong>Paint.</strong> I used a satin black paint and applied it with a brush.</li>
      </ol>
      <ol>
        <li><strong>Add hanger.</strong></li>
      </ol>
      <ProseImage src="https://blog-images.poppyland.dev/frame_7.jpeg" alt="Sawtooth hangers" />
      <ol>
        <li><strong>Cut back panel out of plywood.</strong> I measured the inner bevel length for the width and the height, then cut. This doesn't need to be perfect since the cross stitch piece will be covering the edges. You want it shaped anywhere between the inner edge and the inner bevel edge.</li>
      </ol>
      <ol>
        <li><strong>Sew cross stitch piece to back panel.</strong> Cut excess fabric if needed.</li>
      </ol>
      <ProseImage src="https://blog-images.poppyland.dev/spring_cross_stitch_frame_back.jpeg" alt="Back of sewen cross stitch in frame" />
      <ol>
        <li><strong>Hang, and enjoy!</strong></li>
      </ol>
      <ProseImage src="https://blog-images.poppyland.dev/frame_with_spring_cross_stitch.jpeg" alt="Framed cross stitch" />
      <h2>Improvements for Next Time</h2>
      <p dangerouslySetInnerHTML={{ __html: `For my next frame, there are a couple things that I would do differently:` }} />
      <p dangerouslySetInnerHTML={{ __html: `1. Pay closer attention to hanger centering.` }} />
      <p dangerouslySetInnerHTML={{ __html: `2. Sand along the grain, espeically around the joints.` }} />
      <p dangerouslySetInnerHTML={{ __html: `3. Pay closer attention to cross stitch centering.` }} />
      <p dangerouslySetInnerHTML={{ __html: `4. Remove excess glue before it dries. The stain doesn't take to the places where the glue seeped out.` }} />
      <p dangerouslySetInnerHTML={{ __html: `5. Hammer in joint fasteners more cleanly.` }} />
      <p dangerouslySetInnerHTML={{ __html: `6. Use a tool better suited to cutting larger pieces of wood for the back panel. I had to finish cutting it with a jigsaw because 1. my chop saw wouldn't reach the full length of the cut I wanted to make, and 2. the jigsaw didn't cut as cleanly as I would have liked.` }} />
      <p dangerouslySetInnerHTML={{ __html: `7. Use another method to strengthen the joints on the frame. The joint fasteners were too difficult to hammer in straight, and they don't look very nice. But, it's just the back of the frame, I'm okay with it for my first frame or two because of how simple they are.` }} />
      <p dangerouslySetInnerHTML={{ __html: `Other than the above nitpicky details, I am very pleased with how this piece turned out, and my mom was so happy when I gave it to her!` }} />
      <p dangerouslySetInnerHTML={{ __html: `So, what do you think? Comment below, and be sure to give this article a like! 🌸` }} />
    </ArticleProse>
  );
}
