import SupremePageLayout from '@/layouts/SupremePageLayout';
import { ErrorPage } from '@/pages/404';
import { PageProps } from '@/types/page';

export default function Page({
  mdxSource,
  pageData,
  favicons,
  subdomain,
  internalAnalyticsWriteKey,
  hiddenPages,
}: PageProps) {
  try {
    return (
      <SupremePageLayout
        mdxSource={mdxSource}
        pageData={pageData}
        favicons={favicons}
        subdomain={subdomain}
        internalAnalyticsWriteKey={internalAnalyticsWriteKey}
        hiddenPages={hiddenPages}
      />
    );
  } catch (e) {
    return <ErrorPage />;
  }
}
