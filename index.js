const readline = require('readline');
const Basket = require('./basket');

// Initialize product catalogue
const catalogue = [
  { code: 'R01', name: 'Red Plate', price: 32.95 },
  { code: 'G01', name: 'Green Plate', price: 24.95 },
  { code: 'B01', name: 'Blue Plate', price: 7.95 }
];

// Initialize delivery rules
const deliveryRules = [
  { threshold: 90, cost: 0 },
  { threshold: 50, cost: 2.95 },
  { threshold: 0, cost: 4.95 }
];

// Initialize offers
const offers = [
  { type: 'halfPriceOffer', productCode: 'R01' }
];

// Create basket instance
const basket = new Basket(catalogue, deliveryRules, offers);

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayHelp() {
  console.log('\nAvailable commands:');
  console.log('  add <code>    - Add product to basket (R01, G01, B01)');
  console.log('  remove <code> - Remove product from basket');
  console.log('  total         - Calculate current total and exit');
  console.log('  clear         - Empty the basket');
  console.log('  help          - Show this help message');
  console.log('  exit          - Quit the program\n');
}

console.log('Plates Co - Shopping Basket System');
displayHelp();

rl.on('line', (input) => {
  const [command, code] = input.trim().split(' ');

  switch (command.toLowerCase()) {
    case 'add':
      if (code && ['R01', 'G01', 'B01'].includes(code.toUpperCase())) {
        basket.add(code.toUpperCase());
        console.log(`Added 1 ${code.toUpperCase()}`);
        console.log(`\nCurrent Total payable: $${basket.total().toFixed(2)}\n`);
      } else {
        console.log('Invalid product code. Use R01, G01, or B01');
      }
      break;

    case 'remove':
      if (code && ['R01', 'G01', 'B01'].includes(code.toUpperCase())) {
        if (basket.remove(code.toUpperCase())) {
          console.log(`Removed 1 ${code.toUpperCase()}`);
        }
      } else {
        console.log('Invalid product code. Use R01, G01, or B01');
      }
      break;

    case 'total':
      console.log(`\nTotal payable amount: $${basket.total().toFixed(2)}\n`);
      rl.close();
      break;

    case 'clear':
      basket.clear();
      console.log('Basket cleared');
      break;

    case 'help':
      displayHelp();
      break;

    case 'exit':
      rl.close();
      break;

    default:
      console.log('Invalid command. Type "help" for available commands');
  }
});

rl.on('close', () => {
  console.log('\nThank you for using Plates Co Shopping Basket!');
  process.exit(0);
});