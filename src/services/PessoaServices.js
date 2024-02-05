const Services = require('./Services.js');
const dataSource = require('../database/models');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    //pra alterar coisas na classe de matriculas, vindo o modelo de matricula e todos seus metodos
    this.matriculaServices = new Services('Matricula');
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  
  async pegaTodasAsMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos () {
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(estudante_id){
    return dataSource.sequelize.transaction(async(transacao) => {
      await super.atualizaRegistro({ ativo: false}, { id: estudante_id}, transacao);
      await this.matriculaServices.atualizaRegistro({status: 'cancelado'}, {estudante_id: estudante_id}, transacao);
    });

  }
}

module.exports = PessoaServices;
