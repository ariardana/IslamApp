import React, { useState, useEffect } from 'react';
import { FileText, Copy, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface ApiEndpoint {
  method: string;
  description: string;
  parameters?: Record<string, string>;
  response: string;
}

interface ApiDocsData {
  name: string;
  version: string;
  description: string;
  endpoints: Record<string, Record<string, ApiEndpoint>>;
}

const ApiDocs: React.FC = () => {
  const { theme } = useAppStore();
  const [apiDocs, setApiDocs] = useState<ApiDocsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiDocs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/docs');
        const data: ApiDocsData = await response.json();
        setApiDocs(data);
      } catch (err) {
        setError('Failed to load API documentation');
        console.error('Error fetching API docs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApiDocs();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-lg ${theme.isDark ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
        <p className={`text-red-500 font-medium ${theme.isDark ? 'text-red-300' : ''}`}>{error}</p>
      </div>
    );
  }

  if (!apiDocs) {
    return (
      <div className={`p-6 rounded-lg ${theme.isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <p className={theme.isDark ? 'text-gray-300' : 'text-gray-600'}>No API documentation available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="h-8 w-8 text-emerald-600" />
        <div>
          <h1 className="text-2xl font-bold">{apiDocs.name}</h1>
          <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Version {apiDocs.version}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className={`p-4 sm:p-6 rounded-lg border ${theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <p className={`text-sm sm:text-base ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {apiDocs.description}
        </p>
      </div>

      {/* Endpoints by Category */}
      {Object.entries(apiDocs.endpoints).map(([category, endpoints]) => (
        <div key={category} className={`rounded-lg border ${theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`px-4 py-3 sm:px-6 sm:py-4 border-b ${theme.isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
            <h2 className="text-lg sm:text-xl font-semibold capitalize">{category}</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(endpoints).map(([path, endpoint]) => (
              <div key={path} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        endpoint.method === 'GET' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className={`font-mono text-sm break-all ${theme.isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        {path}
                      </code>
                    </div>
                    
                    <p className={`mb-4 text-sm sm:text-base ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {endpoint.description}
                    </p>
                    
                    {endpoint.parameters && Object.keys(endpoint.parameters).length > 0 && (
                      <div className="mb-4">
                        <h4 className={`text-sm font-medium mb-2 ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>Parameters:</h4>
                        <ul className="space-y-2">
                          {Object.entries(endpoint.parameters).map(([param, description]) => (
                            <li key={param} className="flex flex-col sm:flex-row sm:items-start">
                              <span className={`font-mono text-sm mb-1 sm:mb-0 sm:mr-2 ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {param}:
                              </span>
                              <span className={`text-sm ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <h4 className={`text-sm font-medium mb-2 ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>Response:</h4>
                      <p className={`text-sm ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {endpoint.response}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(`${endpoint.method} ${path}`)}
                    className={`mt-2 sm:mt-0 sm:ml-4 p-2 rounded-lg transition-colors duration-200 ${
                      theme.isDark 
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                    }`}
                    title="Copy endpoint"
                  >
                    {copiedEndpoint === `${endpoint.method} ${path}` ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Usage Example */}
      <div className={`p-4 sm:p-6 rounded-lg border ${theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
        <pre className={`p-4 rounded-lg overflow-x-auto text-xs sm:text-sm ${
          theme.isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
        }`}>
          {`// Example: Get list of all surahs
fetch('/api/quran/surahs')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Example: Get specific surah
fetch('/api/quran/surahs/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Example: Get prayer times by city
fetch('/api/prayer-times/city?city=Jakarta&country=Indonesia')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
        </pre>
      </div>
    </div>
  );
};

export default ApiDocs;