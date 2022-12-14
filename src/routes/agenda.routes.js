const { Router } = require('express');
const router = Router();

const { renderAgendaForm, 
    createNewContact, 
    renderAgenda,
    renderAgendaU, 
    renderEditForm, 
    updateContact, 
    deleteContact} = require('../controllers/agenda.controller');

// New Contact
router.get('/agenda/add', renderAgendaForm);

router.post('/agenda/new-contact', createNewContact);

// Obtener Agenda Completa
router.get('/agenda', renderAgenda);
// Obtener coincidencias por nombre
router.get('/agenda/buscar', renderAgendaU);

//Edit Ccontact
router.get('/agenda/edit/:id', renderEditForm);

router.put('/agenda/edit/:id', updateContact);

// Delete
router.delete('/agenda/delete/:id', deleteContact);

module.exports = router