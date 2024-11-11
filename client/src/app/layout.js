import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import ReduxProvider from "@/components/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={`${poppins.className}antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer autoClose={1300} />
      </body>
    </html>
  );
}
