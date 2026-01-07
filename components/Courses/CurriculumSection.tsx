import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import Image from "next/image";

interface SemesterData {
  image: string | null;
  imageAlt: string;
  modules: string[];
}

interface CurriculumYear {
  [semester: string]: any; 
}

interface CurriculumType {
  [year: string]: CurriculumYear;
}

const CurriculumSection = ({ curriculum }: { curriculum: CurriculumType }) => {
  const years = Object.keys(curriculum);
  if (years.length === 0) return <p>No curriculum available</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-yellow-400">Course Curriculum</h2>

      {/* YEAR TABS */}
      <Tabs defaultValue={years[0]}>
        <TabsList className="flex gap-2 mb-10 bg-zinc-200 p-1 rounded-lg">
          {years.map(year => (
            <TabsTrigger key={year} value={year}>
              {year}
            </TabsTrigger>
          ))}
        </TabsList>

        {years.map(year => {
          const yearData = curriculum[year];

          // Extract semesters
          const semesters = Object.entries(yearData).filter(
            ([key, value]) =>
              key.toLowerCase().includes("semester") &&
              value &&
              typeof value === "object" &&
              Array.isArray((value as SemesterData).modules)
          ) as [string, SemesterData][];

          if (semesters.length === 0) return null;
          const defaultSemester = semesters[0][0];

          return (
            <TabsContent key={year} value={year}>
              {/* Optional: Show year-wide image (from first semester) */}
              {semesters[0][1].image && (
                <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={semesters[0][1].image}
                    alt={semesters[0][1].imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* SEMESTER TABS */}
              <Tabs defaultValue={defaultSemester}>
                <TabsList className="flex gap-2 mb-8 bg-zinc-200 p-1 rounded-lg">
                  {semesters.map(([semester]) => (
                    <TabsTrigger key={semester} value={semester}>
                      {semester}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {semesters.map(([semester, data]) => (
                  <TabsContent key={semester} value={semester}>
                    {/* Semester image */}
                    {data.image && (
                      <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                        <Image
                          src={data.image}
                          alt={data.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <Card className="border-none">
                      <CardContent className="grid gap-4 sm:grid-cols-2">
                        {data.modules.map((module, idx) => (
                          <div key={idx} className="p-4 bg-yellow-400 rounded-lg">
                            <p className="font-semibold text-black">{module}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default CurriculumSection;
