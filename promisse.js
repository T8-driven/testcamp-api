function axios() {
  return new Promise((res, err) => {
    setTimeout(() => {
      res("Deu bom!");
    }, 3000);
  });
}

/* V1 - Then;

function funThen() {
  const promise = axios();

  promise.then((res) => {
    console.log(res);
  });

  console.log("Continuo tranquilo")

}

funThen();
 */

/* V2- Async/await */

async function funAwait(){
  const promise = await axios(); // Assincrono
  console.log(promise)
  console.log("Continuo tranquilo")
}

funAwait()