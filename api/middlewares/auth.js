const jwt = require('jsonwebtoken');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production');
  }

  console.warn('JWT_SECRET is missing; using a development-only fallback.');
  return 'development-only-secret-change-me';
}

exports.signToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email
    },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
  );
};

exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'authentication_required' });
  }

  try {
    req.user = jwt.verify(token, getJwtSecret());
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'invalid_or_expired_token' });
  }
};
