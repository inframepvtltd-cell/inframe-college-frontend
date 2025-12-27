import { useFormContext } from "../../context/FormContext"
import Sidebar from "../Sidebar"
import StudentDetailsForm from "./StudentDetailsForm"
import EducationalForm from "./EducationalForm"
// import ProgramDetailsForm from "./ProgramDetailsForm"
// import PaymentForm from "./PaymentForm"

export default function MultiStepForm() {
  const { currentStep } = useFormContext()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StudentDetailsForm />
      case 2:
        return <EducationalForm />
    //   case 3:
    //     return <ProgramDetailsForm />
    //   case 4:
    //     return <PaymentForm />
      default:
        return <StudentDetailsForm />
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">{renderStep()}</div>
    </div>
  )
}
