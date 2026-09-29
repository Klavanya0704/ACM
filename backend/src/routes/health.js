import { Router } from 'express';

const router = Router();

/**
 * GET /health
 * Public health check endpoint for Render monitoring
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'SITE ACM Backend',
    timestamp: new Date().toISOString()
  });
});

export default router;
