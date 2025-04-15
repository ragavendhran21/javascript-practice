import { useState, useEffect } from 'react';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Sample data - in a real app, this would come from an API
  const sampleData = [
    { id: 1, title: 'React Fundamentals', category: 'Frontend' },
    { id: 2, title: 'Node.js Basics', category: 'Backend' },
    { id: 3, title: 'PostgreSQL Database', category: 'Database' },
    { id: 4, title: 'CSS Grid Layout', category: 'Frontend' },
    { id: 5, title: 'React Hooks in Depth', category: 'Frontend' },
    { id: 6, title: 'Express API Development', category: 'Backend' },
    { id: 7, title: 'MongoDB for Beginners', category: 'Database' },
    { id: 8, title: 'Responsive Web Design', category: 'Frontend' },
    { id: 9, title: 'GraphQL API Design', category: 'Backend' },
    { id: 10, title: 'Redis Caching Strategies', category: 'Database' },
  ];

  // Debounce search term to avoid excessive searches
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  // Perform search when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      
      // Simulate API call with setTimeout
      const timeoutId = setTimeout(() => {
        const filteredResults = sampleData.filter(item => 
          item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setResults(filteredResults);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Search Component</h2>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-4">
          {isLoading ? (
            <p className="text-gray-500">Searching...</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-2">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              
              {results.length > 0 ? (
                <ul className="border rounded divide-y">
                  {results.map((item) => (
                    <li key={item.id} className="p-3 hover:bg-gray-50">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No results found</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;