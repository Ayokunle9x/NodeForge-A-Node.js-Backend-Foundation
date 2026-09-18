export const gethome = (req, res) => {
    res.send ("hompage!")

}
export const getAbout = (req, res) => {
    res.send ("about!")
}

export const postuser = (req, res) => {
    const {username, email, password} = req.body
  res.status(201).json({
    data: {
        username,
        email,
        password
    },
    message: "user created successfully"
  })
}