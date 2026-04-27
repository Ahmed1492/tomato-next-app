// Pure CSS skeletons — no external lib needed
const Bone = ({ className = "" }) => (
  <div className={`skeleton rounded-xl ${className}`} />
);

// Reusable navbar skeleton (same height as real navbar)
const NavSkeleton = () => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm py-4 px-[8%] flex items-center justify-between">
    <Bone className="w-32 h-8" />
    <div className="hidden md:flex gap-8">
      {[80, 64, 72, 80, 72].map((w, i) => <Bone key={i} className={`h-4 w-[${w}px]`} style={{ width: w }} />)}
    </div>
    <div className="flex gap-3 items-center">
      <Bone className="w-8 h-8 rounded-full" />
      <Bone className="w-8 h-8 rounded-full" />
      <Bone className="w-20 h-9 rounded-full" />
    </div>
  </div>
);

// Single food card skeleton
const CardSkeleton = () => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
    <Bone className="w-full h-48 rounded-none" />
    <div className="p-5 space-y-3">
      <Bone className="h-5 w-3/4" />
      <Bone className="h-4 w-full" />
      <Bone className="h-4 w-2/3" />
      <div className="flex items-center justify-between pt-2">
        <Bone className="h-7 w-16" />
        <Bone className="h-9 w-24 rounded-full" />
      </div>
    </div>
  </div>
);

// Page title skeleton
const TitleSkeleton = () => (
  <div className="text-center mb-12 space-y-3">
    <Bone className="h-12 w-64 mx-auto" />
    <Bone className="h-5 w-80 mx-auto" />
  </div>
);

// ── Page-specific skeletons ──────────────────────────────────────

function HomeSkeleton() {
  return (
    <div className="pt-24 px-[8%]">
      {/* Hero */}
      <div className="rounded-3xl overflow-hidden mb-12">
        <Bone className="w-full h-[420px] rounded-3xl" />
      </div>
      {/* Category strip */}
      <div className="flex gap-4 mb-10 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 shrink-0">
            <Bone className="w-16 h-16 rounded-full" />
            <Bone className="w-14 h-3" />
          </div>
        ))}
      </div>
      {/* Title */}
      <Bone className="h-8 w-56 mb-8" />
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <TitleSkeleton />
      {/* Filter bar */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-12 space-y-6">
        <Bone className="h-14 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Bone className="h-12 rounded-xl" />
          <Bone className="h-12 rounded-xl" />
          <Bone className="h-12 rounded-xl" />
        </div>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto mt-16">
      <TitleSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8 space-y-6">
          <Bone className="h-7 w-40" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
              <Bone className="w-24 h-24 rounded-xl shrink-0" />
              <div className="flex-1 space-y-3">
                <Bone className="h-5 w-3/4" />
                <Bone className="h-4 w-full" />
                <div className="flex justify-between">
                  <Bone className="h-7 w-16" />
                  <Bone className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-5 h-fit">
          <Bone className="h-7 w-40" />
          <Bone className="h-12 w-full rounded-xl" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Bone className="h-4 w-24" />
              <Bone className="h-4 w-16" />
            </div>
          ))}
          <Bone className="h-14 w-full rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto mt-16">
      <TitleSkeleton />
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <Bone className="w-12 h-12 rounded-xl shrink-0" />
                  <div className="space-y-2">
                    <Bone className="h-5 w-40" />
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
              <div className="flex flex-col items-end gap-3">
                <Bone className="h-8 w-32 rounded-full" />
                <div className="flex gap-2">
                  <Bone className="h-10 w-28 rounded-xl" />
                  <Bone className="h-10 w-28 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
      {/* Banner */}
      <Bone className="w-full h-44 rounded-3xl mb-8" />
      {/* Tabs */}
      <Bone className="w-full h-14 rounded-2xl mb-8" />
      {/* Content */}
      <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
        <div className="flex justify-between">
          <Bone className="h-7 w-48" />
          <Bone className="h-9 w-20 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Bone className="h-4 w-24" />
              <Bone className="h-12 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenericSkeleton() {
  return (
    <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
      {/* Hero banner */}
      <Bone className="w-full h-64 rounded-3xl mb-12" />
      {/* Content blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-lg p-8 space-y-4">
            <Bone className="w-14 h-14 rounded-2xl" />
            <Bone className="h-6 w-40" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

const skeletonMap = {
  home: HomeSkeleton,
  search: SearchSkeleton,
  cart: CartSkeleton,
  orders: OrdersSkeleton,
  profile: ProfileSkeleton,
  about: GenericSkeleton,
  contact: GenericSkeleton,
};

export default function PageSkeleton({ type = "home" }) {
  const Skeleton = skeletonMap[type] || GenericSkeleton;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <NavSkeleton />
      <Skeleton />
    </div>
  );
}
