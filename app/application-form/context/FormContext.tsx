// context/FormContext.tsx
import { createContext, useState, ReactNode, useContext } from "react";

interface FormData {
  student: any;
  education: any;
  program: any;
  payment: any;
}

interface FormContextType {
  data: FormData;
  setFormValues: (step: keyof FormData, values: any) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormData>({
    student: {},
    education: {},
    program: {},
    payment: {},
  });

  const setFormValues = (step: keyof FormData, values: any) => {
    setData(prev => ({ ...prev, [step]: values }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used inside FormProvider");
  return context;
};
