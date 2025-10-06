export default function Sidebar() {
    return (
      <div className="space-y-6 w-full">
        {/* Discover More */}
        <div className="bg-white p-4 rounded-xl shadow-md w-full">
          <h2 className="font-semibold mb-3">Discover more</h2>
          <ul className="space-y-2 text-blue-600">
            <li>More offers from Priceline</li>
            <li>FAQ from Priceline</li>
            <li>Ways to Save</li>
            <li>Related Brands</li>
          </ul>
        </div>
  
        {/* Ratings */}
        <div className="bg-white p-4 rounded-xl shadow-md w-full">
          <h2 className="font-semibold mb-2">Rate The Coupons</h2>
          <p className="text-yellow-500 text-lg">★★★★★</p>
          <p className="text-sm text-gray-600">6 Average Rating 5.0 out of 5 stars</p>
        </div>
  
        {/* About Priceline */}
        <div className="bg-white p-4 rounded-xl shadow-md w-full">
          <h2 className="font-semibold mb-2">About Priceline</h2>
          <a href="https://www.priceline.com" target="_blank" className="text-blue-600 underline">
            Priceline - Official website
          </a>
        </div>
  
        {/* Payment Options */}
        <div className="bg-white p-4 rounded-xl shadow-md w-full">
          <h2 className="font-semibold mb-2">Ways to pay</h2>
          <ul className="text-gray-700 space-y-1">
            <li>PayPal</li>
            <li>VISA</li>
            <li>MasterCard</li>
            <li>American Express</li>
            <li>Apple Pay</li>
            <li>Diners Club</li>
            <li>Google Pay</li>
          </ul>
        </div>
      </div>
    );
  }
  