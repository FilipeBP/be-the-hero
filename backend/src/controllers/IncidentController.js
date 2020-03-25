const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query; //Método para realizar paginação

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Concatena à tabela ongs pelo ong_id
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
                    'ongs.name', 
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']) //Envia ao cabeçalho a quantidade total de casos.
        return response.json(incidents)
    },

    async create(request, response) {
        const {title, description, value} = request.body;
        //O contexto de uma request está no headers, seja localização, se um usuário está logado, entre outros ai
        const ong_id = request.headers.authorization; //Isto é para que a ONG só crie caso esteja logada.

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization; //A ONG só pode excluir casos criados por ela.
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401) //HTTP status code para não autorizado
                .json({error: 'Operation not permited'}); 
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }

};