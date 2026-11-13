# Flat Delay Compensation Calculator

Responsive client-side application built with HTML5, CSS3, Bootstrap 5.3 and vanilla JavaScript (ES6).

## Run locally
Open `index.html` in a modern browser. For a local server, run `python -m http.server 8000` and visit http://localhost:8000.

Bootstrap and SheetJS are loaded from CDNs. Excel parsing and calculations run in the browser; no backend or database is required.

## Features
- Manually editable agreement possession deadline, compensation start date and calculation end date (defaults to the current date).
- Interest basis options: MahaRERA formula, Agreement rate and Custom rate.
- MahaRERA rate input uses SBI highest MCLR + 2%; enter the applicable MCLR in the input.
- Import .xlsx, .xls and .csv payment statements.
- Reads the Date and Total (₹) columns. If Total is present, Own Contribution and SBI Bank columns are not added again.
- Date-wise simple interest for every payment.
- Payments before the compensation start date accrue from the compensation start date; later payments accrue from their own payment date.
- Actual days / 365 or Actual days / 366 day-count option.
- Add, edit and remove payment rows manually.
- INR summary, CSV export and print-friendly report.

## Calculation convention
For each payment row:
`Interest = Total Amount × Annual Rate × Eligible Days / (100 × Day-count basis)`

This is simple interest; interest is not compounded. The eligible start date is the later of the payment date and the compensation start date. The calculation end date is the user-selected inclusive endpoint for reporting; the elapsed day count is the difference between start and end dates.

## Important legal and data notes
- Maharashtra RERA Rule 18 provides for the State Bank of India highest MCLR plus two percent. The calculator asks the user to enter the applicable SBI highest MCLR and adds 2%; it does not fetch or verify historical MCLR values automatically.
- This version applies one annual rate across the selected period. If the applicable SBI highest MCLR changed during the claim period, use a verified rate-wise schedule or obtain a legal/accounting review before relying on the result.
- Whether a payment is legally eligible for interest depends on the agreement, RERA registration, facts, orders and payment nature. The app imports the Total column as requested; it does not decide legal eligibility or automatically exclude maintenance, taxes, TDS, insurance or other categories.
- Excel data is processed locally in the browser. No payment data is sent to a server.
- This is an estimation and reconciliation tool, not legal advice or a final adjudication of compensation.

## Suggested Excel headers
`Date | Particulars | Own Contribution (₹) | SBI Bank (₹) | Total (₹)`
