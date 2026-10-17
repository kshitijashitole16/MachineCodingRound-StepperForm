import { useForm, FormProvider } from "react-hook-form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiderBarDetails from "./Components/SiderBarDetails";
import '../src/App.css'

function App() {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pinCode: "",
      addressType: "",
      accountType: "",
      accountHolderName: "",
      bankName: "",
      accNumber: "",
      reEntered: "",
      ifsc: "",
      checked: false,
    },
  });

  return (
    <BrowserRouter>
      <FormProvider {...methods}>
        <Routes>
          <Route path="/" element={<SiderBarDetails />} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  );
}

export default App;