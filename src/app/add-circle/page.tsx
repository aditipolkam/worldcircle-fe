'use client';

import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useState } from 'react';

// Generate a simple QR code data URL (in a real app, you'd use a proper QR library)
const generateQRCode = (profileId: string) => {
  // This is a placeholder - in a real app you'd use a QR code library like 'qrcode'
  // For now, we'll create a simple data URL that represents a QR code
  const qrData = `worldid://profile/${profileId}`;
  
  // Create a simple QR-like pattern (this is just for demo - use a real QR library)
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 200, 200);
    
    // Black squares pattern (simplified QR code pattern)
    ctx.fillStyle = '#000000';
    const size = 10;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
          ctx.fillRect(i * size, j * size, size, size);
        }
      }
    }
    
    // Add corner markers (like real QR codes)
    ctx.fillRect(0, 0, 30, 30);
    ctx.fillRect(170, 0, 30, 30);
    ctx.fillRect(0, 170, 30, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(5, 5, 20, 20);
    ctx.fillRect(175, 5, 20, 20);
    ctx.fillRect(5, 175, 20, 20);
  }
  
  return canvas.toDataURL();
};

export default function AddCircle() {
  const [showQR, setShowQR] = useState(false);
  
  // Fixed profile ID for this user (in a real app, this would come from auth)
  const profileId = 'user_12345';
  const qrCodeDataURL = generateQRCode(profileId);

  return (
    <>
      <Page.Header className="p-0">
        <TopBar title="Add Circle" />
      </Page.Header>
      
      <Page.Main className="mb-16">
        <div className="px-4 py-6 space-y-6">
          {/* NFC Not Supported Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">NFC Not Supported</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Unfortunately, NFC is not supported on this device. Please use a QR code to share your world profile.
                </p>
              </div>
            </div>
          </div>

          {/* Share Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Share Your World Profile</h2>
              <p className="text-gray-600 text-sm">
                Let others add you to their circle by scanning your QR code
              </p>
            </div>

            {!showQR ? (
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <button
                  onClick={() => setShowQR(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Share Profile
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Beautiful QR Code Display */}
                <div className="relative">
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-20 scale-110"></div>
                  
                  {/* Main QR container */}
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-auto" style={{ width: '280px', height: '280px' }}>
                    {/* Decorative border */}
                    <div className="absolute inset-2 border-2 border-gradient-to-r from-blue-500 to-purple-500 rounded-2xl"></div>
                    
                    {/* QR Code */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="w-48 h-48 bg-white rounded-2xl shadow-inner p-3">
                        <img
                          src={qrCodeDataURL}
                          alt="QR Code"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-60"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full opacity-60"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-60"></div>
                  </div>
                </div>
                
                {/* Instructions with beautiful styling */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span className="text-blue-800 font-semibold text-sm">Scan to receive World ID</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">
                    Others can scan this code to add you to their circle and connect with you
                  </p>
                </div>

                {/* Beautiful Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowQR(false)}
                    className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-sm border border-gray-300"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Hide QR
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement share functionality
                      navigator.share?.({
                        title: 'My World Profile',
                        text: 'Add me to your circle!',
                        url: `worldid://profile/${profileId}`
                      }).catch(() => {
                        // Fallback: copy to clipboard
                        navigator.clipboard.writeText(`worldid://profile/${profileId}`);
                        alert('Profile link copied to clipboard!');
                      });
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share Link
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800">How it works</h3>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Your QR code is unique and fixed to your profile</li>
                  <li>• Others scan it to add you to their circle</li>
                  <li>• You can share the link directly or show the QR code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Page.Main>
    </>
  );
}
