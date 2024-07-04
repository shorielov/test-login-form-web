import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { getServerSession } from "next-auth";

import { Providers } from "./prividers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clario login page",
  description: "Clario test task",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <head />
      <body
        className={classNames(
          'bg-gradient-primary h-full overflow-y-auto',
          inter.className
        )}
      >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
