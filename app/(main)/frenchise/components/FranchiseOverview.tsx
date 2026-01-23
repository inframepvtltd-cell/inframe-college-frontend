"use client";
import React, { useState, useEffect } from "react";
import { Trophy, Building, MapPin, UserCheck, Briefcase, Target, Handshake } from "lucide-react";
import { OfferStrip } from "./HeaderOffer";
import { HeroSliderSection } from "./HeroSlider";
import { BottomEnrollFooter } from "./BottomFooter";
import { fetchFranchiseSEOPages } from "../api";
import { log } from "console";

// =======================
// TYPES
// =======================
export interface SectionItem {
  id?: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
  image_urls?: string[];
}

interface SEOPage {
  city: string;
  meta_title: string;
  meta_desc: string;
  vision: string;
  mission: string;
}

interface SectionContent {
  title: string;
  description: string;
  items: SectionItem[];
}

interface FranchiseOverviewProps {
  aboutSection: SectionContent | null;
  inframeSection: SectionContent | null;
  heroSlider: SectionContent | null;
  seoPage: SEOPage | null;
}

// =======================
// STATS CARD
// =======================
function StatCard({ title, content, icon, bgImage }: SectionItem & { bgImage?: string }) {
  return (
    <div
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
      className="bg-center bg-cover relative flex items-end justify-center group cursor-pointer bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl px-8 py-3 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl duration-400"
    >
      <div className="w-full h-full absolute top-0 left-0 bg-linear-to-t from-black/70 to-transparent z-10"></div>
      <div className="z-40 static">
        <div className="flex items-center justify-center gap-4 mb-1">
          <div className="text-yellow-500 text-4xl">{icon}</div>
          <h4 className="text-4xl font-extrabold text-yellow-500">{content}+</h4>
        </div>
        <p className="text-white font-semibold">{title}</p>
      </div>
    </div>
  );
}

// =======================
// FEATURE CARD
// =======================
function Feature({ title, content, icon }: SectionItem) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl text-yellow-500 flex items-center justify-center">{icon}</div>
        <h4 className="text-lg font-bold text-gray-800 group-hover:text-yellow-600">{title}</h4>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}

// =======================
// HIGHLIGHT
// =======================
function Highlight({ title, text }: { title: string; text: string }) {
  return (
    <div className="pl-5 border-l-4 border-yellow-500">
      <p>
        <span className="font-bold">{title}:</span> <span className="text-gray-700">{text}</span>
      </p>
    </div>
  );
}

// =======================
// MAIN COMPONENT
// =======================
export default function FranchiseOverview({ aboutSection, inframeSection, heroSlider, seoPage }: FranchiseOverviewProps) {
  return (
    <>
      <OfferStrip />
      {/* <HeroSliderSection /> */}
      {heroSlider && heroSlider.items.length > 0 && (
        <HeroSliderSection
          slides={heroSlider.items.flatMap(item =>
            (item.image_urls || []).map(img => ({
              image: img,
              title: item.title,
              description: item.content,
            }))
          )}
        />
      )}
      <BottomEnrollFooter />

      <section className="relative py-14 sm:py-18 md:py-24 bg-yellow-50 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" />

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-14">
          {/* ================= SEO Section - API se fetch ================= */}
          {seoPage && (
            <div>
              <p className="inline-block text-yellow-600 font-bold mb-3 text-xl tracking-widest uppercase">
                {seoPage.meta_title}
              </p>

              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
                Build a <span className="bg-clip-text text-yellow-600">Profitable Education Franchise</span> in {seoPage.city}
              </h2>

              <p className="text-gray-700 sm:text-lg mb-7">
                {seoPage.meta_desc}
              </p>

              <div className="grid gap-5">
                <Highlight title="Vision" text={seoPage.vision} />
                <Highlight title="Mission" text={seoPage.mission} />
              </div>
            </div>
          )}


          {/* ================= STATS CARDS (About Us) - Props se ================= */}
          {aboutSection && (
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {aboutSection.items.map((item, i) => (
                <StatCard key={i} title={item.title} content={item.content} icon={item.icon} bgImage={item.image_urls?.[0]} />
              ))}
            </div>
          )}
        </div>

        {/* ================= FEATURES (Inframe Truly) - Props se ================= */}
        {inframeSection && (
          <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-24">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-center">{inframeSection.title}</h3>
            <p className="text-center text-gray-700 mb-12">{inframeSection.description}</p>

            <div className="grid md:grid-cols-3 gap-8">
              {inframeSection.items.map((item, i) => (
                <Feature key={i} title={item.title} content={item.content} icon={item.icon} />
              ))}
            </div>
          </div>
        )}
      </section>

      <BottomEnrollFooter />
    </>
  );
}
