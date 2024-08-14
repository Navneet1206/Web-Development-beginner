async function getdata(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("Done")
        }, 3000);
    })
}

async function main()
{

    console.log("Load url")
    console.log('Some thing else');
    console.log('Part1');
    
    let data = await getdata()  //we use await function inside the async function
    console.log(data);
    console.log('Part12');
    console.log('Part13');
    console.log('Part14');
       
}
main()

// data.then((v)=>{
//     console.log('Process Data');
// })
