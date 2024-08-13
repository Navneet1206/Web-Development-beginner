console.log("I am first");
console.log("I am Second");

setTimeout(() => {
  console.log("I am third");
}, 0);

console.log("The End");


const fn = (arg) => {
    console.log(arg);
  };
  
  const callback = (arg, fn) => {
    console.log(arg);
    fn("What is this");
  };
  
  const loadscript = (src, callback) => {
    let sc = document.createElement("script");
    sc.src = src;
  
    // Here, we're wrapping the callback function so that it only runs when the script has loaded.
    sc.onload = () => callback("Navneet", fn);
   
    document.head.append(sc);
  };
  
  loadscript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js", callback);
  