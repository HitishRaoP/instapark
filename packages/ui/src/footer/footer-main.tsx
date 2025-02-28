import React from "react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const legalLinks = [
    { href: "/TermsandConditions.pdf", label: "Terms and Conditions" },
    { href: "/ContactUs.pdf", label: "Contact Us" },
    { href: "/RefundPolicy.pdf", label: "Refund Policy" }
];

const socialLinks = [
    { href: "#", label: "LinkedIn", icon: <FaLinkedinIn size={18} /> },
    { href: "#", label: "Twitter", icon: <FaXTwitter size={18} /> }
];

export function FooterMain() {
    return (
        <footer className="w-full text-muted-foreground py-10 px-4 my-32 mb-16 md:px-6 border-t">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Legal</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link className="hover:text-accent-foreground" href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Empty columns to maintain layout */}
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Social</h3>
                        <ul className="space-y-3">
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="flex items-center gap-2 hover:text-accent-foreground">
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
