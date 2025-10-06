import CouponCard from "../../components/cards/offercard";
import Sidebar from "../../components/Sidebar";
import Image from "next/image";
import Logo from '../../assets/storelogo.jpg'

export default function Home() {
    const coupons = [
      { type: "Coupon", discount: "15%", title: "15% Off Your Booking: Priceline Promo Code", code: "SAVE15" },
      { type: "Coupon", discount: "$50", title: "$50 Off Your Order w/ Priceline Coupon Code", code: "SAVE50" },
      { type: "Coupon", discount: "$30", title: "Priceline Promo Code $30 Off Hotel Express Deals", code: "HOTEL30" },
      { type: "Coupon", discount: "10%", title: "10% Off Hotel Express Deals Priceline Promo Code", code: "HOTEL10" },
      { type: "Coupon", discount: "$250", title: "Up to Extra $250 Off Puerto Rico Hotel + Flight Bundles", code: "PR250" },
      { type: "Coupon", discount: "10%", title: "10% Off Hotel Express Deals for ACL Music Festival", code: "ACL10" },
      { type: "Offer", discount: "60%", title: "Up to 60% Off on Flight Express Deals" },
      { type: "Offer", discount: "50%", title: "Pricebreakers - Up to 50% Off top-rated hotels" },
      { type: "Offer", discount: "10%", title: "Extra 10% Off Express Deals with Priceline Email Sign Up" },
      { type: "Offer", discount: "50%", title: "50% Off Exclusive Deals for VIPs" },
      { type: "Offer", discount: "40%", title: "Priceline Car Rentals - Up To 40% Off Retail Rates" },
      { type: "Offer", discount: "20%", title: "Up to 20% Off Rental Cars for Priceline VIP Members" },
    ];
  
    return (
      <main className="max-w-6xl mx-auto px-4 py-6 mt-8 flex flex-col md:flex-row gap-6">
       <aside className="w-full md:w-1/4 flex flex-col items-center md:items-start gap-6">
  <Image src={Logo} alt="Priceline Logo"  className="mx-auto md:mx-0 w-[50%] md:w-full" />
  <Sidebar />
</aside>

  
        {/* Coupons Section */}
        <section className="flex-1">
          {/* Heading */}
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-bold">Priceline Promo Code for September 2025</h1>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              18 Priceline Coupon Codes Verified Today. Find Hotels, Flights, Car Rentals and more
            </p>
          </div>
  
          {/* Coupon Cards (always one per row) */}
          <div className="flex flex-col gap-5">
            {coupons.map((coupon, i) => (
              <CouponCard key={i} {...coupon} />
            ))}
          </div>
        </section>
      </main>
    );
  }