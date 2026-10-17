import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const AccountDetails = ({ setisValid }) => {
  const { watch, setValue } = useFormContext();

  const formData = watch();

  const accountType = formData.accountType || "";
  const accountHolderName = formData.accountHolderName || "";
  const bankName = formData.bankName || "";
  const accNumber = formData.accNumber || "";
  const reEntered = formData.reEntered || "";
  const ifsc = formData.ifsc || "";
  const checked = formData.checked || false;

  // Validation
  const isAccountTypeValid = [
    "savings",
    "current",
    "salary",
  ].includes(accountType);

  const isNameValid = accountHolderName.trim().length >= 3;

  const isBankNameValid = bankName.trim().length >= 3;

  const isAccNumberValid = /^\d{9,18}$/.test(accNumber);

  const isConfirmAccountValid =
    isAccNumberValid && accNumber === reEntered;

  const isIfscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);

  const isAccountInfoValid =
    isAccountTypeValid &&
    isNameValid &&
    isBankNameValid &&
    isAccNumberValid &&
    isConfirmAccountValid &&
    isIfscValid &&
    checked;

  useEffect(() => {
    setisValid(isAccountInfoValid);
  }, [isAccountInfoValid, setisValid]);

  const handleChange = (field, value) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="account-container">
      <div className="account-heading">
        <span className="account-step-label">STEP 3 OF 4</span>
        <h2>Account Details</h2>
        <p>Enter your bank account information below.</p>
      </div>

      <div className="account-form">
        {/* Account Type */}
        <div className="account-field">
          <label htmlFor="accountType">Account Type</label>

          <select
            id="accountType"
            value={accountType}
            onChange={(e) =>
              handleChange("accountType", e.target.value)
            }
          >
            <option value="">Select account type</option>
            <option value="savings">Savings Account</option>
            <option value="current">Current Account</option>
            <option value="salary">Salary Account</option>
          </select>

          {formData.accountType && !isAccountTypeValid && (
            <p className="error-message">
              Please select a valid account type.
            </p>
          )}
        </div>

        {/* Account Holder Name */}
        <div className="account-field">
          <label htmlFor="holderName">Account Holder Name</label>

          <input
            id="holderName"
            type="text"
            placeholder="Enter name as per bank records"
            value={accountHolderName}
            onChange={(e) =>
              handleChange("accountHolderName", e.target.value)
            }
          />

          {accountHolderName.length > 0 && !isNameValid && (
            <p className="error-message">
              Name must contain at least 3 characters.
            </p>
          )}
        </div>

        {/* Bank Name */}
        <div className="account-field">
          <label htmlFor="bankName">Bank Name</label>

          <input
            id="bankName"
            type="text"
            placeholder="Enter your bank name"
            value={bankName}
            onChange={(e) =>
              handleChange("bankName", e.target.value)
            }
          />

          {bankName.length > 0 && !isBankNameValid && (
            <p className="error-message">
              Bank name must contain at least 3 characters.
            </p>
          )}
        </div>

        {/* Account Number */}
        <div className="account-field">
          <label htmlFor="accountNumber">Account Number</label>

          <input
            id="accountNumber"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Enter account number"
            value={accNumber}
            onChange={(e) =>
              handleChange(
                "accNumber",
                e.target.value.replace(/\D/g, "").slice(0, 18)
              )
            }
          />

          {accNumber.length > 0 && !isAccNumberValid && (
            <p className="error-message">
              Account number must contain 9–18 digits.
            </p>
          )}
        </div>

        {/* Confirm Account Number */}
        <div className="account-field">
          <label htmlFor="confirmAccount">
            Confirm Account Number
          </label>

          <input
            id="confirmAccount"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Re-enter account number"
            value={reEntered}
            onChange={(e) =>
              handleChange(
                "reEntered",
                e.target.value.replace(/\D/g, "").slice(0, 18)
              )
            }
          />

          {reEntered.length > 0 && !isConfirmAccountValid && (
            <p className="error-message">
              Account numbers must match and be valid.
            </p>
          )}
        </div>

        {/* IFSC */}
        <div className="account-field">
          <label htmlFor="ifsc">IFSC Code</label>

          <input
            id="ifsc"
            type="text"
            placeholder="e.g. HDFC0001234"
            maxLength={11}
            value={ifsc}
            onChange={(e) =>
              handleChange("ifsc", e.target.value.toUpperCase())
            }
          />

          {ifsc.length > 0 && !isIfscValid && (
            <p className="error-message">
              Please enter a valid 11-character IFSC code.
            </p>
          )}
        </div>

        {/* Information */}
        <div className="account-info">
          <span className="account-info-icon">ⓘ</span>
          <p>
            Please ensure your account details are accurate before
            proceeding.
          </p>
        </div>

        {/* Confirmation */}
        <label className="account-checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) =>
              handleChange("checked", e.target.checked)
            }
          />

          <span>
            I confirm that the bank account details provided are
            correct.
          </span>
        </label>
      </div>
    </div>
  );
};

export default AccountDetails;