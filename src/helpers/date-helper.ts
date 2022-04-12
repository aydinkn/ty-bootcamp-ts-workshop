export const getDateFromString = (dateString: string): Date | undefined => {
  if (!dateString) return;

  try {
    return new Date(dateString);
  } catch (error) {}
};
