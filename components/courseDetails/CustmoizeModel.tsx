import React from "react";
import { useCallback } from "react";
import Image from "next/image";

// Define TypeScript interfaces
interface Software {
    id: string;
    name: string;
    price: number;
    category: string;
}

interface SoftwareCardProps {
    software: Software;
    isSelected: boolean;
    onToggle: () => void;
}

interface OptimizedBottomBarProps {
    selectedCount: number;
    totalPrice: number;
    discountedPrice: number;
    onCancel: () => void;
    onBuyNow: () => void;
}

// Software icons mapping
const softwareIcons: Record<string, string> = {
    // AutoCAD & Related
    "autocad": "/software logos/pngegg (17).png",
    "Autocad": "/software logos/pngegg (17).png",
    "AutoCAD": "/software logos/pngegg (17).png",

    // 3D Software
    "3dsmax": "/software logos/pngegg (19).png",
    "3dsMax": "/software logos/pngegg (19).png",
    "SketchUp": "/software logos/pngegg (18).png",
    "sketchup": "/software logos/pngegg (18).png",
    "Sketchup": "/software logos/pngegg (18).png",
    "Rhino": "/software logos/pngegg (23).png",
    "rhino": "/software logos/pngegg (23).png",

    // V-Ray & Render
    "V-Ray": "/software logos/pngegg (20).png",
    "vray": "/software logos/pngegg (20).png",
    "Vray": "/software logos/pngegg (20).png",

    // Adobe Suite
    "Photoshop": "/software logos/pngegg (24).png",
    "photoshop": "/software logos/pngegg (24).png",
    "Adobe Photoshop": "/software logos/pngegg (24).png",
    "Adobe Illustrator": "/software logos/pngegg (25).png",
    "Adobe Indesign": "/software logos/indesign.png",
    "Adobe XD": "/software logos/pngegg (27).png",
    "Adobe Premiere Pro": "/software logos/pngegg (28).png",
    "Adobe After Effects": "/software logos/pngegg (29).png",
    "Adobe Audition": "/software logos/pngegg (30).png",
    "Adobe Animate": "/software logos/pngegg (32).png",

    // UI/UX Tools
    "Figma": "/software logos/pngegg (31).png",
    "figma": "/software logos/pngegg (31).png",
    "sketch": "/software logos/pngegg (33).png",

    // 3D & Animation
    "Maya": "/software logos/pngegg (34).png",
    "maya": "/software logos/pngegg (34).png",
    "Blender": "/software logos/pngegg (35).png",
    "blender": "/software logos/pngegg (35).png",
    "Nuke": "/software logos/pngegg (33).png",
    "nuke": "/software logos/pngegg (33).png",

    // Architecture & BIM
    "Revit": "/software logos/pngegg (21).png",
    "revit": "/software logos/pngegg (21).png",
    "Lumion": "/software logos/lumion.png",
    "lumion": "/software logos/lumion.png",
    "Corona": "/software logos/chaos_corona.png",
    "corona": "/software logos/chaos_corona.png",

    // Design Tools
    "Corel": "/software logos/pngegg (26).png",
    "corel": "/software logos/pngegg (26).png",

    // 3D Modeling
    "ZBrush Arnold": "/software logos/zbrush.png",

    // Digital Marketing
    "Google Ads": "/software logos/google-ads.png",
    "Meta Ads": "/software logos/meta-ads.png",
    "Linkdin": "/software logos/linkedin.png",
    "YouTube": "/software logos/youtube.png",
    "Whatsapp Marketing": "/software logos/whatsapp.png",
    "SMS Marketing": "/software logos/sms.png",
    "Affiliate Marketing": "/software logos/affiliate.png",
};

// Function to get software icon
const getSoftwareIcon = (softwareName: string): string => {
    // Try exact match first
    if (softwareIcons[softwareName]) {
        return softwareIcons[softwareName];
    }

    // Try case-insensitive match
    const lowerName = softwareName.toLowerCase();
    const iconKey = Object.keys(softwareIcons).find(key =>
        key.toLowerCase() === lowerName
    );

    if (iconKey) {
        return softwareIcons[iconKey];
    }

    // Try partial match
    const partialKey = Object.keys(softwareIcons).find(key =>
        lowerName.includes(key.toLowerCase())
    );

    if (partialKey) {
        return softwareIcons[partialKey];
    }

    // Default icon
    return "/software logos/default.png";
};

