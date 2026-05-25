import { ArticleProse, ProseImage } from '@/components/prose';

export default function Scrapbooking() {
  return (
    <ArticleProse>
      <p dangerouslySetInnerHTML={{ __html: `After visiting my grandparents in Mississippi, I was inspired to get back into printing photos for my photo albums. Scrapbooking was always something I have wanted to do, so instead of buying a new photo album when I ran out of space for my new photos, I decided to start scrapbooking!` }} />
      <ProseImage src="https://blog-images.poppyland.dev/poppy_scrapbooking.jpeg" alt="Scrapbooking" />
      <p dangerouslySetInnerHTML={{ __html: `Poppy helping me scrapbook.` }} />
      <ProseImage src="https://blog-images.poppyland.dev/scrapbooks_1.jpeg" alt="Scrapbooking" />
      <p dangerouslySetInnerHTML={{ __html: `There are pages and pages of cat photos. They truly are my babies ❤️🌸` }} />
      <ProseImage src="https://blog-images.poppyland.dev/scrapbooks.jpeg" alt="Scrapbooks" />
      <p dangerouslySetInnerHTML={{ __html: `And of course I can't help myself but to go overboard. My two binders I bought are already full! The first binder is from college, and the second album is Boston and beyond. I hope to get a third album for before college.` }} />
      <p dangerouslySetInnerHTML={{ __html: `For now, the pages are mostly filled with pictures, but I am going back through and adding little notes and descriptions as well. I have some trinkets saved that I've also put in the pages!` }} />
      <p dangerouslySetInnerHTML={{ __html: `Going through these old photos is helping me process my memories and reflect on good and bad times. I've learned so much about myself the last few years, and I hope that 2024 is a spectacular year.` }} />
    </ArticleProse>
  );
}
