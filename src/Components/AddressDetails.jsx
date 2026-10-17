import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const AddressDetails = ({ setisAddressDetailValid }) => {
  const {
    watch,
    setValue,
  } = useFormContext();

  const formData = watch();

  const address1 = formData.address1 || "";
  const country = formData.country || "";
  const state = formData.state || "";
  const city = formData.city || "";
  const pinCode = formData.pinCode || "";
  const addressType = formData.addressType || "";

  // Validation
  const isValidPincode = /^[1-9][0-9]{5}$/.test(pinCode);

  const isValidCity = city.trim().length >= 3;

  const isAddressValid = address1.trim().length >= 3;

  const isValidCountry = ["india", "usa", "uk"].includes(
    country.toLowerCase()
  );

  const isValidState = [
    "maharashtra",
    "gujarat",
    "karnataka",
  ].includes(state.toLowerCase());

  const isValidAddressType = ["home", "work", "other"].includes(
    addressType
  );

  const isAddressDetailValid =
    isValidPincode &&
    isValidCity &&
    isAddressValid &&
    isValidCountry &&
    isValidState &&
    isValidAddressType;

  useEffect(() => {
    setisAddressDetailValid(isAddressDetailValid);
  }, [isAddressDetailValid, setisAddressDetailValid]);

  // Update a specific form field
  const handleChange = (field, value) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="address-container">
      <div className="address-heading">
        <h2>Address Details</h2>
        <p>Enter your residential address information below.</p>
      </div>

      <div className="address-form">
        {/* Address Line 1 */}
        <div className="address-field full-width">
          <label htmlFor="address1">Address Line 1</label>

          <input
            id="address1"
            type="text"
            placeholder="House no., building, street"
            value={address1}
            onChange={(e) =>
              handleChange("address1", e.target.value)
            }
          />

          {address1.length > 0 && !isAddressValid && (
            <p className="error-message">
              Address must contain at least 3 characters.
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="address-field full-width">
          <label htmlFor="address2">
            Address Line 2 <span>(Optional)</span>
          </label>

          <input
            id="address2"
            type="text"
            placeholder="Apartment, landmark, area"
            value={formData.address2 || ""}
            onChange={(e) =>
              handleChange("address2", e.target.value)
            }
          />
        </div>

        {/* Country and State */}
        <div className="address-row">
          <div className="address-field">
            <label htmlFor="country">Country</label>

            <select
              id="country"
              value={country}
              onChange={(e) => {
                handleChange("country", e.target.value);
                handleChange("state", "");
              }}
            >
              <option value="">Select country</option>
              <option value="india">India</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
            </select>

            {country && !isValidCountry && (
              <p className="error-message">
                Please select a valid country.
              </p>
            )}
          </div>

          <div className="address-field">
            <label htmlFor="state">State</label>

            <select
              id="state"
              value={state}
              onChange={(e) =>
                handleChange("state", e.target.value)
              }
            >
              <option value="">Select state</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="gujarat">Gujarat</option>
            </select>

            {state && !isValidState && (
              <p className="error-message">
                Please select a valid state.
              </p>
            )}
          </div>
        </div>

        {/* City and PIN Code */}
        <div className="address-row">
          <div className="address-field">
            <label htmlFor="city">City</label>

            <input
              id="city"
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) =>
                handleChange("city", e.target.value)
              }
            />

            {city.length > 0 && !isValidCity && (
              <p className="error-message">
                City must contain at least 3 characters.
              </p>
            )}
          </div>

          <div className="address-field">
            <label htmlFor="pincode">PIN Code</label>

            <input
              id="pincode"
              type="text"
              inputMode="numeric"
              placeholder="6-digit PIN code"
              value={pinCode}
              maxLength={6}
              onChange={(e) =>
                handleChange(
                  "pinCode",
                  e.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
            />

            {pinCode.length > 0 && !isValidPincode && (
              <p className="error-message">
                Please enter a valid 6-digit PIN code.
              </p>
            )}
          </div>
        </div>

        {/* Address Type */}
        <div className="address-field full-width">
          <label>Address Type</label>

          <div className="address-type-options">
            {["home", "work", "other"].map((type) => (
              <label
                key={type}
                className={`address-type ${
                  addressType === type ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={addressType === type}
                  onChange={() =>
                    handleChange("addressType", type)
                  }
                />

                <span>
                  {type === "home"
                    ? "⌂"
                    : type === "work"
                    ? "▣"
                    : "⌖"}
                </span>

                <span>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {addressType && !isValidAddressType && (
            <p className="error-message">
              Please select a valid address type.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;