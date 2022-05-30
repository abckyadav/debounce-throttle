var p = document.getElementById("content");
var value = toggler(1, 2, 3);

function toggle() {
  p.innerText = value();
}

function toggler() {
  let arr = arguments;
  console.log("arr:", arr);
  var index = -1;

  return function () {
    index += 1;
    if (index >= arr.length) {
      index = 0;
    }
    return arr[index];
  };
}
