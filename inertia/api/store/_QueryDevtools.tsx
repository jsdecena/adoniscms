'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

export default function QueryDevtools() {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    setShowDevtools(true);
  }, []);

  if (!showDevtools) {
    return null;
  }

  return <ReactQueryDevtools />;
} 