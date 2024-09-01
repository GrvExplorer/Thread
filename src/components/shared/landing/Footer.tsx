import Link from "next/link";

export default function Footer() {
  return (
    <div className="">
      <footer className="flex w-full justify-between py-8 ">
        <p className="flex items-center ">2024 All right reserved</p>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex gap-6">
            <Link href={"/legal/terms-and-conditions"}>
              <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                Terms And Conditions
              </p>
            </Link>
            <Link href={"/legal/privacy-policy"}>
              <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                Privacy Policy
              </p>
            </Link>
            <Link href={"/legal/cookies-policy"}>
              <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                Cookies Policy
              </p>
            </Link>
          </div>
          <div className="flex gap-6">
            <Link href={"/legal/cancellation-and-refund"}>
              <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                Cancellation And Refund
              </p>
            </Link>
            <Link href={"/legal/shipment-and-delivery"}>
              <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                Shipment And Delivery
              </p>
            </Link>
            <Link href={"/legal/contact-us"}>
              <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                Contact Us
              </p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
