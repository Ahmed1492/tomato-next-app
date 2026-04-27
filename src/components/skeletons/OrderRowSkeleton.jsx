const Bone = ({ className = "" }) => (
  <div className={`skeleton rounded-xl ${className}`} />
);

export default function OrderRowSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <Bone className="w-12 h-12 rounded-xl shrink-0" />
            <div className="space-y-2">
              <Bone className="h-5 w-44" />
              <Bone className="h-4 w-28" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Bone className="h-12 rounded-xl" />
            <Bone className="h-12 rounded-xl" />
            <Bone className="h-12 rounded-xl" />
          </div>
          <Bone className="h-4 w-full" />
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <Bone className="h-8 w-32 rounded-full" />
          <div className="flex gap-2">
            <Bone className="h-10 w-28 rounded-xl" />
            <Bone className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
