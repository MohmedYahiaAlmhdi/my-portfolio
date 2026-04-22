import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohmed Yahia Almhdi | Front-End & Flutter Developer",
  description:
    "Portfolio of Mohmed Yahia Almhdi — Front-End and Flutter Developer from Damascus, Syria. Building responsive web and mobile applications with React.js, Flutter, and modern UI technologies.",
  keywords: [
    "Mohmed Yahia Almhdi",
    "Front-End Developer",
    "Flutter Developer",
    "React.js",
    "Dart",
    "Web Development",
    "Mobile Development",
    "Damascus",
    "Syria",
    "Portfolio",
  ],
  authors: [{ name: "Mohmed Yahia Almhdi" }],
  icons: {
    icon: "/profile-avatar.png",
  },
  openGraph: {
    title: "Mohmed Yahia Almhdi | Front-End & Flutter Developer",
    description:
      "Building responsive web and mobile applications with React.js, Flutter, and modern UI technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
