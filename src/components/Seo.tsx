import { Helmet } from 'react-helmet-async';

type Props = { title: string; description: string; path: string };

export function Seo({ title, description, path }: Props) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
