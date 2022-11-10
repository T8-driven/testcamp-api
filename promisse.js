function axios() {
  return new Promise((res, err) => {
    setTimeout(() => {
     //res("Deu bom!");
     err("Deu ruiiim")
    }, 3000);
  });
}

/* V1 - Then; 

function funThen() {
  const promise = axios();

  promise.then((res) => {
    console.log(res);
  }).catch(err => {
    console.log(err)
  });

  console.log("Continuo tranquilo")
}

funThen();
*/

/* V2- Async/await */

async function funAwait(){
  try {
    const promise = await axios(); // Assincrono
    console.log(promise)
    console.log("Continuo tranquilo")
  } catch (batata) {
    console.log(batata)
  }
  
}

funAwait()