// 1. Memoized Software Card Component
export const SoftwareCard: React.FC<SoftwareCardProps> = React.memo(({
    software,
    isSelected,
    onToggle
}) => {
    const handleClick = useCallback(() => {
        onToggle();
    }, [onToggle]);

    const iconSrc = getSoftwareIcon(software.name);

    return (
        <div
            onClick={handleClick}
            className={`
        border-2 rounded-xl p-4 cursor-pointer transition-all duration-150 
        active:scale-[0.98] bg-white select-none
        ${isSelected
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }
      `}
            style={{ transform: 'translateZ(0)' }}
        >
            <div className="flex items-start gap-3">
                <div className={`
          w-20 h-20 sm:w20 sm:h-20 rounded-xl flex items-center justify-center flex-shrink-0
          overflow-hidden
          ${isSelected
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-400'
                        : ''
                    }
        `}>
                    <div className="relative w-20 h-20 sm:w-20 sm:h-20">
                        <Image
                            src={iconSrc}
                            alt={software.name}
                            fill
                            className="object-contain "
                            sizes="(max-width: 640px) 40px, 48px"
                        />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                                {software.name}
                            </h3>
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                                {software.category}
                            </span>
                        </div>

                        <div className={`
              w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2
              ${isSelected
                                ? 'bg-yellow-500 border-yellow-500 text-white'
                                : 'border-gray-300 bg-white'
                            }
            `}>
                            {isSelected && (
                                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-amber-600 font-bold text-base sm:text-lg">
                            ₹{software.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});

SoftwareCard.displayName = 'SoftwareCard';

// 2. Memoized Bottom Bar Component
export const OptimizedBottomBar: React.FC<OptimizedBottomBarProps> = React.memo(({
    selectedCount,
    totalPrice,
    discountedPrice,
    onCancel,
    onBuyNow
}) => {
    const discountAmount = totalPrice * 0.3;

    return (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="p-4 sm:p-5">
                {/* Mobile Layout */}
                <div className="sm:hidden space-y-3">
                    <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-50 p-3 rounded-xl border border-amber-100">
                        <div>
                            <div className="text-xs text-gray-600">Total</div>
                            <div className="text-lg font-bold text-orange-600">
                                ₹{discountedPrice.toLocaleString()}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-xs text-gray-600">
                                {selectedCount} {selectedCount === 1 ? 'item' : 'items'}
                            </div>
                            {selectedCount > 0 && (
                                <div className="text-xs font-medium text-gray-500 line-through">
                                    ₹{totalPrice.toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-3 py-2.5 border border-gray-300 text-gray-700 
                       rounded-lg font-medium hover:bg-gray-50 transition-colors
                       flex items-center justify-center gap-1 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onBuyNow}
                            disabled={selectedCount === 0}
                            className={`
                flex-1 px-3 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 
                text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-1 text-sm
                ${selectedCount === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:from-amber-600 hover:to-orange-600'
                                }
              `}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between gap-4">
                    {/* Price Summary */}
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-xl border border-amber-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">
                                    {selectedCount} {selectedCount === 1 ? 'software' : 'softwares'}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                {selectedCount > 0 && (
                                    <>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500">Original</div>
                                            <div className="text-lg font-bold text-gray-700">
                                                ₹{totalPrice.toLocaleString()}
                                            </div>
                                        </div>

                                        {selectedCount > 1 && (
                                            <div className="text-green-600">
                                                <div className="text-xs">Save 30%</div>
                                                <div className="text-sm font-bold">
                                                    -₹{discountAmount.toLocaleString()}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="text-right">
                                    <div className="text-xs text-gray-500">Final Price</div>
                                    <div className="text-2xl font-bold text-orange-600">
                                        ₹{discountedPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onCancel}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 
                       rounded-lg font-medium hover:bg-gray-50 transition-colors
                       flex items-center justify-center gap-2"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onBuyNow}
                            disabled={selectedCount === 0}
                            className={`
                px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 
                text-white rounded-lg font-bold transition-colors 
                flex items-center justify-center gap-2 min-w-[120px]
                ${selectedCount === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:from-amber-600 hover:to-orange-600'
                                }
              `}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

OptimizedBottomBar.displayName = 'OptimizedBottomBar';

// Export the icons mapping for use elsewhere
export { softwareIcons, getSoftwareIcon };