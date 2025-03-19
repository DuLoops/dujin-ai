"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const LearningToolsHomepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const tools = [
    {
      id: 'nodejs-flashcards-app',
      title: 'Node.js Flashcards',
      description: 'Test your knowledge of Node.js backend development with 40 interactive flashcards covering core concepts, Express.js, databases, authentication, and more.',
      category: 'Programming',
      image: '/nodejs-flashcards-logo.svg',
      tags: ['JavaScript', 'Node.js', 'Backend', 'Interview Prep'],
      featured: true,
      type: 'Flashcards'
    },
    
  ];
  
  const categories = ['All', ...new Set(tools.map(tool => tool.category))];
  const types = ['All Types', ...new Set(tools.map(tool => tool.type))];
  
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Dujin's AI tools</h1>
          <p className="text-xl opacity-90">Usefull apps created with Claude AI</p>
        </div>
      </header>
      
      {/* Search and Filter Section */}
      <div className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search tools, topics, or tags..."
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <Search size={20} />
            </div>
          </div>
          
          <div className="flex space-x-4 w-full md:w-auto">
            <select 
              className="p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* All Tools Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Apps</h2>
          {filteredTools.length === 0 ? (
            <div className="text-center p-8 bg-gray-100 rounded-lg">
              <p className="text-lg text-gray-600">No tools match your search criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">About Dujin's APP Hub</h3>
              <p className="text-gray-400">A collection of useful applications created with Claude AI to enhance your productivity and learning experience.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <ul className="text-gray-400">
                {categories.filter(c => c !== 'All').map(category => (
                  <li key={category} className="mb-2">
                    <button 
                      className="hover:text-white"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">App Types</h3>
              <ul className="text-gray-400">
                {types.filter(t => t !== 'All Types').map(type => (
                  <li key={type} className="mb-2">
                    <button 
                      className="hover:text-white"
                      onClick={() => setSearchTerm(type)}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-500">
            <p>© 2025 Dujin's AI app Hub - Created by Dujin with Claude AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ToolCard = ({ tool }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={tool.image} alt={tool.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {tool.type}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{tool.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <a 
          href={`${tool.id}`}
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          Open Tool
        </a>
      </div>
    </div>
  );
};

export default LearningToolsHomepage;