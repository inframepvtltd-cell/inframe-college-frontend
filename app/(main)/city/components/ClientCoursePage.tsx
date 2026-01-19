"use client";

import DigitalMarketingComponent from "../../../../components/cityComponents/digitalMarketingComponent";

export default function ClientCoursePage({ course }: any) {
  return (
    <div className="bg-white text-black mt-20">
      <DigitalMarketingComponent
        title={course.course_name}
        duration="4 Years Full-Time"
        content1={course.overview}
        content2={course.course_description}
        description={course.meta_description}
        index={0}
        category=""
        software={course.software || ["Photoshop", "Illustrator"]}
      />
    </div>
  );
}
