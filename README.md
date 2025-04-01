# Plates Co Shopping Basket System

## Overview
A command-line shopping basket system for Plates Co that calculates totals including special offers and delivery charges. The system allows adding/removing plates and automatically applies:

- The "buy one red plate, get the second half price" offer.
- Tiered delivery charges based on order value.

## Features
- Add/remove products from basket.
- Automatic offer application.
- Dynamic delivery cost calculation.
- Real-time total calculation.
- Interactive command-line interface.

## Installation
### Prerequisites
- Ensure Node.js is installed (v14+ recommended).

### Steps
1. Clone this repository:
   ```sh
   git clone https://github.com/mhassam45/leanScale.git
   cd leanScale
   ```

## Usage
Run the application:
   ```sh
   node index.js
   ```

### Available Commands
| Command | Description | Example |
|---------|-------------|---------|
| `add <code>` | Add product to basket (R01, G01, B01) | `add R01` |
| `remove <code>` | Remove product from basket | `remove G01` |
| `total` | Calculate current total and exit | `total` |
| `clear` | Empty the basket | `clear` |
| `help` | Show help message | `help` |
| `exit` | Quit the program | `exit` |

## Product Codes
| Code | Product | Price |
|------|---------|-------|
| R01  | Red Plate | $32.95 |
| G01  | Green Plate | $24.95 |
| B01  | Blue Plate | $7.95 |

## Delivery Charges
| Order Value | Delivery Cost |
|------------|--------------|
| $90+ | Free |
| $50 - $89.99 | $2.95 |
| Under $50 | $4.95 |

## Examples
```
> add R01
Added 1 R01
Current Total payable: $37.90

> add R01
Added 1 R01
Current Total payable: $54.37

> add G01
Added 1 G01
Current Total payable: $77.32

> total
Total payable amount: $77.32
```

## Implementation Details
- Uses object-based storage for efficient item counting.
- Applies offers before calculating subtotal.
- Properly handles floating-point rounding.
- Modular design with separate Basket class.

## Testing
The system includes built-in validation for:
- Valid product codes.
- Basket item counts.
- Correct offer application.
- Accurate delivery cost calculation.

To verify calculations match the requirements:
- `B01, G01` → `$37.85`
- `R01, R01` → `$54.37`
- `R01, G01` → `$60.85`
- `B01, B01, R01, R01, R01` → `$98.27`

## License
This project is made by Muhammad Haasam for Lean Scale assesment purpose.

