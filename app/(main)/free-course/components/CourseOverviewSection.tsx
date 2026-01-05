export default function CourseOverviewSection({
  overview,
  description,
}: {
  overview: string;
  description: string;
}) {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl space-y-6">
        <h2 className="text-3xl font-bold">Course Overview</h2>

        <p className="text-lg leading-relaxed text-justify text-gray-700">
          {overview}
        </p>

        <p className="text-lg leading-relaxed text-justify text-gray-700">
          {description}
        </p>
      </div>
    </section>
  );
}
