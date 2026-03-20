export default function ThreadDivider() {
  return (
    <div className="py-12 flex justify-center items-center gap-2 overflow-hidden">
      <div className="h-[1.5px] w-24 bg-secondary/20" />
      <div className="w-2 h-2 rounded-full bg-primary" />
      <div className="h-[1.5px] w-48 bg-secondary/20 flex justify-center items-center">
        <div className="w-2 h-2 rounded-full bg-secondary" />
      </div>
      <div className="w-2 h-2 rounded-full bg-primary" />
      <div className="h-[1.5px] w-24 bg-secondary/20" />
    </div>
  );
}
