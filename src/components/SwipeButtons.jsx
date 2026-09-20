function SwipeButtons({ onPass, onLike }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-5">
      <button
        type="button"
        onClick={onPass}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-red-200 bg-white text-2xl text-red-500 shadow-md transition hover:scale-105 hover:bg-red-50"
        aria-label="Pass job"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={onLike}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
        aria-label="Like job"
      >
        ♥
      </button>
    </div>
  )
}

export default SwipeButtons