const clientModel = require("../models/clientModel");

// Get All Clients
exports.getClients = async (req, res) => {

    try {

        const clients = await clientModel.getAllClients();

        res.json(clients);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};

// Get Client By ID
exports.getClient = async (req, res) => {

    try {

        const client = await clientModel.getClientById(req.params.id);

        res.json(client);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};

// Create Client
exports.createClient = async (req, res) => {

    try {

        const result = await clientModel.createClient(req.body);

        res.json({
            success: true,
            message: "Client Added Successfully",
            result
        });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};

// Update Client
exports.updateClient = async (req, res) => {

    try {

        await clientModel.updateClient(req.params.id, req.body);

        res.json({
            success: true,
            message: "Client Updated Successfully"
        });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};

// Delete Client
exports.deleteClient = async (req, res) => {

    try {

        await clientModel.deleteClient(req.params.id);

        res.json({
            success: true,
            message: "Client Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};