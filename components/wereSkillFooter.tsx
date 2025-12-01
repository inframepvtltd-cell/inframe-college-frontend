import { Facebook, Youtube, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const WereSkillFooter = () => {
    return (
        <footer className="bg-gradient-to-b from-black to-gray-900 text-white font-sans py-6">

            {/* Copyright Section */}
            <div className="container mx-auto px-6 lg:px-16 text-center text-sm opacity-80">
                <p className="font-bold">
                    © 2025 wereskill is a Unit of Inframe Educational Society Registered under the Rajasthan Society Act. All rights reserved
                    Privacy Policy ·<br />
                    <Link href={"/privacy-policy"} className="hover:underline">
                        Privacy Policy
                    </Link>{" "}
                    ·{" "}
                    <Link href={"/RefundCancellationPolicy"} className="hover:underline">
                        Cancellation and Refund
                    </Link>{" "}
                    ·{" "}
                    <Link href={"/TermsAndConditions"} className="hover:underline">
                        Terms & Conditions
                    </Link>{" "}
                    ·{" "}
                    <Link href={"/DeliveryAndShippingPolicy"} className="hover:underline">
                        Shipping and Delivery
                    </Link>
                </p>
            </div>

        </footer>
    );
};

export default WereSkillFooter;
