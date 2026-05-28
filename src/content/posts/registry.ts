import type { ComponentType } from 'react';
import April2026AntiquingHaul from './april-2026-antiquing-haul';
import AHandmadeFrameForASpringCrossStitch from './a-handmade-frame-for-a-spring-cross-stitch';
import ASpringSampler from './a-spring-sampler';
import ElizabethtonAntiqueHaulMay2024 from './elizabethton-antique-haul-may-2024';
import FarmFreshCrossStitch from './farm-fresh-cross-stitch';
import FramingEmbroidery from './framing-embroidery';
import GettingBackIntoRibbonEmbroidery from './getting-back-into-ribbon-embroidery';
import Holiday2024Gifts from './holiday-2024-gifts';
import HowToFinishANeedlepointProject from './how-to-finish-a-needlepoint-project';
import HowToMakeASimpleTulipRibbonEmbroidery from './how-to-make-a-simple-tulip-ribbon-embroidery';
import Scrapbooking from './scrapbooking';
import TurtleCoasters from './turtle-coasters';

export type PostComponent = ComponentType;

export const postComponents: Record<string, PostComponent> = {
  'april-2026-antiquing-haul': April2026AntiquingHaul,
  'a-handmade-frame-for-a-spring-cross-stitch': AHandmadeFrameForASpringCrossStitch,
  'a-spring-sampler': ASpringSampler,
  'elizabethton-antique-haul-may-2024': ElizabethtonAntiqueHaulMay2024,
  'farm-fresh-cross-stitch': FarmFreshCrossStitch,
  'framing-embroidery': FramingEmbroidery,
  'getting-back-into-ribbon-embroidery': GettingBackIntoRibbonEmbroidery,
  'holiday-2024-gifts': Holiday2024Gifts,
  'how-to-finish-a-needlepoint-project': HowToFinishANeedlepointProject,
  'how-to-make-a-simple-tulip-ribbon-embroidery': HowToMakeASimpleTulipRibbonEmbroidery,
  scrapbooking: Scrapbooking,
  'turtle-coasters': TurtleCoasters,
};

export const postSlugs = Object.keys(postComponents) as PostSlug[];

export type PostSlug = keyof typeof postComponents;

export function hasPostContent(slug: string): slug is PostSlug {
  return slug in postComponents;
}
