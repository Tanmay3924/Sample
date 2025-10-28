// Function to convert the string to lowercase
function toLowerCase(plain) {
  return plain.toLowerCase();
}

// Function to remove all spaces in a string
function removeSpaces(plain) {
  return plain.replace(/\s/g, "");
}

// Function to generate the 5x5 key square
function generateKeyTable(key, keyT) {
  let hash = Array(26).fill(0);
  for (let i = 0; i < key.length; i++) {
    if (key[i] !== "j") hash[key.charCodeAt(i) - 97] = 2;
  }
  hash["j".charCodeAt(0) - 97] = 1;

  let i = 0,
    j = 0;
  for (let k = 0; k < key.length; k++) {
    if (hash[key.charCodeAt(k) - 97] === 2) {
      hash[key.charCodeAt(k) - 97] -= 1;
      keyT[i][j++] = key[k];
      if (j === 5) {
        i++;
        j = 0;
      }
    }
  }

  for (let k = 0; k < 26; k++) {
    if (hash[k] === 0) {
      keyT[i][j++] = String.fromCharCode(k + 97);
      if (j === 5) {
        i++;
        j = 0;
      }
    }
  }
}

// Function to search for the characters of a digraph
// in the key square and return their position
function search(keyT, a, b, arr) {
  if (a === "j") a = "i";
  if (b === "j") b = "i";

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (keyT[i][j] === a) {
        arr[0] = i;
        arr[1] = j;
      } else if (keyT[i][j] === b) {
        arr[2] = i;
        arr[3] = j;
      }
    }
  }
}

// Function to make the plain text length to be even
function prepare(str) {
  if (str.length % 2 !== 0) str += "z";
  return str;
}

// Function for performing the encryption
function encrypt(str, keyT) {
  let arr = Array(4);
  let result = str.split("");
  for (let i = 0; i < str.length; i += 2) {
    search(keyT, result[i], result[i + 1], arr);

    if (arr[0] === arr[2]) {
      result[i] = keyT[arr[0]][(arr[1] + 1) % 5];
      result[i + 1] = keyT[arr[0]][(arr[3] + 1) % 5];
    } else if (arr[1] === arr[3]) {
      result[i] = keyT[(arr[0] + 1) % 5][arr[1]];
      result[i + 1] = keyT[(arr[2] + 1) % 5][arr[1]];
    } else {
      result[i] = keyT[arr[0]][arr[3]];
      result[i + 1] = keyT[arr[2]][arr[1]];
    }
  }
  return result.join("");
}

// Function to encrypt using Playfair Cipher
function encryptByPlayfairCipher(str, key) {
  key = removeSpaces(toLowerCase(key));
  str = removeSpaces(toLowerCase(str));
  str = prepare(str);

  let keyT = Array.from({ length: 5 }, () => Array(5));
  generateKeyTable(key, keyT);

  return encrypt(str, keyT);
}

let key = "Monarchy";
let str = "instruments";
console.log("Key text:", key);
console.log("Plain text:", str);
str = encryptByPlayfairCipher(str, key);
console.log("Cipher text:", str);
