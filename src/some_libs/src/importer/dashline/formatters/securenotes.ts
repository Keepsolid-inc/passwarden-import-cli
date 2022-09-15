export interface ISecureNotes {
  note: string;
  title: string;
}

export const securenotes = (notes: ISecureNotes[]) =>
  notes.map(({ title, note }) => ({
    record_type: 12,
    category: 3,
    components: {
      title,
      notes: note,
    },
  }));
