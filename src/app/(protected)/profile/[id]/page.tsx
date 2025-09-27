'use client';

import { use } from 'react';
import Link from 'next/link';
import { Page } from '@/components/PageLayout';
import { TopBar, Marble } from '@worldcoin/mini-apps-ui-kit-react';
import { useState } from 'react';

// Mock profile data for different people
const getProfileData = (id: string) => {
  const profiles = {
    '1': {
      id: '1',
      name: 'Alex Chen',
      username: 'alexchen',
      gender: 'Male',
      age: '32',
      company: 'Google',
      bio: 'Senior Software Engineer at Google. Passionate about AI and machine learning. Love connecting with fellow developers and sharing knowledge.',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      location: 'San Francisco, CA',
      eventsAttended: ['Tech Meetup 2024', 'AI & Machine Learning Summit'],
      isOnline: true
    },
    '2': {
      id: '2',
      name: 'Sarah Johnson',
      username: 'sarahj',
      gender: 'Female',
      age: '28',
      company: 'Apple',
      bio: 'UX Designer at Apple. Creating beautiful and intuitive user experiences. Always excited to learn about new design trends and methodologies.',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      location: 'New York, NY',
      eventsAttended: ['Design Workshop', 'UX Design Conference'],
      isOnline: false
    },
    '3': {
      id: '3',
      name: 'Mike Rodriguez',
      username: 'miker',
      gender: 'Male',
      age: '35',
      company: 'Microsoft',
      bio: 'Product Manager at Microsoft. Focused on building products that make a difference. Love discussing product strategy and user research.',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      location: 'Seattle, WA',
      eventsAttended: ['Startup Pitch Night', 'Product Management Workshop'],
      isOnline: true
    },
    '4': {
      id: '4',
      name: 'Emma Wilson',
      username: 'emmaw',
      gender: 'Female',
      age: '26',
      company: 'Meta',
      bio: 'Frontend Developer at Meta. Building the future of social media. Passionate about React, TypeScript, and creating amazing user interfaces.',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      location: 'Menlo Park, CA',
      eventsAttended: ['Web3 Developer Meetup', 'React Conference'],
      isOnline: true
    },
    '5': {
      id: '5',
      name: 'David Kim',
      username: 'davidk',
      gender: 'Male',
      age: '30',
      company: 'Netflix',
      bio: 'Data Scientist at Netflix. Using machine learning to improve content recommendations. Always interested in discussing data science and ML trends.',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      location: 'Los Gatos, CA',
      eventsAttended: ['Data Science Meetup', 'ML Conference'],
      isOnline: false
    },
    '6': {
      id: '6',
      name: 'Lisa Park',
      username: 'lisap',
      gender: 'Female',
      age: '29',
      company: 'Tesla',
      bio: 'Software Engineer at Tesla. Working on autonomous vehicle technology. Passionate about clean energy and sustainable transportation.',
      profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      location: 'Palo Alto, CA',
      eventsAttended: ['Autonomous Vehicle Summit', 'Clean Tech Conference'],
      isOnline: true
    }
  };
  
  return profiles[id as keyof typeof profiles] || profiles['1'];
};

export default function IndividualProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const profile = getProfileData(resolvedParams.id);
  const [notes, setNotes] = useState('');

  return (
    <>
      <Page.Header className="p-0">
        <TopBar 
          title="Profile"
          startAdornment={
            <Link href="/" className="text-blue-600 font-medium text-sm">
              ← Back
            </Link>
          }
        />
      </Page.Header>
      
      <Page.Main className="mb-16">
        <div className="px-4 py-6 space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="flex justify-center mb-4 relative">
              <Marble 
                src={profile.profilePicture} 
                className="w-24 h-24" 
              />
              {/* Online Status */}
              <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                profile.isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                {profile.isOnline && (
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-1">{profile.name}</h2>
            <p className="text-gray-600 text-sm">@{profile.username}</p>
            <p className="text-gray-500 text-sm">{profile.location}</p>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <p className="text-gray-900">{profile.gender}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <p className="text-gray-900">{profile.age} years old</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <p className="text-gray-900">{profile.company}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </div>

          {/* Events Attended */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">Events Attended</h3>
            <div className="space-y-2">
              {profile.eventsAttended.map((event, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-900 text-sm">{event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">My Notes</h3>
            <p className="text-sm text-gray-600 mb-3">
              Take notes about {profile.name} for future reference
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder={`Write your notes about ${profile.name} here...`}
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {notes.length} characters
              </span>
              <button
                onClick={() => {
                  // TODO: Save notes to API
                  alert('Notes saved!');
                }}
                className="text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                Save Notes
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Connect
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Share Profile
            </button>
          </div>
        </div>
      </Page.Main>
    </>
  );
}
