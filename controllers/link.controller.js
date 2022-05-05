import { nanoid } from 'nanoid'
import LinkSchema from '../models/Link.js'

export const getAllLinks = async (req, res) => {
  try {
    const links = await LinkSchema.find({ uid: req.uid })
    return res.status(200).json({ links })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const getLink = async (req, res) => {
  try {
    const { nanoLink } = req.params
    const link = await LinkSchema.findOne({ nanoLink })

    if (!link) return res.status(404).json({ error: 'Link not found' })

    return res.status(200).json({ originLink: link.originLink })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Invalid id format' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const createLink = async (req, res) => {
  try {
    let { originLink } = req.body
    if (!originLink.startsWith('https://')) {
      originLink = `https://${originLink}`
    }
    const link = new LinkSchema({ originLink, nanoLink: nanoid(6), uid: req.uid })
    const newLink = await link.save()

    return res.status(201).json({ newLink })
  } catch (err) {
    return res.status(500).json({ error: 'Invalid originlink' })
  }
}

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params
    let { originLink } = req.body
    if (!originLink.startsWith('https://')) {
      originLink = `https://${originLink}`
    }

    const link = await LinkSchema.findById(id)

    if (!link) return res.status(404).json({ error: 'Link not found' })
    if (!link.uid.equals(req.uid)) {
      return res.status(404).json({ error: 'originLink do not match User' })
    }

    link.originLink = originLink
    await link.save({ originLink })
    return res.status(200).json({ message: 'link updated', link })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Invalid id format' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params
    const link = await LinkSchema.findById(id)

    if (!link) return res.status(404).json({ error: 'Link not found' })
    if (!link.uid.equals(req.uid)) {
      return res.status(404).json({ error: 'originLink do not match User' })
    }

    link.remove()
    return res.status(200).json({ message: 'link deleted', link })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Invalid id format' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
