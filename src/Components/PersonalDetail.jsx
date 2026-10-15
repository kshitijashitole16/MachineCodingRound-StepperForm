import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const PersonalDetail = ({ setIsPersonalDetailsValid }) => {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const name = watch("name") || "";
  const email = watch("email") || "";
  const phone = watch("phone") || "";

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = /^[0-9]{10}$/.test(phone);

  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  useEffect(() => {
    setIsPersonalDetailsValid(isFormValid);
  }, [isFormValid, setIsPersonalDetailsValid]);

  return (
    <div className="personal-container">
      <span className="step-label">STEP 1 OF 4</span>

      <div className="title-form">Basic Information</div>

      <div className="subtitle-form">
        Let's start with your basic details
      </div>

      <div className="personal-details">
        <div className="form-group">
          <label className="name-form" htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) =>
              setValue("name", e.target.value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            placeholder="Enter your full name"
          />

          {!isNameValid && (
            <p className="error-message">
              Name must contain at least 3 characters.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="name-form" htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setValue("email", e.target.value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            placeholder="Enter your email"
          />

          {!isEmailValid && (
            <p className="error-message">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="name-form" htmlFor="phone">
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) =>
              setValue(
                "phone",
                e.target.value.replace(/\D/g, "").slice(0, 10),
                { shouldDirty: true, shouldValidate: true }
              )
            }
            placeholder="Enter your 10-digit phone number"
            maxLength={10}
            inputMode="numeric"
          />

          {!isPhoneValid && (
            <p className="error-message">
              Phone number must contain exactly 10 digits.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;