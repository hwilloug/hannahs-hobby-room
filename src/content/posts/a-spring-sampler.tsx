import { ArticleProse, ProseImage } from '@/components/prose';

export default function ASpringSampler() {
  return (
    <ArticleProse>
      <p dangerouslySetInnerHTML={{ __html: `I made a spring sampler cross stitch for my mom! I used this pattern: <a href="https://www.everythingcrossstitch.com/spring-band-sampler-mrp-p32517.aspx">Spring Band Sampler</a>. Below are the pictures of it in progress:` }} />
      <h2>In Progress Pictures</h2>
      <ProseImage src="https://blog-images.poppyland.dev/spring_sampler_1.jpeg" alt="Spring Sampler in Progress" />
      <ProseImage src="https://blog-images.poppyland.dev/spring_sampler_2.jpeg" alt="Spring Sampler in Progress" />
      <ProseImage src="https://blog-images.poppyland.dev/spring_sampler_3.jpeg" alt="Spring Sampler in Progress" />
      <ProseImage src="https://blog-images.poppyland.dev/spring_sampler_4.jpeg" alt="Spring Sampler in Progress" />
      <h2>Finished Sampler</h2>
      <ProseImage src="https://blog-images.poppyland.dev/spring_sampler_5.jpeg" alt="Spring Sampler Finished" />
      <h2>What's Next</h2>
      <p dangerouslySetInnerHTML={{ __html: `Since the dimensions are not normal for a regular picture frame, I plan on building a custom frame. I borrowed a router from my dad, and am planning on starting it this week! Then, the piece will be done. I plan on giving it to my mom to match the squirrel sampler I made her for Christmas ❤️` }} />
    </ArticleProse>
  );
}
