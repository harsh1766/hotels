import React from 'react';
import { Link } from 'react-router-dom';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <Link 
      to={`/business/${encodeURIComponent(business.id)}`}
      className="block h-full"
    >
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        {/* Image Section */}
        <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
          {business.featuredImage ? (
            <img 
              src={business.featuredImage} 
              alt={business.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
              <i className="fa-solid fa-image text-4xl mb-2"></i>
              <span className="text-xs font-medium uppercase tracking-wider">No Image Available</span>
            </div>
          )}
          {business.rating && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm flex items-center">
              <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
              {business.rating}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1" title={business.name}>
              {business.name}
            </h3>
            
            <div className="flex items-start text-sm text-slate-500 mb-3">
              <i className="fa-solid fa-location-dot mt-1 mr-2 text-primary shrink-0"></i>
              <span className="line-clamp-2">{business.address}</span>
            </div>

            {business.phone && (
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <i className="fa-solid fa-phone mr-2 text-slate-400"></i>
                <span>{business.phone}</span>
              </div>
            )}
            
            {business.category && (
               <span className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-blue-50 rounded-full mb-3">
                 {business.category}
               </span>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
             <span className="text-sm font-medium text-primary group-hover:underline">View Details</span>
             <i className="fa-solid fa-arrow-right text-slate-300 text-sm"></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
