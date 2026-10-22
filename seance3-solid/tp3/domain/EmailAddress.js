export function validateEmailAddress(address) {
  if (!address || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
    throw new Error(`Adresse invalide : ${address}`);
  }
  return address;
}
