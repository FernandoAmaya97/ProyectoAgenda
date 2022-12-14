const agendaCntrl = {};

const Contact = require('../models/Contact');

agendaCntrl.renderAgendaForm = (req, res) => {
    res.render('contactos/new-contact')
};

agendaCntrl.createNewContact = async (req, res) => {
    const {nombre, correo, telefono, status} = req.body;
    const newContact = new Contact({nombre , correo , telefono, status});
    await newContact.save();
    res.redirect('/agenda');
};

agendaCntrl.renderAgenda = async (req, res) => {
    const contactos = await Contact.find().lean();
    res.render('contactos/all-contacts', { contactos});
};

agendaCntrl.renderAgendaU = async (req, res) => {
    //console.log(req.query.buscar);
    const coincidencia = await Contact.findOne({ 'nombre': {$regex:'.*'+req.query.buscar+'.*'} });
    console.log(coincidencia)
    res.render('contactos/find-contact', { coincidencia});
};

//agendaCntrl.renderAgendaU = async (req, res) => {
    // Obtener el valor ingresado en el campo de búsqueda
 //   const searchTerm = req.query.buscar;
  
    // Realizar la búsqueda en la agenda utilizando el término ingresado
 //   const searchResults = await agenda.searchByName(searchTerm);
  
    // Mostrar los resultados de la búsqueda en la página
 //   res.render("agenda", { searchResults });
 // };
  
// UPDATE
agendaCntrl.renderEditForm = async (req, res) => {
    const contactosEdit = await Contact.findById(req.params.id).lean();
    res.render('contactos/edit-contact', { contactosEdit });
  };

  agendaCntrl.updateContact = async(req, res) => {
    const { nombre, correo, telefono } = req.body;
    await Contact.findByIdAndUpdate(req.params.id, { nombre, correo, telefono });
    res.redirect('/agenda');
};

// DELETE
agendaCntrl.deleteContact = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/agenda');
}

module.exports = agendaCntrl;