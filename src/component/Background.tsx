const Background = () => {
  return (
    <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] grid-rows-[repeat(auto-fill,minmax(20px,1fr))]">
      {[...Array(1000)].map((_, i) => (
        <div key={i} className="w-1 h-1 bg-gray-200 rounded-full" />
      ))}
    </div>
  );
};

export default Background;
