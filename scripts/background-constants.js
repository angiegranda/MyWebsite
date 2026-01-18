// ===== Math & Utility Helpers =====
const TAU = Math.PI * 2;

const rand = n => Math.random() * n;
const randRange = n => n * (Math.random() - 0.5);

const lerp = (a, b, t) => a + (b - a) * t;

const fadeInOut = (life, ttl) => {
  const half = ttl * 0.5;
  return life < half
    ? life / half
    : 1 - (life - half) / half;
};

const cos = Math.cos;
const sin = Math.sin;
