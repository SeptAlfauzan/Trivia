export const ThrowError = (error: unknown): Error => {
  let errorMessage = error;
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  return Error(`Error: ${errorMessage}`);
};
