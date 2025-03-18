import { toAbsoluteUrl } from '@/lib/site';

export const buildEmbedCode = ({
  slug,
  title,
  height,
}: {
  slug: string;
  title: string;
  height: number;
}) => {
  const src = toAbsoluteUrl(`/${slug}?embed=1`);
  const link = toAbsoluteUrl(`/${slug}`);

  return `<iframe src="${src}" width="100%" height="${height}" style="border:0;min-width:320px;max-width:100%;" loading="lazy" title="${title}"></iframe>
<p style="font-size:12px;margin:8px 0 0;">Powered by <a href="${link}" rel="noopener" target="_blank">${title}</a></p>`;
};
