# SaaS Billing Widget - Assessment

---

## a. Issues Found in the UI Mockup

1. **Card Type Pre-selection:** Card Type appears pre-selected as "VISA". Users with other card types may forget to change it.
2. **Missing CVV/Security Code:** The form does not include a security code field (CVV/CVC). Processing transactions without a security code significantly increases fraud risk and violates PCI-DSS compliance standards.
3. **Missing Country Field:** The form only has "State or Province" and a generic postal code, with no option to select a country.
4. **Hardcoded "State or Province" Requirement:** Many countries do not have states or provinces, which will block international customers from completing their purchase.
5. **Missing Currency Symbol:** The amount `30.00` lacks a currency sign.
6. **Strict Input Restrictions:** "No dashes or spaces" rules create poor UX. The system should automatically sanitize inputs instead.
7. **Lack of Client-Side Card Validation:** There is no length and card-type-prefix validation on the card number. A numerically "clean" but invalid number (e.g., incorrect length or a Mastercard number while "VISA" is selected) can be submitted and will only fail after reaching the payment gateway.
8. **Lack of Trust Indicators:** There are no trust indicators (e.g., SSL badge, lock icon, or PCI-DSS certification logo) or links to Privacy Policy / Terms of Service to reassure users during checkout.
9. **Poor Name Field Layout:** The MI (Middle Initial) field is squeezed awkwardly between First Name and Last Name.
10. **Unclear Address Line 2:** Two address boxes share one label, and only the top box has a required asterisk, making it confusing whether the second box is optional or what it is used for.
11. **Inconsistent Expiration Date Validation:** The required asterisk is placed only on "Year", leaving "Month" looking optional, which will cause payment errors if "Month" is left empty.

---

## b. Sample Test Cases

### Test Case 1: Reject an invalid card number (length & prefix mismatch)
* **Scenario:** A user selects a card type and enters a number that does not match the expected format for that issuer.
* **Steps:**
  1. Select **VISA**.
  2. Enter a card number with an invalid length and a prefix that does not match VISA.
  3. Enter an expiry date.
  4. Fill in the remaining required billing fields.
  5. Click **Continue**.
* **Expected Result:**
  * The form rejects the payment.
  * A validation error is displayed stating that the card number is invalid.
  * The user remains on the form and is prompted to correct the card number before continuing.

---

### Test Case 2: Missing CVV / security code
* **Scenario:** The user submits a payment without entering the card security code.
* **Steps:**
  1. Fill in card type, card number, expiration, name, and address.
  2. Leave the CVV field empty.
  3. Click **Continue**.
* **Expected Result:**
  * The form blocks the transaction.
  * A clear validation error is shown for the missing CVV field.
  * The user is asked to complete the required information before continuing.

---

### Test Case 3: International customer without a state/province
* **Scenario:** A customer from a country without states/provinces tries to complete payment.
* **Steps:**
  1. Select a country that does not use states/provinces.
  2. Leave the State or Province field empty.
  3. Fill all other required fields.
  4. Click **Continue**.
* **Expected Result:**
  * The form should not force a state/province for countries where it is not applicable.
  * The user can complete checkout without encountering an invalid field error.
  * The solution supports country-specific address validation.

---

## c. Most Severe Issue & Recommendations

### Most Severe Issue: Missing security code and weak payment validation
This is the highest-priority bug because it increases fraud risk and weakens payment security. It also creates a poor experience for legitimate customers and creates a compliance risk for a checkout flow handling payment details.

### Recommended Product Solution
* **Add CVV/CVC Field:** Add a mandatory CVV/CVC field required prior to payment submission.
* **PCI Compliance:** Use a PCI-compliant payment provider or hosted payment field for card collection.
* **Tokenization:** Implement tokenization so the business does not store raw card data in its own system.
* **Dynamic Country/State Validation:** Add country selection and make State/Province conditional based on the selected country.
* **Real-time Card Validation:** Validate card type and card number format in real time (card length, issuer prefixes, expiry date checks).
* **Input Auto-formatting:** Remove hard-coded assumptions such as "No dashes or spaces" and replace them with auto-formatting and validation logic.
* **Trust Indicators:** Add trust indicators (SSL badge, secure checkout messaging, Privacy Policy, Terms of Service).
* **UI & UX Enhancements:** Improve accessibility and clarity for required fields, error messages, and address formatting.