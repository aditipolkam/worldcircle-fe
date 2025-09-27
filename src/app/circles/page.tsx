'use client';

import { use } from 'react';
import Link from 'next/link';
import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

// Mock location data with profiles
const locationData = [
  {
    id: 'sf',
    name: 'San Francisco',
    country: 'USA',
    coordinates: { x: 15, y: 35 },
    profiles: [
      {
        id: '1',
        name: 'Alex Chen',
        username: 'alexchen',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        username: 'sarahj',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        isOnline: false
      }
    ]
  },
  {
    id: 'ny',
    name: 'New York',
    country: 'USA',
    coordinates: { x: 25, y: 30 },
    profiles: [
      {
        id: '3',
        name: 'Mike Rodriguez',
        username: 'miker',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      },
      {
        id: '4',
        name: 'Emma Wilson',
        username: 'emmaw',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      }
    ]
  },
  {
    id: 'london',
    name: 'London',
    country: 'UK',
    coordinates: { x: 50, y: 25 },
    profiles: [
      {
        id: '5',
        name: 'David Kim',
        username: 'davidk',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        isOnline: false
      }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 80, y: 30 },
    profiles: [
      {
        id: '6',
        name: 'Lisa Park',
        username: 'lisap',
        profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      },
      {
        id: '7',
        name: 'Hiroshi Tanaka',
        username: 'hiroshi',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      }
    ]
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    coordinates: { x: 85, y: 70 },
    profiles: [
      {
        id: '8',
        name: 'Olivia Brown',
        username: 'oliviab',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        isOnline: false
      }
    ]
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    coordinates: { x: 52, y: 28 },
    profiles: [
      {
        id: '9',
        name: 'Max Mueller',
        username: 'maxm',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      }
    ]
  }
];

export default function WorldCircles() {
  return (
    <>
      <Page.Header className="p-0">
        <TopBar title="World Circles" />
      </Page.Header>
      
      <Page.Main className="mb-16">
        <div className="px-4 py-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Explore World Circles</h1>
            <p className="text-gray-600">Connect with people around the globe</p>
          </div>

          {/* Globe Container */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-6">
            <div className="relative w-full h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl overflow-hidden">
              {/* Globe Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"></div>
              </div>

              {/* Location Circles with Profile Pictures */}
              {locationData.map((location) => (
                <div
                  key={location.id}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${location.coordinates.x}%`,
                    top: `${location.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Profile Pictures Circle */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-blue-500 p-1 group-hover:scale-110 transition-transform duration-200">
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        {/* Main Profile Picture */}
                        <img
                          src={location.profiles[0]?.profilePicture}
                          alt={location.profiles[0]?.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Additional Profile Pictures Overlay */}
                        {location.profiles.length > 1 && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white overflow-hidden">
                            <img
                              src={location.profiles[1]?.profilePicture}
                              alt={location.profiles[1]?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        {/* More Profiles Indicator */}
                        {location.profiles.length > 2 && (
                          <div className="absolute -top-1 -left-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              +{location.profiles.length - 2}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Online Indicator */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                      <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Location Label */}
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {location.name}, {location.country}
                  </div>

                  {/* Profile Preview on Hover */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 min-w-48 z-10">
                    <h4 className="font-semibold text-sm mb-2">{location.name}</h4>
                    <div className="space-y-2">
                      {location.profiles.slice(0, 3).map((profile) => (
                        <div key={profile.id} className="flex items-center gap-2">
                          <img
                            src={profile.profilePicture}
                            alt={profile.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-medium">{profile.name}</span>
                          <div className={`w-2 h-2 rounded-full ${profile.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </div>
                      ))}
                      {location.profiles.length > 3 && (
                        <p className="text-xs text-gray-500">+{location.profiles.length - 3} more</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">All Locations</h2>
            {locationData.map((location) => (
              <Link
                key={location.id}
                href={`/profile/${location.profiles[0]?.id || '1'}`} // Link to first profile in location
                className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">
                        {location.profiles.length}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {location.profiles.slice(0, 3).map((profile) => (
                        <img
                          key={profile.id}
                          src={profile.profilePicture}
                          alt={profile.name}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                      {location.profiles.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            +{location.profiles.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Page.Main>
    </>
  );
}
