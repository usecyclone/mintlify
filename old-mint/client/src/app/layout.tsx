// We are migrating to the /app directory incrementally.
// TO DO: Move _app and _document content into the root layout.
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
