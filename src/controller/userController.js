const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar usuários" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
}

const createUser = async (req, res) => {
    try {
        const {name, email} = req.body;
        const newUser = await userModel.createUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === "23505") { // Código de erro do PostgreSQL para chave única violada
            return res.status(400).json({ message: "Email já cadastrado" });
        }
        res.status(500).json({ message: "Erro ao criar usuário" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email} = req.body;
        const updateUser = await userModel.updateUser(req.params.id, name, email);
        if (!updateUser) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(updateUser);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const message = await userModel.deleteUser(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
};


module.exports = {getAllUsers, getUser, createUser, updateUser, deleteUser};