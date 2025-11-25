const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-slate-200 rounded-lg w-48 mb-4 animate-pulse"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-64 animate-pulse"></div>
        </div>
        
        <div className="flex gap-6">
          {/* Sidebar Skeleton */}
          <div className="w-80 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded-lg w-32 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded flex-1 animate-pulse"></div>
                    <div className="h-6 w-8 bg-slate-200 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Filter Bar Skeleton */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="h-10 bg-slate-200 rounded-lg w-64 animate-pulse"></div>
                <div className="h-10 bg-slate-200 rounded-lg w-32 animate-pulse"></div>
                <div className="h-10 bg-slate-200 rounded-lg w-32 animate-pulse"></div>
              </div>
            </div>

            {/* Task Cards Skeleton */}
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 bg-slate-200 rounded animate-pulse mt-1"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-6 bg-slate-200 rounded-lg w-3/4 animate-pulse"></div>
                        <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="h-4 bg-slate-200 rounded-lg w-full mb-2 animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded-lg w-2/3 animate-pulse"></div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="h-4 bg-slate-200 rounded-lg w-24 animate-pulse"></div>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                          <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading