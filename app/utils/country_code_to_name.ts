const countryCodeToName = ({ code }: { code: string }): string => {
  const country = [
    { code: 'US', name: 'United States' },
    { code: 'NZ', name: 'New Zealand' },
    // Add more countries as needed
  ].find(country => country.code === code.toUpperCase());

  return country ? country.name : code; // fallback to code if not found
};

export default countryCodeToName;
