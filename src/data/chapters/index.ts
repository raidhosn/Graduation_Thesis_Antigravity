import { chaptersContentEN } from './en';
import { chaptersContentPT } from './pt';

export const getChapterContent = (chapterId: number, locale: string) => {
  const content = locale === 'pt' ? chaptersContentPT : chaptersContentEN;
  return content[chapterId as keyof typeof content] || null;
};

export { chaptersContentEN, chaptersContentPT };
