export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <section className=" flex justify-center items-center h-screen">
      {children}
    </section>
  );
}