
function expenseTracking() {
  const [amount, ...description] = argv[2];
  const allWords = [amount, ...description];

  switch(allWords) {
    case "add":
      break;

    case "list":
      break;
    
    case "summary:":
      break;
    
    case "delete":
      break;
    
    default:
      console.log('Please try again');
      break;

  }
}

expenseTracking();