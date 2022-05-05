import { Router } from 'express'
import { getAllLinks, createLink, getLink, updateLink, deleteLink }
  from '../controllers/link.controller.js'
import { bodyLinkValidations, paramLinkValidator }
  from '../middlewares/authValidations.js'
import { requireToken } from '../middlewares/requireToken.js'

const router = Router()

router.get('/', requireToken, getAllLinks)
router.get('/:id', requireToken, getLink)
router.post('/', requireToken, bodyLinkValidations, createLink)
router.patch('/:id',
  requireToken, paramLinkValidator, bodyLinkValidations, updateLink)
router.delete('/:id', requireToken, paramLinkValidator, deleteLink)

export default router
