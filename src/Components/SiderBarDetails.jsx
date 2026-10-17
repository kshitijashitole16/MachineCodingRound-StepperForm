import React, { useState } from "react";


import Sidebar from "./SideBar/SideBar";
import PersonalDetail from "./PersonalDetail";
import AddressDetails from "./AddressDetails";
import AccountDetails from "./AccountDetails";
import Submited from "./Submited";
import { useFormContext } from "react-hook-form";

const SiderBarDetails = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [isValid, setisValid] = useState(false);
  const [isPersonalDetailsValid, setIsPersonalDetailsValid] =
    useState(false);
  const [isAddressDetailValid, setisAddressDetailValid] =
    useState(false);

  const { getValues } = useFormContext();

  function handleClose() {
    setSideBarOpen(false);
  }

  function handleProceed() {
    setStep((current) => Math.min(current + 1, 4));
  }

  function handlePrevious() {
    setStep((current) => Math.max(current - 1, 1));
  }

  const formData = getValues();

  return (
    <div>
      <div
        onClick={() => setSideBarOpen(!sideBarOpen)}
        className="sider-bar-wrappar hover-btn"
      >
        Sidebar Open
      </div>

      {sideBarOpen && (
        <Sidebar
          heading={
            step === 1
              ? "Personal Details"
              : step === 2
              ? "Address Details"
              : step === 3
              ? "Account Details"
              : "Submitted"
          }
          Content={
            <div>
              {step === 1 ? (
                <PersonalDetail
                  setIsPersonalDetailsValid={
                    setIsPersonalDetailsValid
                  }
                />
              ) : step === 2 ? (
                <AddressDetails
                  setisAddressDetailValid={
                    setisAddressDetailValid
                  }
                />
              ) : step === 3 ? (
                <AccountDetails setisValid={setisValid} />
              ) : step === 4 ? (
                <Submited formData={formData} />
              ) : null}
            </div>
          }
          siderBarOpen={sideBarOpen}
          isrightside={true}
          isleftside={true}
          RightSideBtn={
            step === 1 ? (
              <button className="rightSide" onClick={handleClose}>
                Close
              </button>
            ) : (
              <button
                className="rightSide"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )
          }
          LeftSideBtn={
            step === 1 ? (
              <button
                className="leftSide"
                onClick={handleProceed}
                disabled={!isPersonalDetailsValid}
              >
                Proceed 1
              </button>
            ) : step === 2 ? (
              <button
                className="leftSide"
                onClick={handleProceed}
                disabled={!isAddressDetailValid}
              >
                Proceed 2
              </button>
            ) : step === 3 ? (
              <button
                className="leftSide"
                onClick={handleProceed}
                disabled={!isValid}
              >
                Proceed 3
              </button>
            ) : (
              <button className="leftSide" onClick={handleClose}>
                Finish
              </button>
            )
          }
        />
      )}
    </div>
  );
};

export default SiderBarDetails;