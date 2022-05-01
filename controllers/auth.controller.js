export const register = (req, res) => {
  const { email, password, repassword } = req.body
  res.json({ email, password, repassword })
}

export const login = (req, res) => {
  const { email, password, repassword } = req.body
  res.json({ email, password, repassword })
}
