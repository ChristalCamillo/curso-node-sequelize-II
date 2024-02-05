const Sequelize = require('sequelize');
const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculaPorEstudante = await matriculaServices.pegaEContaRegistros({
        where: {
          estudante_id: Number(estudante_id),
          status: 'matriculado'
        },
        limit: 2,
        order: [['id', 'DESC']]

      });
      return res.status(200).json(listaMatriculaPorEstudante);
    } catch (erro) {
      return res.status (500).json({ erro: erro.message });
    }
  }

  async pegaCursosLotados(req,res){
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.pegaEContaRegistros({
        where: {
          status: 'matriculado'
        },
        //nome da coluna q vamos trabalhar
        attributes: [ 'curso_id'],
        //coluna pela qual queremos juntar os resultados
        group: [ 'curso_id'],
        //usando o sql puro
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
      });
      return res.status(200).json(cursosLotados.count);
    } catch (erro) {
      return res.status (500).json({ erro: erro.message });
    }
  }
}

module.exports = MatriculaController;
