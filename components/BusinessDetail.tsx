import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Business } from '../types';

interface BusinessDetailProps {
  data: Business[];
}

const BusinessDetail: React.FC<BusinessDetailProps> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  // Decode URL component because IDs might contain special chars
  const decodedId = id ? decodeURIComponent(id) : null;
  const business = data.find((b) => b.id === decodedId);

  if (!business) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <i className="fa-solid fa-circle-exclamation text-red-500 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Hotel Not Found</h2>
        <p className="text-slate-500 mb-6">We couldn't find the hotel you're looking for.</p>
        <Link to="/" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i> Back to Hotels
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="md:flex">
          {/* Left Column: Image & Main Info */}
          <div className="md:w-2/5 bg-slate-50 border-r border-slate-100">
            <div className="h-64 md:h-80 relative bg-slate-200">
               {business.featuredImage ? (
                  <img 
                    src={business.featuredImage} 
                    alt={business.name} 
                    className="w-full h-full object-cover"
                  />
               ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <i className="fa-solid fa-image text-5xl mb-3"></i>
                    <span className="text-sm font-medium uppercase tracking-wider">No Preview</span>
                  </div>
               )}
               {business.category && (
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                        {business.category}
                     </span>
                  </div>
               )}
            </div>
            
            <div className="p-6 md:p-8">
               <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{business.name}</h1>
               
               {business.rating && (
                  <div className="flex items-center mb-6">
                     <div className="flex items-center text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                           <i key={i} className={`fa-solid fa-star ${i < Math.floor(business.rating!) ? '' : 'text-slate-200'}`}></i>
                        ))}
                     </div>
                     <span className="text-slate-700 font-semibold">{business.rating}</span>
                     {business.ratingInfo && (
                        <span className="text-slate-400 text-sm ml-2 border-l border-slate-300 pl-2">{business.ratingInfo}</span>
                     )}
                  </div>
               )}

               <div className="space-y-4">
                  {business.bingMapsUrl && (
                     <a href={business.bingMapsUrl} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                        <i className="fa-solid fa-map-location-dot mr-2"></i>
                        View on Bing Maps
                     </a>
                  )}
               </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:w-3/5 p-6 md:p-10">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-3 mb-6">
               Details & Contact
            </h2>

            <div className="space-y-6">
               <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mr-4 text-primary">
                     <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-slate-500 mb-1">Address</h3>
                     <p className="text-slate-800">{business.address}</p>
                     {business.latitude && business.longitude && (
                        <p className="text-xs text-slate-400 mt-1 font-mono">
                           Lat: {business.latitude}, Long: {business.longitude}
                        </p>
                     )}
                  </div>
               </div>

               {business.phone && (
                  <div className="flex items-start">
                     <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 mr-4 text-green-600">
                        <i className="fa-solid fa-phone"></i>
                     </div>
                     <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Phone</h3>
                        <a href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`} className="text-slate-800 hover:text-primary transition-colors font-medium">
                           {business.phone}
                        </a>
                     </div>
                  </div>
               )}

               {business.website && (
                  <div className="flex items-start">
                     <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mr-4 text-purple-600">
                        <i className="fa-solid fa-globe"></i>
                     </div>
                     <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Website</h3>
                        <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                           {business.website}
                        </a>
                     </div>
                  </div>
               )}

               {business.emails && (
                  <div className="flex items-start">
                     <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mr-4 text-orange-600">
                        <i className="fa-solid fa-envelope"></i>
                     </div>
                     <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
                        <a href={`mailto:${business.emails.split(',')[0].trim()}`} className="text-slate-800 hover:text-primary transition-colors">
                           {business.emails.split(',').join(', ')}
                        </a>
                     </div>
                  </div>
               )}

               {(business.facebook || business.twitter || business.instagram) && (
                  <div className="flex items-start pt-4">
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mr-4 text-slate-600">
                        <i className="fa-solid fa-share-nodes"></i>
                     </div>
                     <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Social Media</h3>
                        <div className="flex space-x-3">
                           {business.facebook && (
                              <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                 <i className="fa-brands fa-facebook-f"></i>
                              </a>
                           )}
                           {business.twitter && (
                              <a href={business.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                 <i className="fa-brands fa-twitter"></i>
                              </a>
                           )}
                           {business.instagram && (
                              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                 <i className="fa-brands fa-instagram"></i>
                              </a>
                           )}
                        </div>
                     </div>
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;