import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`🚀 SITE ACM Backend Server Running on Port ${PORT}`);
  console.log(`📡 Health Check Available at GET http://localhost:${PORT}/health`);
  console.log(`========================================================`);
});
