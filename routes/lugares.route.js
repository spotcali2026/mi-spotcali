const { bdmysql } = require('../database/mySqlConnection');
const { Router } = require('express');

const {
    lugaresGet,
    lugarIdGet,
    lugarNombreGet,
    obtenerMultimediaLugar,
    lugaresPorCategoria,
    lugaresHome,
    crearLugar,
    actualizarLugar,
    eliminarLugar
} = require('../controller/lugares.controller');

const router = Router();

router.get('/', lugaresGet); // todos los lugares

router.get('/buscar/:nombre', lugarNombreGet); // buscar por nombre

router.get('/:id/multimedia', obtenerMultimediaLugar); // multimedia del lugar

router.get('/categoria/:id', lugaresPorCategoria);

router.get('/home', async (req, res) => {
  try {

    const lugaresPermitidos = [1,3,61,62,6,7,8,9,21,23,56,71,28,30,29,65,35,63,68,70,40,41,39,38,45,46,47,48,49,50,51,52,53,55]

    const [rows] = await bdmysql.query(`
      SELECT l.id_lugar, l.nombre, cm.url
      FROM lugar l
      JOIN lugar_multimedia lm ON l.id_lugar = lm.id_lugar
      JOIN contenido_multimedia cm ON lm.id_contenido_multimedia = cm.id_contenido_multimedia
      WHERE l.id_lugar IN (${lugaresPermitidos.join(',')})
    `);

    res.json({ lugares: rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/detalle/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await bdmysql.query(`
      SELECT l.*, cm.url
      FROM lugar l
      JOIN lugar_multimedia lm ON l.id_lugar = lm.id_lugar
      JOIN contenido_multimedia cm ON lm.id_contenido_multimedia = cm.id_contenido_multimedia
      WHERE l.id_lugar = ${id}
    `);

    res.json(rows);

  } catch (error) {
    console.error("ERROR REAL:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', lugarIdGet); // buscar por id

router.post('/', crearLugar); // crear lugar

router.put('/:id', actualizarLugar); // actualizar lugar

router.delete('/:id', eliminarLugar); // eliminar lugar

module.exports = router;