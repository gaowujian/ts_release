let total = 30;
let str = tagtem`The total is ${total} (${total * 1.05} with tax)`;
function tagtem(literals, ...values) {
  console.log("literals:", literals); // [ 'The total is ', ' (', ' with tax)' ]
  console.log("values:", values); // [ 30, 31.5 ]
  let output = "";
  let index;
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }
  output += literals[index];
  return output;
}
console.log(str); //The total is 30 (31.5 with tax)
