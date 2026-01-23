import AuthGuard from "@utils/authGurard";
import MultiStepFormPage from "./components/MultiStepFormPage";

export default function Page() {
  return (
    <AuthGuard>
      <MultiStepFormPage />
    </AuthGuard>
  );
}
