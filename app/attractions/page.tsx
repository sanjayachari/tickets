import React from 'react'

const page = () => {
  return (
    <div>
             <header className="bg-white shadow-sm relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-[140px] flex justify-between items-center py-3">
          {/* Left: Logo + Branding */}
          <div className="flex items-center gap-3">
            <img
              src="/delhilogo.png"
              alt="Delhi Tickets Logo"
              className="w-18 h-18 rounded"
            />
             <img
              src="/DelhiTickets.png"
              alt="Delhi Tickets Logo"
              className="h-10"
            />
            <img
              src="/brand_logo_staybook.gif"
              alt="Staybook Logo"
              className="h-16"
            />
          </div>

          {/* Right: Currency & Language */}
          <div className="flex items-center gap-3 text-black">
            <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
              <span className="text-black">₹</span> 
            </button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
              <span className="text-black">🌐</span> 
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default page