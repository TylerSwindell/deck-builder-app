export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:container min-h-screen border-l-4 border-r-4 border-yellow flex flex-col">
      {children}
    </div>
  );
}
