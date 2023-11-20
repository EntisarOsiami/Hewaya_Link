import express from 'express';
import PortalController from '../Controllers/portalController.js';

const router = express.Router();

router.get('/', PortalController.getAllPortals);

router.get('/:id', PortalController.getPortalById);


router.post('/', PortalController.addPortal);

router.put('/:id', PortalController.updatePortal);

router.delete('/:id', PortalController.deletePortal);

router.patch('/:id/subscribe', PortalController.toggleSubscription);

export default router;


