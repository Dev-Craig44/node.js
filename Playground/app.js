// 1. Reverse a String
console.log(`[reverseString] ("hello"): ${ reverseString('hello') }`);
function reverseString(str) {
  // TODO: Your implementation here
  const res = str
  .split('')
  .reverse()
  .join('');

  return res;
  

}

// 2. Factorialize a Number
console.log(`[factorialize] (5): ${ factorialize(3) }`);
function factorialize(num) {
  // TODO: Your implementation here
 if (num < 0) {
    return `num needs to be a positive number...`
 }

 let result = 1;

 for (let i = 1; i <= num; i++) {
    result *= i;
 }
 return result;
}

// 3. Find the Longest Word in a String
console.log(`[findLongestWord] ("The quick brown fox"): ${ findLongestWord('The quick brown fox') }`);
function findLongestWord(str) {
  // TODO: Your implementation here
  const longestWord = str
  .split(' ')
  .reduce((a,b)=> {
    return b.length > a.length ? b : a;
  }, '')
  return longestWord
}

// 4. Sum All Numbers in a Range
console.log(`[sumAll] ([1, 4]): ${ sumAll([1, 4]) }`);
function sumAll(arr) {
  // TODO: Your implementation here
  const res = arr.reduce((a,b)=> {
    return a + b;
  })
  return res;
}

// 5. Implement Basic Calculator
console.log(`[calculate] ("+", 5, 3): ${ calculate('+', 5, 3) }`);
function calculate(op, a, b) {
  // TODO: Your implementation here
  const lookup = {
    '+':()=> a + b,
    '-':()=> a - b,
    '*':()=> a * b,
    '/':()=> {
        if (b===0) {
            throw new Error(`Cannpt divide by zero`)
        }
        return a / b;
    }
  }
  if (!lookup[op]) {
    throw new Error(`${ op } is an invalide operator`)
  }

  return lookup[op]();
}

// 6. Find Duplicates in an Array
console.log(`[findDuplicates] ([1, 2, 3, 4, 5, 1, 6, 7, 8, 9]): ${ findDuplicates([1, 2, 3, 4, 5, 5, 1, 6, 7, 8, 9]) }`);
function findDuplicates(arr) {
  // TODO: Your implementation here
  const seen = new Set();
  const duplicates = new Set();

  for (let num of arr) {
    if (seen.has(num)) {
        duplicates.add(num);
    } else {
        seen.add(num);
    }
  }
  return Array.from(duplicates);
}

// 7. Merge Two Sorted Arrays
console.log(`[mergeSortedArrays] ([1, 3, 5], [2, 4, 6]): ${ mergeSortedArrays([1, 3, 5], [2, 4, 6, 7]) }`);
function mergeSortedArrays(arr1, arr2) {
  // TODO: Your implementation here
   function isArraySorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i-1]) {
            return false;
        }
    }
    return true;
   };

   if (!isArraySorted(arr1) || !isArraySorted(arr2)) {
    throw new Error(`Both arrays must be sorted `);
   }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    
    if (arr1[i] < arr2[j]) {
        result.push(arr1[i]);
        i++
      } else {
        result.push(arr2[j])
        j++
      }
    }
    
      while (i < arr1.length) {
        result.push(arr1[i]);
        i++
      }
    
      while (j < arr2.length) {
        result.push(arr2[j])
        j++
      }

  return result;

}

// 8. Fibonacci Series up to n
console.log(`[fibonacci] (10): ${ fibonacci(10) }`);
function fibonacci(n) {
  // TODO: Your implementation here
  let fib = [0,1]
  ,a = 0
  ,b = 1
  let temp = 0;

  for (let i = 2; i <= n;i++) {
    temp = a + b
    fib.push(temp);
    [a,b] = [b,a]
  }
  return fib;
}

// 9. Implement Quick Sort
console.log(`[quickSort] ([9, 7, 5, 11]): ${ quickSort([9, 7, 5, 11]) }`);
function quickSort(arr) {
  // TODO: Your implementation here
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i])
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 10. Find Maximum Subarray Sum (Kadane’s Algorithm)
console.log(`[findMaxSubArray] ([-2, 1, -3, 4, -1, 2, 1, -5, 4]): ${ findMaxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) }`);
function findMaxSubArray(arr) {
  // TODO: Your implementation here
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];

  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}

console.log(isBalanced('()(){}{}[[]{}]'));

function isBalanced(pair) {
    const stack = [];
    const openingPairs = ['(', '[', '{'];
    const closingPairs = [')', ']', '}'];

    for (let char of pair) {
        if ( openingPairs.includes(char) ) {
            stack.push(char);
        } else {
            if ( closingPairs.includes(char)  ) {
                const last = stack.pop();
                
                if (!last || openingPairs.indexOf(last) !== closingPairs.indexOf(char)) {
                    return false;
            }
        }
    }
}
    return stack.length === 0;
}