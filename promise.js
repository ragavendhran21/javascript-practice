const fetchData = (num) => {
    return new Promise((resolve,reject) => {
        const sucess = true;
        if(num % 2 === 0){
            console.log("even");
        } else {
            reject("odd");
        }
    },2000);
};
fetchData(4)
.then((msg) => console.log('success',msg))
.catch((error) => console.log('error', error));