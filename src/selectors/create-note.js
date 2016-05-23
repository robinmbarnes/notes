export const createNoteDataSelector = state => {
  const { body, title } = state.createNote;
  return { body, title };
};
