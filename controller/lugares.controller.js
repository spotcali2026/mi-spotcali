const { Lugar } = require('../models/lugar.model');
const { Op } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');


// ===============================
// GET TODOS LOS LUGARES
// ===============================
const lugaresGet = async (req, res) => {

    const lugares = await Lugar.findAll();

    res.json({
        ok: true,
        lugares
    });
};


// ===============================
// GET LUGAR POR ID
// ===============================
const lugarIdGet = async (req, res) => {

    const { id } = req.params;

    const lugar = await Lugar.findByPk(id);

    if (!lugar) {
        return res.status(404).json({
            msg: "Lugar no encontrado"
        });
    }

    res.json(lugar);
};


// ===============================
// BUSCAR LUGAR POR NOMBRE
// ===============================
const lugarNombreGet = async (req, res) => {

  const nombre = req.params.nombre;

  try {

    const lugaresPermitidos = [1,3,61,62,6,7,8,9,21,23,56,71,28,30,29,65,35,63,68,70,40,41,39,38,45,46,47,48,49,50,51,52,53,55];

    const [rows] = await bdmysql.query(`
      SELECT l.id_lugar, l.nombre, cm.url
      FROM lugar l
      JOIN lugar_multimedia lm ON l.id_lugar = lm.id_lugar
      JOIN contenido_multimedia cm ON lm.id_contenido_multimedia = cm.id_contenido_multimedia
      WHERE l.id_lugar IN (${lugaresPermitidos.join(',')})
      AND LOWER(l.nombre) LIKE LOWER('%${nombre}%')
    `);

    res.json({ lugares: rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// ===============================
// OBTENER MULTIMEDIA DE UN LUGAR
// ===============================
const obtenerMultimediaLugar = async (req, res) => {

    const { id } = req.params;

    try {

        const [results] = await bdmysql.query(`
            SELECT cm.*
            FROM contenido_multimedia cm
            JOIN lugar_multimedia lm
            ON cm.id_contenido_multimedia = lm.id_contenido_multimedia
            WHERE lm.id_lugar = ?
        `, {
            replacements: [id]
        });

        res.json(results);

    } catch (error) {

        res.status(500).json({
            msg: "Error obteniendo multimedia",
            error
        });

    }

};

// ===============================
// GET LUGARES POR CATEGORIA (JOIN)
// ===============================
const lugaresFiltrados = {
  1: [1,3,61,62], //teatros
  2: [6,7,8,9], //museos
  3: [21,23,56,71], //sitios historicos
  4: [28,30,29,65], //gastronomia
  5: [35,63,68,70], //parques
  6: [40,41,39,38], //cc
  7: [45,46,47], //transporte
  8: [48,49,50], //senderismo
  9: [51,52,53,55] //centros deportivos
};

const lugaresPorCategoria = async (req, res) => {

    const { id } = req.params;


    const ids = lugaresFiltrados[id];

    if (!ids) {
        return res.json({ ok: true, lugares: [] });
    }

    const placeholders = ids.map(() => '?').join(',');

    try {

        const [results] = await bdmysql.query(`
            SELECT 
                l.*,
                COALESCE(
                    MAX(CASE 
                        WHEN LOWER(cm.titulo) LIKE '%portada%' 
                        THEN cm.url
                    END),
                    MAX(cm.url)
                ) AS imagen
            FROM lugar l
            LEFT JOIN lugar_multimedia lm 
                ON l.id_lugar = lm.id_lugar
            LEFT JOIN contenido_multimedia cm 
                ON lm.id_contenido_multimedia = cm.id_contenido_multimedia
            WHERE l.id_lugar IN (${placeholders})
            GROUP BY l.id_lugar
        `, {
            replacements: ids
        });

        res.json({
            ok: true,
            lugares: results
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "Error obteniendo lugares por categoría"
        });

    }

};

//LUGARES HOME

const lugaresHome = async (req, res) => {

    try {

        const [results] = await bdmysql.query(`
            SELECT 
                l.*,
                MAX(cm.url) AS imagen
            FROM lugar l
            LEFT JOIN lugar_multimedia lm 
                ON l.id_lugar = lm.id_lugar
            LEFT JOIN contenido_multimedia cm 
                ON lm.id_contenido_multimedia = cm.id_contenido_multimedia
            GROUP BY l.id_lugar
            ORDER BY RAND()
            LIMIT 6
        `);

        res.json({
            ok: true,
            lugares: results
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Error en home"
        });

    }

};


// ===============================
// CREAR LUGAR
// ===============================
const crearLugar = async (req, res) => {

    try {

        const lugar = await Lugar.create(req.body);

        res.json({
            msg: "Lugar creado",
            lugar
        });

    } catch (error) {

        res.status(500).json({
            msg: "Error al crear lugar",
            error
        });

    }

};


// ===============================
// ACTUALIZAR LUGAR
// ===============================
const actualizarLugar = async (req, res) => {

    const { id } = req.params;

    const lugar = await Lugar.findByPk(id);

    if (!lugar) {
        return res.status(404).json({
            msg: "Lugar no existe"
        });
    }

    await lugar.update(req.body);

    res.json({
        msg: "Lugar actualizado",
        lugar
    });

};


// ===============================
// ELIMINAR LUGAR
// ===============================
const eliminarLugar = async (req, res) => {

    const { id } = req.params;

    const lugar = await Lugar.findByPk(id);

    if (!lugar) {
        return res.status(404).json({
            msg: "Lugar no existe"
        });
    }

    await lugar.destroy();

    res.json({
        msg: "Lugar eliminado"
    });

};


module.exports = {
    lugaresGet,
    lugarIdGet,
    lugarNombreGet,
    obtenerMultimediaLugar,
    lugaresPorCategoria,
    lugaresHome,
   
    crearLugar,
    actualizarLugar,
    eliminarLugar
};