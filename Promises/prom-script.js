console.log('This is promises');

let prom1 = new Promise((resolve, reject)=>{
    let a = Math.random();
    if(a<0.5){
        reject("No random number is Supporting  you")
    }
    else{

        setTimeout(() => {
            console.log("Yes I am done");
            resolve("Navneet")
        }, 3000);
    }
})
let prom2 = new Promise((resolve, reject)=>{
    let a = Math.random();
    if(a<0.5){
        reject("No random number is Supporting  you 02")
    }
    else{

        setTimeout(() => {
            console.log("Yes I am done 02");
            resolve("Navneet Vishwakarma")
        }, 3000);
    }
})


// let p3 = Promise.all([prom1,prom2])
let p3 = Promise.allSettled([prom1,prom2])
// let p3 = Promise.race([prom1,prom2])
// let p3 = Promise.any([prom1,prom2])
// let p3 = Promise.resolve([prom1,prom2])
// let p3 = Promise.reject([prom1,prom2])

p3.then((a)=>{
    console.log(a);
}).catch((err)=>{
    console.log(err);
    
})