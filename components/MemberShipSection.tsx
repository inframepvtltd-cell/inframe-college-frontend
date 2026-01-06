import Image from "next/image";

const MembershipPartnership = () => {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-left mb-12 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Our Affiliation & Accreditation
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            Collaborating with industry leaders and educational institutions to deliver excellence
          </p>
        </div>

        {/* Logo Grid */}
        <div
          className="
    grid 
    grid-cols-2      /* Mobile = 2 */
    sm:grid-cols-3   /* Tablet = 3 */
    lg:grid-cols-3   /* Desktop = 3 */
    gap-4 sm:gap-6
    items-center
  "
        >

          {[
            { src: "/The_Glocal_University-_Logo.png", alt: "Glocal University Logo" },
            { src: "/homePage_logo/sikkim skill.jpg", alt: "Sikkim Skill Logo" },
            { src: "/homePage_logo/cpsid 001.png", alt: "CPSID Logo" },
            { src: "/homePage_logo/adobe logo.png", alt: "Adobe Logo" },
            { src: "/homePage_logo/autodesk logo.png", alt: "Autodesk Logo" },
            { src: "/homePage_logo/meta logo.png", alt: "Meta Logo" },
          ].map((logo, index) => (
            <div
              key={index}
              className="
              flex justify-center items-center 
              p-3 sm:p-4 
              bg-gray-50 rounded-lg 
              hover:bg-white hover:shadow-md 
              transition-all duration-300 
              border border-gray-100
            "
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={100}
                className="object-contain max-h-26 sm:max-h-30 transition-opacity duration-300 hover:opacity-80"
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 sm:mt-12 pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Trusted by leading organizations worldwide
          </p>
        </div>
      </div>
    </section>
  );

};

export default MembershipPartnership;
