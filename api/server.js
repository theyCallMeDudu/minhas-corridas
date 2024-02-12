const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5000;

server.use(middlewares);

// Adicione sua rota de exclusão personalizada aqui
server.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const db = router.db; // Acesso ao objeto db do router
  const corridaIndex = db.get('corridas').findIndex({ id }).value();

  if (corridaIndex !== -1) {
    db.get('corridas').remove({ id }).write();
    res.status(200).json({ message: `Corrida com ID ${id} excluída com sucesso.` });
  } else {
    res.status(404).json({ error: `Corrida com ID ${id} não encontrada.` });
  }
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server está rodando em http://localhost:${PORT}`);
});
