import React from 'react';

interface SearchFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ value, onChange, onSearch, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="civilId" className="block text-sm font-medium text-gray-700">
        الرقم المدني
      </label>
      <input
        type="text"
        id="civilId"
        name="civilId"
        value={value}
        onChange={onChange}
        placeholder="أدخل الرقم المدني هنا..."
        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder-gray-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-3 bg-green-800 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500 transition-transform transform hover:scale-105 disabled:bg-green-400 disabled:cursor-not-allowed disabled:scale-100"
        disabled={isLoading}
      >
        {isLoading ? 'جاري البحث...' : 'بحث'}
      </button>
    </form>
  );
};

export default SearchForm;