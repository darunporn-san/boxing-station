import React, { useState } from "react";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(false);
      alert("Booking confirmed successfully!");
    }, 1000);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Boxing Studio</h1>
          <p className="text-gray-400">Book your next training session</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8">
          {!showConfirmation ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nickname Field */}
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

              {/* Date Field */}
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

              {/* Time Field */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Book Your Session
              </button>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Confirm Your Booking</h2>
                <p className="text-gray-400 mb-6">Please review your booking details:</p>
              </div>

              {/* Booking Details */}
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

              {/* Action Buttons */}
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
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Confirming...
                    </div>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Additional Info */}
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