async function getdata() {
  // let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  let x = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  let data = await x.json();
  // let data = await x.text()
  console.log(data);
return data
}

async function main() {
  console.log("Before the await");

  let data = await getdata();
  console.log(data);
  console.log("API is called");
}
main();
