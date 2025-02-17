require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

// config JSON response

app.use(express.json())

// models
const User = require('./models/User')

// open route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'bem vindo a nossa api' })
})

// privete route
app.get("/user/:id", checkToken, async (req, res) => {

    const id = req.params.id

    const user = await User.findById(id, `-password`)

    if(!user) {
        return res.status(404).json({msg: `usuario nao encontrado`})
    }

    res.status(200).json({ user })

})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({msg: 'acesso negado!'})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
        
    } catch (error) {
        res.status(400).json({msg: `token invalido`})
    }
}

//register user
app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body
    // validations
    if (!name) {
        return res.status(422).json({ msg: 'o nome é obrigatorio' })
    }

    if (!email) {
        return res.status(422).json({ msg: 'o email é obrigatorio' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'a senha é obrigatoria' })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas tem que ser iguais' })
    }

    //check list user exist
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({ msg: 'por favor, utilize outro email' })
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // crete user
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {

        await user.save()

        res.status(201).json({msg: 'usuario criado com sucesso'})

    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            msg: 'aconteceu um erro no servidor, tente novamente mais tarde',
        })
    }
})

// login user

app.post('/auth/login', async (req, res) => {

    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: 'o email é obrigatorio' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'a senha é obrigatoria' })
    }

    // check if user exist
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ msg: 'email nao cadastrado, tente novamente' })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({msg: 'senha invalida'})
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id
        }, secret, )

        res.status(200).json({msg: 'autenticaçao realizada com sucesso', token})
        
    } catch (err) {
        console.log(error)
        res
        .status(500)
        .json({
            msg: 'aconteceu um erro no servidor, tente novamente mais tarde',
        })
    }
})

// credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.5kp6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        app.listen(3000)
        console.log('conectou ao banco')
    })
    .catch((err) => console.log(err))

