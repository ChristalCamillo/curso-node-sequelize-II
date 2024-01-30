//precisamos desse conversor pra função que usa o findOne e recebe parametros mais genéricos, em string, e tem que buscar
//no banco da forma correta para o sql

//precisamos nessa função que ela percorra um dado objeto
module.exports = (objetoParams) => {
  for (let propriedade in objetoParams) {
    //estamos usando expressões regulares pra testar se no parametro temos nome com id ou Id
    if (/Id|id/.test(propriedade)) {
      //se tiver id, substituo esse valor em nova atribuição
      //é tipo o q acontece no find by pk, mas lá n precisa de helper pq
      //já sabemos ter parametro de id
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }
  }
  return objetoParams;
};