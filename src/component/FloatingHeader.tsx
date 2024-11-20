const FloatingHeader = () => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="text-2xl font-bold text-gray-800 mb-2">Factory</div>
        <nav className="flex justify-center space-x-4">
          <a href="#work" className="text-gray-600 hover:text-gray-800">
            Work
          </a>
          <a href="#info" className="text-gray-600 hover:text-gray-800">
            Info
          </a>
        </nav>
      </div>
    </div>
  );
};

export default FloatingHeader;
