type TPayload = {
  url: string;
  payload: Record<string, string | number | boolean>;
};

type TJsonPayload = {
  url: string;
  payload: unknown;
};

export const post = async <T>({ url, payload }: TPayload): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'POST',
    body: new URLSearchParams(payload as Record<string, string>),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  const x = await res.json();
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  // Ensure a value is always returned
  return x?.data !== undefined ? x.data : (x as T);
};

export const postJson = async <T>({ url, payload }: TJsonPayload): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  
  // Get response as text first to check if it's empty
  const text = await res.text();
  
  // Parse as JSON only if not empty
  const x = text ? JSON.parse(text) : {};
  
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  // Ensure a value is always returned
  return x?.data !== undefined ? x.data : (x as T);
};

export const getJson = async <T>({ url }: { url: string }): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  const x = await res.json();
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  // Ensure a value is always returned
  return x?.data !== undefined ? x.data : (x as T);
};

export const putJson = async <T>({ url, payload }: TJsonPayload): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  
  // Get response as text first to check if it's empty
  const text = await res.text();
  
  // Parse as JSON only if not empty
  const x = text ? JSON.parse(text) : {};
  
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  // Ensure a value is always returned
  return x?.data !== undefined ? x.data : (x as T);
};

export const removeJson = async <T>({ url }: { url: string }): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  const x = await res.json();
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  return x?.data;
};

export const put = async <T>({ url, payload }: TPayload): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'PUT',
    body: new URLSearchParams(payload as Record<string, string>),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  const x = await res.json();
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  return x?.data;
};

export const get = async <T>({ url }: { url: string }): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  const x = await res.json();
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  return x?.data;
};

export const remove = async <T>({ url }: { url: string }): Promise<T> => {
  const res = await fetch(`${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
  });
  const x = await res.json();
  if (!res?.ok) {
    throw {
      status: res?.status,
      ...x,
    };
  }
  return x?.data;
};