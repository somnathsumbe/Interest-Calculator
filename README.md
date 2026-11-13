# Interest Calculator

Responsive client-side calculator built with HTML5, CSS3, Bootstrap 5.3 and vanilla JavaScript (ES6).

## Run locally
Open `index.html` in a modern browser. For a local server, run `python -m http.server 8000` and visit http://localhost:8000.

Bootstrap is loaded from jsDelivr CDN, so internet access is needed for styling and Bootstrap's toast component. The calculation engine runs entirely in the browser.

## Features
- Simple interest and compound interest modes.
- Date-based monthly calculation frequency.
- Monthly breakdown with opening balance, interest and closing balance.
- Principal, total interest and maturity amount.
- Print-friendly report.
- Calculation history in browser localStorage (up to 50 entries).
- Indian Rupee currency formatting and responsive Bootstrap layout.

## Calculation convention
- Monthly rate = annual nominal rate / 12.
- Full monthly periods accrue one monthly rate.
- Partial months are prorated by actual elapsed days / actual days in the period's calendar month.
- Simple interest is calculated on the original principal.
- Compound interest is calculated on the accumulated balance.
- Monthly anniversaries are anchored to the original start date and clamped to the last day of shorter months.

Banks, contracts and financial products may use different day-count, compounding, rounding and date-inclusion conventions. Confirm the applicable method before using results for contractual settlement or accounting.