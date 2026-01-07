// components/Sidebar.tsx
import Link from "next/link";

const steps = [
  { label: "Student Details", path: "/application/student" },
  { label: "Education Details", path: "/application/education" },
  { label: "Program Details", path: "/application/program" },
  { label: "Payment", path: "/application/payment" },
];

const Sidebar = () => (
  <div className="w-60 p-4 border-r">
    <ul>
      {steps.map((step, i) => (
        <li key={i} className="my-2">
          <Link href={step.path}>
            <a className="text-blue-600 hover:underline">{step.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
