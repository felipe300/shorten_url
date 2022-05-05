import LinkSchema from '../models/Link.js'

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params
    const link = await LinkSchema.findOne({ nanoLink })

    if (!link) return res.status(404).json({ error: 'Link not found' })

    return res.redirect(link.originLink)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Invalid id format' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
