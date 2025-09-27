'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { Page } from '@/components/PageLayout';
import { TopBar, Marble } from '@worldcoin/mini-apps-ui-kit-react';

// Mock profile data for different people
const getProfileData = (id: string) => {
  const profiles = {
    '1': {
      id: '1',
      name: 'Alex Chen',
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
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    setSaveStatus('saving');

    try {
      // Save notes to localStorage (in a real app, this would be an API call)
      const userNotes = JSON.parse(localStorage.getItem('userNotes') || '{}');
      userNotes[profile.id] = notes;
      localStorage.setItem('userNotes', JSON.stringify(userNotes));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('saved');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
      
    } catch (error) {
      console.error('Error saving notes:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Load existing notes on component mount
  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem('userNotes') || '{}');
    if (userNotes[profile.id]) {
      setNotes(userNotes[profile.id]);
    }
  }, [profile.id]);

  return (
    <>
      <Page.Header className="p-0">
        <TopBar 
          title={profile.name}
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
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className={`text-sm font-medium ${
                  isSavingNotes
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {isSavingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
            
            {/* Status Messages */}
            {saveStatus === 'saved' && (
              <p className="text-green-600 text-sm mt-2 text-center">✅ Notes saved!</p>
            )}
            {saveStatus === 'error' && (
              <p className="text-red-600 text-sm mt-2 text-center">❌ Failed to save notes.</p>
            )}
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
