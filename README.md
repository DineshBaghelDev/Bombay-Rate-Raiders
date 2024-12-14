# Bombay Rate Raiders - Currency Converter and Arbitrage Finder

## Overview
This is a web application that provides the conversion of currency values and finds possible arbitrage paths between three currencies. The application fetches live exchange rates using the [Exchange Rates API](https://exchangeratesapi.io/) and shows conversion results together with the best arbitrage opportunities.

## Features
- **Currency Conversion**: Converts a given amount from a starting currency to a final currency using live exchange rates.
- **Arbitrage Finder**: Identifies and displays the top three arbitrage paths involving an intermediate currency for maximizing potential profits.

## Technologies Used
- **Frontend**: HTML, CSS, and JavaScript
- **API**: [Exchange Rates API](https://exchangeratesapi.io/)

## Setup and Usage

### Prerequisites
- A modern web browser.
- A valid API key for the [Exchange Rates API](https://exchangeratesapi.io/). Replace `API_URL` with your API key in the following format:
  ```
  const API_URL = 'https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/';
  ```

### Running the Application
1. Clone or download the repository.
2. Open the `index.html` file in a web browser.
3. Enter the required details:
   - Starting currency.
   - Final currency.
   - Amount.
4. Click the "Submit" button.
5. The results will display:
   - Converted amount.
   - Top 3 arbitrage paths.

## File Structure
- **index.html**: Contains the HTML structure for the app.
- **style.css**: Provides styling for the application.
- **script.js**: Implements the logic for fetching data, converting currency, and finding arbitrage paths.

## Key Functions

### `find_best_route(conversion_rates, starting_currency, final_currency, amount)`
Finds the top three arbitrage paths for a given currency conversion scenario.
- **Parameters**:
  - `conversion_rates`: Object containing exchange rates for the starting currency.
  - `starting_currency`: The base currency code (e.g., USD).
  - `final_currency`: The target currency code (e.g., EUR).
  - `amount`: The amount to convert.
- **Output**:
  - Updates the DOM with the top three arbitrage paths.

### Event Listener for Submit Button
- Fetches live exchange rates for the starting currency.
- Converts the amount and displays the result.
- Invokes `find_best_route` to calculate arbitrage opportunities.

## Error Handling
- Validates user inputs (e.g., non-empty fields and valid amount).
- Catches and logs errors during API calls.
- Alerts the user if there is an issue with fetching exchange rates.

## Example
### Input
- Starting Currency: `USD`
- Final Currency: `EUR`
- Amount: `100`

### Output
- Conversion Result: `100 USD = 85.00 EUR`
- Best Paths:
  1. `USD → GBP → EUR: 86.50 EUR`
  2. `USD → CAD → EUR: 85.90 EUR`
  3. `USD → AUD → EUR: 85.30 EUR`

## Limitations
- Requires an active internet connection to fetch live exchange rates.
- Limited by the API’s rate limits and accuracy.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [Exchange Rates API](https://exchangeratesapi.io/) for providing exchange rate data.
- [Flaticon](https://www.flaticon.com/) for providing icons and images used.
- For educational purposes only. Content and images belong to their respective owners.

