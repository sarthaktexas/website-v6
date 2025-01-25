import "./Style.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Sarthak Mohanty",
  description:
    "Design engineer skilled in accessible web experiences. Looking for opportunities to create new brands.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
