export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-accent/20 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-accent/20 rounded mb-2"></div>
        <div className="h-2 w-24 bg-accent/10 rounded"></div>
      </div>
    </div>
  );
}
