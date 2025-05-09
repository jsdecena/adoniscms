'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import QueryDevtools from './_QueryDevtools';
import { queryClient } from './_config';

interface IProps {
  children: React.ReactNode;
}

function QueryProvider({ children }: IProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <QueryDevtools />
    </QueryClientProvider>
  );
}

export default QueryProvider;
