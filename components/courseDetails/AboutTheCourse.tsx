export const AboutTheCourse = () => {
    const courseMetaContent = 'This Interior Design Bundle Course is built for one purpose — to make you genuinely skilled, not just “certified.” You learn every software that real interior design studios use so you can handle complete projects from concept to final presentation. You start with AutoCAD (2D & 3D) to create clean technical drawings that match industry standards. Then you move into SketchUp for fast and accurate 3D modeling. Next, you learn 3ds Max + V-Ray, where you create high-quality, photo-realistic interiors that actually look professional. After that, you work with Lumion and D5 Render to produce smooth, realistic walkthroughs and animations — exactly what clients expect today. You also learn Revit, the most in-demand BIM software used by top studios for precise architectural and interior documentation. Finally, Photoshop helps you polish renders, build mood boards, and create client-ready presentation sheets. This bundle gives you the complete workflow: Draft → Model → Render → Animate → Present. Everything you need to work'
    const paragraphs = courseMetaContent.split(". ").map(p => p.trim()).filter(p => p);
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">About this course</h2>

            <div className="space-y-4 text-gray-600 text-justify">
                {paragraphs.map((text, index) => (
                    <p key={index}>{text}.</p>
                ))}
            </div>
        </div>
    )
}