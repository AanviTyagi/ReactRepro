import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';

const videos = [
  {
    id: 1,
    title: 'Understanding Reproductive Health',
    description: 'A comprehensive guide to reproductive health and wellness.',
    thumbnail: 'https://img.youtube.com/vi/RcNNekx_QII/maxresdefault.jpg',
    duration: '10:25',
    videoId: 'RcNNekx_QII'
  },
  {
    id: 2,
    title: 'Menstrual Health and Hygiene',
    description: 'Learn about proper menstrual health practices and hygiene.',
    thumbnail: 'https://img.youtube.com/vi/vXrQ_FhZmos/maxresdefault.jpg',
    duration: '8:15',
    videoId: 'vXrQ_FhZmos'
  },
  {
    id: 3,
    title: 'Family Planning Methods',
    description: 'Explore different family planning methods and their effectiveness.',
    thumbnail: 'https://img.youtube.com/vi/6-C-h0ee1jI/maxresdefault.jpg',
    duration: '12:40',
    videoId: '6-C-h0ee1jI'
  }
];

const faqs = [
  {
    id: 1,
    question: 'What is reproductive health?',
    answer: 'Reproductive health refers to the complete physical, mental, and social well-being in all matters relating to the reproductive system.'
  },
  {
    id: 2,
    question: 'How often should I have a reproductive health check-up?',
    answer: 'It is recommended to have a reproductive health check-up at least once a year, or more frequently if you have specific concerns.'
  },
  {
    id: 3,
    question: 'What are common reproductive health issues?',
    answer: 'Common issues include irregular periods, fertility problems, sexually transmitted infections, and hormonal imbalances.'
  }
];

function Education() {
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Educational Resources
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Reliable information about reproductive health, wellness, and more.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex justify-center space-x-8">
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'videos'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faqs'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQs
            </button>
          </nav>
        </div>
        
        {/* Content */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map(video => (
              <div 
                key={video.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white bg-opacity-75 rounded-full p-3">
                      <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
          
        {activeTab === 'faqs' && (
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <VideoPlayer
            videoId={selectedVideo.videoId}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Education; 