import Header from "@/components/Header";
import HeaderTop from "@/components/HeaderTop";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="antialiased w-full  flex flex-col justify-between items-center mx-auto">
        <div className="sticky top-0 flex flex-col z-10 w-full mx-auto items-center justify-center">
          <HeaderTop />
          <Header />
        </div>
        <main className="w-11/12 lg:w-10/12 mx-auto">{children}</main>
        <Footer />
      </div>
  );
}
