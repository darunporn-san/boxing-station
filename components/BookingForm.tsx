import React, { useState } from "react";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [bookingData, setBookingData] = useState({
    nickname: "",
    date: "",
    time: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      nickname: formData.get("nickname") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string
    };
    setBookingData(data);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    setIsSubmitting(false);
    setShowConfirmation(false);
    setShowThankYou(true);
    // Attempt to close window automatically
    setTimeout(() => {
      window.close();
    }, 500);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Studio</h1>
          <p className="text-gray-400">Book your next training session</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8">
          {showThankYou ? (
            <div className="text-center mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-400 mb-6">Thank you for your booking.</p>
              <button
                onClick={() => window.close()}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Close Window
              </button>
              <p className="text-gray-400 text-xs mt-2">
                If this window does not close automatically, please close it manually.
              </p>
            </div>
          ) : showConfirmation ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Confirm Your Booking</h2>
                <p className="text-gray-400 mb-6">Please review your booking details:</p>
              </div>
              <div className="bg-gray-700 rounded-xl p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Nickname:</span>
                  <span className="text-white font-medium">{bookingData.nickname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span className="text-white font-medium">{bookingData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Time:</span>
                  <span className="text-white font-medium">{bookingData.time}</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold text-lg rounded-xl shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-green-300 ring-2 ring-green-200/30 focus:ring-4 focus:ring-green-400/50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Confirming...
                    </div>
                  ) : (
                    <>
                      <svg className="inline-block w-5 h-5 mr-2 -mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Confirm Booking
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nickname
                </label>
                <div className="relative">
                  <input
                    name="nickname"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your nickname"
                  />
                  <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Session Date
                </label>
                <div className="relative">
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <select
                    name="time"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">Select a time</option>
                    <option value="09:00" className="bg-gray-800">09:00 AM</option>
                    <option value="10:00" className="bg-gray-800">10:00 AM</option>
                    <option value="11:00" className="bg-gray-800">11:00 AM</option>
                    <option value="14:00" className="bg-gray-800">02:00 PM</option>
                    <option value="15:00" className="bg-gray-800">03:00 PM</option>
                    <option value="16:00" className="bg-gray-800">04:00 PM</option>
                    <option value="17:00" className="bg-gray-800">05:00 PM</option>
                  </select>
                  <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Book Your Session
              </button>
            </form>
          )}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Sessions are 60 minutes • Free cancellation up to 24h before
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 