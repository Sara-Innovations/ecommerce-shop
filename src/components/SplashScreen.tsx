import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  visible: boolean;
}

export function SplashScreen({ visible }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
        >
          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="ShopVerse"
            className="w-24 h-24 rounded-3xl shadow-2xl mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          />

          {/* App Name */}
          <motion.h1
            className="text-3xl font-display font-bold text-primary-foreground tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            ShopVerse
          </motion.h1>

          <motion.p
            className="text-primary-foreground/70 text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Everything you need in one place
          </motion.p>

          {/* Loading dots */}
          <div className="flex gap-1.5 mt-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary-foreground/60"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
