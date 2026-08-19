'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 12, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, translateY: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', duration: 0.55, bounce: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, translateY: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    translateY: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, duration: 0.5, bounce: 0 },
  },
};

export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={groupVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
